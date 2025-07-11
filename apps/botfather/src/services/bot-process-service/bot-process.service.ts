import { Injectable } from "@nestjs/common";
import { ChildProcess, fork } from "child_process";
import { BotEventsService } from "../bot-events-messaging-service/bot-events.service";
import { BotStateService } from "../bot-state-service/bot-state.service";
import { BotRepositoryService } from "../bot-repository-service/bot-repository.service";
import {
  ChildProcessEntity,
  ERegistrationServerMessagesTypes,
} from "@core/types/server";
import { sep } from "path";
import { ScenarioRepositoryService } from "../../databases/scenario-repository/scenario-repository.service";
import { Logger } from "@nestjs/common";
import { GlobalLogService } from "../../databases/global-log/global-log.service";
import {
  RegistrationEventTypes,
  RegistrationResponseTypes,
} from "@core/types/client";

const l = new Logger("BotProcessService");

@Injectable()
export class BotProcessService {
  private botProcesses: ChildProcess[] = [];

  // var for storing accounts-reg process
  private accountsRegProcess: ChildProcess;
  private isCodeRequested = "";
  constructor(
    private readonly botRepositoryService: BotRepositoryService,
    private readonly botStateService: BotStateService,
    private readonly botMessageService: BotEventsService,
    private readonly scenarioRepositoryService: ScenarioRepositoryService,
    // global log
    private readonly globalLogService: GlobalLogService
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

  async stopBot(botDbId: string) {
    const botState = this.botStateService.getBotState(botDbId);
    //   botState.childProcess.
    if (botState && botState.childProcess && botState.isStarted) {
      //   TODO: add check if stop succeeded
      botState.childProcess.kill();
      botState.childProcess.disconnect();
      this.botStateService.updateBotState(botDbId, {
        childProcess: null,
      });
      this.botProcesses = this.botProcesses.filter(
        (childProcess) => childProcess.pid !== botState.childProcess.pid
      );
    }
    return this.botRepositoryService.findOne(botDbId);
  }
  getProcessesCount() {
    // console.log("this.botProcesses: ", this.botProcesses);
    return this.botProcesses.length;
  }

  async startBot(botDbId: string) {
    const bot = await this.botRepositoryService.findOne(botDbId);
    l.log("bot: ", bot);

    // check if bot is already started
    const botState = this.botStateService.getBotState(bot.botDbId);
    l.log("botState: ", botState);
    // console.log("botState: ", botState);
    if (botState.isStarted) {
      return bot;
    }

    // const scenarios =
    //   (await this.scenarioRepositoryService.findAllByNames(
    //     bot.dmScenarioNames
    //   )) || [];

    // console.log("scenarios: ", scenarios);
    console.log("bot.replacements: ", bot.replacements);

    const childProcess = fork(
      "dist" + sep + "apps" + sep + "bot-client" + sep + "main.js",
      [
        bot.api_id.toString(),
        bot.api_hash,
        bot.sessionString,
        bot.behaviorModel,
        bot.answersDb,
        bot.readDelay.toString(),
        bot.typeDelayMultiplier.toString(),
        bot.taskOrder,
        bot.afterTaskDelay.toString(),
        bot.afterTaskIdleTime.toString(),
        bot.dmScenarioNames.join(","),
        bot.voice,
        bot.replacements.replaceAll("\n", ""),
        bot.spamDBname,
        bot.botDbId,
        bot.jsonData,
        bot.proxy,
        // isTest
        "false",

        // bot.id,
      ]
    );
    /* A variable that is not used. */
    // childProcess.
    this.botProcesses.push(childProcess);
    childProcess.on("exit", (code: number) => {
      // we dont need to pass here event_date, because it will be set automatically
      this.globalLogService.create({
        log_event: "childProcess exited",
        event_message: `childProcess exited with code: ${code}`,
        botDbId,
        // event_date: new Date(),
        details: JSON.stringify({
          code,
        }),
      } as any);
      console.log(childProcess.pid, "childProcess exited with code: ", code);
      // find botState and set childProcess to null
      //   const botState = this.botStateService.getBotState(bot.api_id);

      this.botProcesses = this.botProcesses.filter(
        (chProcess) => chProcess.pid !== childProcess.pid
      );
      this.botStateService.updateBotState(botDbId, {
        bot,
        childProcess: null,
        isStarted: false,
        isRunning: false,
        isStopped: true,
        isErrored: true,
        error: `childProcess exited with code: ${code}`,
        stoppedDate: Date.now(),
      });
    });
    childProcess.addListener("message", (message: any) => {
      // event_type: RegistrationResponseTypes.RESPONSE_CODE
      console.log("message: ", message);
      if (
        "event_type" in message &&
        message.event_type === RegistrationResponseTypes.RESPONSE_CODE &&
        this.isCodeRequested === bot.botDbId
      ) {
        this.provideCode.bind(this)(message.code);
        console.log("code provided: ", message.code);
      }
    });

    childProcess.on("message", (message) =>
      this.botMessageService.botsMessagesReducer.bind(this.botMessageService)(
        message,
        bot.botDbId
      )
    );
    childProcess.on("error", (error: Error) =>
      this.botsErrorsReducer.bind(this)(error, bot.botDbId)
    );
    // this.botStateService
    //   .getBotStates()
    //   .find((botState) => botState.bot.api_id === bot.api_id).childProcess =
    //   childProcess;
    this.botStateService.updateBotState(botDbId, {
      bot,
      childProcess: childProcess as ChildProcessEntity,
      isStarted: true,
      isRunning: true,
      isStopped: false,
      //   startedDate: Date.now(),
    });
    // this.
    return bot;
  }
  async startBotsImmediately() {
    const loginDetailsList = await this.botRepositoryService.findAll();
    return loginDetailsList.map((loginDetails) =>
      this.startBot(loginDetails.botDbId)
    );
  }

  async startBots() {
    const loginDetailsList = await this.botRepositoryService.findAll();

    // create array of promises with custom delay multiplied by index, each promise will start bot. Then wait for all promises to be resolved and return array of bots

    return Promise.all(
      loginDetailsList.map(
        (loginDetails, index) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(this.startBot(loginDetails.botDbId));
            }, 2000 * (index + 1));
          })
      )
    );

    // loginDetailsList.forEach(async (loginDetails, index) => {
    //   setTimeout(() => {
    //     this.startBot(loginDetails.api_id);
    //   }, 3000 * (index + 1));
    // });

    // return loginDetailsList;
  }

  // async restartBot(api_id: string) {
  //   const botState = await this.botStateService.getBotState(api_id);
  //   if (botState) {
  //     botState.childProcess.kill();
  //   }
  //   return this.startBot(api_id);
  // }

  // async restartBots() {
  //   this.botStateService.getBotStates().forEach((botState) => {
  //     botState.childProcess.kill();
  //   });
  //   return this.botStateService.getBotStates().map((botState) => {
  //     return this.startBot(botState.bot.api_id);
  //   });
  // }

  botsErrorsReducer(error: Error, botDbId: string) {
    console.log("botDbId: " + botDbId + ", error: ", error);
  }

  async providePhoneNumber(botDbId: string, phoneNumber: string) {
    const botState = this.botStateService.getBotState(botDbId);
    if (botState) {
      botState.childProcess.send({
        event_type: ERegistrationServerMessagesTypes.PHONE_NUMBER_PROVIDED,
        number: phoneNumber,
      });
    }
    return botState;
  }

  async providePhoneCode(botDbId: string, phoneCode: string) {
    const botState = this.botStateService.getBotState(botDbId);
    if (botState) {
      // make requestedPhoneNumber false
      this.botStateService.updateBotState(botDbId, {
        requestedPhoneNumber: false,
        requestedPhoneCode: false,
      });

      botState.childProcess.send({
        event_type: ERegistrationServerMessagesTypes.PHONE_CODE_PROVIDED,
        code: phoneCode,
      });
    }
    return botState;
  }
  // provide2FACode
  async provide2FACode(botDbId: string, code: string) {
    const botState = this.botStateService.getBotState(botDbId);
    if (botState) {
      // make requestedPhoneNumber false
      this.botStateService.updateBotState(botDbId, {
        requested2FACode: false,
      });

      botState.childProcess.send({
        event_type: ERegistrationServerMessagesTypes.a2FA_CODE_PROVIDED,
        code,
      });
    }
    return botState;
  }

  // functions to manage accountsRegProcess: start, stop, restart

  async startAccountsRegProcess(botDbId: string) {
    const bot = await this.botRepositoryService.findOne(botDbId);
    if (this.accountsRegProcess) {
      this.stopAccountsRegProcess();
    }

    const childProcess = fork(
      "dist" + sep + "apps" + sep + "account-reg" + sep + "main.js",
      [bot.phone]
    );
    this.accountsRegProcess = childProcess;
    childProcess.on("exit", (code: number) => {
      console.log(childProcess.pid, "childProcess exited with code: ", code);
      this.accountsRegProcess = null;
      this.isCodeRequested = "";
    });
    childProcess.on("message", (message: any) => {
      // RegistrationEventTypes.REQUEST_CODE
      switch (message.event_type) {
        case RegistrationEventTypes.REQUEST_CODE:
          console.log("message: ", message);
          this.isCodeRequested = bot.botDbId;
          console.log("this.isCodeRequested: ", this.isCodeRequested);
          break;
        default:
          break;
      }

      // console.log("message: ", message);
    });
    childProcess.on("error", (error: Error) => {
      console.log("error: ", error);
    });
    console.log("pid: ", this.accountsRegProcess?.pid);

    return botDbId;
  }

  async stopAccountsRegProcess() {
    if (this.accountsRegProcess) {
      this.accountsRegProcess.kill();
      this.accountsRegProcess.disconnect();
      this.accountsRegProcess = null;
      this.isCodeRequested = "";
    }
    return `${this.accountsRegProcess?.pid}`;
  }

  async restartAccountsRegProcess(phone: string) {
    if (this.accountsRegProcess) {
      this.accountsRegProcess.kill();
      this.accountsRegProcess.disconnect();
      this.accountsRegProcess = null;
      this.isCodeRequested = "";
    }
    return this.startAccountsRegProcess(phone);
  }
  // return isCodeRequested
  async isCodeRequestedFromAccountsRegProcess() {
    return this.isCodeRequested;
  }
  // provideCode
  async provideCode(code: string) {
    if (this.accountsRegProcess) {
      console.log("pid: ", this.accountsRegProcess?.pid);

      console.log("code: ", code);
      this.accountsRegProcess.send({
        event_type: RegistrationResponseTypes.RESPONSE_CODE,
        code,
      });
    } else {
      throw new Error("accountsRegProcess is not started");
    }
    return this.isCodeRequested;
  }
}
