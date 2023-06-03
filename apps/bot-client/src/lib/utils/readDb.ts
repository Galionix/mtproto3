import { sendToFather } from "@core/functions";
import { BotEventTypes, TAnswer } from "@core/types/client";
import { EGetDatabaseResponseTypes } from "@core/types/server";
import { AnswerEntity } from "@core/types/server";
import { logEvent } from "../processApi/logEventTostate";
import { state } from "../state";

const temporaryJsonBracketInverter = (json: string): string => {
  return json.replace(/'/g, '"');
};

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
      dmDb.push({
        description: answer.description,
        request: answer.request,
        response: JSON.parse(temporaryJsonBracketInverter(answer.response)),
        base_probability: answer.base_probability,
        behavior_model: answer.behavior_model,
      });
    }
    if (answer.isGroupAnswer) {
      groupDb.push({
        description: answer.description,
        request: answer.request,
        response: JSON.parse(temporaryJsonBracketInverter(answer.response)),
        base_probability: answer.base_probability,
        behavior_model: answer.behavior_model,
      });
    }
    if (answer.isChannelAnswer) {
      channelDb.push({
        description: answer.description,
        request: answer.request,
        response: JSON.parse(temporaryJsonBracketInverter(answer.response)),
        base_probability: answer.base_probability,
        behavior_model: answer.behavior_model,
      });
    }
  });
  return { dmDb, groupDb, channelDb };
}

export async function readDbSequence({
  answers_db,
  spamDBname,
}: {
  answers_db: string;
  spamDBname: string;
}) {
  const res = await sendToFather(process, {
    event_type: BotEventTypes.GET_DATABASE,
    database: answers_db,
    spamDBname: spamDBname,
    response_types: [
      EGetDatabaseResponseTypes.DB_GET_ERROR,
      EGetDatabaseResponseTypes.DB_GET_SUCCESS,
    ],
  });

  if (res.event_type === EGetDatabaseResponseTypes.DB_GET_ERROR) {
    logEvent(BotEventTypes.ERROR, "db response error");
    process.exit(1);
  }

  if (res.event_type === EGetDatabaseResponseTypes.DB_GET_SUCCESS) {
    logEvent(BotEventTypes.LOG_EVENT, "db response success");

    try {
      const { db, spamDb } = res;
      console.log("spamDb: ", spamDb);

      const { dmDb, groupDb, channelDb } = readDb(db);

      state.dmDb = dmDb;
      state.groupDb = groupDb;
      state.channelDb = channelDb;
      state.spamDb = spamDb;
    } catch (error) {
      logEvent(BotEventTypes.ERROR, "db read error" + error.message);
      process.exit(1);
    }
  }
}
