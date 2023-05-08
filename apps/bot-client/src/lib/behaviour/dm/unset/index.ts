import { NewMessageEvent } from "telegram/events";

export default async function dmHandler(event: NewMessageEvent) {
  const { client, message } = event;
  await client.sendMessage(message.senderId, {
    message: `dm handled hi your id is ${message.senderId}`,
  });
}
