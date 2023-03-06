import { processMessagesTypes, TProcessMessages } from "./processMessages";
import {
  registrationMessagesTypes,
  TRegistrationMessages,
} from "./registration";
import { TUsernameMessages, usernameMessagesTypes } from "./usernameChange";

// ToServerMessage is common type for all messages from bot to server. It includes type definition with type field and
// various payloads
export type BotEvents =
  | TRegistrationMessages
  | TUsernameMessages
  | TProcessMessages;

// ToServerMessagesTypes is a const enum with all possible types of messages from bot to server
export const BotEventTypes = {
  ...registrationMessagesTypes,
  ...usernameMessagesTypes,
  ...processMessagesTypes,
} as const;
