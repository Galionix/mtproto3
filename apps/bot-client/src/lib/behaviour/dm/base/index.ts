import {
  BotEventTypes,
  EMessageType,
  // TRespondToDMMessage,
  TRespondToDMMessagePayload,
  TSendableMessage,
  // TTask,
} from "@core/types/client";
// import { NewMessageEvent } from "telegram/events";
import { logEvent } from "../../../processApi/logEventTostate";
// import { state } from "../../../state";
import { findDmAnswer, sendMessage } from "../../../utils/messagingUtils";
// import { message } from "telegram/client";
import { TelegramClient } from "telegram";

export type TDMHandlerArgs = TRespondToDMMessagePayload & {
  client: TelegramClient;
};
export default async function dmHandler({
  message,
  client,
  senderId,
}: TDMHandlerArgs) {
  try {
    /*
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
    */

    // const answer = findDmAnswer(message);
    if (!message) {
      return;
    }
    const { type, ...payload } = message;
    const sendableMessage = {
      receiver: senderId,
      type,
      payload,

      // !TODO: resolve types
    } as TSendableMessage;
    await sendMessage(client, sendableMessage);
    // await client.sendMessage(senderId, {
    //   message: answer,
    // });
  } catch (error) {
    logEvent(BotEventTypes.ERROR_DIRECT_MESSAGE, error.message);
  }
}
