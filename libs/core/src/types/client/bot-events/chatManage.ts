import { TGenericMessage } from "../..";
import { GroupEntity } from "../../server";

export enum EChatManageTypes {
  CHAT_JOINED = "CHAT_JOINED",
  CHAT_LEFT = "CHAT_LEFT",
  LIST_GROUPS = "LIST_GROUPS",
}

export type TChatJoined = TGenericMessage<EChatManageTypes.CHAT_JOINED> & {
  chatName: string;
};

export type TChatLeft = TGenericMessage<EChatManageTypes.CHAT_LEFT> & {
  chat_id: string;
};

export type TListGroups = TGenericMessage<EChatManageTypes.LIST_GROUPS> & {
  groups: GroupEntity[];
};

export type TChatManage = TChatJoined | TChatLeft | TListGroups;
