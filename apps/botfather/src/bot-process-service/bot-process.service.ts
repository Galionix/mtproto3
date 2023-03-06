import { Injectable } from "@nestjs/common";
import { ChildProcess, fork } from "child_process";
import { BotMessageService } from "../bot-message-service/bot-message.service";
import { BotRepositoryService } from "../bot-repository-service/bot-repository.service";
import { BotStateService } from "../bot-state-service/bot-state.service";

@Injectable()
export class BotProcessService {
  private botProcesses: ChildProcess[] = [];

  constructor(
    private readonly botRepositoryService: BotRepositoryService,
    private readonly botStateService: BotStateService,
    private readonly botMessageService: BotMessageService
  ) {}

  stopBots() {
    // console.log("this.botProcesses: ", this.botProcesses.length);
    //   TODO: add check if stop succeeded
    this.botProcesses.forEach((childProcess) => {
      childProcess.kill();
      childProcess.disconnect();
      childProcess = null;
    });
    this.botProcesses = [];

    return this.botRepositoryService.findAll();
  }

  async stopBot(api_id: number) {
    const botState = this.botStateService.getBotState(api_id);
    //   botState.childProcess.
    if (botState && botState.childProcess && botState.isStarted) {
      //   TODO: add check if stop succeeded
      botState.childProcess.kill();
      botState.childProcess.disconnect();
      this.botStateService.updateBotState(api_id, {
        childProcess: null,
      });
    }
    return this.botRepositoryService.findOne(api_id);
  }
  getProcessesCount() {
    console.log("this.botProcesses: ", this.botProcesses);
    return this.botProcesses.length;
  }

  async startBot(api_id: number) {
    const bot = await this.botRepositoryService.findOne(api_id);

    // check if bot is already started
    const botState = this.botStateService.getBotState(bot.api_id);
    // console.log("botState: ", botState);
    if (botState.isStarted) {
      return bot;
    }

    const childProcess = fork(
      "apps\\botfather\\src\\botClient\\dist\\botClient\\index.js",
      [
        bot.api_id.toString(),
        bot.api_hash,
        bot.sessionString,
        // bot.id,
      ]
    );
    /* A variable that is not used. */
    // childProcess.
    this.botProcesses.push(childProcess);
    childProcess.on("exit", (code: number) => {
      // find botState and set childProcess to null
      //   const botState = this.botStateService.getBotState(bot.api_id);
      this.botStateService.updateBotState(api_id, {
        childProcess: null,
        isStarted: false,
        isRunning: false,
        isStopped: true,
        stoppedDate: Date.now(),
      });
      //   botState.childProcess = null;
      //   botState.isStarted = false;
      //   botState.isRunning = false;
      //   botState.isStopped = true;
      //   botState.stoppedDate = Date.now();

      console.log("childProcess exited with code: ", code);
    });
    childProcess.on("message", (message) =>
      this.botMessageService.botsMessagesReducer.bind(this)(message, bot.api_id)
    );
    childProcess.on("error", (error: Error) =>
      this.botsErrorsReducer.bind(this)(error, bot.api_id)
    );
    // this.botStateService
    //   .getBotStates()
    //   .find((botState) => botState.bot.api_id === bot.api_id).childProcess =
    //   childProcess;
    this.botStateService.updateBotState(api_id, {
      childProcess: childProcess,
      isStarted: true,
      isRunning: true,
      isStopped: false,
      //   startedDate: Date.now(),
    });
    // this.
    return this.botRepositoryService.findOne(api_id);
  }

  async startBots() {
    const loginDetailsList = await this.botRepositoryService.findAll();
    loginDetailsList.forEach(async (loginDetails, index) => {
      // check if bot is already running

      // if (this.getBotState(loginDetails.api_id).isRunning) {
      //   return;
      // }

      setTimeout(() => {
        this.startBot(loginDetails.api_id);
      }, 3000 * (index + 1));
    });

    return loginDetailsList;
  }

  async restartBot(api_id: number) {
    const botState = await this.botStateService.getBotState(api_id);
    if (botState) {
      botState.childProcess.kill();
    }
    return this.startBot(api_id);
  }

  async restartBots() {
    this.botStateService.getBotStates().forEach((botState) => {
      botState.childProcess.kill();
    });
    return this.botStateService.getBotStates().map((botState) => {
      return this.startBot(botState.bot.api_id);
    });
  }

  botsErrorsReducer(error: Error, api_id: number) {
    console.log("api_id: " + api_id + ", error: ", error);
  }
}
