import { BotEventTypes } from "@core/types/client";
import { NewMessageEvent } from "telegram/events";
import { logEvent } from "../../../processApi/logEventTostate";
// import { state } from "../../../state";
import { findDmAnswer } from '../../../utils/messagingUtils';

export default async function dmHandler(event: NewMessageEvent) {
  try {
    const { message, client } = event;
    const sender = await message.getSender();

    const answer = findDmAnswer(message.message);
    await client.sendMessage(sender, {
      message: answer,
    });
  } catch (error) {
    logEvent(BotEventTypes.ERROR_DIRECT_MESSAGE, error.message);
  }
}
