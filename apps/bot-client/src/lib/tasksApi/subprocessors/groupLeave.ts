import { BotEventTypes, TGroupLeaveTask } from "@core/types/client";
import { logEvent } from "../../processApi/logEventTostate";
import { removeTaskFromQueue } from "../processor";
import { TTaskProcessorArgs } from ".";
import { Api } from "telegram";

export const groupLeave = async ({
  client,
  task,
}: TTaskProcessorArgs<TGroupLeaveTask>) => {
  const { leaveGroupName } = task.payload;

  const res = await client.invoke(
    new Api.channels.LeaveChannel({
      channel: leaveGroupName,
    })
  );
  console.log("res: ", res);

  logEvent(BotEventTypes.CHAT_LEFT, leaveGroupName);
  process.send({
    event_type: BotEventTypes.CHAT_LEFT,
    chatName: leaveGroupName,
  });
  removeTaskFromQueue(task);
};
