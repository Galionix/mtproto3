import { EDMMessageStep, ETaskType, TTask } from "@core/types/client";
import dmHandler from "../behaviour/dm/base";
import { TelegramClient } from "telegram";
import { delayFactory } from "../utils/messagingUtils";
import scenarioHandler from "../behaviour/dm/scenarioHandler";
import { state } from "../state";

export type TTaskProcessor = (
  task: TTask,
  client: TelegramClient
) => Promise<true>;
const { readDelay, typeDelay } = delayFactory();

export const taskProcessor: TTaskProcessor = async (task, client) => {
  console.time("taskProcessor: " + task.id);
  const { payload } = task;
  console.log("taskProcessor", task);

  switch (task.type) {
    case ETaskType.RESPOND_TO_DM_MESSAGE:
      console.log("processing dm message", payload);
      // here type guard is necessary
      if ("step" in payload) {
        const { step, message, senderId, count } = payload;
        await readDelay();
        // we cant use await message.markAsRead() because its not reproducable by params
        await client.markAsRead(payload.senderId);

        await typeDelay(client, message, senderId);

        if (step === EDMMessageStep.FINISHED) {
          await dmHandler({
            step,
            message,
            client,
            senderId,
            count,
          });
        } else {
          await scenarioHandler({ count });
        }
      }
      break;
    case ETaskType.RESPOND_TO_GROUP_MESSAGE:
      break;
    default:
      throw new Error(`Unknown task type`);
  }

  state.tasks = state.tasks.filter((t) => t.id !== task.id);

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
