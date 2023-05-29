import { TAnyTaskPayload, TTask } from "@core/types/client";
import { state } from "../state";

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
  console.log("tasks: ", tasks);
  const { taskOrder } = state;

  // dedupe by senderId. if senderId is present, we only keep the newest task
  const dedupedTasks = tasks.reduce((acc, task) => {
    const isTaskPresent = acc.find((t) =>
      isSenderEqual(t.payload, task.payload)
    );

    const isIdPresent = acc.find((t) => t.id === task.id);

    if (isTaskPresent) {
      return acc.map((t) => {
        if (isSenderEqual(t.payload, task.payload)) {
          return task;
        }
        return t;
      });
    }
    if (!isIdPresent) {
      return [...acc, task];
    }
  }, [] as TTask[]);

  // group by taskOrder. if task type is not in taskOrder, we must add it to the end
  const groupedTasks = taskOrder.reduce((acc, taskType) => {
    const tasksOfType = dedupedTasks.filter((t) => t.type === taskType);
    return [...acc, ...tasksOfType];
  }, [] as TTask[]);

  const tasksNotInTaskOrder = dedupedTasks.filter(
    (t) => !taskOrder.includes(t.type)
  );

  return [...groupedTasks, ...tasksNotInTaskOrder];
};
