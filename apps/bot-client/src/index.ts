import {
  BotEventTypes,
  EDMMessageStep,
  EScenarioElementType,
  ETaskType,
  EregistrationMessagesTypes,
  TPhoneCode,
  TPhoneNumber,
  TReplacement,
  TScenarioElement,
  TTaskOrder,
} from "@core/types/client";
import {
  EGetDatabaseResponseTypes,
  ERegistrationServerMessagesTypes,
  ServerEvents,
  TPhoneCodeProvided,
  TPhoneNumberProvided,
} from "@core/types/server";
import { Api, TelegramClient } from "telegram";
import { NewMessage, NewMessageEvent } from "telegram/events";
import { StringSession } from "telegram/sessions";
import * as dmHandlers from "./lib/behaviour/dm";
import { TDMHandlerArgs } from "./lib/behaviour/dm/base";
import scenarioHandler from "./lib/behaviour/dm/scenarioHandler";
import { getCombinedListeners } from "./lib/processApi/combineListeners";
import { generalReducer } from "./lib/processApi/composeReducer";
import { listeners } from "./lib/processApi/listeners";
import { logEvent, logGlobal } from "./lib/processApi/logEventTostate";
import { sendStateToFatherProcess, state } from "./lib/state";
import {
  addDmTask,
  addRespondToUnreadDmTask,
  listGroupsTask,
} from "./lib/tasksApi/addTask";
import {
  delayFactory,
  // getDMMessageStep
} from "./lib/utils/messagingUtils";
import { readDbSequence } from "./lib/utils/readDb";
import { taskProcessor } from "./lib/tasksApi/processor";
import { taskArranger } from "./lib/tasksApi/taskArranger";
import { messageOrchestrator } from "./lib/messagesOrchestrator";
import { sendToFather } from "@core/functions";
import path from "path";
import { readFileSync } from "fs";
import { TelegramClientParams } from "telegram/client/telegramBaseClient";
import { parseProxyString } from "./lib/utils/parseProxyString";
import { getTelegramClientParams } from "./lib/utils/getTelegramClientParams";

const showBreathe = false;

const [
  apiId,
  apiHash,
  stringSession,
  behavior_model,
  answers_db,
  read_delay,
  type_delay_multiplier,
  taskOrder,
  afterTaskDelay,
  afterTaskIdleTime,
  dmScenarioNames,
  voice,
  replacements,
  spamDBname,
  botDbId,
  jsonData,
  proxy,
  isTest,
] = process.argv.slice(2);
const isTestMode = Boolean(isTest);
const initState = () => {
  state.replacements = JSON.parse(replacements);

  state.taskOrder = taskOrder.split(",") as TTaskOrder;
  state.voice = voice;
  state.botDbId = botDbId;

  state.afterTaskDelay = parseInt(afterTaskDelay);
  state.afterTaskIdleTime = parseInt(afterTaskIdleTime);
  state.apiId = parseInt(apiId);
  state.apiHash = apiHash;
  state.stringSession = stringSession;
  state.behavior_model = behavior_model;
  state.answers_db = answers_db;
  state.read_delay = parseInt(read_delay);
  state.type_delay_multiplier = parseInt(type_delay_multiplier);
  state.proxy = proxy;
  state.jsonData = JSON.parse(jsonData);
  // console.log("scenario: ", scenarios);
  // state.dmScenario = dmScenarioNames;
  state.spamDbName = spamDBname;
};
if (!isTestMode) {
  initState();
}
// throw new Error("stop");
// sffsdsss
const { waitAfterTaskDelay, waitAfterTaskIdleTime } = delayFactory();

console.log("launching main thread");

