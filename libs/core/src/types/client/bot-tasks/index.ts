import { Api, TelegramClient } from "telegram";

export enum ETaskType {
  RESPOND_TO_DM_MESSAGE = "RESPOND_TO_DM_MESSAGE",
  RESPOND_TO_GROUP_MESSAGE = "RESPOND_TO_GROUP_MESSAGE",
  SPAM_TO_GROUP = "SPAM_TO_GROUP",
  GROUP_JOIN = "GROUP_JOIN",
  GROUP_LEAVE = "GROUP_LEAVE",
}
export type TAnyTaskType = keyof typeof ETaskType;

export type TGenericTask<T extends ETaskType, P> = {
  id: string;
  type: T;
  date: number;
  payload: P;
};

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

export type TAnyDMMessageStep = keyof typeof EDMMessageStep;

export type TRespondToDMMessagePayload = {
  step: TAnyDMMessageStep;
  message: string;
  senderId: bigInt.BigInteger;
};

export type TRespondToDMMessage = TGenericTask<
  ETaskType.RESPOND_TO_DM_MESSAGE,
  TRespondToDMMessagePayload
>;

// type TRespondToGroupMessageTask = TGenericTask<ETaskType.RESPOND_TO_GROUP_MESSAGE> & {
export type TTask = TRespondToDMMessage;

export type TTaskOrder = TAnyTaskType[];


