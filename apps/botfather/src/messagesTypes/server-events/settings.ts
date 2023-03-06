import { TGenericMessage } from "..";
import { usernameMessagesTypes } from "../bot-events/usernameChange";

export enum ESettingsMessageType {
  SET_USERNAME = "SET_USERNAME",
}

export type TSetUsernameMessage = TGenericMessage<
  ESettingsMessageType.SET_USERNAME,
  usernameMessagesTypes
> & {
  username: string;
};

export type TSettingsMessage = TSetUsernameMessage;
