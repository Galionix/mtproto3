import { TGenericMessage } from "..";

export enum usernameMessagesTypes {
  "USERNAME_NOT_AVAILABLE" = "USERNAME_NOT_AVAILABLE",
  "USERNAME_SET" = "USERNAME_SET",
}

type TUsernameUnavailable =
  TGenericMessage<usernameMessagesTypes.USERNAME_NOT_AVAILABLE>;

type TUsernameSet = TGenericMessage<usernameMessagesTypes.USERNAME_SET> & {
  username: string;
};

export type TUsernameMessages = TUsernameUnavailable | TUsernameSet;
