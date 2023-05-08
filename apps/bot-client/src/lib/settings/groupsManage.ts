import { BotEventTypes } from "@core/types/client";
import { JoinGroupsInput, ServerEventTypes } from "@core/types/server";
import { Api } from "telegram";
import { IDefaultListenerArgs } from "../processApi/combineListeners";
import { logEvent } from "../processApi/logEventTostate";

// TODO: Finish wiring: add api_ids, behaviour_model, processing_enabled, spam_frequency
export const joinGroups =
  ({ client }: IDefaultListenerArgs) =>
  ({
    chat_ids,
    // api_ids,
    // behaviour_model,
    // processing_enabled,
    // spam_frequency,
    join_delay,
  }: JoinGroupsInput) => {
    chat_ids.forEach(async (chat_id, index) => {
      setTimeout(async () => {
        console.log("chat_id: ", chat_id);

        await client.invoke(
          new Api.channels.JoinChannel({
            channel: chat_id,
          })
        );
        logEvent(BotEventTypes.CHAT_JOINED, chat_id);
        process.send({ event_type: BotEventTypes.CHAT_JOINED, chat_id });
      }, join_delay * (index + 1));
    });
  };

export const leaveGroups =
  ({ client }: IDefaultListenerArgs) =>
  ({ group_ids }: { group_ids: string[] }) => {
    group_ids.forEach(async (chat_id, index) => {
      setTimeout(async () => {
        console.log("chat_id: ", chat_id);

        try {
          await client.invoke(
            new Api.channels.LeaveChannel({
              channel: chat_id,
            })
          );
        } catch (error) {
          process.send({ event_type: BotEventTypes.CHAT_LEFT, chat_id });
        }
        // console.log(result); // prints the result
        process.send({ event_type: BotEventTypes.CHAT_LEFT, chat_id });
      }, 5000 * (index + 1));
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
