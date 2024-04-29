import { BotEntity, CreateBotInput, UpdateBotInput } from "@core/types/server";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { defaultValues } from "./default-values";
import { Database } from "sqlite3";
import sqlite3 from "sqlite3";
import { sep, resolve } from "path";
import { AuthKey } from "telegram/crypto/AuthKey";
import { TEntitiesRow, TJsonFile, TSessionRow } from "./sesionFile.types";
import { MemorySession, StringSession } from "telegram/sessions";
import select from "./readDb.utils";
import ip from "ip";
import base64 from "base64-js";
import { readFileSync } from "fs";
import { readdir } from "fs/promises";
const l = new Logger("BotRepositoryService");

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  const paths = Array.prototype.concat(...files);
  return paths;
  // {
  // filenames: paths.map((file) => file.split(sep).pop()),
  // };
}

const CURRENT_VERSION = "1";
// const _STRUCT_PREFORMAT = ">B{}sH256s";
/*    dc_id?: number;
    dcId?: number;
    server_address?: string;
    serverAddress?: string;
    port: number;
    auth_key: Buffer;
    */

function encode(
  dc_id: number,
  ip_address: string,
  port: number,
  auth_key: Buffer
) {
  // const ip = ip_address.split(".");
  const ip_bytes = Buffer.from(ip_address.toString());
  const auth_key_bytes = Buffer.from(auth_key);
  const data = Buffer.concat([
    Buffer.from([dc_id]),
    ip_bytes,
    Buffer.from([port]),
    auth_key_bytes,
  ]);
  return `${CURRENT_VERSION}${base64.fromByteArray(data)}`;
}
async function getBotDataFromFile(number: string) {
  // const data: {
  //   stringSession: string;
  // } & TEntitiesRow = {
  //   stringSession: "",
  //   date: 0,
  //   hash: null,
  //   id: 0,
  //   name: "",
  //   phone: 0,
  //   username: "",
  // };
  // const session = new StringSession("");
  // const filePath = resolve("accounts" + sep + number + ".session");

  const existingFiles = await getFiles(resolve("accounts"));
  const jsonFile = existingFiles.find((file) =>
    file.includes(`${number}.json`)
  );
  const sessionFile = existingFiles.find((file) =>
    file.includes(`${number}.session`)
  );

  // const jsonFilePath = resolve("accounts" + sep + number + ".json");
  const jsonData = readFileSync(jsonFile, "utf8");
  const { phone, app_id, app_hash } = JSON.parse(jsonData) as TJsonFile;
  // read json file

  console.log("filePath: ", sessionFile);
  // const db: Database = new sqlite3.Database(filePath);
  // console.log("db: ", db);

  const sessionsData = await select<TSessionRow>(sessionFile, "sessions");
  // const stringSession = sessionsData[0].auth_key.toString("base64");
  // const stringSession = encode(
  //   sessionsData[0].dc_id,
  //   sessionsData[0].server_address,
  //   sessionsData[0].port,
  //   sessionsData[0].auth_key
  // );
  const ss = new StringSession();

  const authKey = new AuthKey();

  authKey.setKey(Buffer.from(sessionsData[0].auth_key));

  ss.setDC(
    sessionsData[0].dc_id,
    sessionsData[0].server_address,
    sessionsData[0].port
  );
  ss.setAuthKey(authKey);

  const sessionString = ss.save();

  // const authKey = new AuthKey(sessionsData[0].auth_key);
  // session.setAuthKey(authKey, sessionsData[0].dc_id);
  // const sessionString = session.save();
  // console.log("sessionString: ", sessionString);

  const entities = await select<TEntitiesRow>(sessionFile, "entities");
  console.log("entities: ", entities);
  return {
    stringSession: sessionString,
    ...entities[1],
    phone,
    app_id,
    app_hash,
  };

  // return stringSession;
  // console.log("dbData: ", dbData);
  // try {
  // db.get("SELECT * FROM sessions", (err, row: TSessionRow) => {
  //   // const dcId = row.dcId || row.dc_id;
  //   const stringSession = row.auth_key.toString("base64");
  //   console.log("stringSession from select: ", stringSession);
  //   data.stringSession = stringSession;
  //   // return stringSession;
  //   // console.log("stringSession: ", stringSession);
  //   // const serverAddress = row.serverAddress || row.server_address;
  //   // console.log("dcId: ", dcId);
  //   // const authKey = new AuthKey();
  //   // await authKey.setKey(row.auth_key);

  //   // const authSession = new MemorySession();
  //   // authSession.setDC(dcId, serverAddress, row.port);
  //   // authSession.setAuthKey(authKey, dcId);
  //   // authSession.takeoutId = null;
  //   // const res = authSession.save();
  //   // console.log("res: ", res);

  //   // console.log("row: ", row);
  //   // return row;
  // });
  // // } catch (err) {
  // //   console.log("err: ", err);
  // // } finally {
  // //   db.close();
  // // }
  // return data;
}

