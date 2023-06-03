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


// async function dmHandlerOld(event: NewMessageEvent) {
//   try {
//     const { message, client } = event;
//     const sender = await message.getSender();

//     const answer = findDmAnswer(message.message);
//     console.log("answer", answer);
//     if (!answer) {
//       return;
//     }
//     await client.sendMessage(sender, {
//       message: answer,
//     });
//   } catch (error) {
//     logEvent(BotEventTypes.ERROR_DIRECT_MESSAGE, error.message);
//   }
// }

// upper function uses functions applied to message entity. we cant use it because
// we dont have access to message entity in the context of pool of messages

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

    const answer = findDmAnswer(message);
    if (!answer) {
      return;
    }
    const sendableMessage: TSendableMessage = {
      receiver: senderId,
      type: EMessageType.TEXT,
      payload: {
        text: answer,
      },
    };
    await sendMessage(client, sendableMessage);
    // await client.sendMessage(senderId, {
    //   message: answer,
    // });
  } catch (error) {
    logEvent(BotEventTypes.ERROR_DIRECT_MESSAGE, error.message);
  }
}
