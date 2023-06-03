import { TRespondToDMMessage, EDMMessageStep } from "@core/types/client";
import { TTaskProcessorArgs } from ".";
import dmHandler from "../../behaviour/dm/base";
import scenarioHandler from "../../behaviour/dm/scenarioHandler";
import { removeTaskFromQueue } from "../processor";
import { delayFactory } from "../../utils/messagingUtils";
import { EMessageType, TSendableMessage } from "@core/types/server";

const { readDelay, typeDelay } = delayFactory();

export const respondToDMMessage = async ({
  client,
  task,
}: TTaskProcessorArgs<TRespondToDMMessage>) => {
  const { step, message, senderId, count } = task.payload;
  await readDelay();
  // we cant use await message.markAsRead() because its not reproducable by params
  await client.markAsRead(task.payload.senderId);
  const sendableMessage: TSendableMessage = {
    receiver: task.payload.senderId,
    type: EMessageType.TEXT,
    payload: {
      text: task.payload.message,
    },
  };

  await typeDelay(client, sendableMessage);

  if (step === EDMMessageStep.FINISHED) {
    await dmHandler({
      step,
      message,
      client,
      senderId,
      count,
    });
  } else {
    await scenarioHandler({ count, client, senderId });
  }

  removeTaskFromQueue(task);
};
