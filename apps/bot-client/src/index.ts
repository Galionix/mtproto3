import { ServerEvents } from "@core/types/server";
import { TelegramClient } from "telegram";
import { NewMessageEvent, NewMessage } from "telegram/events";
import { StringSession } from "telegram/sessions";
import { BotEventTypes, TPhoneCode, TPhoneNumber } from "@core/types/client";
import { getCombinedListeners } from "./lib/processApi/combineListeners";
import { generalReducer } from "./lib/processApi/composeReducer";
import { listeners } from "./lib/processApi/listeners";
import { logEvent } from "./lib/processApi/logEventTostate";
import * as dmHandlers from "./lib/behaviour/dm";

console.log("dmHandlers: ", dmHandlers);

const [apiId, apiHash, stringSession, behaviour_model = "unset"] =
  process.argv.slice(2);

const dmHandler = dmHandlers[behaviour_model].default;

(async () => {
  function messageOrchestrator(client: TelegramClient) {
    return async function (event: NewMessageEvent) {
      // const message = event.message;

      // Checks if it's a private message (from user or bot)
      if (event.isPrivate) {
        dmHandler(client, event);
        // // prints sender id
        // console.log(message.senderId);
        // // read message
        // if (message.text == "hello") {
        //   const sender = await message.getSender();
        //   console.log("sender is", sender);
        //   await client.sendMessage(sender, {
        //     message: `hi your id is ${message.senderId}`,
        //   });
        // }
      }
    };
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

    client.addEventHandler(messageOrchestrator(client), new NewMessage({}));

    const combinedListeners = getCombinedListeners(listeners);

    const reducer = generalReducer({ client }, combinedListeners);
    process.on("message", async (message: ServerEvents) => {
      reducer(message);
    });
  } catch (error) {
    logEvent(BotEventTypes.ERROR, error.message);
  }
})();
