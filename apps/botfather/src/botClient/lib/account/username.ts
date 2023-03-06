import { TelegramClient, Api } from "telegram";

export async function checkUsername(client, username: string) {
  const result: boolean = await client.invoke(
    new Api.account.CheckUsername({
      username,
    })
  );
  return result;
  // console.log(result); // prints the result
}
