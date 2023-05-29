// ToServerMessage is common type for all messages from bot to server. It includes type definition with type field and

import { EGetDatabaseResponseTypes, TGetDatabaseResponse } from './db-events';
import { ESettingsMessageType, TSettingsMessage } from "./settings";
import { EServerGroupManageRequestTypes } from "./group-manage";
// various payloads
export type ServerEvents = TSettingsMessage | TGetDatabaseResponse;

// ToServerMessagesTypes is a const enum with all possible types of messages from bot to server
export const ServerEventTypes = {
  ...ESettingsMessageType,
  ...EGetDatabaseResponseTypes,
  ...EServerGroupManageRequestTypes,
} as const;

// @index('./*', f => `export * from '${f.path}'`)
export * from "./db-events";
export * from "./group-manage";
export * from './settings'
// @endindex