import { BotEventTypes, TGroupLeaveTask } from "@core/types/client";
import { logEvent } from "../../processApi/logEventTostate";
import { removeTaskFromQueue } from "../processor";
import { TTaskProcessorArgs } from ".";
import { Api } from "telegram";

export const groupLeave = async ({
  client,
  task,
}: TTaskProcessorArgs<TGroupLeaveTask>) => {
  const { leaveGroupName } = task.payload;

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
};
