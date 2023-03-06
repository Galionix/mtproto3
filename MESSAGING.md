# Messaging API

So due to fact that we need to manage multiple processes, we need to have a way to communicate between them. This is where the messaging API comes in.

Lets start with types.
we have apps\botfather\src\messagesTypes folder and two subfolders: bot-events and server-events.

bot events are events that are sent from the bot to the server. whenever the bot wants to send a message to the server, it will send a message of type BotEvents, in bot-events\index.ts also specified BotEventTypes its an enum of all the possible events that the bot can send to the server, like in redux, we have actions and action types, here we have events and event types.

current implementation consists of N steps:
1. define API in service

```typescript
    // 1. Service that exposing bot api to web should get bot state from botStateService, and get the child process from it
  constructor(private readonly botStateService: BotStateService) {}

  async setUsername(api_id: number, username: string) {

    const process = this.botStateService.getBotState(api_id);

    if (process) {
      const result = await sendAndWait(process.childProcess as ChildProcess, {
        event_type: ServerEventTypes.SET_USERNAME,
        username,
      });
      console.log("result: ", result);
      return result.event_type;
    }
  }
  ```
  2. somewhere in the bot, we need to listen to the messages from the server, and handle them.
  ```typescript
// this goes somewhere under the hood
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
```
and here is the main reducer

```typescript

  process.on("message", async (message: ServerEvents) => {
    let res;
    switch (message.event_type) {
      case ServerEventTypes.SET_USERNAME:
        res = setUsername(client, message.username);
        break;
    }
    return res;
    // if (res) {
  });
  ```
 for now its clumsy but very straightforward and easy to expand.
 <!-- TODO:make utility functions for make work with this easier AND WRITE TESTS FOR THEM FULL COVERAGE DAMMIT -->