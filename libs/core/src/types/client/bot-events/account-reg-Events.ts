import { TGenericMessage } from "../..";

export enum RegistrationEventTypes {
  // requesting code
  REQUEST_CODE = "REQUEST_CODE",
}

export enum RegistrationResponseTypes {
  // response with code
  RESPONSE_CODE = "RESPONSE_CODE",
}

/*
type TUsernameUnavailable =
  TGenericMessage<usernameMessagesTypes.USERNAME_NOT_AVAILABLE>;
*/
export type TRequestCode = TGenericMessage<RegistrationEventTypes.REQUEST_CODE>;

export type TResponseCode =
  TGenericMessage<RegistrationResponseTypes.RESPONSE_CODE> & {
    code: string;
  };

export type TAccRegistrationRequests = TRequestCode;
export type TAccRegistrationResponses = TResponseCode;
