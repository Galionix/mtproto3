export enum inProcessMessagesTypes {
  "PHONE_CODE" = "PHONE_CODE",
  "PHONE_NUMBER" = "PHONE_NUMBER",
}

type TGenericInProcessMessage<T> = {
  type: T;
};

export type TPhoneCode =
  TGenericInProcessMessage<inProcessMessagesTypes.PHONE_CODE> & {
    code: string;
  };

export type TPhoneNumber =
  TGenericInProcessMessage<inProcessMessagesTypes.PHONE_NUMBER> & {
    number: string;
  };

export type TInProcessMessages = TPhoneCode | TPhoneNumber;
