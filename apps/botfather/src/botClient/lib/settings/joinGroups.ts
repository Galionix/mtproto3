import { Api, TelegramClient } from "telegram";
import { JoinGroupsInput } from "../../../bot/dto/join-group.input";
import { BotEventTypes } from "../../../messagesTypes/bot-events";
import { ServerEventTypes } from "../../../messagesTypes/server-events";
import { IDefaultListenerArgs } from "../processApi/combineListeners";
// import { getChatById } from "../utils/getEntity";

// async function joinChannel(client: TelegramClient, channelUsername: string) {
//   try {
//     const result = await client.invoke(new Api.channels.JoinChannel(), {});
//     console.log(`Successfully joined channel ${channelUsername}`);
//   } catch (error) {
//     console.error(`Failed to join channel ${channelUsername}:`, error);
//   }
// }

export const joinGroups =
  ({ client }: IDefaultListenerArgs) =>
  ({
    chat_ids,
    // api_ids,
    // behaviour_model,
    // processing_enabled,
    // spam_frequency,
    join_delay,
  }: JoinGroupsInput) => {
    chat_ids.forEach(async (chat_id, index) => {
      setTimeout(async () => {
        console.log("chat_id: ", chat_id);

        const result = await client.invoke(
          new Api.channels.JoinChannel({
            channel: chat_id,
          })
        );
        // console.log(result); // prints the result
        process.send({ event_type: BotEventTypes.CHAT_JOINED, chat_id });
      }, join_delay * (index + 1));
    });
  };

export const joinGroupsListener = {
  event_type: ServerEventTypes.JOIN_GROUPS,
  listener: joinGroups,
};
