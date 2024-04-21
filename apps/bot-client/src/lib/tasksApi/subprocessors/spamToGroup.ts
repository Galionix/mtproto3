import { client, Api } from "telegram";
import { TTaskProcessorArgs } from ".";
import {
  BotEventTypes,
  ETaskType,
  TGroupSpamTask,
  TSendableMessage,
} from "@core/types/client";
import { delayFactory, sendMessage } from "../../utils/messagingUtils";
import { removeTaskFromQueue } from "../processor";
import { state } from "../../state";
import { logEvent } from "../../processApi/logEventTostate";
import { addLeaveGroupTask } from "../addTask";
import { RPCError } from "telegram/errors";

const { readDelay, typeDelay } = delayFactory();

export const spamToGroup = async ({
  client,
  task,
}: TTaskProcessorArgs<TGroupSpamTask>) => {
  const { spamGroupId } = task.payload;
  console.log("spamGroupId: ", spamGroupId);

  // pick random message from state.spamDb

  const messageIndex = Math.floor(Math.random() * state.spamDb.length);
  console.log("messageIndex: ", messageIndex);

  const tempMessageToSend = state.spamDb[messageIndex];
  console.log("state.spamDb: ", state.spamDb);
  console.log("tempMessageToSend: ", tempMessageToSend);

  const message: TSendableMessage = {
    ...tempMessageToSend,
    receiver: spamGroupId,
  };

  await readDelay();
  await client.markAsRead(spamGroupId);
  await typeDelay(client, message, async (error: RPCError) => {
    logEvent("ERROR_SPAM_TO_GROUP", JSON.stringify({ error, message, task }));
    // check for USER_BANNED_IN_CHANNEL
    if (error.errorMessage.includes("USER_BANNED_IN_CHANNEL")) {
      const entity = await client.getEntity(spamGroupId);
      if (!("username" in entity)) return;
      addLeaveGroupTask({
        groupName: entity.username,
      });
    }
  });

  try {
    const res = await sendMessage(client, message);
    console.log("res: ", res);

    process.send({
      event_type: BotEventTypes.LIST_GROUPS,
      // should I pass here apiId?
      // botId: task.botId,
      groups: [
        {
          chat_id: `-100${spamGroupId.toString()}`,
          last_message_sent_at: new Date(),
        },
      ],
    });
  } catch (error) {
    logEvent("ERROR_SPAM_TO_GROUP", JSON.stringify({ error, message, task }));
  }
  removeTaskFromQueue(task);
};
