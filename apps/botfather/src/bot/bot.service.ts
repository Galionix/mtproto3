import { Injectable } from "@nestjs/common";
import { CreateBotInput } from "./dto/create-bot.input";
import { UpdateBotInput } from "./dto/update-bot.input";
import { uuid } from "uuidv4";
import { BotEntity } from "./entities/bot.entity";
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

    return bots.map((bot) => {
      return {
        ...bot,
        state: this.getBotState(bot.id),
      };
    });
  }

  async findOne(id: string) {
    const res = await this.botRepository.findOne({ where: { id } });
    return { ...res, state: this.getBotState(id) };
  }

  update(id: number, updateBotInput: UpdateBotInput) {
    return `This action updates a #${id} bot`;
  }

  remove(id: number) {
    return `This action removes a #${id} bot`;
  }

  async startBots() {
    const loginDetailsList = await this.findAll();

    loginDetailsList.forEach(async (loginDetails, index) => {
      setTimeout(() => {
        const childProcess = fork(
          "apps\\botfather\\src\\botClient\\client.js",
          [
            loginDetails.api_id.toString(),
            loginDetails.api_hash,
            loginDetails.sessionString,
            loginDetails.id,
          ]
        );
        this.botProcesses.push(childProcess);

        childProcess.on("message", this.botsMessagesReducer.bind(this));
      }, 3000 * index);
    });

    return loginDetailsList;
  }

  stopBots() {
    console.log("this.botProcesses: ", this.botProcesses.length);
    this.botProcesses.forEach((childProcess) => {
      childProcess.kill();
    });

    return this.findAll();
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

    return botState;
  }

  getProcessesCount() {
    return this.botProcesses.length;
  }
}
