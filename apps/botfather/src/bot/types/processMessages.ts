export enum processMessagesTypes {
  STARTED = "STARTED",
  STOPPED = "STOPPED",
  ERROR = "ERROR",
}

type TGenericMessage<T> = {
  type: T;
  identity: TBotIdentity;
};

type TBotIdentity = {
  id: string;
  api_id: number;
};

type TStarted = TGenericMessage<processMessagesTypes.STARTED>;
type TStopped = TGenericMessage<processMessagesTypes.STOPPED>;
type TError = TGenericMessage<processMessagesTypes.ERROR> & {
  error: Error;
};

export type TProcessMessages = TStarted | TStopped | TError;
