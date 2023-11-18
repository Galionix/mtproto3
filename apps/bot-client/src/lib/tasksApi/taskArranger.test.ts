import { EDMMessageStep, ETaskType, TTask } from "@core/types/client";
import { taskDeduper } from "./taskArranger";
import bigInt from "big-integer";

describe("taskDeduper", () => {
  it("should deduplicate tasks based on payload properties", () => {
    const tasks: TTask[] = [
      {
        id: "123",
        type: ETaskType.RESPOND_TO_DM_MESSAGE,
        date: 123,
        payload: {
          step: "FINISHED",
          message: "abc123",
          senderId: bigInt(1),
          count: 1,
        },
      },
      {
        id: "456",
        type: ETaskType.RESPOND_TO_DM_MESSAGE,
        date: 456,
        payload: {
          step: "FINISHED",
          message: "abc123",
          senderId: bigInt(1),
          count: 2,
        },
      },
      {
        id: "789",
        type: ETaskType.RESPOND_TO_DM_MESSAGE,
        date: 789,
        payload: {
          step: "FINISHED",
          message: "def456",
          senderId: bigInt(2),
          count: 1,
        },
      },
      {
        id: "abc",
        type: ETaskType.SPAM_TO_GROUP,
        date: 987,
        payload: {
          spamGroupId: bigInt(2),
          spamGroupIdString: "abc123",
        },
      },
    ];

    const deduplicatedTasks = taskDeduper(tasks);

    expect(deduplicatedTasks).toEqual([
      {
        id: "123",
        type: ETaskType.RESPOND_TO_DM_MESSAGE,
        date: 123,
        payload: {
          step: "FINISHED",
          message: "abc123",
          senderId: bigInt(1),
          count: 1,
        },
      },
      {
        id: "789",
        type: ETaskType.RESPOND_TO_DM_MESSAGE,
        date: 789,
        payload: {
          step: "FINISHED",
          message: "def456",
          senderId: bigInt(2),
          count: 1,
        },
      },
      {
        id: "abc",
        type: ETaskType.SPAM_TO_GROUP,
        date: 987,
        payload: {
          spamGroupId: bigInt(2),
          spamGroupIdString: "abc123",
        },
      },
    ]);
  });

  it("should return the same tasks if no duplicates are found", () => {
    const tasks: TTask[] = [
      {
        id: "123",
        type: ETaskType.RESPOND_TO_DM_MESSAGE,
        date: 123,
        payload: {
          step: "FINISHED",
          message: "abc123",
          senderId: bigInt(1),
          count: 1,
        },
      },
      {
        id: "789",
        type: ETaskType.RESPOND_TO_DM_MESSAGE,
        date: 789,
        payload: {
          step: "FINISHED",
          message: "def456",
          senderId: bigInt(2),
          count: 1,
        },
      },
      {
        id: "abc",
        type: ETaskType.SPAM_TO_GROUP,
        date: 987,
        payload: {
          spamGroupId: bigInt(2),
          spamGroupIdString: "abc123",
        },
      },
    ];

    const deduplicatedTasks = taskDeduper(tasks);

    expect(deduplicatedTasks).toEqual(tasks);
  });
});
