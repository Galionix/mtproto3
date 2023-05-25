import { ETaskType, TTask } from "@core/types/client";
import dmHandler from "../behaviour/dm/base";
import { TelegramClient } from "telegram";

export type TTaskProcessor = (
  task: TTask & {
    client: TelegramClient;
  }
) => Promise<void>;


// this is the main task processor
// it takes a task and processes it
// it is called from the main process after idle time
// first step is to arrange tasks by state.taskOrder
// some tasks need to be groupped or deduped
// this is responsibility of the taskArranger function
export const taskProcessor: TTaskProcessor = async (task) => {
  const { payload, client } = task;
  switch (task.type) {
    case ETaskType.RESPOND_TO_DM_MESSAGE:
      await dmHandler({ ...payload, client });
      break;
    default:
      throw new Error(`Unknown task type: ${task.type}`);
  }
};
