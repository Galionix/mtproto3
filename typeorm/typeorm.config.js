"use strict";
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var server_1 = require("../libs/core/src/types/server");
// const path = require("path");
// console.log("path: ", path.resolve(__dirname, "..", ".env"));
require("dotenv").config({ path: ".env" });
var _a = process.env, TYPEORM_CONNECTION = _a.TYPEORM_CONNECTION, API_HOST = _a.API_HOST, TYPEORM_PORT = _a.TYPEORM_PORT, TYPEORM_USERNAME = _a.TYPEORM_USERNAME, TYPEORM_PASSWORD = _a.TYPEORM_PASSWORD, TYPEORM_DATABASE = _a.TYPEORM_DATABASE;
var options = {
    type: TYPEORM_CONNECTION,
    host: API_HOST,
    port: parseInt(TYPEORM_PORT),
    username: TYPEORM_USERNAME,
    password: TYPEORM_PASSWORD,
    database: TYPEORM_DATABASE,
    entities: [
        server_1.BotEntity,
        server_1.AnswerEntity,
        server_1.GroupEntity,
        server_1.StatisticEntity,
        server_1.MessageEntity,
        server_1.ScenarioEntity,
        server_1.ScenarioBranchEntity,
    ],
    synchronize: true
};
exports["default"] = new typeorm_1.DataSource(options);
