import { BotEventTypes } from "@core/types/client";
import { JoinGroupsInput, ServerEventTypes } from "@core/types/server";
import { Api } from "telegram";
import { IDefaultListenerArgs } from "../processApi/combineListeners";
import { logEvent } from "../processApi/logEventTostate";
import { addJoinGroupTask, addLeaveGroupTask } from "../tasksApi/addTask";

// TODO: Finish wiring: add api_ids, behavior_model, processing_enabled, spam_frequency
export const joinGroups =
  ({ client }: IDefaultListenerArgs) =>
  ({
    chatNames,
    // api_ids,
    // behavior_model,
    // processing_enabled,
    // spam_frequency,
    join_delay,
  }: JoinGroupsInput) => {
    chatNames.forEach(async (joinGroupName, index) => {
      addJoinGroupTask({
        joinGroupName,
      });
      // setTimeout(async () => {
      //   console.log("chatNames: ", chatNames);

      //   await client.invoke(
      //     new Api.channels.JoinChannel({
      //       channel: chatNames,
      //     })
      //   );
      //   logEvent(BotEventTypes.CHAT_JOINED, chatNames);
      //   process.send({ event_type: BotEventTypes.CHAT_JOINED, chatNames });
      // }, join_delay * (index + 1));
    });
  };

export const leaveGroups =
  ({ client }: IDefaultListenerArgs) =>
  ({ chatNames }: { chatNames: string[] }) => {
    chatNames.forEach(async (groupName, index) => {
      addLeaveGroupTask({
        groupName,
      });
      // setTimeout(async () => {
      //   console.log("chatNames: ", chatNames);

      //   try {
      //     await client.invoke(
      //       new Api.channels.LeaveChannel({
      //         channel: chatNames,
      //       })
      //     );
      //   } catch (error) {
      //     process.send({ event_type: BotEventTypes.CHAT_LEFT, chatNames });
      //   }
      //   // console.log(result); // prints the result
      //   process.send({ event_type: BotEventTypes.CHAT_LEFT, chatNames });
      // }, 5000 * (index + 1));
    });
  };

export const groupManageListeners = [
  {
    event_type: ServerEventTypes.JOIN_GROUPS,
    listener: joinGroups,
  },
  {
    event_type: ServerEventTypes.LEAVE_GROUPS,
    listener: leaveGroups,
  },
];
