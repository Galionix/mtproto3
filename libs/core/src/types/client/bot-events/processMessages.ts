import { TGenericMessage } from "../..";
import { EGetDatabaseResponseTypes } from "../../server";

export enum processMessagesTypes {
  STARTED = "STARTED",
  STOPPED = "STOPPED",
  ERROR = "ERROR",
  SET_SESSION_STRING = "SET_SESSION_STRING",

  GET_DATABASE = "GET_DATABASE",
  // GET_GENERAL_SETTINGS = "GET_GENERAL_SETTINGS",
  GET_SPAM_DATABASE = "GET_SPAM_DATABASE",
  LIST_GROUPS = "LIST_GROUPS",
}

type TStarted = TGenericMessage<processMessagesTypes.STARTED>;
type TStopped = TGenericMessage<processMessagesTypes.STOPPED>;
// type TGetGeneralSettings = TGenericMessage<
//   processMessagesTypes.GET_GENERAL_SETTINGS
// >;

export type TGetDatabase = TGenericMessage<
  processMessagesTypes.GET_DATABASE,
  EGetDatabaseResponseTypes
> & {
  database: string;
  spamDBname: string;
  dmScenarioNames: string[];
};

export type TGetSpamDatabase = TGenericMessage<
  processMessagesTypes.GET_SPAM_DATABASE,
  EGetDatabaseResponseTypes
> & {
  database: string;
  spamDBname: string;
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
  | TGetDatabase
  | TGetSpamDatabase;

