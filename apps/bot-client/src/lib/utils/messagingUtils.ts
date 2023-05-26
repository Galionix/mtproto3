import { getRandomInt } from "@core/functions";
import {
  EDMMessageStep,
  EDMMessageStepValues,
  TAnyDMMessageStep,
} from "@core/types/client";
import { Api, TelegramClient } from "telegram";
import { state } from "../state";

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
  const typeDelay = async (
    client: TelegramClient,
    message: string,
    senderId: bigInt.BigInteger
  ) => {
    // send typing action
    // const result = await client.invoke(
    //   new Api.messages.SetTyping({
    //     peer: senderId,
    //     action: new Api.SendMessageTypingAction(),
    //     // topMsgId: 43,
    //   })
    // );

    const delay =
      message.length * state.type_delay_multiplier + getRandomInt(5);
    console.log("delay: ", delay);
    //  each 5 seconds of delay we send typing action again
    const typingActionInterval = 5;

    const typingActionIntervalCount = Math.floor(delay / typingActionInterval);
    console.log("typingActionIntervalCount: ", typingActionIntervalCount);

    console.time("typeDelay");
    for (let i = 0; i < typingActionIntervalCount; i++) {
      await new Promise((resolve) =>
        setTimeout(async () => {
          await client.invoke(
            new Api.messages.SetTyping({
              peer: senderId,
              action: new Api.SendMessageTypingAction(),
              // topMsgId: 43,
            })
          );
          resolve(true);
        }, (typingActionInterval + getRandomInt(5)) * 1000)
      );
    }
    console.timeEnd("typeDelay");
    // console.log("typeDelay", delay);
    // await new Promise((resolve) => setTimeout(resolve, delay));
  };
  const waitAfterTaskDelay = async () => {
    const delay = state.afterTaskDelay + getRandomInt(3);
    await new Promise((resolve) => setTimeout(resolve, delay));
  };

  const waitAfterTaskIdleTime = async () => {
    const delay = state.afterTaskIdleTime + getRandomInt(3);
    await new Promise((resolve) => setTimeout(resolve, delay));
  };

  return {
    readDelay,
    typeDelay,
    waitAfterTaskDelay,
    waitAfterTaskIdleTime,
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
    fromUser: "me",
  });
  console.log("messages: ", messages);
  const messagesCount = messages.length;
  console.log("messagesCount: ", messagesCount);

  // if messages count is less than scenario length, we return corresponding step.
  // if messages count is more than scenario length, we return 'finished' step.
  // if messages count is zero, we return 'initial' step.

  if (messagesCount > state.scenario.length - 1) {
    return {
      step: EDMMessageStep.FINISHED,
      count: -1,
    };
  }

  return {
    step: EDMMessageStepValues[messagesCount],
    // -1 because we cannot actually know, because we request 2 more messages than in scenario length
    count: messagesCount,
  };
};
