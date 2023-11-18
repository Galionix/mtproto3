import { fork } from "child_process";
import {
  sampleDb,
  sampleSpamDb,
  temporaryReplacements,
  temporaryScenario,
  temporaryTaskOrder,
} from "./mockData";
import { sep } from "path";
import { BotEventTypes } from "@core/types/client";
import { messageTransformer } from "@core/functions";

// import { EScenarioElementType, ETaskType } from "./libs/core/src/types/client";
console.log("----------start setup--------");

// import { sep } from "path";
const botTestConfig = {
  api_id: 23331061,
  api_hash: "ea63ef37b59ee0dd36acfcf571630c59",
  sessionString:
    "1BQANOTEuMTA4LjU2LjE4MQG7P3JfvGdQ+SINVbE5XDm4NpKgmv7RSVwh45T1GfNod8EaDlqWj4iPGcAWbYJ2oY2svoD4IYy/iFylQeW1sj91C7CCBsOVJnl7WdcVUbAdWW9+uwAXhLtkEzqsEohK1wv+Hl//PdCqRH0usoKNaRSGPTgs/+e5FdQYDMc8N5W6A/ewnyUCbimOmuxWsvpuhKBYa6YnHuhsWZp60sLSipHk0kaHshrbCGvMB2ElH94iMyrc9tGVLQpCI9NDhYbNfDOvdtQO0QR2jNSIVosGw0UGYpcQXMe8RFAz44h9OUiHjVHaagVT/K0mrCOA34Dg1riDy0aBj90F7YFrwjR/hgHvVA==",
  behaviorModel: "base",
  answersDb: "base",
  readDelay: 1000,
  afterTaskDelay: 1000,
  afterTaskIdleTime: 1000,
  typeDelayMultiplier: 1,
  taskOrder: temporaryTaskOrder.join(","),
  scenario: JSON.stringify(temporaryScenario),
  voice: "",
  replacements: JSON.stringify(temporaryReplacements),
  spamDBname: "base",
  isTest: true,
};
// const client = require("./dist/apps/bot-client/main.js").default;
export const testf = async () => {
  //   const clientf = await client;
  //   console.log("client: ", client);

  //   const result = await clientf(1, 2, 3, 4);
  //   console.log("result3: ", result);

  const childProcess = fork(
    "dist" + sep + "apps" + sep + "bot-client" + sep + "main.js",
    [
      botTestConfig.api_id.toString(),
      botTestConfig.api_hash,
      botTestConfig.sessionString,
      botTestConfig.behaviorModel,
      botTestConfig.answersDb,
      botTestConfig.readDelay.toString(),
      botTestConfig.typeDelayMultiplier.toString(),
      botTestConfig.taskOrder,
      botTestConfig.afterTaskDelay.toString(),
      botTestConfig.afterTaskIdleTime.toString(),
      botTestConfig.scenario,
      botTestConfig.voice,
      botTestConfig.replacements,
      botTestConfig.spamDBname,
      botTestConfig.isTest.toString(),

      // bot.id,
    ]
  );

  childProcess.on("exit", (code) => {
    //   if()
    console.log(childProcess.pid, "childProcess exited with code: ", code);
    // find botState and set childProcess to null
    //   const botState = this.botStateService.getBotState(bot.api_id);

    // this.botProcesses = this.botProcesses.filter(
    //   (chProcess) => chProcess.pid !== childProcess.pid
    // );
    // this.botStateService.updateBotState(api_id, {
    //   bot,
    //   childProcess: null,
    //   isStarted: false,
    //   isRunning: false,
    //   isStopped: true,
    //   isErrored: true,
    //   error: `childProcess exited with code: ${code}`,
    //   stoppedDate: Date.now(),
    // });
  });
  childProcess.on("message", (message) => {
    // console.log("message: ", message);
    messagesReducer(message);

    // this.botMessageService.botsMessagesReducer.bind(this.botMessageService)(
    //   message,
    //   bot.api_id
    // )
  });
  childProcess.on(
    "error",
    (error) => {
      console.log("error: ", error);
    }
    // this.botsErrorsReducer.bind(this)(error, bot.api_id)
  );

  // export {};

  const messageReducers = {
    [BotEventTypes.GET_DATABASE]: (message) => {
      const res = {
        event_type: "DB_GET_SUCCESS",
        db: sampleDb,
        spamDb: messageTransformer(sampleSpamDb),
      };
      childProcess.send(res);
      // console.log("message: ", message);
      // console.log("get databse called");
    },
    [BotEventTypes.LOG_EVENT]: (message) => {
      console.log("message: ", message.event_message);
      console.log("log event called");
    },
    // SET_SESSION_STRING
    [BotEventTypes.SET_SESSION_STRING]: (message) => {
      //   console.log("message: ", message);
      console.log("set session string called");
    },
    // STARTED
    [BotEventTypes.STARTED]: (message) => {
      //   console.log("message: ", message);
      console.log("started called");
    },
  };

  const messagesReducer = (message) => {
    const { event_type } = message;
    if (event_type in messageReducers) {
      messageReducers[event_type](message);
    } else {
      throw new Error(`Unknown FOR TEST event_type: ${event_type}`);
    }
  };
  return childProcess;
};
// testf();
