example for sending immideate action to bot:
1. update file server-events.ts
2. update error type to log this if it fails in bot here
libs\core\src\types\client\bot-events\errors.ts
3. create listener in bot for this message type
create listener file in apps\bot-client\src\lib\listeners
4. connect listener to general pool in
apps\bot-client\src\lib\processApi\listeners.ts
5. add function to corresponding resolver in server, for example in file
apps\botfather\src\services\settings-service\settings.service.ts
pay attention to this function:
sendToBot(childProcess: ChildProcess, message: ServerEvents, wait?: boolean, waitTimeout?: number)
if you dont want to wait for response, just call it with false, and it will return immediately
if you dont handle wait, it will fall!
6. add function to corresponding resolver in bot, for example in file
apps\botfather\src\bot\bot.resolver.ts

  @Mutation(() => BotStateEntity, { name: "hidePhoneNumber" })
  async hidePhoneNumber(
    @Args("botDbId", { type: () => String}) botDbId: string
  ) {
    return await this.messagingSettingsService.hidePhoneNumber(botDbId);
  }


## call mutation on frontend to trigger this action
7. create mutation function. for example in file
apps\frontend\pages\bots\[id]\gql.ts
for types to work there must be running a "codegen" script, that will generate types for you. If it fails (something red in cli and message appeared) this means you messed with types or args. Check it with resolver.
8. call this mutation in component