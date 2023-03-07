import { TelegramClient, Api } from "telegram";
import { NewMessageEvent, NewMessage } from "telegram/events";
import { StringSession } from "telegram/sessions";
import {
  TPhoneCode,
  TPhoneNumber,
} from "../messagesTypes/bot-events/registration";
import { ServerEvents, ServerEventTypes } from "../messagesTypes/server-events";
import { setUsername } from "./lib/account/username";
import { getCombinedListeners } from "./lib/processApi/combineListeners";
import { generalReducer } from "./lib/processApi/composeReducer";
import { listeners } from "./lib/processApi/listeners";

const [apiId, apiHash, stringSession] = process.argv.slice(2);
(async () => {
  // console.log("Loading interactive example...");
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
      process.send({ event_type: "PHONE_CODE_REQUIRED" });
      return new Promise((resolve) => {
        process.on("message", (message: TPhoneCode) => {
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
          if (message.event_type === "PHONE_NUMBER") {
            resolve(message.number);
          }
        });
      });
    },
    // password: async () => await input.text("Please enter your password: "),
    // phoneCode: async () =>
    //   await input.text("Please enter the code you received: "),
    onError: (err) => {
      process.send({ event_type: "ERROR", error: err });
      console.log(err);
    },
  });

  await client.connect();
  console.log(apiId, " connected.");

  process.send({
    event_type: "SET_SESSION_STRING",
    sessionString: client.session.save(),
  });

  process.send({ event_type: "STARTED" });

  client.addEventHandler((update) => {
    console.log("Received new Update");
    console.log(update.message);
  });

  async function eventPrint(event: NewMessageEvent) {
    const message = event.message;

    // Checks if it's a private message (from user or bot)
    if (event.isPrivate) {
      // prints sender id
      console.log(message.senderId);
      // read message
      if (message.text == "hello") {
        const sender = await message.getSender();
        console.log("sender is", sender);
        await client.sendMessage(sender, {
          message: `hi your id is ${message.senderId}`,
        });
      }
    }
  }

  client.addEventHandler(eventPrint, new NewMessage({}));

  const combinedListeners = getCombinedListeners(listeners);

  const reducer = generalReducer({ client }, combinedListeners);
  process.on("message", async (message: ServerEvents) => {
    reducer(message);
  });
})();
