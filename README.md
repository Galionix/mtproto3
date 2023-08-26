# My project

this project consists of few parts:
- Main server for managing the database, which will include all info regarding telegram bots. It will collect data from the bots and store it in the database. Also it will provide an API for managing the bots. Such as adding, removing, editing, etc.
- Telegram bot instances. These will be the bots that will be managed by the main server. They will be able to send messages to the users, and receive messages from them. They will also be able to send messages to the main server, and receive messages from it.
- Web interface. This will be a web interface for managing the bots.
- Mobile app. This will be a mobile app for managing the bots.


## Main server (Botfather)
Main server will be written in NestJS. It will be a REST API, which will be used by the telegram bots and the web interface.

This server will be responsible for managing the database, which will include all info regarding telegram bots. It will collect data from the bots and store it in the database. Also it will provide an API for managing the bots. Such as adding, removing, editing, etc.

Requirements:

When i want to add a new bot, i want to be able to add it by providing the following info:
- api_id
- api_hash
- stringSession

### Completed:
- [x]: updating state corresponding to the crd operations
- [x]: register new bot trough graphql

### TODO:
- [ ] Move to redis
- [ ] cron to postgres once per 5-10 minutes

- [ ]: interactive scenarios
- [ ]: setup coverage testing

### FEAT:

### FIX:

## Telegram bots (BotClient)
Telegram bots will be written in Mtproto. They will be able to send messages to the users, and receive messages from them. They will also be able to send messages to the main server, and receive messages from it.

Requirements:

bot should be able join groups and channels, and send messages to them.
joining will be initiated by the main server, so we need api endpoint for that.
for each join request, we need to track history of results of this action. actually we need
to track all actions, so we need to create a new table for that. when i say we, i mean me, copilot, and chatgpt.


### DM messages features:
- [ ]: keep track of conversation state: this must include type of conversation, and the state of the conversation. Possible value:
conversationState : {
    behavior: 'base',
    senderID: '123456789',
    messageText: 'hello',
    date: '2021-01-01',
    step:
    [
         // user just started the conversation
        'initial',
        // user is in the middle of scenario
        'step1','step2','step3','stepN',
        // user finished the scenario
        'finished'
    ]
}

And on server bot should have an array of states for each conversation. We dont store conversations with step 'finished'.

- [ ]: messages should be processed in sequence, from latest to newest.



### TODO:

- [ ]: automatically count how often bot should send in group chat a spam message. Something do deal with counting total messages in hour.
- [ ]: bot should have task list. This list should include minimal description for such bot activities:
spamming to group chats, responding to private messages, responding to group chats.


### FEAT:

### FIX:

## Web interface
Web interface will be written in React. It will be used for managing the bots.


## Mobile app
Mobile app will be written in React Native. It will be used for managing the bots.


## Package Scripts description:
"botfather:serve": "nx serve botfather",

- This command will start the botfather server.

### "botfather:test:watch": "nx test botfather --watch --verbose"
- currently not working
### "botfather:e2e": "nx e2e botfather-e2e"
- currently not working
### "botfather:e2e:watch": "nx e2e botfather-e2e --watch"
- currently not working
### "botfather:e2e:coverage": "nx e2e botfather-e2e --coverage"
- currently not working
### "bot-client:build": "nx build bot-client"
- This command will build the bot-client app.
### "bot-client:build:watch": "nodemon"
- This command will restart building the bot-client app when changes are made. Configured in nodemon.json

