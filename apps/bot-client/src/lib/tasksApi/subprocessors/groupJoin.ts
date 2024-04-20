import { TGroupJoinTask, BotEventTypes } from "@core/types/client";
import { Api } from "telegram";
import { TTaskProcessorArgs } from ".";
import { logEvent } from "../../processApi/logEventTostate";
import { state } from "../../state";
import { removeTaskFromQueue } from "../processor";

export const groupJoin = async ({
  client,
  task,
}: TTaskProcessorArgs<TGroupJoinTask>) => {
  // console.log("processing group join", payload);
  const { joinGroupName } = task.payload;
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

    /*
    Property 'chats' does not exist on type 'TypeUpdates'.
  Property 'chats' does not exist on type 'UpdatesTooLong'.
    */
    if (res instanceof Api.Updates) {
      process.send({
        event_type: BotEventTypes.LIST_GROUPS,

        groups: [
          {
            chat_id: res.chats[0].id[0],
            name: "title" in res.chats[0] ? res.chats[0].title : "",
            username: "username" in res.chats[0] ? res.chats[0].username : "",
            total_members:
              "participantsCount" in res.chats[0]
                ? res.chats[0].participantsCount || 0
                : -1,
          },
        ],
      });
    }

    state.latestGroupJoinDate = Date.now();
    removeTaskFromQueue(task);
  } else {
    // addJoinGroupTask({ joinGroupName });

    console.log("skipping group join");
    console.log("latestGroupJoinDate: ", state.latestGroupJoinDate);
    console.log("join groups time:" + (Date.now() - state.groupJoinInterval));
  }
  console.log("group join processed");


};