// async function getSession(number: string) {
//   const filePath = resolve("accounts" + sep + number + ".session");
//   const db: Database = new sqlite3.Database(filePath);
//   return db.get("SELECT * FROM sessions", async (err, row: TSessionRow) => {
//     const stringSession = row.auth_key.toString("base64");
//     return stringSession;
//   });
// }

@Injectable()
export class BotRepositoryService {
  constructor(
    @InjectRepository(BotEntity)
    private readonly botRepository: Repository<BotEntity> // private readonly botStateService: BotStateService
  ) {}

  // get availeble for creation bots by files
  // this query will show what bots are available for creation by files in accounts folder
  // we should read accounts folder and get file names and show them here
  async getAvailableBotsByFiles() {
    // we need all files in nested folders
    const accountsFolder = resolve("accounts");
    const paths = await getFiles(accountsFolder);

    const fileNames = new Set(
      paths
        .map((file) => file.split(sep).pop())
        .map((file) => file && file.split(".")[0])
    );
    // next we need to find all bots with this phone numbers
    // and remove them from result using findOneByPhone

    const result = await Promise.all(
      Array.from(fileNames).map(async (phone) => {
        const bot = await this.findOneByPhone(phone);
        return bot ? null : phone;
      })
    );

    return result.filter(Boolean);
  }

  // TODO: change api_id and api_hash by botDbId to defaultValues
  // maybe this will fix some connection errors
  async create(createBotInput: CreateBotInput) {
    console.log("createBotInput: ", createBotInput);
    if (createBotInput.fromFile) {
      const { stringSession, app_id, app_hash, username, phone, name, date } =
        await getBotDataFromFile(createBotInput.api_hash.toString());

      createBotInput.api_id = app_id;
      createBotInput.api_hash = app_hash;
      // createBotInput = username;
      createBotInput.phone = phone;
      createBotInput.sessionString = stringSession;
      // // here we use api_id as a number showing us what the file we should open.
      // const sessionString = await getSession(
      //   createBotInput.api_hash.toString()
      // );
      // console.log("sessionString: ", sessionString);
    }
    // const existingBot = await this.botRepository.findOne({
    //   where: { api_id: createBotInput.api_id },
    // });

    // if (existingBot) {
    //   return existingBot;
    // }

    let copyFromBot: BotEntity;

    if (createBotInput.copyFrom) {
      copyFromBot = await this.botRepository.findOne({
        where: { botDbId: createBotInput.copyFrom },
      });
    }

    const newBot: BotEntity = {
      ...defaultValues,
      ...copyFromBot,
      ...createBotInput,
    };

    await this.botRepository.save(newBot);
    return newBot;
  }

  async findAll() {
    const bots = await this.botRepository.find();

    return bots;
  }

  async findOne(botDbId: string): Promise<BotEntity> {
    const res = await this.botRepository.findOne({ where: { botDbId } });
    return res;
  }

  async findOneByName(botName: string): Promise<BotEntity> {
    const res = await this.botRepository.findOne({ where: { botName } });
    return res;
  }
  async findOneByPhone(phone: string) {
    const res = await this.botRepository.findOne({ where: { phone } });
    return res;
  }

  async remove(id: string) {
    const removedId = await this.botRepository.delete(id);
    // await this.botStateService.reload();
    return removedId;
  }

  async updateSessionString(botDbId: string, sessionString: string) {
    const bot = await this.findOne(botDbId);

    bot.sessionString = sessionString;

    this.botRepository.save(bot);

    l.log("sessionString updated: ", sessionString);
  }

  async updateClientState(botDbId: string, state: string) {
    const bot = await this.findOne(botDbId);

    bot.clientState = state;
    bot.clientStateUpdateTime = new Date(Date.now());

    this.botRepository.save(bot);
  }

  async update(botDbId: string, updateBotInput: UpdateBotInput) {
    const bot = await this.findOne(botDbId);
    if (!bot) {
      throw new Error(`Bot with api_id ${botDbId} not found`);
    }
    return await this.botRepository.save({ ...bot, ...updateBotInput });
  }
}