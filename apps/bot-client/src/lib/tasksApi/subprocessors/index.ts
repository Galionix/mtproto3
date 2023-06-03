import { TTask } from "@core/types/client";
import { TelegramClient } from "telegram";

export type TTaskProcessorArgs<TaskType = TTask> = {
  task: TaskType;
  client: TelegramClient;
};
