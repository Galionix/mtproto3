import {
  TRespondToDMMessage,
  EDMMessageStep,
  EMessageType,
  TSendableMessage,
  TRespondToGroupMessage,
} from "@core/types/client";
import { TTaskProcessorArgs } from ".";
import dmHandler from "../../behaviour/dm/base";
import scenarioHandler from "../../behaviour/dm/scenarioHandler";
import { removeTaskFromQueue } from "../processor";
import { delayFactory } from "../../utils/messagingUtils";
import { Api } from "telegram";
import { randomInt } from "crypto";
import { logEvent } from "../../processApi/logEventTostate";

const reactionsString = "❤️";

const { readDelay, typeDelay } = delayFactory();

export const respondToGroupMessage = async ({
  client,
  task,
}: TTaskProcessorArgs<TRespondToGroupMessage>) => {
  // get chat full

  //   console.log("chatFull: ", chatFull);
  if (!task.payload || !task.payload.message || !task.payload.channelIdString) {
    removeTaskFromQueue(task);
  }
  // console.log('task: ', task);
  const { message, channelIdString, originalMessageId, replyTo } = task.payload;
  await readDelay();
  // we cant use await message.markAsRead() because its not reproducable by params
  await client.markAsRead(channelIdString);
  if (!message) return;
  const { type, ...payload } = message;

  const sendableMessage = {
    receiver: channelIdString,
    type,
    payload,
  } as TSendableMessage;

  // reaction invalid(((
  //   try {
  //     if (randomInt(100) > 50) {
  //       const reactionsArray = reactionsString.split(",");
  //       const randomReaction =
  //         reactionsArray[randomInt(reactionsArray.length - 1)];
  //       console.log("randomReaction: ", randomReaction);
  //       const reactions: Api.TypeReaction[] = [
  //         new Api.ReactionEmoji({
  //           emoticon: randomReaction,
  //         }),
  //       ];
  //       //   if (replyTo > 0) {
  //       const result = await client.invoke(
  //         new Api.messages.SendReaction({
  //           peer: channelIdString,
  //           msgId: replyTo,
  //           reaction: reactions,
  //         })
  //       );

  //       console.log("result: ", result);
  //       //   }
  //     }
  //   } catch (error) {
  //     console.error("error: ", error);
  //   }

  await typeDelay(client, sendableMessage, async (error) => {
    logEvent("ERROR_DIRECT_MESSAGE", JSON.stringify({ error, message }));
  });

  await scenarioHandler({
    client,
    senderId: task.payload.channelIdString,
    sendableMessage,
    replyTo: task.payload.replyTo,
  });
  // }

  removeTaskFromQueue(task);
};
