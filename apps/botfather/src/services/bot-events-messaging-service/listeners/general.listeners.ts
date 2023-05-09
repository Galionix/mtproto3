import {
  BotEventTypes,
  TBotGeneralEvents,
  TGetDatabase,
} from "@core/types/client";
import { EGetDatabaseResponseTypes } from "@core/types/server";
import { TListenerArgs } from "../bot-events.service";

const { BOT_EVENT_LOG_MAX_SIZE } = process.env;

const MAX_LOG_SIZE = parseInt(BOT_EVENT_LOG_MAX_SIZE);

function listenLogEventToState({
  services,
  message,
  api_id,
}: TListenerArgs<TBotGeneralEvents>) {
  console.log("api_id: ", api_id);
  const { botStateService } = services;

  // first we need to check if event log is less than process.env.BOT_EVENT_LOG_MAX_SIZE
  // if it is, we just push new event to the end of the array
  // if it is not, we need to remove first element and push new event to the end of the array

  const botState = botStateService.getBotState(api_id);

  if (botState) {
    // const { eventLogs } = botState;

    // if (eventLogs.length >= parseInt(process.env.BOT_EVENT_LOG_MAX_SIZE)) {
    //   eventLogs.shift();
    // }
    // eventLogs.push(message);

    // using botStateService.updateBotState

    botStateService.updateBotState(api_id, {
      eventLogs: [...botState.eventLogs, message].slice(-MAX_LOG_SIZE),
    });
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
