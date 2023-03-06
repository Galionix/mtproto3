import { Injectable } from "@nestjs/common";
import { CreateBotInput } from "./dto/create-bot.input";
import { UpdateBotInput } from "./dto/update-bot.input";
import { uuid } from "uuidv4";
import { BotEntity, BotStateEntity } from "./entities/bot.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { fork } from "child_process";
import {
  processMessagesTypes,
  TProcessMessages,
} from "./types/processMessages";
import { defaultBotState, IBotState } from "./types/botState";

@Injectable()
export class BotService {
  private botProcesses: any[] = [];
  private botStates: IBotState[] = [];
  constructor(
    @InjectRepository(BotEntity)
    private readonly botRepository: Repository<BotEntity>
  ) {
    // initialize botStates from database on startup
    botRepository.find().then((bots) => {
      bots.forEach((bot) => {
        this.botStates.push({
          ...defaultBotState,
          id: bot.id,
          api_id: bot.api_id,
          api_hash: bot.api_hash,
          sessionString: bot.sessionString,
        });
      });
    });
  }

  async create(createBotInput: CreateBotInput) {
    const existingBot = await this.botRepository.findOne({
      where: { api_id: createBotInput.api_id },
    });

    if (existingBot) {
      return existingBot;
    }

    const newBot = this.botRepository.save({
      api_id: createBotInput.api_id,
      api_hash: createBotInput.api_hash,
      sessionString: createBotInput.sessionString,
      id: uuid(),
    });

    return newBot;
  }

  async findAll() {
    const bots = await this.botRepository.find();

    return bots;
  }

  async findOne(id: string): Promise<BotEntity> {
    const res = await this.botRepository.findOne({ where: { id } });
    return res;
  }

  update(id: number, updateBotInput: UpdateBotInput) {
    return `This action updates a #${id} bot`;
  }

  remove(id: number) {
    return `This action removes a #${id} bot`;
  }

  // async startBots() {
  //   const loginDetailsList = await this.findAll();

  //   loginDetailsList.forEach(async (loginDetails, index) => {
  //     // const botState = this.botStates.find(
  //     //   (botState) => botState.id === loginDetails.id
  //     // );

  //     setTimeout(() => {
  //       const childProcess = fork(
  //         "apps\\botfather\\src\\botClient\\client.js",
  //         [
  //           loginDetails.api_id.toString(),
  //           loginDetails.api_hash,
  //           loginDetails.sessionString,
  //           loginDetails.id,
  //         ]
  //       );
  //       /* A variable that is not used. */
  //       // childProcess.
  //       this.botProcesses.push(childProcess);
  //       childProcess.on("exit", (code: number) => {
  //         // find botState and set childProcess to null
  //         const botState = this.botStates.find(
  //           (botState) => botState.id === loginDetails.id
  //         );
  //         botState.childProcess = null;
  //         botState.isStarted = false;
  //         botState.isRunning = false;
  //         botState.isStopped = true;
  //         botState.stoppedDate = Date.now();

  //         console.log("childProcess exited with code: ", code);
  //       });
  //       childProcess.on("message", this.botsMessagesReducer.bind(this));
  //       childProcess.on("error", (error: Error) =>
  //         this.botsErrorsReducer.bind(this, error, loginDetails.id)
  //       );
  //       this.botStates.find(
  //         (botState) => botState.id === loginDetails.id
  //       ).childProcess = childProcess;
  //       // this.
  //     }, 3000 * (index + 1));
  //   });

  //   return loginDetailsList;
  // }

  stopBots() {
    // console.log("this.botProcesses: ", this.botProcesses.length);
    this.botProcesses.forEach((childProcess) => {
      childProcess.kill();
    });

    return this.findAll();
  }

  stopBot(id: string) {
    const botState = this.botStates.find((botState) => botState.id === id);
    if (botState) {
      botState.childProcess.kill();
    }
    return this.findOne(id);
  }
  botsErrorsReducer(error: Error, id: string) {
    console.log("id: " + id + ", error: ", error);
  }

  botsMessagesReducer(message: TProcessMessages) {
    console.log("message: ", message);
    // update botStates
    const botState = this.botStates.find(
      (botState) => botState.id === message.identity.id
    );
    if (botState) {
      switch (message.type) {
        case processMessagesTypes.STARTED:
          console.log("Bot started: ", message.identity.id);
          botState.isStarted = true;
          botState.startedDate = Date.now();
          break;
        case processMessagesTypes.STOPPED:
          console.log("Bot stopped: ", message.identity.id);
          botState.isStopped = true;
          botState.stoppedDate = Date.now();
          break;
        case processMessagesTypes.ERROR:
          console.log("Bot errored: ", message.identity.id);
          botState.isErrored = true;
          botState.error = message.error;
          break;
      }
    }
  }

  getBotState(id: string) {
    const botState = this.botStates.find((botState) => botState.id === id);

    return { ...botState, bot: this.findOne(id) };
  }

  getBotStates() {
    return this.botStates.map((botState) => {
      return { ...botState, bot: this.findOne(botState.id) };
    });
  }

  getProcessesCount() {
    return this.botProcesses.length;
  }

  async startBot(id: string) {
    const bot = await this.findOne(id);
    const childProcess = fork("apps\\botfather\\src\\botClient\\client.js", [
      bot.api_id.toString(),
      bot.api_hash,
      bot.sessionString,
      bot.id,
    ]);
    /* A variable that is not used. */
    // childProcess.
    this.botProcesses.push(childProcess);
    childProcess.on("exit", (code: number) => {
      // find botState and set childProcess to null
      const botState = this.botStates.find(
        (botState) => botState.id === bot.id
      );
      botState.childProcess = null;
      botState.isStarted = false;
      botState.isRunning = false;
      botState.isStopped = true;
      botState.stoppedDate = Date.now();

      console.log("childProcess exited with code: ", code);
    });
    childProcess.on("message", this.botsMessagesReducer.bind(this));
    childProcess.on("error", (error: Error) =>
      this.botsErrorsReducer.bind(this, error, bot.id)
    );
    this.botStates.find((botState) => botState.id === bot.id).childProcess =
      childProcess;
    // this.
    return this.findOne(id);
  }

  async startBots() {
    const loginDetailsList = await this.findAll();
    loginDetailsList.forEach(async (loginDetails, index) => {
      setTimeout(() => {
        this.startBot(loginDetails.id);
      }, 3000 * (index + 1));
    });

    return loginDetailsList;
  }

  async restartBot(id: string) {
    const bot = await this.findOne(id);
    const botState = this.botStates.find((botState) => botState.id === id);
    if (botState) {
      botState.childProcess.kill();
    }
    return this.startBot(id);
  }

  async restartBots() {
    this.botStates.forEach((botState) => {
      botState.childProcess.kill();
    });
    return this.botStates.map((botState) => {
      return this.startBot(botState.id);
    });
  }
}
