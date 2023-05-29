import {
  BotEventTypes,
  EDMMessageStep,
  EScenarioElementType,
  ETaskType,
  TPhoneCode,
  TPhoneNumber,
  TReplacement,
  TScenarioElement,
  TTaskOrder,
} from "@core/types/client";
import { ServerEvents } from "@core/types/server";
import { Api, TelegramClient } from "telegram";
import { NewMessage, NewMessageEvent } from "telegram/events";
import { StringSession } from "telegram/sessions";
import * as dmHandlers from "./lib/behaviour/dm";
import { TDMHandlerArgs } from "./lib/behaviour/dm/base";
import scenarioHandler from "./lib/behaviour/dm/scenarioHandler";
import { getCombinedListeners } from "./lib/processApi/combineListeners";
import { generalReducer } from "./lib/processApi/composeReducer";
import { listeners } from "./lib/processApi/listeners";
import { logEvent } from "./lib/processApi/logEventTostate";
import { state } from "./lib/state";
import { addDmTask } from "./lib/tasksApi/addTask";
import { delayFactory, getDMMessageStep } from "./lib/utils/messagingUtils";
import { readDbSequence } from "./lib/utils/readDb";
import { taskProcessor } from "./lib/tasksApi/processor";
import { taskArranger } from "./lib/tasksApi/taskArranger";

const temporaryTaskOrder: TTaskOrder = [
  ETaskType.RESPOND_TO_DM_MESSAGE,
  ETaskType.SPAM_TO_GROUP,
  ETaskType.GROUP_JOIN,
  ETaskType.GROUP_LEAVE,
  ETaskType.RESPOND_TO_GROUP_MESSAGE,
];

const temporaryScenario: TScenarioElement[] = [
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

const temporaryReplacements: TReplacement = {
  botName: "monika",
};

const [
  apiId,
  apiHash,
  stringSession,
  behavior_model = "base",
  answers_db = "base",
  read_delay = "1000",
  type_delay_multiplier = "1",
  taskOrder = temporaryTaskOrder.join(","),
  afterTaskDelay = "1000",
  afterTaskIdleTime = "10000",
  scenario = JSON.stringify(temporaryScenario),
  voice = "ksenia",
  replacements = JSON.stringify(temporaryReplacements),
] = process.argv.slice(2);

state.replacements = JSON.parse(replacements);

state.taskOrder = taskOrder.split(",") as TTaskOrder;
state.voice = voice;

state.afterTaskDelay = parseInt(afterTaskDelay);
state.afterTaskIdleTime = parseInt(afterTaskIdleTime);
state.apiId = parseInt(apiId);
state.apiHash = apiHash;
state.stringSession = stringSession;
state.behavior_model = behavior_model;
state.answers_db = answers_db;
state.read_delay = parseInt(read_delay);
state.type_delay_multiplier = parseInt(type_delay_multiplier);
state.scenario = JSON.parse(scenario);

const { readDelay, typeDelay, waitAfterTaskDelay, waitAfterTaskIdleTime } =
  delayFactory();

type TDMHandler = (args: TDMHandlerArgs) => Promise<void>;
const dmHandler = dmHandlers[behavior_model].default as TDMHandler;

(async () => {
  await readDbSequence({
    answers_db,
  });

  async function messageOrchestrator(event: NewMessageEvent) {
    const { isPrivate, isChannel, isGroup } = event;
    if (isPrivate) {
      const { client, chat, message } = event;

      const senderId = (await message.getSender()).id;
      const messageText = message.message;
      logEvent(BotEventTypes.DIRECT_MESSAGE, messageText);
      const { step, count } = await getDMMessageStep(client, senderId);

      addDmTask({
        senderId,
        message: messageText,
        step,
        count,
      });
      // code below is to move to task handlers
      //
      //

      // here we need to create a pool of incoming messages
      // and somehow process them in sequence
      // and also we need to keep track on server wehter we have responded to the message
      // so bot's state on server in dmChats should be updated once we receive a message
      // with parameters, necessary to respond
      // and then bot on startup should aplly this state to itself, and then continue.
    }
  }

  let isRunning = false;

  async function runTasks(client: TelegramClient) {
    if (isRunning || state.tasks.length === 0) return;
    isRunning = true;
    let tasks = [...taskArranger(state.tasks)];
    state.tasks = [];
    for (const task of tasks) {
      // this is untested.
      tasks = [...taskArranger([...state.tasks, ...tasks])];
      state.tasks = [];
      // the idea is to whatch for new tasks while processing current ones

      await taskProcessor(task, client);
      await waitAfterTaskDelay();
    }
    await waitAfterTaskIdleTime();
    console.log(`Idle time: ${state.afterTaskIdleTime} of ${state.apiId}`);
    isRunning = false;
  }

  try {
    const client = new TelegramClient(
      new StringSession(stringSession),
      parseInt(apiId),
      apiHash,
      {
        connectionRetries: 5,
      }
    );
    await client.start({
      phoneCode: async () => {
        process.send({ event_type: BotEventTypes.PHONE_CODE });
        return new Promise((resolve) => {
          process.on("message", (message: TPhoneCode) => {
            // TODO: refactor to use event_type
            if (message.event_type === "PHONE_CODE") {
              resolve(message.code);
            }
          });
        });
      },
      phoneNumber: async () => {
        process.send({ event_type: "PHONE_NUMBER_REQUIRED" });
        return new Promise((resolve) => {
          process.on("message", (message: TPhoneNumber) => {
            // TODO: refactor to use event_type
            if (message.event_type === "PHONE_NUMBER") {
              resolve(message.number);
            }
          });
        });
      },
      onError: (err) => {
        logEvent(BotEventTypes.ERROR, err.message);
        process.send({ event_type: "ERROR", error: err });
        console.log(err);
      },
    });

    // client.addEventHandler(callback, event)

    await client.connect();
    console.log(apiId, " connected.");

    // const result = await client.invoke(
    //   new Api.messages.GetAllChats({
    //     exceptIds: [],
    //   })
    // );
    // console.log(result); // prints the result

    process.send({
      event_type: BotEventTypes.SET_SESSION_STRING,
      sessionString: client.session.save(),
    });

    process.send({ event_type: "STARTED" });
    logEvent(BotEventTypes.STARTED);

    // client.addEventHandler((update) => {
    //   console.log("Received new Update");
    //   console.log(update.message);
    // });

    client.addEventHandler(messageOrchestrator, new NewMessage({}));

    const combinedListeners = getCombinedListeners(listeners);

    const reducer = generalReducer({ client }, combinedListeners);
    process.on("message", async (message: ServerEvents) => {
      reducer(message);
    });

    setInterval(() => runTasks(client), 1000);
  } catch (error) {
    logEvent(BotEventTypes.ERROR, error.message);
  }
})();
