import {
  ETaskType,
  TGroupJoinTask,
  TGroupLeaveTask,
  TGroupSpamTask,
  TRespondToDMMessage,
  TRespondToDMMessagePayload,
} from "@core/types/client";
import { v4 as uuid } from "uuid";
import { sendStateToFatherProcess, state } from "../state";

export const addDmTask = async ({
  senderId,
  message,
  step,
  count,
}: TRespondToDMMessagePayload) => {
  const task: TRespondToDMMessage = {
    id: uuid(),
    type: ETaskType.RESPOND_TO_DM_MESSAGE,
    date: Date.now(),
    payload: {
      step: step,
      message: message,
      senderId,
      count,
    },
  };
  state.tasks.push(task);
  sendStateToFatherProcess(state);
};

export const addJoinGroupTask = async ({
  joinGroupName,
}: {
  joinGroupName: string;
}) => {
  const task: TGroupJoinTask = {
    id: uuid(),
    type: ETaskType.GROUP_JOIN,
    date: Date.now(),
    payload: {
      joinGroupName,
    },
  };

  state.tasks.push(task);
  sendStateToFatherProcess(state);
};

export const addLeaveGroupTask = async ({
  groupName,
}: {
  groupName: string;
}) => {
  const task: TGroupLeaveTask = {
    id: uuid(),
    type: ETaskType.GROUP_LEAVE,
    date: Date.now(),
    payload: {
      leaveGroupName: groupName,
    },
  };

  state.tasks.push(task);
  sendStateToFatherProcess(state);
};

export const addGroupSpamTask = async ({
  spamGroupId,
}: {
  spamGroupId: bigInt.BigInteger;
}) => {
  const task: TGroupSpamTask = {
    id: uuid(),
    type: ETaskType.SPAM_TO_GROUP,
    date: Date.now(),
    payload: {
      spamGroupId,
      spamGroupIdString: spamGroupId.toString(),
    },
  };

  state.tasks.push(task);
  sendStateToFatherProcess(state);
};
