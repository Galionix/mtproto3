import bigInt from "big-integer";
import { TelegramClient, Api } from "telegram";

export async function getChatById(client: TelegramClient, chatId: string) {
  try {
    // const peer = await client.resolvePeer(chatId);
    // const entity = await client.getEntity(chatId);
    //   const chat = await client.getInputEntity(chatId);
    const id = bigInt(chatId);
    const entity = await client.invoke(
      new Api.messages.GetChats({
        id: [id],
      })
    );
    // console.log("entity: ", entity);
    return entity;
  } catch (error) {
    console.error("Failed to get chat entity:", error);
    return null;
  }
}
