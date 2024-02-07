import { TAnyTaskPayload, TTask } from "@core/types/client";
import { state } from "../state";
import { uniqBy, uniqWith } from "lodash";

export const incrementTaskTries = (task: TTask) => {
  const taskTries = state.tasksTries[task.id] || 0;
  state.tasksTries[task.id] = taskTries + 1;
};

export const isTaskMaxTriesReached = (task: TTask) => {
  const taskTries = state.tasksTries[task.id] || 0;
  return taskTries >= 3;
};

export const removeTaskFromTries = (task: TTask) => {
  if (state.tasksTries[task.id] !== undefined) delete state.tasksTries[task.id];
};

const isSenderEqual = (payload: TAnyTaskPayload, payload2: TAnyTaskPayload) => {
  if ("senderId" in payload && "senderId" in payload2) {
    return payload.senderId.toString() === payload2.senderId.toString();
  }
  return false;
};

/*
    This function takes a list of tasks and arranges them by state.taskOrder
    It also dedupes tasks by senderId
    This is important because we don't want to send multiple messages to the same user in a row
*/
export const taskArranger = (tasks: TTask[]): TTask[] => {
  const dedupedTasks = taskDeduper(tasks);

  return taskSorter(dedupedTasks);
};

export const taskDeduper = (tasks: TTask[]): TTask[] =>
  uniqWith(tasks, (task1, task2) => {
    // check if payload null
    if (task1.payload === null || task2.payload === null) {
      return true;
    }

    if (
      "spamGroupIdString" in task1.payload &&
      "spamGroupIdString" in task2.payload
    ) {
      return (
        task1.payload.spamGroupIdString === task2.payload.spamGroupIdString
      );
    }
    if ("senderId" in task1.payload && "senderId" in task2.payload) {
      return (
        task1.payload.senderId.toString() === task2.payload.senderId.toString()
      );
    }
    return false;
  });

export const taskSorter = (tasks: TTask[]): TTask[] => {
  const { taskOrder } = state;

  const groupedTasks = taskOrder.reduce((acc, taskType) => {
    const tasksOfType = tasks.filter((t) => t.type === taskType);
    return [...acc, ...tasksOfType];
  }, [] as TTask[]);

  const tasksNotInTaskOrder = tasks.filter((t) => !taskOrder.includes(t.type));

  return [...groupedTasks, ...tasksNotInTaskOrder];
};
