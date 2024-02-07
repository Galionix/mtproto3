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

          const messagesTexts: string[] = [];
          for await (const messageItem of client.iterMessages(inputPeer, {
            reverse: true,
          })) {
            // console.log("messageItem: ", messageItem);
            if (!messageItem.out) messagesTexts.push(messageItem.text);
          }
          console.log("messagesTexts: ", messagesTexts);

          const responseMessage = getBotResponse(
            state.dmScenario,
            messagesTexts
          );
          console.log("responseMessage: ", responseMessage);

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
