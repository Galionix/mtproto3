import bigInt from "big-integer";
import { GroupEntity, MessageEntity } from "../../server";

export enum ETaskType {
  RESPOND_TO_DM_MESSAGE = "RESPOND_TO_DM_MESSAGE",
  RESPOND_TO_GROUP_MESSAGE = "RESPOND_TO_GROUP_MESSAGE",
  SPAM_TO_GROUP = "SPAM_TO_GROUP",
  GROUP_JOIN = "GROUP_JOIN",
  GROUP_LEAVE = "GROUP_LEAVE",
  RESPOND_TO_UNREAD_DM_MESSAGE = "RESPOND_TO_UNREAD_DM_MESSAGE",
  LIST_GROUPS = "LIST_GROUPS",
}
export type TAnyTaskType = keyof typeof ETaskType;

export enum EDMMessageStep {
  // INITIAL - user just started conversation with bot
  INITIAL = "INITIAL",
  // STEP_1 - execute scenario step 1
  STEP_1 = "STEP_1",
  // STEP_2 - execute scenario step 2
  STEP_2 = "STEP_2",
  // ...
  STEP_3 = "STEP_3",
  STEP_4 = "STEP_4",
  STEP_5 = "STEP_5",
  STEP_6 = "STEP_6",
  STEP_7 = "STEP_7",
  STEP_8 = "STEP_8",
  STEP_9 = "STEP_9",
  STEP_10 = "STEP_10",
  // FINISHED - scenario is finished. Free chatting!
  FINISHED = "FINISHED",
}

export const EDMMessageStepValues = Object.values(EDMMessageStep);

export type TAnyDMMessageStep = keyof typeof EDMMessageStep;

export type TGenericTask<T extends ETaskType, P> = {
  id: string;
  type: T;
  date: number;
  payload?: P;
};

export type TRespondToDMMessagePayload = {
  message: MessageEntity;
  senderId: bigInt.BigInteger;
  originalMessageId: number;
};

export interface TRespondToDMMessage {
  id: string;
  type: ETaskType.RESPOND_TO_DM_MESSAGE;
  date: number;
  payload: TRespondToDMMessagePayload;
}

export type TRespondToGroupMessagePayload = {
  message: string;
  senderId: bigInt.BigInteger;
  chatId: bigInt.BigInteger;
};

// export type TRespondToGroupMessage = TGenericTask<
//   ETaskType.RESPOND_TO_GROUP_MESSAGE,
//   TRespondToGroupMessagePayload
// >;
export interface TRespondToGroupMessage {
  id: string;

  type: ETaskType.RESPOND_TO_GROUP_MESSAGE;
  date: number;
  payload: TRespondToGroupMessagePayload;
}

export type TGroupJoinTaskPayload = {
  joinGroupName: string;
};

export type TGroupJoinTask = TGenericTask<
  ETaskType.GROUP_JOIN,
  TGroupJoinTaskPayload
>;

export type TGroupLeaveTaskPayload = {
  leaveGroupName: string;
};

export type TGroupLeaveTask = TGenericTask<
  ETaskType.GROUP_LEAVE,
  TGroupLeaveTaskPayload
>;

export type TRespondToUnread = TGenericTask<
  ETaskType.RESPOND_TO_UNREAD_DM_MESSAGE,
  null
>;
export interface TRespondToUnreadMessageTask {
  id: string;
  type: ETaskType.RESPOND_TO_UNREAD_DM_MESSAGE;
  date: number;
}
export type TGroupSpamTaskPayload = {
  spamGroupId: bigInt.BigInteger;
  spamGroupIdString: string;
};

export type TGroupSpamTask = TGenericTask<
  ETaskType.SPAM_TO_GROUP,
  TGroupSpamTaskPayload
>;

// LIST_GROUPS
export type TListGroupsTask = TGenericTask<ETaskType.LIST_GROUPS, null>;

export type TListGroupsPayload = {
  groups: Partial<GroupEntity>[];
};

export type TListGroupsResponse = TGenericTask<
  ETaskType.LIST_GROUPS,
  TListGroupsPayload
>;

export type TTask =
  | TRespondToDMMessage
  | TRespondToGroupMessage
  | TGroupJoinTask
  | TGroupLeaveTask
  | TGroupSpamTask
  | TRespondToUnread
  | TListGroupsTask;

export type TTaskOrder = TAnyTaskType[];

export type TAnyTaskPayload =
  | TGroupLeaveTaskPayload
  | TGroupJoinTaskPayload
  | TRespondToGroupMessagePayload
  | TRespondToDMMessagePayload
  | TGroupSpamTaskPayload
  | null
  | TListGroupsPayload;
