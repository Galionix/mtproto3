import {
  TRespondToDMMessage,
  EDMMessageStep,
  EMessageType,
  TSendableMessage,
} from "@core/types/client";
import { TTaskProcessorArgs } from ".";
import dmHandler from "../../behaviour/dm/base";
import scenarioHandler from "../../behaviour/dm/scenarioHandler";
import { removeTaskFromQueue } from "../processor";
import { delayFactory } from "../../utils/messagingUtils";

const { readDelay, typeDelay } = delayFactory();

export const respondToDMMessage = async ({
  client,
  task,
}: TTaskProcessorArgs<TRespondToDMMessage>) => {
  const { message, senderId } = task.payload;
  await readDelay();
  // we cant use await message.markAsRead() because its not reproducable by params
  await client.markAsRead(task.payload.senderId);
  if (!message) return;
  const { type, ...payload } = message;

  const sendableMessage = {
    receiver: task.payload.senderId,
    type,
    payload,
  } as TSendableMessage;

  await typeDelay(client, sendableMessage);

  // if (step === EDMMessageStep.FINISHED) {
  //   await dmHandler({
  //     step,
  //     message,
  //     client,
  //     senderId,
  //     count,
  //   });
  // } else {
  await scenarioHandler({ client, senderId, sendableMessage });
  // }

  removeTaskFromQueue(task);
};
