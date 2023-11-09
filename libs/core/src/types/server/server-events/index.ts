import { EGetDatabaseResponseTypes, TGetDatabaseResponse } from "./db-events";
import { ESettingsMessageType, TSettingsMessage } from "./settings";
import { EServerGroupManageRequestTypes } from "./group-manage";
import {
  ERegistrationServerMessagesTypes,
  TRegistrationServerMessages,
} from "./registration";
// various payloads
export type ServerEvents =
  | TSettingsMessage
  | TGetDatabaseResponse
  | TRegistrationServerMessages;

// ToServerMessagesTypes is a const enum with all possible types of messages from bot to server
export const ServerEventTypes = {
  ...ESettingsMessageType,
  ...EGetDatabaseResponseTypes,
  ...EServerGroupManageRequestTypes,
  ...ERegistrationServerMessagesTypes,
} as const;

// @index('./*', f => `export * from '${f.path}'`)
export * from "./db-events";
export * from "./group-manage";
export * from "./registration";
export * from "./settings";
// @endindex
