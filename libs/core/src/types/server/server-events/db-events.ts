import { TGenericMessage } from "../..";
import { TClientMessage } from "../../client";
import { ScenarioEntity } from "../entities";
import { AnswerEntity } from "../entities/answer.entity";

export type TDatabase = AnswerEntity[];
export enum EGetDatabaseResponseTypes {
  DB_GET_SUCCESS = "DB_GET_SUCCESS",
  DB_GET_ERROR = "DB_GET_ERROR",
}

export type TGetDatabaseSuccess =
  TGenericMessage<EGetDatabaseResponseTypes.DB_GET_SUCCESS> & {
    db: TDatabase;
    spamDb: TClientMessage[];
    scenarios: ScenarioEntity[];
    spamScenarios: ScenarioEntity[];
    replacements: string;
  };

export type TGetDatabaseError =
  TGenericMessage<EGetDatabaseResponseTypes.DB_GET_ERROR> & {
    error: Error;
  };

export type TGetDatabaseResponse = TGetDatabaseSuccess | TGetDatabaseError;
