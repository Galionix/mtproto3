import { EIncomingInteractions } from "./IncomingInteractions";
import { EChatManageTypes, TChatManage } from "./chatManage";
import { EBotErrorTypes } from "./errors";
import { EGeneralBotEventTypes, TBotGeneralEvents } from "./general";
import { TProcessMessages, processMessagesTypes } from "./processMessages";
import {
  EregistrationMessagesTypes,
  TRegistrationMessages,
} from "./registration";
import { TUsernameMessages, usernameMessagesTypes } from "./usernameChange";
// ./account-reg-Events
import { TAccRegistrationRequests } from "./account-reg-Events";
// BotEvents is common type for all messages from bot to server. It includes type definition with type field and
// various payloads
export type BotEvents =
  // | TRegistrationMessages
  | TUsernameMessages
  | TProcessMessages
  | TChatManage
  | TBotGeneralEvents
  | TRegistrationMessages
  | TAccRegistrationRequests

// BotEventTypes is a const enum with all possible types of messages from bot to server
export const BotEventTypes = {
  ...EregistrationMessagesTypes,
  ...usernameMessagesTypes,
  ...processMessagesTypes,
  ...EChatManageTypes,
  ...EGeneralBotEventTypes,
  ...EBotErrorTypes,
  ...EIncomingInteractions,
} as const;

export * from "./chatManage";
export * from "./account-reg-Events";
export * from "./chatManage";
export * from "./errors";
export * from "./general";
export * from "./processMessages";
export * from "./registration";
// export * from "./sendAndWait";
export * from "./usernameChange";

