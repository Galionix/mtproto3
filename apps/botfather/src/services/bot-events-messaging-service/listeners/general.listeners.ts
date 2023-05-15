import {
  BotEventTypes,
  TBotGeneralEvents,
  TGetDatabase,
  TLogEvent,
  TProcessMessages,
  TStatisticsEvent,
} from "@core/types/client";
import {
  EGetDatabaseResponseTypes,
  TGetDatabaseResponse,
} from "@core/types/server";
import { IServiceArgs, TListenerArgs } from "../bot-events.service";
import { ServerEventTypes } from "@core/types/server";
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

// type TListenerFunction<TBotRequestMessage, TServerResponse> = (
//   args: TListenerArgs<TBotRequestMessage>
// ) => Promise<TServerResponse>;

// function myListener<TBotRequestMessage, TServerResponse>(
//   listenerFunction: TListenerFunction<TBotRequestMessage, TServerResponse>
// ) {
//   return listenerFunction;
// }

// declare f
// get db listener

// declare function listenForBotToRequestDB<TBotRequestMessage, TServerResponse>(
//   args: TListenerArgs<TBotRequestMessage>
// ): Promise<TServerResponse>;

async function listenForBotToRequestDB({
  services,
  message,
  api_id,
}: TListenerArgs<TGetDatabase>): Promise<TGetDatabaseResponse> {
  // async function listenForBotToRequestDB({
  //   services,
  //   message,
  //   api_id,
  // }) {
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

  // const workFunction = async () => {
  //   const { answersRepositoryService, l } = services;

  //   const db = await answersRepositoryService.findSome({
  //     behavior_model: database,
  //   });

  //   l.log("bot requested db", api_id, message);

  //   return {
  //     db,
  //     // event_type: EGetDatabaseResponseTypes.DB_GET_SUCCESS,
  //   };
  // };

  // const processChainRes:TGetDatabaseResponse = await processChain(
  //   workFunction,
  //   EGetDatabaseResponseTypes.DB_GET_SUCCESS,
  //   EGetDatabaseResponseTypes.DB_GET_ERROR
  // );

  // return await processChain(
  //   workFunction,
  //   EGetDatabaseResponseTypes.DB_GET_SUCCESS,
  //   EGetDatabaseResponseTypes.DB_GET_ERROR
  // )
}

// type TWorkFunction<T> = () => Promise<T>;

// type TProcessChain<T> = (
//   workFunction: TWorkFunction<T>,
//   resolveType: T["event_type"],
//   rejectType: keyof typeof ServerEventTypes
// ) => object;

// async function processChain(
//   workFunction,
//   resolveType,
//   rejectType
// ):Promise<TProcessChain<TGetDatabaseResponse>> {
//   try {
//     const res = await workFunction();
//     return {
//       ...res,
//       event_type: resolveType,
//     };
//   } catch (error) {
//     return {
//       error,
//       event_type: rejectType,
//     };
//   }
// }

async function addStatisticsToDB({
  services,
  message,
  api_id,
}: TListenerArgs<TStatisticsEvent>) {
  const { answersRepositoryService, l } = services;

  const { type } = message;
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
  // TODO: add listener for statistics
];
