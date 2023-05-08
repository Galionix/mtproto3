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
- []: setup coverage testing

### FEAT:

### FIX:

## Telegram bots (BotClient)
Telegram bots will be written in Mtproto. They will be able to send messages to the users, and receive messages from them. They will also be able to send messages to the main server, and receive messages from it.

Requirements:

bot should be able join groups and channels, and send messages to them.
joining will be initiated by the main server, so we need api endpoint for that.
for each join request, we need to track history of results of this action. actually we need
to track all actions, so we need to create a new table for that. when i say we, i mean me, copilot, and chatgpt.




### TODO:


### FEAT:

### FIX:

## Web interface
Web interface will be written in React. It will be used for managing the bots.


## Mobile app
Mobile app will be written in React Native. It will be used for managing the bots.


