import { BotEventTypes } from "../messagesTypes/bot-events";
import { accountListeners } from "./listeners/account.listeners";
import { infoListeners } from "./listeners/info.listeners";

export type TListener = {
  event_type: keyof typeof BotEventTypes;
  listener: (message: any) => void;
};
const listeners: TListener[] = [...infoListeners, ...accountListeners];

export const combinedListeners = listeners.reduce(
  (acc, { event_type, listener }) => {
    acc[event_type as any] = listener;
    return acc;
  },
  {} as Record<keyof typeof BotEventTypes, TListener["listener"]>
);
