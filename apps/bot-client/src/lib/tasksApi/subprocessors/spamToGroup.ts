import { client, Api } from "telegram";
import { TTaskProcessorArgs } from ".";
import {
  ETaskType,
  TGroupSpamTask,
  TSendableMessage,
} from "@core/types/client";
import { delayFactory, sendMessage } from "../../utils/messagingUtils";
import { removeTaskFromQueue } from "../processor";
import { state } from "../../state";
import { logEvent } from "../../processApi/logEventTostate";

const { readDelay, typeDelay } = delayFactory();

export const spamToGroup = async ({
  client,
  task,
}: TTaskProcessorArgs<TGroupSpamTask>) => {
  const { spamGroupId } = task.payload;

  // pick random message from state.spamDb

  const messageIndex = Math.floor(Math.random() * state.spamDb.length);

  const tempMessageToSend = state.spamDb[messageIndex];

  const message: TSendableMessage = {
    ...tempMessageToSend,
    receiver: spamGroupId,
  };

  await typeDelay(client, message);
  try {
    const res = await sendMessage(client, message);
    console.log("res: ", res);
  } catch (error) {
    logEvent("ERROR_SPAM_TO_GROUP", JSON.stringify({ error, message, task }));
  }
  removeTaskFromQueue(task);
};
