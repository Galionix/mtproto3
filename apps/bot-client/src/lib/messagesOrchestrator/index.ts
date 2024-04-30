import { BotEventTypes, EMessageType } from "@core/types/client";
import { NewMessageEvent } from "telegram/events";
// import { getDMMessageStep } from "../utils/messagingUtils";
import { logEvent } from "../processApi/logEventTostate";
import { state } from "../state";
import {
  addDmTask,
  addGroupResponseTask,
  addGroupSpamTask,
} from "../tasksApi/addTask";
import { defaultSpamInterval } from "../../constants";
import { Api } from "telegram";
import { getBotResponse } from "@core/functions";
import { responseMessageEmpty } from "./utils";
import { checkCodeHandler } from "../behaviour/dm/codeHandler";

export async function messageOrchestrator(event: NewMessageEvent) {
  console.log("event: ", event);
  const { isPrivate, isChannel, isGroup } = event;
  if (isPrivate) {
    const { client, chat, message } = event;
    console.log("-----------incomingMessage: ", message);
    await checkCodeHandler(event);

    const senderId = (await message.getSender()).id;
    const messageText = message.message;

    const messagesTexts: string[] = [];
    for await (const messageItem of client.iterMessages(message.peerId, {
      reverse: true,
    })) {
      // console.log("messageItem: ", messageItem);
      if (!messageItem.out) messagesTexts.push(messageItem.text);
    }

    const responseMessage = getBotResponse(state.dmScenario, messagesTexts);

    // const previousUserMessages = client.
    logEvent(
      BotEventTypes.DIRECT_MESSAGE,
      `originalMessageId: ${message.id} sender: ${message.senderId}, messageText: ${messageText}`
    );
    // WARN! replace below with new implementation
    // const { step, count } = await getDMMessageStep(client, senderId);

    if (!responseMessageEmpty(responseMessage)) {
      addDmTask({
        senderId,
        message: responseMessage,
        originalMessageId: message.id,
      });
    } else {
      await client.markAsRead(senderId);
    }
    // code below is to move to task handlers
    //
    //

    // here we need to create a pool of incoming messages
    // and somehow process them in sequence
    // and also we need to keep track on server wehter we have responded to the message
    // so bot's state on server in dmChats should be updated once we receive a message
    // with parameters, necessary to respond
    // and then bot on startup should aplly this state to itself, and then continue.
  }
  if (isGroup) {
    console.log("isGroup");
    const { message, client, chat } = event;
    // console.log("event: ", event);
    const { originalArgs } = message.peerId;
    // console.log("message: ", message);
    // if channelId - then it is a group
    if ("channelId" in originalArgs) {
      const channelIdString = originalArgs.channelId.toString();

      if (!(channelIdString in state.groupCounters)) {
        // if we have not seen this group before, we need to get its members count
        const groupMembers = await client.getParticipants(channelIdString);

        const groupMembersCount = groupMembers.length;
        // and then we need to add it to state
        state.groupCounters[channelIdString] = {
          messagesSinceLastSpam: 0,
          id: originalArgs.channelId,
          membersCount: groupMembersCount,
          spamInterval: defaultSpamInterval,
        };
      }
      state.groupCounters[channelIdString].messagesSinceLastSpam++;

      if (
        !message.mentioned &&
        state.groupCounters[channelIdString].messagesSinceLastSpam >=
          state.groupCounters[channelIdString].spamInterval
      ) {
        state.groupCounters[channelIdString].messagesSinceLastSpam = 0;
        addGroupSpamTask({
          spamGroupId: originalArgs.channelId,
        });

        // await client.sendMessage(channelIdString, {
        //   message: "answer",
        // });
      }
      if (message.mentioned) {
        // get full chat
        // const chatFull = await client.invoke(
        //   new Api.channels.GetFullChannel({
        //     channel: originalArgs.channelId,
        //   })
        // );
        // console.log("chatFull: ", chatFull);

        console.log("mentioned");
        // const { senderId } = message;
        console.log("message: ", message);
        const rootMessageList = await client.getMessages(message.peerId, {
          ids: [message.replyTo.replyToTopId || message.replyTo.replyToMsgId],
        });
        const rootMessageText = rootMessageList[0].message;
        console.log("rootMessageText: ", rootMessageText);
        // group conversations....
        // get history of messages

        // warn: maybe if we can distinguish if there is first message in the thread,
        // we can skip listing history
        // solution: if there is no message.replyTo.replyToTopId, then it is a first message
        const userTexts: string[] = [];
        if (message.replyTo.replyToTopId) {
          const replies = await client.getMessages(message.peerId, {
            replyTo: message.replyTo.replyToTopId,
            limit: 100,
            reverse: true,
          });
          console.log("replies: ", replies);
          // await client.sendMessage(channelIdString, {
          //   message: "answer",
          //   replyTo: message.id,
          // });
          // console.log("replies: ", replies);
          // const userTexts = replies
          //   .filter((reply) => reply.fromId.userId === message.fromId.userId)
          //   .map((reply) => reply.text);
          // console.log("userTexts: ", userTexts);
          for await (const reply of replies) {
            // we need to get all messages from this user
            // console.log("reply.fromId: ", reply.fromId);
            //
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (reply.fromId.userId.value === message.fromId.userId.value) {
              userTexts.push(reply.text);
              // console.log("reply: ", reply);
            }
            // console.log("reply.fromId,userId:", reply.fromId.userId);

            // if (reply.fromId === senderId.userId) {
            //   console.log("reply: ", reply);
            // }
          }
        } else {
          userTexts.push(message.text);
        }

        console.log("userTexts: ", userTexts);
        const originalMessage = state.spamDb.find(
          (spam) =>
            spam.type === EMessageType.TEXT &&
            spam.payload.text === rootMessageText
        );
        const scenarioId =
          "scenarioIdForSpam" in originalMessage.payload
            ? originalMessage.payload.scenarioIdForSpam
            : null;
        if (scenarioId) {
          const scenario = state.spamScenarios.find(
            (scenario) => scenario.id === scenarioId
          );
          if (scenario) {
            const responseMessage = getBotResponse(scenario, userTexts);

            console.log("add task", {
              message: responseMessage,
              channelIdString,
              replyTo: message.id,
              originalMessageId: message.replyTo.replyToTopId,
            });
            await addGroupResponseTask({
              message: responseMessage,
              channelIdString,
              replyTo: message.id,
              originalMessageId: message.replyTo.replyToTopId,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // chatId: message.peerId.channelId,
            });

            // // reply to incoming message with some text
          }
        }

        // const originalMessage = replies[0];
      }
    }
    // await client.getEntity(channelIdString);
    // await client.sendMessage(channelIdString, {
    //   message: "answer",
    // });
  }
}
