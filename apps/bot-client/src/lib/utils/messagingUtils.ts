import { getRandomInt } from "@core/functions";
import {
  EDMMessageStep,
  EDMMessageStepValues,
  EMessageType,
  TAnyDMMessageStep,
  TSendableMessage,
} from "@core/types/client";
import { Api, TelegramClient } from "telegram";
import { state } from "../state";


export const findDmAnswer = (request: string) => {
  let res: string = null;
  state.dmDb.forEach((answer) => {
    const requests = answer.request;
    requests.forEach((req) => {
      if (request.toLowerCase().includes(req.toLowerCase())) {
        //   pick random from answer.response array
        const randomValue = getRandomInt(answer.responses.length);
        const foundAnswer = answer.responses[randomValue];
        const messageProbabilityRes = Math.random();
        if (
          parseFloat(foundAnswer.coefficient) * state.message_probability >
          messageProbabilityRes
        ) {
          res = foundAnswer.text;
        }
      }
      if (res) {
        return res;
      }
    });
    if (res) {
      return res;
    }
  });
  return res;
};

export const delayFactory = () => {
  const readDelay = async () => {
    const delay = state.read_delay + getRandomInt(3);
    await new Promise((resolve) => setTimeout(resolve, delay));
  };

  const typeDelay = async (
    client: TelegramClient,
    message: TSendableMessage
    // senderId: bigInt.BigInteger
  ) => {
    const senderId = message.receiver;
    let delay = 5;

    switch (message.type) {
      case EMessageType.TEXT:
        // if ("text" in message) {
        delay = (message.payload.text.length / 4) * state.type_delay_multiplier;
        // }
        break;
      case EMessageType.AUDIO:
        // compute based on direction

        delay = 5;
        break;
      case EMessageType.PHOTO:
        delay = 5;
        break;
      case EMessageType.VIDEO:
        delay = 5;
        break;
      case EMessageType.REACTION:
        delay = 5;
        break;
      case EMessageType.STICKER:
        delay = 5;
        break;
    }
    // const delay =
    //   message.length/2.5 * state.type_delay_multiplier;
    console.log("delay: ", delay);
    //  each 5 seconds of delay we send typing action again
    const typingActionInterval = 3;

    const typingActionIntervalCount = Math.floor(delay / typingActionInterval);
    console.log("typingActionIntervalCount: ", typingActionIntervalCount);

    console.time("typeDelay");
    for (let i = 0; i < typingActionIntervalCount; i++) {
      await new Promise((resolve) =>
        setTimeout(async () => {
          // if (type === "text") {
          await client.invoke(
            new Api.messages.SetTyping({
              peer: senderId,
              action: new Api.SendMessageTypingAction(),
              // topMsgId: 43,
            })
          );
          // }
          resolve(true);
        }, (typingActionInterval + getRandomInt(2)) * 1000)
      );
    }
    console.timeEnd("typeDelay");
    // console.log("typeDelay", delay);
    // await new Promise((resolve) => setTimeout(resolve, delay));
  };
  const waitAfterTaskDelay = async () => {
    const delay = state.afterTaskDelay + getRandomInt(3);
    await new Promise((resolve) => setTimeout(resolve, delay));
  };

  const waitAfterTaskIdleTime = async () => {
    const delay = state.afterTaskIdleTime + getRandomInt(3);
    await new Promise((resolve) => setTimeout(resolve, delay));
  };

  return {
    readDelay,
    typeDelay,
    waitAfterTaskDelay,
    waitAfterTaskIdleTime,
  };
};

// export const getDMMessageStep = async (
//   client: TelegramClient,
//   senderId: bigInt.BigInteger
// ): Promise<{
//   step: TAnyDMMessageStep;
//   count: number;
// }> => {
//   // count sent messages to this user
//   const messages = await client.getMessages(senderId, {
//     limit: state.scenario.length + 2,
//     fromUser: "me",
//   });
//   console.log("messages: ", messages);
//   const messagesCount = messages.length;
//   console.log("messagesCount: ", messagesCount);

//   // if messages count is less than scenario length, we return corresponding step.
//   // if messages count is more than scenario length, we return 'finished' step.
//   // if messages count is zero, we return 'initial' step.

//   if (messagesCount > state.scenario.length - 1) {
//     return {
//       step: EDMMessageStep.FINISHED,
//       count: -1,
//     };
//   }

