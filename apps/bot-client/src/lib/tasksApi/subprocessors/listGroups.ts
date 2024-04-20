// import { BotEventTypes, TGroupLeaveTask } from "@core/types/client";
import { logEvent } from "../../processApi/logEventTostate";
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
  // loop through all chat that we are in

  // // client.getDialogs({});
  // for await (const dialog of client.iterDialogs({})) {
  //   console.log(`${dialog.id}: ${dialog.title}`);

  // const result = await client.invoke(
  //   new Api.channels.GetChannels({
  //     id: ["username"],
  //   })
  // );
  // console.log(result); // prints the result

  // }

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

  // const result = await client.invoke(
  //   new Api.channels.GetChannels({
  //     id: chats
  //       .map((chat) => {
  //         if (chat.isGroup)
  //           console.log({
  //             group: chat.isGroup,
  //             name: chat.name,
  //             title: chat.title,
  //             entity: chat.entity,
  //             id: chat.id,
  //             message: chat.message,
  //           });
  //         return null;
  //         // chat.id
  //       })
  //       .filter(Boolean),
  //   })
  // );
  console.log("result: ", result);
  // const readyGroups = convertResponseToGroupEntity(result);
  // console.log(readyGroups); // prints the result

  // logEvent(BotEventTypes.LIST_GROUPS, "12");

  process.send({
    event_type: BotEventTypes.LIST_GROUPS,
    // should I pass here apiId?
    // botId: task.botId,
    groups: result,
  });
  removeTaskFromQueue(task);
};
