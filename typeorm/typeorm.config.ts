import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import {
  AnswerEntity,
  BotEntity,
  GroupEntity,
  MessageEntity,
  ScenarioBranchEntity,
  ScenarioEntity,
  StatisticEntity,
} from "../libs/core/src/types/server";
// const path = require("path");
// console.log("path: ", path.resolve(__dirname, "..", ".env"));
require("dotenv").config({ path: ".env" });
const {
  TYPEORM_CONNECTION,
  API_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
} = process.env;

const options: PostgresConnectionOptions = {
  type: TYPEORM_CONNECTION as "postgres",
  host: API_HOST,
  port: parseInt(TYPEORM_PORT as string),
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  entities: [
    BotEntity,
    AnswerEntity,
    GroupEntity,
    StatisticEntity,
    MessageEntity,
    ScenarioEntity,
    ScenarioBranchEntity,
  ],
  synchronize: true,
};
export default new DataSource(options);
