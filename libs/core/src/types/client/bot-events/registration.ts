import { TGenericMessage } from "../..";
import { ERegistrationServerMessagesTypes } from "../../server";

export enum EregistrationMessagesTypes {
  "PHONE_CODE" = "PHONE_CODE",
  "PHONE_NUMBER" = "PHONE_NUMBER",
  "a2FA_CODE" = "a2FA_CODE",
}

export type TPhoneCode = TGenericMessage<
  EregistrationMessagesTypes.PHONE_CODE,
  ERegistrationServerMessagesTypes
>;

export type TPhoneNumber = TGenericMessage<
  EregistrationMessagesTypes.PHONE_NUMBER,
  ERegistrationServerMessagesTypes
>;

export type Ta2FA_CODE = TGenericMessage<
  EregistrationMessagesTypes.a2FA_CODE,
  ERegistrationServerMessagesTypes
>;

export type TRegistrationMessages = TPhoneCode | TPhoneNumber | Ta2FA_CODE;