//   return {
//     step: EDMMessageStepValues[messagesCount],
//     // -1 because we cannot actually know, because we request 2 more messages than in scenario length
//     count: messagesCount,
//   };
// };

export const applyReplacements = (message: string) => {
  const { replacements } = state;

  // replacements are presented in object, where key is a string to replace, and value is a string to replace with
  // we iterate through all replacements and replace all occurrences of key with value
  // occurrences are case insensitive and surrounded by ##, so we can replace only whole words

  Object.keys(replacements).forEach((key) => {
    const regex = new RegExp(`##${key}##`, "gi");
    message = message.replace(regex, replacements[key]);
  });
  return message;
};

// export const sendTypingAction = async (
//   client: TelegramClient,
//   senderId: bigInt.BigInteger,
//   seconds: number,
//   type: TTypingType = "text"
// ) => {
//   //  await client.invoke(
//   //     new Api.messages.SetTyping({
//   //       peer: senderId,
//   //       action: new Api.SendMessageTypingAction(),
//   //       // topMsgId: 43,
//   //     })
//   //   );

//   //  each 5 seconds of delay we send typing action again
//   const typingActionInterval = 5;

//   const typingActionIntervalCount = Math.floor(seconds / typingActionInterval);
//   console.log("typingActionIntervalCount: ", typingActionIntervalCount);

//   console.time("typeDelay");
//   for (let i = 0; i < typingActionIntervalCount; i++) {
//     await new Promise((resolve) =>
//       setTimeout(async () => {
//         if (type === "text") {
//           await client.invoke(
//             new Api.messages.SetTyping({
//               peer: senderId,
//               action: new Api.SendMessageTypingAction(),
//               // topMsgId: 43,
//             })
//           );
//         }
//         resolve(true);
//       }, (typingActionInterval + getRandomInt(5)) * 1000)
//     );
//   }
// };

export const sendMessage = async (
  client: TelegramClient,
  // receiver: bigInt.BigInteger,
  message: TSendableMessage
  // replyToMessageId?: number
  // replyMarkup?: Api.TypeReplyMarkup,
) => {
  const { receiver, replyToMessageId } = message;
  switch (message.type) {
    case EMessageType.TEXT:
      // if ("text" in message) {
      return await client.sendMessage(receiver, {
        message: message.payload.text,
        replyTo: replyToMessageId,
        // replyMarkup,
      });
      // }
      break;
    case EMessageType.AUDIO:
      // await client.sendAudio(senderId, {
      //   file: message.payload.file,
      //   // replyTo: replyToMessageId,
      //   // replyMarkup,
      // });
      return await client.sendFile(receiver, {
        file: message.payload.audio,
        voiceNote: true,
        caption: message.payload.text,
      });
      break;
    case EMessageType.PHOTO:
      return await client.sendFile(receiver, {
        file: message.payload.photo,
        caption: message.payload.caption,
        replyTo: replyToMessageId,
      });
      // await client.sendPhoto(senderId, {
      //   file: message.payload.file,
      //   // replyTo: replyToMessageId,
      //   // replyMarkup,
      // });
      break;
    case EMessageType.VIDEO:
      return await client.sendFile(receiver, {
        file: message.payload.video,
        caption: message.payload.caption,
        replyTo: replyToMessageId,
      });
      // await client.sendVideo(senderId, {
      //   file: message.payload.file,
      //   // replyTo: replyToMessageId,
      //   // replyMarkup,
      // });
      break;
    case EMessageType.REACTION:
      return await client.invoke(
        new Api.messages.SendReaction({
          peer: receiver,
          msgId: replyToMessageId,
          reaction: [
            new Api.ReactionEmoji({
              emoticon: message.payload.reaction,
            }),
          ],
        })
      );
      // await client.sendMessage(senderId, {
      //   message: message.payload.text,
      //   replyTo: replyToMessageId,
      //   // replyMarkup,
      // });
      break;
    case EMessageType.STICKER:
      // await client.invoke(
      //   new Api.messages.SendMedia({
      //     peer: receiver,
      //     media: new Api.InputMediaUploadedPhoto({
      //       stickers: [new Api.InputMediaDocument({

      //         id: message.payload.file
      //       })],
      //     }),
      //     replyToMsgId: replyToMessageId,
      //   })
      // await client.sendSticker(senderId, {
      //   file: message.payload.file,
      //   // replyTo: replyToMessageId,
      //   // replyMarkup,
      // });
      break;
  }
};
