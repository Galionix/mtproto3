import { TGenericMessage } from "../..";
import { AnswerEntity } from "../entities/database.entity";

export type TDatabase = AnswerEntity[];
export enum EGetDatabaseResponseTypes {
  DB_GET_SUCCESS = "DB_GET_SUCCESS",
  DB_GET_ERROR = "DB_GET_ERROR",
}

export type TGetDatabaseSuccess =
  TGenericMessage<EGetDatabaseResponseTypes.DB_GET_SUCCESS> & {
    db: TDatabase;
  };

export type TGetDatabaseError =
  TGenericMessage<EGetDatabaseResponseTypes.DB_GET_ERROR>;

export type TGetDatabaseResponse = TGetDatabaseSuccess | TGetDatabaseError;
