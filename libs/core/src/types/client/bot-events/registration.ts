import { TGenericMessage } from "../..";

export enum registrationMessagesTypes {
  "PHONE_CODE" = "PHONE_CODE",
  "PHONE_NUMBER" = "PHONE_NUMBER",
}

export type TPhoneCode =
  TGenericMessage<registrationMessagesTypes.PHONE_CODE> & {
    code: string;
  };

export type TPhoneNumber =
  TGenericMessage<registrationMessagesTypes.PHONE_NUMBER> & {
    number: string;
  };

export type TRegistrationMessages = TPhoneCode | TPhoneNumber;
