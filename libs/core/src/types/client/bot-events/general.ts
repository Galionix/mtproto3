import { BotEventTypes } from "./index";
import { TGenericMessage } from "../..";
import { StatisticEntity } from "../../server/entities/statistic.entity";
import { TState } from "../entities";

export enum EGeneralBotEventTypes {
  LOG_EVENT = "LOG_EVENT",
  STATISTICS = "STATISTICS",
  SEND_STATE_TO_SERVER = "SEND_STATE_TO_SERVER",
}

export type TLogEvent = TGenericMessage<EGeneralBotEventTypes.LOG_EVENT> & {
  event_message: string;
  log_event: keyof typeof BotEventTypes;
  event_date: number;
};

export type TSendStateToServer =
  TGenericMessage<EGeneralBotEventTypes.SEND_STATE_TO_SERVER> & {
    state: string;
  };

type TStat = Omit<StatisticEntity, "id" | "api_id" | "date">;

export type TStatisticsEvent =
  TGenericMessage<EGeneralBotEventTypes.STATISTICS> & TStat;

export type TBotGeneralEvents =
  | TLogEvent
  | TStatisticsEvent
  | TSendStateToServer;
