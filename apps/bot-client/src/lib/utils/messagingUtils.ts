import { state } from "../state";
import { getRandomInt } from "@core/functions/general";
import {
  EDMMessageStep,
  TAnyDMMessageStep,
  TScenarioElement,
} from "@core/types/client";
import { Api, TelegramClient } from "telegram";
import { Entity } from "telegram/define";

export const findDmAnswer = (request: string) => {
  let res: string = null;
  state.dmDb.forEach((answer) => {
    const requests = answer.request.split("|");
    requests.forEach((req) => {
      if (request.toLowerCase().includes(req.toLowerCase())) {
        //   pick random from answer.response array
        const randomValue = getRandomInt(answer.response.length);
        const foundAnswer = answer.response[randomValue];
        const messageProbabilityRes = Math.random();
        if (foundAnswer.p * state.message_probability > messageProbabilityRes) {
          res = foundAnswer.a;
        }
      }
      if (res) {
        return res;
      }
    });
    if (res) {
      return res;
    }
  });
  return res;
};

export const delayFactory = () => {
  const readDelay = async () => {
    const delay = state.read_delay + getRandomInt(3);
    await new Promise((resolve) => setTimeout(resolve, delay));
  };
  const typeDelay = async (message: string) => {
    const delay =
      message.length * state.type_delay_multiplier + getRandomInt(5);
    await new Promise((resolve) => setTimeout(resolve, delay));
  };

  return {
    readDelay,
    typeDelay,
  };
};

export const getDMMessageStep = async (
  client: TelegramClient,
  senderId: bigInt.BigInteger
): Promise<{
  step: TAnyDMMessageStep;
  count: number;
}> => {
  // count sent messages to this user
  const messages = await client.getMessages(senderId, {
    limit: state.scenario.length + 2,
  });
  const messagesCount = messages.length;

  // if messages count is less than scenario length, we return corresponding step.
  // if messages count is more than scenario length, we return 'finished' step.
  // if messages count is zero, we return 'initial' step.

  if (messagesCount > state.scenario.length) {
    return {
      step: EDMMessageStep.FINISHED,
      count: messagesCount,
    };
  }

  return {
    step: EDMMessageStep[messagesCount],
    // -1 because we cannot actually know, because we request 2 more messages than in scenario length
    count: -1,
  };
};

