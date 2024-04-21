import {
  ETaskType,
  TGroupJoinTask,
  TGroupLeaveTask,
  TGroupSpamTask,
  TListGroupsTask,
  TRespondToDMMessage,
  TRespondToDMMessagePayload,
  TRespondToGroupMessage,
  TRespondToGroupMessagePayload,
  TRespondToUnreadMessageTask,
} from "@core/types/client";
import { v4 as uuid } from "uuid";
import { sendStateToFatherProcess, state } from "../state";

export const addDmTask = async ({
  senderId,
  message,
  originalMessageId,
}: TRespondToDMMessagePayload) => {
  const task: TRespondToDMMessage = {
    id: uuid(),
    type: ETaskType.RESPOND_TO_DM_MESSAGE,
    date: Date.now(),
    payload: {
      originalMessageId,
      message: message,
      senderId,
    },
  };
  state.tasks.push(task);
  sendStateToFatherProcess(state);
};
export const addGroupResponseTask = async ({
  message,
  channelIdString,
  replyTo,
  originalMessageId,
}: // chatId,
TRespondToGroupMessagePayload) => {
  const task: TRespondToGroupMessage = {
    id: uuid(),
    type: ETaskType.RESPOND_TO_GROUP_MESSAGE,
    date: Date.now(),
    payload: {
      message,
      channelIdString,
      replyTo,
      originalMessageId,
      // chatId,
    },
  };
  state.tasks.push(task);
  sendStateToFatherProcess(state);
};

export const addRespondToUnreadDmTask = async () => {
  const task: TRespondToUnreadMessageTask = {
    id: uuid(),
    type: ETaskType.RESPOND_TO_UNREAD_DM_MESSAGE,
    date: Date.now(),
    // payload: {},
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

export const listGroupsTask = async () => {
  const task: TListGroupsTask = {
    id: uuid(),
    type: ETaskType.LIST_GROUPS,
    date: Date.now(),
    payload: null,
  };

  state.tasks.push(task);
  sendStateToFatherProcess(state);
};