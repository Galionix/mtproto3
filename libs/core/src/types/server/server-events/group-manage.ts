import { TGenericMessage } from "../..";

export enum EServerGroupManageRequestTypes {
  GROUP_JOIN = "GROUP_JOIN",
  GROUP_LEAVE = "GROUP_LEAVE",
}

export type TGroupJoin =
  TGenericMessage<EServerGroupManageRequestTypes.GROUP_JOIN> & {
    groupNames: string[];
  };

export type TGroupLeave =
  TGenericMessage<EServerGroupManageRequestTypes.GROUP_LEAVE> & {
    groupNames: string[];
  };

export type TServerGroupManageRequests = TGroupJoin | TGroupLeave;
