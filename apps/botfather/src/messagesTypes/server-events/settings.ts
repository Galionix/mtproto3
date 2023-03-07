import { TGenericMessage } from "..";
import { usernameMessagesTypes } from "../bot-events/usernameChange";

export enum ESettingsMessageType {
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
    chat_ids: string[];
    api_ids: number[];
    behaviour_model: string;
    processing_enabled: boolean;
    spam_frequency: number;
    join_delay: number;
  };

export type TLeaveGroupsMessage =
  TGenericMessage<ESettingsMessageType.LEAVE_GROUPS> & {
    group_ids: string[];
    leave_delay: number;
  };

export type TSettingsMessage =
  | TSetUsernameMessage
  | TJoinGroupsMessage
  | TLeaveGroupsMessage;
