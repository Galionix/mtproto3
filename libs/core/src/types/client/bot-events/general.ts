import { BotEventTypes } from "./index";
import { TGenericMessage } from "../..";
import { StatisticEntity } from "../../server/entities/statistic.entity";

export enum EGeneralBotEventTypes {
  LOG_EVENT = "LOG_EVENT",
  STATISTICS = "STATISTICS",
}

export type TLogEvent = TGenericMessage<EGeneralBotEventTypes.LOG_EVENT> & {
  event_message: string;
  log_event: keyof typeof BotEventTypes;
  event_date: number;
};

type TStat = Omit<StatisticEntity, "id" | "api_id" | "date">;

export type TStatisticsEvent =
  TGenericMessage<EGeneralBotEventTypes.STATISTICS> & TStat;

export type TBotGeneralEvents = TLogEvent | TStatisticsEvent;
