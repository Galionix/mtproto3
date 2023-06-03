import { TGenericMessage } from "../..";
import { TMessageEntity } from "../entities";
import { AnswerEntity } from "../entities/database.entity";

export type TDatabase = AnswerEntity[];
export enum EGetDatabaseResponseTypes {
  DB_GET_SUCCESS = "DB_GET_SUCCESS",
  DB_GET_ERROR = "DB_GET_ERROR",
}

export type TGetDatabaseSuccess =
  TGenericMessage<EGetDatabaseResponseTypes.DB_GET_SUCCESS> & {
    db: TDatabase;
    spamDb: TMessageEntity[];
  };

export type TGetDatabaseError =
  TGenericMessage<EGetDatabaseResponseTypes.DB_GET_ERROR> & {
    error: Error;
  };

export type TGetDatabaseResponse = TGetDatabaseSuccess | TGetDatabaseError;
