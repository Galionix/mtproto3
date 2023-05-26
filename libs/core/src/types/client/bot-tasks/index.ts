import { Api, TelegramClient } from "telegram";

export enum ETaskType {
  RESPOND_TO_DM_MESSAGE = "RESPOND_TO_DM_MESSAGE",
  RESPOND_TO_GROUP_MESSAGE = "RESPOND_TO_GROUP_MESSAGE",
  SPAM_TO_GROUP = "SPAM_TO_GROUP",
  GROUP_JOIN = "GROUP_JOIN",
  GROUP_LEAVE = "GROUP_LEAVE",
  RESPOND_1 = "RESPOND_1",
  RESPOND_2 = "RESPOND_2",
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
  payload: P;
};

export type TRespondToDMMessagePayload = {
  step: TAnyDMMessageStep;
  message: string;
  senderId: bigInt.BigInteger;
  count: number;
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
export type TTask = TRespondToDMMessage | TRespondToGroupMessage;

export type TTaskOrder = TAnyTaskType[];
