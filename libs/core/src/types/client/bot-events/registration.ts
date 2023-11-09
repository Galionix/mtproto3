import { TGenericMessage } from "../..";
import { ERegistrationServerMessagesTypes } from "../../server";

export enum EregistrationMessagesTypes {
  "PHONE_CODE" = "PHONE_CODE",
  "PHONE_NUMBER" = "PHONE_NUMBER",
}

export type TPhoneCode = TGenericMessage<
  EregistrationMessagesTypes.PHONE_CODE,
  ERegistrationServerMessagesTypes
>;

export type TPhoneNumber = TGenericMessage<
  EregistrationMessagesTypes.PHONE_NUMBER,
  ERegistrationServerMessagesTypes
>;

export type TRegistrationMessages = TPhoneCode | TPhoneNumber;
