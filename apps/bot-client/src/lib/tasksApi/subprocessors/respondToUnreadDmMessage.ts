import { BotEventTypes, TRespondToUnread } from "@core/types/client";
import { TTaskProcessorArgs } from ".";
import { TelegramClient, Api } from "telegram";
import BigInt from "big-integer";
import { state } from "../../state";
import { getBotResponse } from "@core/functions";
import { logEvent } from "../../processApi/logEventTostate";
import { addDmTask } from "../addTask";
import { removeTaskFromQueue } from "../processor";
import { responseMessageEmpty } from "../../messagesOrchestrator/utils";

function reduceMessages(
  messagesMap: {
    text: string;
    isOut: boolean;
  }[]
): string[] {
  // Check if the messagesMap array is empty
  if (messagesMap.length === 0) {
    return [];
  }

  // Initialize an array to hold the reduced messages
  const reducedMessages: {
    text: string;
    isOut: boolean;
  }[] = [];

  // Loop through the messagesMap array
  for (let i = 0; i < messagesMap.length; i++) {
    // Include the first message and any message that has a different isOut flag than the previous message
    if (i === 0 || messagesMap[i].isOut !== messagesMap[i - 1].isOut) {
      reducedMessages.push(messagesMap[i]);
    }
  }

  // Filter out messages where isOut is true and map to extract the text
  return reducedMessages
    .filter((message) => !message.isOut)
    .map((message) => message.text);
}

export const respondToUnreadDmMessage = async ({
  client,
  task,
}: TTaskProcessorArgs<TRespondToUnread>) => {
  //   console.log(state);
  const result = await client.invoke(
    new Api.messages.GetDialogs({
      offsetDate: 0,
      offsetPeer: new Api.InputPeerSelf(),
      limit: 100,
    })
  );

  if (
    result instanceof Api.messages.Dialogs ||
    result instanceof Api.messages.DialogsSlice
  ) {
    // Loop through dialogs and filter for those with an unreadCount
    for (const dialog of result.dialogs) {
      // Attempt to access unreadCount with a type guard
      if ("unreadCount" in dialog && dialog.unreadCount > 0) {
        // Get the input peer for the dialog
        const inputPeer = await client.getInputEntity(dialog.peer);

        // Check if the dialog is with a user (direct message)
        if (inputPeer instanceof Api.InputPeerUser) {
          const senderId = inputPeer.userId;
          // const messageText = message.message;

          const messagesMap: {
            text: string;
            isOut: boolean;
          }[] = [];
          // here we need to dedupe subsequent messages from user, reduce them to one.
          for await (const messageItem of client.iterMessages(inputPeer, {
            reverse: true,
          })) {
            messagesMap.push({
              text: messageItem.text,
              isOut: messageItem.out,
            });
          }
          const messagesTexts = reduceMessages(messagesMap);


          // const lastMessage = messagesTexts[messagesTexts.length - 1];
          const responseMessage = getBotResponse(
            state.dmScenario,
            messagesTexts
          );

          // const previousUserMessages = client.
          logEvent(
            BotEventTypes.DIRECT_MESSAGE,
            "unread dialog with user:" + inputPeer.userId
          );
          // WARN! replace below with new implementation
          // const { step, count } = await getDMMessageStep(client, senderId);

          logEvent(
            BotEventTypes.DIRECT_MESSAGE,
            `unread dialog with user: ${senderId}, messageText: ${responseMessage}`
          );
          if (!responseMessageEmpty(responseMessage)) {
            addDmTask({
              senderId,
              message: responseMessage,
              originalMessageId: 0,
            });
          }
        }
      }
    }
    removeTaskFromQueue(task);
  }
};
