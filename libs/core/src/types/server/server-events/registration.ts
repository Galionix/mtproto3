import { TGenericMessage } from "../..";

export enum ERegistrationServerMessagesTypes {
  "PHONE_CODE_PROVIDED" = "PHONE_CODE_PROVIDED",
  "PHONE_NUMBER_PROVIDED" = "PHONE_NUMBER_PROVIDED",
  "ERROR" = "ERROR",
}

export type TPhoneCodeProvided =
  TGenericMessage<ERegistrationServerMessagesTypes.PHONE_CODE_PROVIDED> & {
    code: string;
  };

export type TPhoneNumberProvided =
  TGenericMessage<ERegistrationServerMessagesTypes.PHONE_NUMBER_PROVIDED> & {
    number: string;
  };

export type TError = TGenericMessage<ERegistrationServerMessagesTypes.ERROR> & {
  error: Error;
};

export type TRegistrationServerMessages =
  | TPhoneCodeProvided
  | TPhoneNumberProvided
  | TError;
