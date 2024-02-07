import {
  TRespondToDMMessage,
  EDMMessageStep,
  EMessageType,
  TSendableMessage,
} from "@core/types/client";
import { TTaskProcessorArgs } from ".";
import dmHandler from "../../behaviour/dm/base";
import scenarioHandler from "../../behaviour/dm/scenarioHandler";
import { removeTaskFromQueue } from "../processor";
import { delayFactory } from "../../utils/messagingUtils";
import { Api } from "telegram";

const { readDelay, typeDelay } = delayFactory();

export const respondToDMMessage = async ({
  client,
  task,
}: TTaskProcessorArgs<TRespondToDMMessage>) => {
  if (!task.payload || !task.payload.message || !task.payload.senderId) {
    removeTaskFromQueue(task);
  }
  // console.log('task: ', task);
  const { message, senderId, originalMessageId } = task.payload;
  await readDelay();
  // we cant use await message.markAsRead() because its not reproducable by params
  await client.markAsRead(task.payload.senderId);
  if (!message) return;
  const { type, ...payload } = message;

  const sendableMessage = {
    receiver: task.payload.senderId,
    type,
    payload,
  } as TSendableMessage;

  try {
    const reactions: Api.TypeReaction[] = [
      new Api.ReactionEmoji({
        emoticon: "👍",
      }),
    ];
    if (originalMessageId > 0) {
      const result = await client.invoke(
        new Api.messages.SendReaction({
          peer: senderId,
          msgId: originalMessageId,
          reaction: reactions,
        })
      );

      console.log("result: ", result);
    }
  } catch (error) {
    console.error("error: ", error);
  }

  await typeDelay(client, sendableMessage);

  // if (step === EDMMessageStep.FINISHED) {
  //   await dmHandler({
  //     step,
  //     message,
  //     client,
  //     senderId,
  //     count,
  //   });
  // } else {
  await scenarioHandler({ client, senderId, sendableMessage });
  // }

  removeTaskFromQueue(task);
};
