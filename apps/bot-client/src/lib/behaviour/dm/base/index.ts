import { BotEventTypes } from "@core/types/client";
import { NewMessageEvent } from "telegram/events";
import { logEvent } from "../../../processApi/logEventTostate";
import { state } from "../../../state";

export default async function dmHandler(event: NewMessageEvent) {
  try {
    const { message, client } = event;
    const sender = await message.getSender();

    const jsonState = JSON.stringify(state);

    await client.sendMessage(sender, {
      message: jsonState,
    });
  } catch (error) {
    logEvent(BotEventTypes.ERROR_DIRECT_MESSAGE, error.message);
  }
}
