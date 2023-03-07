import { BotEventTypes } from "../messagesTypes/bot-events";

export type TListener = {
  event_type: keyof typeof BotEventTypes;
  listener: (message: any) => void;
};

export const listeners: TListener[] = [];
