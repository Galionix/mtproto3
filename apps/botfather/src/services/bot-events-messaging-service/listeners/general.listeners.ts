import {
  BotEventTypes,
  EMessageType,
  TGetDatabase,
  TLogEvent,
  TClientMessage,
  TSendStateToServer,
  TStatisticsEvent,
  TLogGlobal,
} from "@core/types/client";
import {
  AnswerEntity,
  EGetDatabaseResponseTypes,
  MessageEntity,
  ScenarioEntity,
  TGetDatabaseResponse,
} from "@core/types/server";
import { TListenerArgs } from "../bot-events.service";
import {
  messageTransformer,
  orderByIndexScenarioEntities,
} from "@core/functions";
// import { messageTransformer } from "./utils";
const { BOT_EVENT_LOG_MAX_SIZE } = process.env;

const MAX_LOG_SIZE = parseInt(BOT_EVENT_LOG_MAX_SIZE);

function listenLogEventToState({
  services,
  message,
  botDbId,
}: TListenerArgs<TLogEvent>) {
  const { botStateService } = services;

  // first we need to check if event log is less than process.env.BOT_EVENT_LOG_MAX_SIZE
  // if it is, we just push new event to the end of the array
  // if it is not, we need to remove first element and push new event to the end of the array

  const botState = botStateService.getBotState(botDbId);

  if (botState) {
    botStateService.updateBotState(botDbId, {
      eventLogs: [...botState.eventLogs, message].slice(-MAX_LOG_SIZE),
    });
  }
}

async function listenForBotToRequestDB({
  services,
  message,
  botDbId,
}: TListenerArgs<TGetDatabase>): Promise<TGetDatabaseResponse> {
  const { database, spamDBname, dmScenarioNames } = message;

  try {
    const {
      scenarioRepositoryService,
      answersRepositoryService,
      spamRepositoryService,
      botRepositoryService,
      l,
    } = services;
    // console.log("scenarioRepositoryService: ", scenarioRepositoryService);

    const bot = await botRepositoryService.findOne(botDbId);
    // const db = await answersRepositoryService.findByDbName(database);
    const spamDb = await spamRepositoryService.findByDbName(spamDBname);

    // get scenarios by ids containing in spamDb MessageEntities
    const scenarioIds = spamDb
      .map((message) => message.scenarioIdForSpam)
      .filter(Boolean);
    console.log("scenarioIds: ", scenarioIds);
    const spamScenarios = await scenarioRepositoryService.findAllByIds(
      scenarioIds
    );
    console.log("spamScenarios: ", spamScenarios);

    const scenarios = await scenarioRepositoryService.findAllByNames(
      dmScenarioNames
    );
    console.log("scenarios: ", scenarios);

    // TODO: query spamdb repos by spamDBname
    l.log("bot requested db", botDbId, message);

    return {
      event_type: EGetDatabaseResponseTypes.DB_GET_SUCCESS,
      // db,
      // spamDb: messageTransformer(spamDb),
      replacements: bot.replacements.replaceAll("\n", ""),
      db: [],
      spamScenarios,
      // transform MessageEntity[] to type TClientMessage[]
      spamDb: messageTransformer(spamDb),
      scenarios: scenarios,
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      event_type: EGetDatabaseResponseTypes.DB_GET_ERROR,
      error,
    };
  }
}

async function addStatisticsToDB({
  services,
  message,
  botDbId,
}: TListenerArgs<TStatisticsEvent>) {
  const { answersRepositoryService, l } = services;

  const { type } = message;
}

async function listenBotSyncState({
  services,
  message,
  botDbId,
}: TListenerArgs<TSendStateToServer>) {
  const { botRepositoryService, l } = services;

  const { state } = message;

  await botRepositoryService.updateClientState(botDbId, state);
}
async function listenGlobalLog({
  services,
  message,
  botDbId,
}: TListenerArgs<TLogGlobal>) {
  const { globalLogService, l } = services;

  const { event_message, log_event, details } = message;

  await globalLogService.create(
    {
      event_message,
      log_event,
      details: JSON.stringify(details, Object.getOwnPropertyNames(details)),
      botDbId,
    } as any
    // cant fix auto generated column error. it actually creates it but i dont know how to set types
  );
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
  //  LOG_GLOBAL
  {
    event_type: BotEventTypes.LOG_GLOBAL,
    listener: listenGlobalLog,
  },
  // {
  //   event_type: BotEventTypes.GET_GENERAL_SETTINGS,
  //   listener: listenBotToRequestGeneralSettings
  // }
];
