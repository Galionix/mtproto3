import { client, Api } from "telegram";
import { TTaskProcessorArgs } from ".";
import { TGroupSpamTask } from "@core/types/client";
import { delayFactory, sendMessage } from "../../utils/messagingUtils";
import { removeTaskFromQueue } from "../processor";
import { state } from "../../state";
import { TMessageEntity, TSendableMessage } from "@core/types/server";

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

  const res = await sendMessage(client, message);
  removeTaskFromQueue(task);
  console.log("res: ", res);
};
