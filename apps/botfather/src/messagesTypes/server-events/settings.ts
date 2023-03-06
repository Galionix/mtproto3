import { TGenericMessage } from "..";

export enum ESettingsMessageType {
  SET_USERNAME = "SET_USERNAME",
}

export type TSetUsernameMessage =
  TGenericMessage<ESettingsMessageType.SET_USERNAME> & {
    username: string;
  };

export type TSettingsMessage = TSetUsernameMessage;
