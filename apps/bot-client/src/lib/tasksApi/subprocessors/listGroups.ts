// import { BotEventTypes, TGroupLeaveTask } from "@core/types/client";
import { logEvent, logGlobal } from "../../processApi/logEventTostate";
import { removeTaskFromQueue } from "../processor";
import { BotEventTypes, TListGroupsTask } from "@core/types/client";
import { TTaskProcessorArgs } from ".";
import { Api } from "telegram";
import { GroupEntity } from "@core/types/server";
import { state } from "../../state";

// const convertResponseToGroupEntity = (
//   response: Api.messages.TypeChats
// ): Partial<GroupEntity>[] => {
//   return response.chats
//     .map((chat) => {
//       if (chat instanceof Api.ChatEmpty || chat instanceof Api.ChatForbidden) {
//         return null;
//       }
//       return {
//         chat_id: `${chat.id}`,
//         name: chat.title,
//         // status: chat.status,
//         // total_members: chat.
//       };
//     })
//     .filter(Boolean);
// };

// we need to perform data collection about groups that we are in. the resulting data should match as possible to entity GroupEntity

export const listGroups = async ({
  client,
  task,
}: TTaskProcessorArgs<TListGroupsTask>) => {
  logEvent("LIST_GROUPS", "start listing groups");
  try {
    const chats = await client.getDialogs({});
    const result: Partial<GroupEntity>[] = chats
      .filter((chat) => chat.isGroup)
      .map(
        (chat): Partial<GroupEntity> => ({
          chat_id: `${chat.id}`,
          name: chat.title,
          username: "username" in chat.entity ? chat.entity.username : "",
          total_members:
            "participantsCount" in chat.entity
              ? chat.entity.participantsCount || 0
              : -1,
        })
      );

    console.log("result: ", result);

    process.send({
      event_type: BotEventTypes.LIST_GROUPS,
      // should I pass here apiId?
      // botId: task.botId,
      groups: result,
    });
  } catch (e) {
    logGlobal("LIST_GROUPS", e.message, { stack: e.stack });
    console.log("error: ", e);
  }
  removeTaskFromQueue(task);
};
