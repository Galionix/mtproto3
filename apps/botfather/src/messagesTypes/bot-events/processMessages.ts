import { TGenericMessage } from "..";

export enum processMessagesTypes {
  STARTED = "STARTED",
  STOPPED = "STOPPED",
  ERROR = "ERROR",
  SET_SESSION_STRING = "SET_SESSION_STRING",
}

type TStarted = TGenericMessage<processMessagesTypes.STARTED>;
type TStopped = TGenericMessage<processMessagesTypes.STOPPED>;
export type TBotErrorMessage = TGenericMessage<processMessagesTypes.ERROR> & {
  error: Error;
};
export type TSetSessionString =
  TGenericMessage<processMessagesTypes.SET_SESSION_STRING> & {
    sessionString: string;
  };

export type TProcessMessages =
  | TStarted
  | TStopped
  | TBotErrorMessage
  | TSetSessionString;
