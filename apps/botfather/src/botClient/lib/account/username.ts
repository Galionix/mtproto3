import { TelegramClient, Api } from "telegram";
import { BotEventTypes } from "../../../messagesTypes/bot-events";
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

export async function setUsername(client: TelegramClient, username: string) {
  if (await isUsernameAvailable(client, username)) {
    await client.invoke(
      new Api.account.UpdateUsername({
        username,
      })
    );
    process.send({ type: BotEventTypes.USERNAME_SET, username });
  } else {
    process.send({
      type: BotEventTypes.USERNAME_NOT_AVAILABLE,
      username,
    });
  }
}
