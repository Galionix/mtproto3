import { sendToFather } from "@core/functions";
import { BotEventTypes, TAnswer } from "@core/types/client";
import { EGetDatabaseResponseTypes } from "@core/types/server";
import { AnswerEntity } from "@core/types/server";
import { logEvent } from "../processApi/logEventTostate";
import { state } from "../state";

// const temporaryJsonBracketInverter = (json: string): string => {
//   return json.replace(/'/g, '"');
// };

export function readDb(db: AnswerEntity[]): {
  dmDb: TAnswer[];
  groupDb: TAnswer[];
  channelDb: TAnswer[];
} {
  const dmDb: TAnswer[] = [];
  const groupDb: TAnswer[] = [];
  const channelDb: TAnswer[] = [];
  db.forEach((answer) => {
    if (answer.isDmAnswer) {
      dmDb.push(answer);
    }
    if (answer.isGroupAnswer) {
      groupDb.push(answer);
    }
    if (answer.isChannelAnswer) {
      channelDb.push(answer);
    }
  });
  return { dmDb, groupDb, channelDb };
}

export async function readDbSequence({
  answers_db,
  spamDBname,
  dmScenarioNames,
}: {
  answers_db: string;
  spamDBname: string;
  dmScenarioNames: string[];
}) {
  const res = await sendToFather(process, {
    event_type: BotEventTypes.GET_DATABASE,
    database: answers_db,
    spamDBname: spamDBname,
    dmScenarioNames,
    response_types: [
      EGetDatabaseResponseTypes.DB_GET_ERROR,
      EGetDatabaseResponseTypes.DB_GET_SUCCESS,
    ],
  });

  if (res.event_type === EGetDatabaseResponseTypes.DB_GET_ERROR) {
    logEvent(BotEventTypes.ERROR, "db response error");
    // throw new Error("db response error");
    // process.exit(1);
  }

  if (res.event_type === EGetDatabaseResponseTypes.DB_GET_SUCCESS) {
    logEvent(BotEventTypes.LOG_EVENT, "db response success");

    try {
      const { db, spamDb, scenarios, replacements } = res;
      // console.log("spamDb: ", spamDb);

      const { dmDb, groupDb, channelDb } = readDb(db);

      state.dmDb = dmDb;
      state.replacements = JSON.parse(replacements);
      state.groupDb = groupDb;
      state.channelDb = channelDb;
      state.spamDb = spamDb;
      state.dmScenario = scenarios[0];
      console.log("state.replacements: ", state.replacements);
    } catch (error) {
      logEvent(BotEventTypes.ERROR, "db read error" + error.message);
      process.exit(1);
    }
  }
}
