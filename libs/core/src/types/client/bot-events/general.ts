import { BotEventTypes } from "./index";
import { TGenericMessage } from "../..";

export enum EGeneralBotEventTypes {
  LOG_EVENT = "LOG_EVENT",
}

export type TLogEvent = TGenericMessage<EGeneralBotEventTypes.LOG_EVENT> & {
  event_message: string;
  log_event: keyof typeof BotEventTypes;
  event_date: number;
};

export type TBotGeneralEvents = TLogEvent;
