import {
  BotEventTypes,
  EDMMessageStep,
  ETaskType,
  TTask,
} from "@core/types/client";
import dmHandler from "../behaviour/dm/base";
import { Api, TelegramClient } from "telegram";
import { delayFactory } from "../utils/messagingUtils";
import scenarioHandler from "../behaviour/dm/scenarioHandler";
import { state } from "../state";
import { logEvent } from "../processApi/logEventTostate";
import { addJoinGroupTask } from "./addTask";

export type TTaskProcessor = (
  task: TTask,
  client: TelegramClient
) => Promise<true>;
const { readDelay, typeDelay } = delayFactory();

export const taskProcessor: TTaskProcessor = async (task, client) => {
  console.time("taskProcessor: " + task.id);
  const { payload } = task;

  switch (task.type) {
    case ETaskType.RESPOND_TO_DM_MESSAGE:
      console.log("processing dm message", payload);
      // here type guard is necessary
      if ("step" in payload) {
        const { step, message, senderId, count } = payload;
        await readDelay();
        // we cant use await message.markAsRead() because its not reproducable by params
        await client.markAsRead(payload.senderId);

        await typeDelay(client, message, senderId);

        if (step === EDMMessageStep.FINISHED) {
          await dmHandler({
            step,
            message,
            client,
            senderId,
            count,
          });
        } else {
          await scenarioHandler({ count, client, senderId });
        }

        removeTaskFromQueue(task);
      }
      break;

    case ETaskType.GROUP_JOIN:
      if ("joinGroupName" in payload) {
        // console.log("processing group join", payload);
        const { joinGroupName } = payload;
        // check if we have joined groups lately
        // if not, join one

        // if yes, push task to the queue

        if (state.latestGroupJoinDate < Date.now() - state.groupJoinInterval) {
          // join
          console.log("joining group", joinGroupName);

          const res = await client.invoke(
            new Api.channels.JoinChannel({
              channel: joinGroupName,
            })
          );
          // TODO: check if we have joined
          /*
res:  {
  CONSTRUCTOR_ID: 1957577280,
  SUBCLASS_OF_ID: 2331323052,
  className: 'Updates',
  classType: 'constructor',
  updates: [],
  users: [],
  chats: [
    {
      CONSTRUCTOR_ID: 2200278116,
      SUBCLASS_OF_ID: 3316604308,
      className: 'Channel',
      classType: 'constructor',
      flags: 537141568,
      creator: false,
      left: false,
      broadcast: false,
      verified: false,
      megagroup: true,
      restricted: false,
      signatures: false,
      min: false,
      scam: false,
      hasLink: false,
      hasGeo: false,
      slowmodeEnabled: false,
      callActive: false,
      callNotEmpty: false,
      fake: false,
      gigagroup: false,
      noforwards: false,
      joinToSend: false,
      joinRequest: true,
      forum: false,
      flags2: 0,
      id: [Integer],
      accessHash: [Integer],
      title: 'Одесский Чат 🇺🇦',
      username: 'odessachatLIFE',
      photo: [Object],
      date: 1685330771,
      restrictionReason: null,
      adminRights: null,
      bannedRights: null,
      defaultBannedRights: [Object],
      participantsCount: null,
      usernames: null
    }
  ],
  date: 1685330865,
  seq: 0
}
*/
          console.log("res: ", res);
          logEvent(BotEventTypes.CHAT_JOINED, joinGroupName);
          process.send({
            event_type: BotEventTypes.CHAT_JOINED,
            chatName: joinGroupName,
          });
          state.latestGroupJoinDate = Date.now();
          removeTaskFromQueue(task);
        } else {
          // addJoinGroupTask({ joinGroupName });

          console.log("skipping group join");
          console.log("latestGroupJoinDate: ", state.latestGroupJoinDate);
          console.log(
            "join groups time:" + (Date.now() - state.groupJoinInterval)
          );
        }
        console.log("group join processed");
      }
      break;
    case ETaskType.GROUP_LEAVE:
      if ("leaveGroupName" in payload) {
        console.log("processing group leave", payload);
        const { leaveGroupName } = payload;

        const res = await client.invoke(
          new Api.channels.LeaveChannel({
            channel: leaveGroupName,
          })
        );
        console.log("res: ", res);
        /*
        res:  {
  CONSTRUCTOR_ID: 1957577280,
  SUBCLASS_OF_ID: 2331323052,
  className: 'Updates',
  classType: 'constructor',
  updates: [],
  users: [],
  chats: [
    {
      CONSTRUCTOR_ID: 2200278116,
      SUBCLASS_OF_ID: 3316604308,
      className: 'Channel',
      classType: 'constructor',
      flags: 537141572,
      creator: false,
      left: true,
      broadcast: false,
      verified: false,
      megagroup: true,
      restricted: false,
      signatures: false,
      min: false,
      scam: false,
      hasLink: false,
      hasGeo: false,
      slowmodeEnabled: false,
      callActive: false,
      callNotEmpty: false,
      fake: false,
      gigagroup: false,
      noforwards: false,
      joinToSend: false,
      joinRequest: true,
      forum: false,
      flags2: 0,
      id: [Integer],
      accessHash: [Integer],
      title: 'Одесский Чат 🇺🇦',
      username: 'odessachatLIFE',
      photo: [Object],
      date: 1685332014,
      restrictionReason: null,
      adminRights: null,
      bannedRights: null,
      defaultBannedRights: [Object],
      participantsCount: null,
      usernames: null
    }
  ],
  date: 1685332013,
  seq: 0
}
        */
        logEvent(BotEventTypes.CHAT_LEFT, leaveGroupName);
        process.send({
          event_type: BotEventTypes.CHAT_LEFT,
          chatName: leaveGroupName,
        });
        removeTaskFromQueue(task);
      }
      break;

    case ETaskType.RESPOND_TO_GROUP_MESSAGE:
      break;
    default:
      throw new Error(`Unknown task type`);
  }

  // state.tasks = state.tasks.filter((t) => t.id !== task.id);

  // if (task.type === ETaskType.RESPOND_TO_DM_MESSAGE) {
  //   if ('step' in payload) {
  //     const task2 = task
  //     const dmMessageStep = payload.step;
  //     await dmHandler({ ...payload, client });
  //   }
  // }
  // if( task.type === ETaskType.RESPOND_TO_GROUP_MESSAGE){
  //   // await dmHandler({ ...payload, client });
  // }
  console.timeEnd("taskProcessor: " + task.id);
  return true;
};

// this is the main task processor
// it takes a task and processes it
// it is called from the main process after idle time
// first step is to arrange tasks by state.taskOrder
// some tasks need to be groupped or deduped
// this is responsibility of the taskArranger function

function removeTaskFromQueue(task: TTask) {
  const { id } = task;

  state.tasks = state.tasks.filter((t) => t.id !== id);
}
