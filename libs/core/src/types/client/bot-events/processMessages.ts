import { TGenericMessage } from "../..";
import { EGetDatabaseResponseTypes } from "../../server";

export enum processMessagesTypes {
  STARTED = "STARTED",
  STOPPED = "STOPPED",
  ERROR = "ERROR",
  SET_SESSION_STRING = "SET_SESSION_STRING",

  GET_DATABASE = "GET_DATABASE",
}

type TStarted = TGenericMessage<processMessagesTypes.STARTED>;
type TStopped = TGenericMessage<processMessagesTypes.STOPPED>;

export type TGetDatabase = TGenericMessage<
  processMessagesTypes.GET_DATABASE,
  EGetDatabaseResponseTypes
> & {
  database: string;
};
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
  | TSetSessionString
  | TGetDatabase;

const databaseAction: TGetDatabase = {
  event_type: processMessagesTypes.GET_DATABASE,
  response_types: [
    EGetDatabaseResponseTypes.DB_GET_SUCCESS,
    EGetDatabaseResponseTypes.DB_GET_ERROR,
  ],
  database: "",
};
