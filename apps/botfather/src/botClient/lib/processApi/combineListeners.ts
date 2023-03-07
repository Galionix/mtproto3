import { TelegramClient } from "telegram";
// import { BotEvents } from '../../../messagesTypes/bot-events';
import { ServerEventTypes } from "../../../messagesTypes/server-events";

export interface IDefaultListenerArgs {
  client: TelegramClient;
}

type EventType = keyof typeof ServerEventTypes;

export type TListener = {
  event_type: keyof typeof ServerEventTypes;
  listener: (
    args: IDefaultListenerArgs
  ) => (...args: any) => Promise<void> | void;
};

export type TCombinedListeners = Record<EventType, TListener["listener"]>;

export const getCombinedListeners = (listeners: TListener[]) => {
  return listeners.reduce((acc, { event_type, listener }) => {
    acc[event_type as any] = listener;
    return acc;
  }, {} as TCombinedListeners);
};