(async () => {
  console.log("answers_db: ", answers_db);
  console.log("spamDBname: ", spamDBname);

  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "media",
    "audioDurations.json"
  );

  const audioDurations = readFileSync(filePath);

  // read text from buffer
  state.audioDurations = JSON.parse(audioDurations.toString("utf8"));
  // console.log("text: ", text);

  // console.log("audioDurations: ", audioDurations);

  await readDbSequence({
    answers_db,
    spamDBname,
    dmScenarioNames: dmScenarioNames.split(","),
  });
  // console.log("replacements: ", state.replacements);

  // console.log("state.dmScenario: ", state.dmScenario);
  // console.log("readDbSequence finished");

  let isRunning = false;
  // let tasksDisplay = [];

  async function runTasks(client: TelegramClient) {
    showBreathe && console.log(apiId, "state.tasks", state.tasks);
    if (isRunning || state.tasks.length === 0) return;
    isRunning = true;
    const tasks = [...taskArranger(state.tasks)];
    // tasksDisplay = tasks;
    // state.tasks = [];
    for (const task of tasks) {
      console.log("runTasks: ", tasks);
      // this is untested.
      // tasks = [...taskArranger([...state.tasks, ...tasks])];
      // state.tasks = [];
      // the idea is to whatch for new tasks while processing current ones

      await taskProcessor(task, client);
      await waitAfterTaskDelay();
    }
    // if we have processed all available tasks, we need to store rest of them
    // dont worry, they are deduplicated by id, so we can just add them to the end

    // state.tasks = [...state.tasks];
    await waitAfterTaskIdleTime();
    console.log(`Idle time: ${state.afterTaskIdleTime} of ${state.apiId}`);
    isRunning = false;
  }

  const clientParams = getTelegramClientParams(
    proxy,
    JSON.parse(jsonData),
    botDbId
  );
  console.log("clientParams: ", clientParams);

  try {
    logGlobal("STARTING", "Starting");
    const client = new TelegramClient(
      new StringSession(stringSession),
      parseInt(apiId),
      apiHash,
      clientParams
    );
    console.log("before start");
    await client.start({
      phoneCode: async () => {
        console.log("phone code requested");
        const res = await sendToFather(
          process,
          {
            event_type: BotEventTypes.PHONE_CODE,
            response_types: [
              ERegistrationServerMessagesTypes.PHONE_CODE_PROVIDED,
            ],
          },
          true,
          60000
        );
        console.log("res: ", res);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return res.code;
        // process.send({ event_type: BotEventTypes.PHONE_CODE });
        // return new Promise((resolve) => {
        //   process.on("message", (message: TPhoneCodeProvided) => {
        //     if (
        //       message.event_type ===
        //       ERegistrationServerMessagesTypes.PHONE_CODE_PROVIDED
        //     ) {
        //       resolve(message.code);
        //     }
        //   });
        // });
      },
      phoneNumber: async () => {
        console.log("phone number requested");
        logEvent(BotEventTypes.PHONE_NUMBER);
        logGlobal(BotEventTypes.PHONE_NUMBER, "phone number requested");
        const res = await sendToFather(
          process,
          {
            event_type: BotEventTypes.PHONE_NUMBER,
            response_types: [
              ERegistrationServerMessagesTypes.PHONE_NUMBER_PROVIDED,
            ],
          },
          true,
          60000
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return res.number;
      },
      onError: (err) => {
        logEvent(BotEventTypes.ERROR, err.message);
        logGlobal(BotEventTypes.ERROR, err.message, { stack: err.stack });

        process.send({ event_type: "ERROR", error: err });
        console.log(err);
      },
      password: async () => {
        // console.log("password requested");
        const res = await sendToFather(
          process,
          {
            event_type: BotEventTypes.a2FA_CODE,
            response_types: [
              ERegistrationServerMessagesTypes.a2FA_CODE_PROVIDED,
            ],
          },
          true,
          60000
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return res.code;
      },
    });

    // client.addEventHandler(callback, event)

    await client.connect();
    console.log(apiId, " connected.");

    // const :User = await client.getMe();
    // const result = await client.invoke(
    //   new Api.photos.GetUserPhotos({
    //     userId: new Api.InputPeerSelf(),
    //   })
    // );
    // console.log(result);
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
    logGlobal(BotEventTypes.STARTED);

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

    addRespondToUnreadDmTask();
    listGroupsTask();

    const me = await client.getMe();
    state.me = me as Api.User;
    const result = await client.invoke(
      new Api.users.GetFullUser({
        id: me,
      })
    );
    if ("firstName" in result.users[0]) {
      const firstName = result.users[0].firstName;
      const lastName = result.users[0].lastName;
      const about = result.fullUser.about;
      state.bio = {
        firstName,
        lastName,
        about,
      };
    }
    console.log(result); // prints the result
    sendStateToFatherProcess(state);

    const meAsInputPeer = await client.getInputEntity(me);
    console.log("meAsInputPeer: ", meAsInputPeer);
    // console.log("me: ", me);

    // this is forever loop
    setInterval(() => runTasks(client), state.afterTaskDelay);
  } catch (error) {
    console.log("error: ", error);
    logEvent(BotEventTypes.ERROR, error.message);
    logGlobal(BotEventTypes.ERROR, error.message, { stack: error.stack });
  }
})();
