import { TTask } from "@core/types/client";
import { state } from "../state";

const isSenderEqual = (
  senderId: bigInt.BigInteger,
  senderId2: bigInt.BigInteger
) => {
  return senderId.toString() === senderId2.toString();
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
      isSenderEqual(t.payload.senderId, task.payload.senderId)
    );

    if (isTaskPresent) {
      return acc.map((t) => {
        if (isSenderEqual(t.payload.senderId, task.payload.senderId)) {
          return task;
        }
        return t;
      });
    } else {
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
