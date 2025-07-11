import { ETaskType, TTask } from "@core/types/client";
import { TelegramClient } from "telegram";
import { state } from "../state";
import { groupJoin } from "./subprocessors/groupJoin";
import { groupLeave } from "./subprocessors/groupLeave";
import { respondToDMMessage } from "./subprocessors/respondToDMMessage";
import { spamToGroup } from "./subprocessors/spamToGroup";
import { respondToUnreadDmMessage } from "./subprocessors/respondToUnreadDmMessage";
import {
  incrementTaskTries,
  isTaskMaxTriesReached,
  removeTaskFromTries,
} from "./taskArranger";
import { logEvent } from "../processApi/logEventTostate";
import { listGroups } from "./subprocessors/listGroups";
import { respondToGroupMessage } from "./subprocessors/respondToGroupMessage";

export type TTaskProcessor = (
  task: TTask,
  client: TelegramClient
) => Promise<true>;

export const taskProcessor: TTaskProcessor = async (task, client) => {
  console.time("taskProcessor: " + task?.id);
  const { payload } = task;

  incrementTaskTries(task);
  switch (task.type) {
    case ETaskType.RESPOND_TO_UNREAD_DM_MESSAGE:
      // list last chats
      await respondToUnreadDmMessage({ client, task });

      break;
    case ETaskType.RESPOND_TO_DM_MESSAGE:
      // console.log("processing dm message", payload);
      // here type guard is necessary
      // if ("step" in payload) {
      await respondToDMMessage({ client, task });
      // }
      break;

    case ETaskType.GROUP_JOIN:
      // if ("joinGroupName" in payload) {
      await groupJoin({ client, task });
      // }
      break;
    case ETaskType.GROUP_LEAVE:
      // if ("leaveGroupName" in payload) {
      await groupLeave({ client, task });
      // }
      break;

    case ETaskType.RESPOND_TO_GROUP_MESSAGE:
      await respondToGroupMessage({ client, task });
      break;
    case ETaskType.SPAM_TO_GROUP:
      // if ("spamGroupId" in payload) {
      await spamToGroup({ client, task });
      // }
      break;
    case ETaskType.LIST_GROUPS:
      await listGroups({ client, task });
      break;
    default:
      throw new Error(`Unknown task type`);
  }

  if (isTaskMaxTriesReached(task)) {
    logEvent("TASK_MAX_TRIES_REACHED", JSON.stringify(task));

    // removeTaskFromTries(task);
    removeTaskFromQueue(task);
  }
  // state.tasks = state.tasks.filter((t) => t.id !== task.id);

  // if (task.type === ETaskType.RESPOND_TO_DM_MESSAGE) {
  //   if ('step' in payload) {
  //     const task2 = task
  //     const dmMessageStep = payload.step;
  //     await dmHandler({ ...payload, client });
  //   }
  // }
  // if( task.type === ETaskType.RESPOND_TO_GROUP_MESSAGE){
  //   // await dmHandler({ ...payload, client });
  // }
  console.timeEnd("taskProcessor: " + task.id);
  return true;
};

// this is the main task processor
// it takes a task and processes it
// it is called from the main process after idle time
// first step is to arrange tasks by state.taskOrder
// some tasks need to be groupped or deduped
// this is responsibility of the taskArranger function

export function removeTaskFromQueue(task: TTask) {
  const { id } = task;
  removeTaskFromTries(task);

  state.tasks = state.tasks.filter((t) => t.id !== id);
}
