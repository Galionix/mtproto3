import { TGenericMessage } from "../..";
import { usernameMessagesTypes } from "../../client";
// import { usernameMessagesTypes } from
export enum ESettingsMessageType {
  // GET_GENERAL_SETTINGS_SUCCESS = "GET_GENERAL_SETTINGS_SUCCESS",
  // GET_GENERAL_SETTINGS_ERROR = "GET_GENERAL_SETTINGS_ERROR",
  SET_USERNAME = "SET_USERNAME",
  JOIN_GROUPS = "JOIN_GROUPS",
  LEAVE_GROUPS = "LEAVE_GROUPS",
}

export type TSetUsernameMessage = TGenericMessage<
  ESettingsMessageType.SET_USERNAME,
  usernameMessagesTypes
> & {
  username: string;
};

export type TJoinGroupsMessage =
  TGenericMessage<ESettingsMessageType.JOIN_GROUPS> & {
    chatNames: string[];
    api_ids: number[];
    behavior_model: string;
    processing_enabled: boolean;
    spam_frequency: number;
    join_delay: number;
  };

export type TLeaveGroupsMessage =
  TGenericMessage<ESettingsMessageType.LEAVE_GROUPS> & {
    chatNames: string[];
  };

export type TSettingsMessage =
  | TSetUsernameMessage
  | TJoinGroupsMessage
  | TLeaveGroupsMessage;
