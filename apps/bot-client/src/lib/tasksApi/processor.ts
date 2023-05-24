import { ETaskType, TTask } from "@core/types/client";
import dmHandler from "../behaviour/dm/base";
import { TelegramClient } from "telegram";

export type TTaskProcessor = (
  task: TTask & {
    client: TelegramClient;
  }
) => Promise<void>;
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
