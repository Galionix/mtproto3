// import { ChildProcess, fork } from "child_process";

// import { EScenarioElementType, ETaskType } from "./libs/core/src/types/client";
console.log("----------start test--------");
const EScenarioElementType =
  require("./dist/libs/core/src/types/client/entities/scenario.js").EScenarioElementType;
const ETaskType =
  require("./dist/libs/core/src/types/client/bot-tasks").ETaskType;
const BotEventTypes =
  require("./dist/libs/core/src/types/client/bot-events").BotEventTypes;
const EMessageType =
  require("./dist/libs/core/src/types/client/entities/message.entity").EMessageType;
const messageTransformer =
  require("./dist/libs/core/src/functions/server/messaging/messageTransformer").messageTransformer;
// console.log("BotEventTypes: ", BotEventTypes);
// import { fork } from 'child_process';
const { fork } = require("child_process");
const sep = require("path").sep;

const date = new Date();

const sampleDb = [
  {
    id: "1",
    request: ["hi", "hello"],
    responses: [
      {
        type: EMessageType.TEXT,
        text: "hi",
        id: "1",
        createdAt: date,
        updatedAt: date,
        coefficient: "",
        db_name: "base",
        answer: null,
      },
    ],
    createdAt: date,
    updatedAt: date,
    base_probability: "1",
    db_name: "base",
    branch: {
      id: "1",
      description: "",
      scenario: null,
      choices: null,
    },
  },
  // some dumb data with other request text and responses text
  {
    id: "2",
    request: ["how are you", "how are you doing"],
    responses: [
      {
        type: EMessageType.TEXT,
        text: "fine",
        id: "2",
        createdAt: date,
        updatedAt: date,
        coefficient: "",
        db_name: "base",
        answer: null,
      },
    ],
    createdAt: date,
    updatedAt: date,
    base_probability: "1",
    db_name: "base",
    branch: {
      id: "2",
      description: "",
      scenario: null,
      choices: null,
    },
  },
  {
    id: "3",
    request: ["what is your name", "what is your name?"],
    responses: [
      {
        type: EMessageType.TEXT,
        text: "bot",
        id: "3",
        createdAt: date,
        updatedAt: date,
        coefficient: "",
        db_name: "base",
        answer: null,
      },
    ],
    createdAt: date,
    updatedAt: date,
    base_probability: "1",
    db_name: "base",
    branch: {
      id: "3",
      description: "",
      scenario: null,
      choices: null,
    },
  },
  {
    id: "4",
    request: ["what is your name", "what is your name?"],
    responses: [
      {
        type: EMessageType.TEXT,
        text: "bot",
        id: "4",
        createdAt: date,
        updatedAt: date,
        coefficient: "",
        db_name: "base",
        answer: null,
      },
    ],
    createdAt: date,
    updatedAt: date,
    base_probability: "1",
    db_name: "base",
    branch: {
      id: "4",
      description: "",
      scenario: null,
      choices: null,
    },
  },
];
const sampleSpamDb = [
  {
    id: "1",
    type: EMessageType.TEXT,
    text: "spam",
    createdAt: date,
    updatedAt: date,
    coefficient: "",
    db_name: "spam",

    answer: {
      id: "1",
      description: "",
      request: ["hi", "hello"],
      responses: [
        {
          id: "1",
          type: EMessageType.TEXT,
          text: "hi",
          createdAt: date,
          updatedAt: date,
          coefficient: "",
          db_name: "base",
          answer: null,
        },
      ],
      createdAt: date,
      updatedAt: date,
      isDmAnswer: false,
      isGroupAnswer: false,
      isChannelAnswer: false,
      base_probability: "1",
      db_name: "spam",
      nextBranchId: "",
      branch: {
        id: "1",
        description: "",
        scenario: null,
        choices: null,
      },
    },
  },
  {
    id: "2",
    type: EMessageType.TEXT,
    text: "spam",
    createdAt: date,
    updatedAt: date,
    coefficient: "",
    db_name: "spam",

    answer: {
      id: "2",
      description: "",
      request: ["how are you", "how are you doing"],
      responses: [
        {
          id: "2",
          type: EMessageType.TEXT,
          text: "fine",
          createdAt: date,
          updatedAt: date,
          coefficient: "",
          db_name: "base",
          answer: null,
        },
      ],
      createdAt: date,
      updatedAt: date,
      isDmAnswer: false,
      isGroupAnswer: false,
      isChannelAnswer: false,
      base_probability: "1",
      db_name: "spam",
      nextBranchId: "",
      branch: {
        id: "2",
        description: "",
        scenario: null,
        choices: null,
      },
    },
  },
  {
    id: "3",
    type: EMessageType.TEXT,
    text: "spam",
    createdAt: date,
    updatedAt: date,
    coefficient: "",
    db_name: "spam",

    answer: {
      id: "3",
      description: "",
      request: ["what is your name", "what is your name?"],
      responses: [
        {
          id: "3",
          type: EMessageType.TEXT,
          text: "monika",
          createdAt: date,
          updatedAt: date,
          coefficient: "",
          db_name: "base",
          answer: null,
        },
      ],
      createdAt: date,
      updatedAt: date,
      isDmAnswer: false,
      isGroupAnswer: false,
      isChannelAnswer: false,
      base_probability: "1",
      db_name: "spam",
      nextBranchId: "",
      branch: {
        id: "3",
        description: "",
        scenario: null,
        choices: null,
      },
    },
  },
];

const temporaryTaskOrder = [
  ETaskType.RESPOND_TO_DM_MESSAGE,
  ETaskType.SPAM_TO_GROUP,
  ETaskType.GROUP_JOIN,
  ETaskType.GROUP_LEAVE,
  ETaskType.RESPOND_TO_GROUP_MESSAGE,
];

const temporaryScenario = [
  {
    type: EScenarioElementType.VOICE,
    fileName: "step1.ogg",
  },
  {
    type: EScenarioElementType.VOICE,
    fileName: "step2.ogg",
  },
  {
    type: EScenarioElementType.VOICE,
    fileName: "step3.ogg",
  },
  {
    type: EScenarioElementType.VOICE,
    fileName: "step4.ogg",
  },
  {
    type: EScenarioElementType.TEXT,
    text: "смотри, мой ник там ##botName##\r\nhttps://meetka1.name/?r=1515&sk=586\r\nможешь при регистрации пропускать все поля, это не важно)",
  },
  {
    type: EScenarioElementType.TEXT,
    text: "прости, не могу говорить, я уже в эфире",
  },
  {
    type: EScenarioElementType.TEXT,
    text: "если не сложно добавь меня в какой-то чатик для общения а то тут стало скучно😘",
  },
];

const temporaryReplacements = {
  botName: "monika",
};

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
};
// const client = require("./dist/apps/bot-client/main.js").default;
const testf = async () => {
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
};
testf();
