import { BotEventTypes } from "@core/types/client";
import { NewMessageEvent } from "telegram/events";
import { getDMMessageStep } from "../utils/messagingUtils";
import { logEvent } from "../processApi/logEventTostate";
import { state } from "../state";
import { addDmTask, addGroupSpamTask } from "../tasksApi/addTask";
import { defaultSpamInterval } from "../../constants";

export async function messageOrchestrator(event: NewMessageEvent) {
  // console.log("event: ", event);
  /*event:  {
  originalUpdate: {
    CONSTRUCTOR_ID: 1656358105,
    SUBCLASS_OF_ID: 2676568142,
    className: 'UpdateNewChannelMessage',
    classType: 'constructor',
    message: {
      CONSTRUCTOR_ID: 940666592,
      SUBCLASS_OF_ID: 2030045667,
      className: 'Message',
      classType: 'constructor',
      out: false,
      mentioned: false,
      mediaUnread: false,
      silent: false,
      post: false,
      fromScheduled: false,
      legacy: false,
      editHide: false,
      ttlPeriod: null,
      id: 6,
      fromId: [Object],
      peerId: [Object],
      fwdFrom: null,
      viaBotId: null,
      replyTo: null,
      date: 1685645154,
      message: 'fghj',
      media: null,
      replyMarkup: null,
      entities: null,
      views: null,
      forwards: null,
      replies: [Object],
      editDate: null,
      pinned: false,
      postAuthor: null,
      groupedId: null,
      restrictionReason: null,
      action: undefined,
      noforwards: false,
      reactions: null,
      flags: 8388864
    },
    pts: 7,
    ptsCount: 1
  },
  message: {
    CONSTRUCTOR_ID: 940666592,
    SUBCLASS_OF_ID: 2030045667,
    className: 'Message',
    classType: 'constructor',
    out: false,
    mentioned: false,
    mediaUnread: false,
    silent: false,
    post: false,
    fromScheduled: false,
    legacy: false,
    editHide: false,
    ttlPeriod: null,
    id: 6,
    fromId: {
      CONSTRUCTOR_ID: 1498486562,
      SUBCLASS_OF_ID: 47470215,
      className: 'PeerUser',
      classType: 'constructor',
      userId: [Integer]
    },
    peerId: {
      CONSTRUCTOR_ID: 2728736542,
      SUBCLASS_OF_ID: 47470215,
      className: 'PeerChannel',
      classType: 'constructor',
      channelId: [Integer]
    },
    fwdFrom: null,
    viaBotId: null,
    replyTo: null,
    date: 1685645154,
    message: 'fghj',
    media: null,
    replyMarkup: null,
    entities: null,
    views: null,
    forwards: null,
    replies: {
      CONSTRUCTOR_ID: 2211844034,
      SUBCLASS_OF_ID: 1825397986,
      className: 'MessageReplies',
      classType: 'constructor',
      flags: 0,
      comments: false,
      replies: 0,
      repliesPts: 7,
      recentRepliers: null,
      channelId: null,
      maxId: null,
      readMaxId: null
    },
    editDate: null,
    pinned: false,
    postAuthor: null,
    groupedId: null,
    restrictionReason: null,
    action: undefined,
    noforwards: false,
    reactions: null,
    flags: 8388864
  }
}
    */
  const { isPrivate, isChannel, isGroup } = event;
  if (isPrivate) {
    const { client, chat, message } = event;

    const senderId = (await message.getSender()).id;
    const messageText = message.message;
    logEvent(BotEventTypes.DIRECT_MESSAGE, messageText);
    const { step, count } = await getDMMessageStep(client, senderId);

    addDmTask({
      senderId,
      message: messageText,
      step,
      count,
    });
    // code below is to move to task handlers
    //
    //

    // here we need to create a pool of incoming messages
    // and somehow process them in sequence
    // and also we need to keep track on server wehter we have responded to the message
    // so bot's state on server in dmChats should be updated once we receive a message
    // with parameters, necessary to respond
    // and then bot on startup should aplly this state to itself, and then continue.
  }
  if (isGroup) {
    const { message, client, chat } = event;
    const { originalArgs } = message.peerId;
    // if channelId - then it is a group
    if ("channelId" in originalArgs) {
      const channelIdString = originalArgs.channelId.toString();

      if (!(channelIdString in state.groupCounters)) {
        // if we have not seen this group before, we need to get its members count
        const groupMembers = await client.getParticipants(channelIdString);
        console.log("groupMembers: ", groupMembers);
        const groupMembersCount = groupMembers.length;
        // and then we need to add it to state
        state.groupCounters[channelIdString] = {
          messagesSinceLastSpam: 0,
          id: originalArgs.channelId,
          membersCount: groupMembersCount,
          spamInterval: defaultSpamInterval,
        };
      }
      state.groupCounters[channelIdString].messagesSinceLastSpam++;
      console.log("state.groupCounters: ", state.groupCounters);
      if (
        state.groupCounters[channelIdString].messagesSinceLastSpam >=
        state.groupCounters[channelIdString].spamInterval
      ) {
        state.groupCounters[channelIdString].messagesSinceLastSpam = 0;
        addGroupSpamTask({
          spamGroupId: originalArgs.channelId,
        });

        // await client.sendMessage(channelIdString, {
        //   message: "answer",
        // });
      }
    }
    // await client.getEntity(channelIdString);
    // await client.sendMessage(channelIdString, {
    //   message: "answer",
    // });
  }
}
