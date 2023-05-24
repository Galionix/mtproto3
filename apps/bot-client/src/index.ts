import {
  BotEventTypes,
  EDMMessageStep,
  TPhoneCode,
  TPhoneNumber,
  TRespondToDMMessagePayload,
} from "@core/types/client";
import { ServerEvents } from "@core/types/server";
import { Api, TelegramClient } from "telegram";
import { NewMessage, NewMessageEvent } from "telegram/events";
import { StringSession } from "telegram/sessions";
import * as dmHandlers from "./lib/behaviour/dm";
import { getCombinedListeners } from "./lib/processApi/combineListeners";
import { generalReducer } from "./lib/processApi/composeReducer";
import { listeners } from "./lib/processApi/listeners";
import { logEvent } from "./lib/processApi/logEventTostate";
import { state } from "./lib/state";
import { readDbSequence } from "./lib/utils/readDb";
import { delayFactory, getDMMessageStep } from "./lib/utils/messagingUtils";
import scenarioHandler from "./lib/behaviour/dm/scenarioHandler";
import { addDmTask } from "./lib/tasksApi/addTask";
import { TDMHandlerArgs } from "./lib/behaviour/dm/base";

const [
  apiId,
  apiHash,
  stringSession,
  behavior_model = "base",
  answers_db = "base",
  read_delay = "1000",
  type_delay_multiplier = "1",
] = process.argv.slice(2);

state.apiId = parseInt(apiId);
state.apiHash = apiHash;
state.stringSession = stringSession;
state.behavior_model = behavior_model;
state.answers_db = answers_db;
state.read_delay = parseInt(read_delay);
state.type_delay_multiplier = parseInt(type_delay_multiplier);

// const dmResponseOptions = {
//   answers_db,
//   read_delay,
//   type_delay_multiplier,
// };

const { readDelay, typeDelay } = delayFactory();

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
      });
      // code below is to move to task handlers
      //
      //
      await readDelay();
      // we cant use await message.markAsRead() because its not reproducable by params
      await client.markAsRead(senderId);

      await typeDelay(messageText);

      if (step === EDMMessageStep.FINISHED) {
        await dmHandler({
          step,
          message: messageText,
          client,
          senderId,
        });
      } else {
        await scenarioHandler({ count });
      }

      // here we need to create a pool of incoming messages
      // and somehow process them in sequence
      // and also we need to keep track on server wehter we have responded to the message
      // so bot's state on server in dmChats should be updated once we receive a message
      // with parameters, necessary to respond
      // and then bot on startup should aplly this state to itself, and then continue.
    }
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

    process.send({
      event_type: BotEventTypes.SET_SESSION_STRING,
      sessionString: client.session.save(),
    });

    process.send({ event_type: "STARTED" });
    logEvent(BotEventTypes.STARTED);

    client.addEventHandler((update) => {
      console.log("Received new Update");
      console.log(update.message);
    });

    client.addEventHandler(messageOrchestrator, new NewMessage({}));

    const combinedListeners = getCombinedListeners(listeners);

    const reducer = generalReducer({ client }, combinedListeners);
    process.on("message", async (message: ServerEvents) => {
      reducer(message);
    });
  } catch (error) {
    logEvent(BotEventTypes.ERROR, error.message);
  }
})();
