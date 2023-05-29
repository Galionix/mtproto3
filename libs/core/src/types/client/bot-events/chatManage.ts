import { TGenericMessage } from "../..";

export enum EChatManageTypes {
  CHAT_JOINED = "CHAT_JOINED",
  CHAT_LEFT = "CHAT_LEFT",
}

export type TChatJoined = TGenericMessage<EChatManageTypes.CHAT_JOINED> & {
  chatName: string;
};

export type TChatLeft = TGenericMessage<EChatManageTypes.CHAT_LEFT> & {
  chat_id: string;
};

export type TChatManage = TChatJoined | TChatLeft;
