import { TelegramClient, Api } from "telegram";
import { BotEventTypes } from "../../../messagesTypes/bot-events";
import { ServerEventTypes } from "../../../messagesTypes/server-events";
import {
  IDefaultListenerArgs,
  TListener,
} from "../processApi/combineListeners";
// import {
//   ServerEvents,
//   ServerEventTypes,
// } from "../../../messagesTypes/server-events";
export async function isUsernameAvailable(
  client: TelegramClient,
  username: string
) {
  const result: boolean = await client.invoke(
    new Api.account.CheckUsername({
      username,
    })
  );
  return result;
  // console.log(result); // prints the result
}

export const setUsername =
  ({ client }: IDefaultListenerArgs) =>
  async ({ username }: { username: string }) => {
    if (await isUsernameAvailable(client, username)) {
      await client.invoke(
        new Api.account.UpdateUsername({
          username,
        })
      );
      process.send({ event_type: BotEventTypes.USERNAME_SET, username });
    } else {
      process.send({
        event_type: BotEventTypes.USERNAME_NOT_AVAILABLE,
        username,
      });
    }
  };

export const changeUsernameListener = {
  event_type: ServerEventTypes.SET_USERNAME,
  listener: setUsername,
};
