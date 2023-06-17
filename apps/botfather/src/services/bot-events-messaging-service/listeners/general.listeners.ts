import {
  BotEventTypes,
  EMessageType,
  TGetDatabase,
  TLogEvent,
  TClientMessage,
  TSendStateToServer,
  TStatisticsEvent,
} from "@core/types/client";
import {
  EGetDatabaseResponseTypes,
  TGetDatabaseResponse,
} from "@core/types/server";
import { TListenerArgs } from "../bot-events.service";
import { messageTranformer } from "./utils";
const { BOT_EVENT_LOG_MAX_SIZE } = process.env;

const MAX_LOG_SIZE = parseInt(BOT_EVENT_LOG_MAX_SIZE);

function listenLogEventToState({
  services,
  message,
  api_id,
}: TListenerArgs<TLogEvent>) {
  const { botStateService } = services;

  // first we need to check if event log is less than process.env.BOT_EVENT_LOG_MAX_SIZE
  // if it is, we just push new event to the end of the array
  // if it is not, we need to remove first element and push new event to the end of the array

  const botState = botStateService.getBotState(api_id);

  if (botState) {
    botStateService.updateBotState(api_id, {
      eventLogs: [...botState.eventLogs, message].slice(-MAX_LOG_SIZE),
    });
  }
}

async function listenForBotToRequestDB({
  services,
  message,
  api_id,
}: TListenerArgs<TGetDatabase>): Promise<TGetDatabaseResponse> {
  const { database, spamDBname } = message;

  try {
    const { answersRepositoryService, spamRepositoryService, l } = services;

    const db = await answersRepositoryService.findSome({
      db_name: database,
    });
    const spamDb = await spamRepositoryService.findSome({
      db_name: spamDBname,
    });

    // TODO: query spamdb repos by spamDBname
    l.log("bot requested db", api_id, message);

    return {
      event_type: EGetDatabaseResponseTypes.DB_GET_SUCCESS,
      db,
      spamDb: messageTranformer(spamDb),
    };
  } catch (error) {
    return {
      event_type: EGetDatabaseResponseTypes.DB_GET_ERROR,
      error,
    };
  }
}

async function addStatisticsToDB({
  services,
  message,
  api_id,
}: TListenerArgs<TStatisticsEvent>) {
  const { answersRepositoryService, l } = services;

  const { type } = message;
}

async function listenBotSyncState({
  services,
  message,
  api_id,
}: TListenerArgs<TSendStateToServer>) {
  const { botRepositoryService, l } = services;

  const { state } = message;

  await botRepositoryService.updateClientState(api_id, state);
}

// async function listenBotToRequestGeneralSettings({
//   services,
//   message,
//   api_id,
// }: TListenerArgs<TGetDatabase>) {
//   const { botRepositoryService, l } = services;

//   const bot = await botRepositoryService.findOne(api_id);

//   if (bot) {
//     return {
//       event_type: ServerEventTypes.GET_GENERAL_SETTINGS_SUCCESS,
//       settings: bot
//     }
//   }

//   return {
//     event_type: ServerEventTypes.GET_GENERAL_SETTINGS_ERROR,
//     error: "bot not found"
//   }
// }


export const generalListeners = [
  {
    event_type: BotEventTypes.LOG_EVENT,
    listener: listenLogEventToState,
  },
  {
    event_type: BotEventTypes.GET_DATABASE,
    listener: listenForBotToRequestDB,
  },
  // TODO: add listener for statistics
  {
    event_type: BotEventTypes.SEND_STATE_TO_SERVER,
    listener: listenBotSyncState,
  },
  // {
  //   event_type: BotEventTypes.GET_GENERAL_SETTINGS,
  //   listener: listenBotToRequestGeneralSettings
  // }
];
