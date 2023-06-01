import { TelegramClient } from "telegram";
// import { BotEvents } from '../../../messagesTypes/bot-events';
import { ServerEventTypes } from "@core/types/server";

export interface IDefaultListenerArgs {
  client: TelegramClient;
}

type EventType = keyof typeof ServerEventTypes;

export type TListener = {
  event_type: keyof typeof ServerEventTypes;
  listener: (
    args: IDefaultListenerArgs
  ) => ({ ...args }) => Promise<void> | void;
};

export type TCombinedListeners = Record<EventType, TListener["listener"]>;

export const getCombinedListeners = (listeners: TListener[]) => {
  return listeners.reduce((acc, { event_type, listener }) => {
    acc[event_type] = listener;
    return acc;
  }, {} as TCombinedListeners);
};
