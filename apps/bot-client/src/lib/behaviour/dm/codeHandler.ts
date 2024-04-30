import { sendToFather } from "@core/functions";
import {
  RegistrationEventTypes,
  RegistrationResponseTypes,
} from "@core/types/client";
import { NewMessageEvent } from "telegram/events";

export const checkCodeHandler = async (event: NewMessageEvent) => {
  if (event.message.message.includes("Web login code.")) {
    // parse code from such message
    /*
      'Web login code. Dear Bulah, we received a request from your account to log in on my.telegram.org. This is your login code:\n' +
      'jd7yTH9T7eA\n' +
      '\n' +
      "Do not give this code to anyone, even if they say they're from Telegram! This code can be used to delete your Telegram account. We never ask to send it anywhere. \n" +
      '\n' +
      "If you didn't request this code by trying to log in on my.telegram.org, simply ignore this message.",
      */
    const code = event.message.text.split("\n")[1];
    console.log("parsed code: ", code);
    // send code to father process
    sendToFather(process, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   @ts-ignore
      event_type: RegistrationResponseTypes.RESPONSE_CODE,
      code,
      // response_types: [RegistrationResponseTypes.RESPONSE_CODE],
    });
  } else {
    return;
  }
};
