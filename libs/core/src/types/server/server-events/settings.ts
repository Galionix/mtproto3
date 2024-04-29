import { TGenericMessage } from "../..";
import { usernameMessagesTypes } from "../../client";
// import { usernameMessagesTypes } from
export enum ESettingsMessageType {
  // GET_GENERAL_SETTINGS_SUCCESS = "GET_GENERAL_SETTINGS_SUCCESS",
  // GET_GENERAL_SETTINGS_ERROR = "GET_GENERAL_SETTINGS_ERROR",
  SET_PHOTO = "SET_PHOTO",
  REMOVE_PHOTOS = "REMOVE_PHOTOS",
  SET_USERNAME = "SET_USERNAME",
  JOIN_GROUPS = "JOIN_GROUPS",
  LEAVE_GROUPS = "LEAVE_GROUPS",
  SET_BIO = "SET_BIO",
  HIDE_PHONE_NUMBER = "HIDE_PHONE_NUMBER",
}

export type TSetUsernameMessage = TGenericMessage<
  ESettingsMessageType.SET_USERNAME,
  usernameMessagesTypes
> & {
  username: string;
};
export type THidePhoneNumberMessage =
  TGenericMessage<ESettingsMessageType.HIDE_PHONE_NUMBER>;

export type TSetBioMessage = TGenericMessage<ESettingsMessageType.SET_BIO> & {
  firstName: string;
  lastName: string;
  about: string;
};

export type TSetPhotoMessage =
  TGenericMessage<ESettingsMessageType.SET_PHOTO> & {
    photoName: string;
  };

export type TRemovePhotosMessage =
  TGenericMessage<ESettingsMessageType.REMOVE_PHOTOS>;
export type TJoinGroupsMessage = TGenericMessage<ESettingsMessageType.JOIN_GROUPS> & {
  chatNames: string[];
  botDbIds: string[];
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
  | TLeaveGroupsMessage
  | TSetPhotoMessage
  | TRemovePhotosMessage
  | TSetBioMessage
  | THidePhoneNumberMessage;
