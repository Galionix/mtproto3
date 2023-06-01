import { EIncomingInteractions } from "./IncomingInteractions";
import { EChatManageTypes, TChatManage } from "./chatManage";
import { EBotErrorTypes } from "./errors";
import { EGeneralBotEventTypes, TBotGeneralEvents } from "./general";
import { processMessagesTypes, TProcessMessages } from "./processMessages";
import {
  registrationMessagesTypes,
  TRegistrationMessages,
} from "./registration";
import { TUsernameMessages, usernameMessagesTypes } from "./usernameChange";

// ToServerMessage is common type for all messages from bot to server. It includes type definition with type field and
// various payloads
export type BotEvents =
  // | TRegistrationMessages
  TUsernameMessages | TProcessMessages | TChatManage | TBotGeneralEvents;

// ToServerMessagesTypes is a const enum with all possible types of messages from bot to server
export const BotEventTypes = {
  ...registrationMessagesTypes,
  ...usernameMessagesTypes,
  ...processMessagesTypes,
  ...EChatManageTypes,
  ...EGeneralBotEventTypes,
  ...EBotErrorTypes,
  ...EIncomingInteractions,
} as const;

export * from "./chatManage";
export * from "./processMessages";
export * from "./registration";
export * from "./usernameChange";
export * from "./sendAndWait";
export * from "./usernameChange";
export * from "./general";
export * from "./errors";
