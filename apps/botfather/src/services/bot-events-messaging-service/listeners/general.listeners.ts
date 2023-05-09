import {
  BotEventTypes,
  TBotGeneralEvents,
  TGetDatabase,
  TProcessMessages,
} from "@core/types/client";
import { TListenerArgs } from "../bot-events.service";
import { EGetDatabaseResponseTypes } from "@core/types/server";

function listenLogEventToState({
  services,
  message,
  api_id,
}: TListenerArgs<TBotGeneralEvents>) {
  const { botStateService } = services;

  // first we need to check if event log is less than process.env.BOT_EVENT_LOG_MAX_SIZE
  // if it is, we just push new event to the end of the array
  // if it is not, we need to remove first element and push new event to the end of the array

  const botState = botStateService.getBotState(api_id);

  if (botState) {
    const { eventLogs } = botState;

    if (eventLogs.length >= parseInt(process.env.BOT_EVENT_LOG_MAX_SIZE)) {
      eventLogs.shift();
    }
    eventLogs.push(message);
  }
}

// get db listener
async function listenForBotToRequestDB({
  services,
  message,
  api_id,
}: TListenerArgs<TGetDatabase>) {
  const { database } = message;

  try {
    const { answersRepositoryService, l } = services;

    const db = await answersRepositoryService.findSome({
      behavior_model: database,
    });

    l.log("bot requested db", api_id, message);

    return {
      event_type: EGetDatabaseResponseTypes.DB_GET_SUCCESS,
      db,
    };
  } catch (error) {
    return {
      event_type: EGetDatabaseResponseTypes.DB_GET_ERROR,
      error,
    };
  }
}

export const generalListeners = [
  {
    event_type: BotEventTypes.LOG_EVENT,
    listener: listenLogEventToState,
  },
  {
    event_type: BotEventTypes.GET_DATABASE,
    listener: listenForBotToRequestDB,
  },
];
