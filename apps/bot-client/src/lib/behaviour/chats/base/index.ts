import { BotEventTypes } from "@core/types/client";
import { NewMessageEvent } from "telegram/events";
import { logEvent } from "../../../processApi/logEventTostate";

export default async function chatHandler(
  event: NewMessageEvent,
  answers_db: string
) {
  try {
    const { message, client } = event;
    const sender = await message.getSender();
    await client.sendMessage(sender, {
      message: `dm handled hi your id is ${message.senderId}`,
    });
  } catch (error) {
    logEvent(BotEventTypes.ERROR_DIRECT_MESSAGE, error.message);
  }
}
