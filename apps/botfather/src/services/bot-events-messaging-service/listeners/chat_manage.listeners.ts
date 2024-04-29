import { TChatJoined, BotEventTypes } from "@core/types/client";
import { TListenerArgs } from "../bot-events.service";
import { TListener } from "../listeners";

function listenChatJoin({
  services,
  message,
  botDbId,
}: TListenerArgs<TChatJoined>) {
  const { botStateService } = services;
  const { chatName } = message;

  const { joining_groups_chat_ids } = botStateService.getBotState(botDbId);

  const newJoiningGroupsChatIds = joining_groups_chat_ids.filter(
    (id) => id !== chatName
  );

  botStateService.updateBotState(botDbId, {
    joining_groups_chat_ids: newJoiningGroupsChatIds,
    joining_groups: newJoiningGroupsChatIds.length > 0,
  });
}

function listenChatLeave({
  services,
  message,
  botDbId,
}: TListenerArgs<TChatJoined>) {
  const { botStateService, groupsRepositoryService } = services;
  const { chatName } = message;

  const { leaving_groups_chat_ids } = botStateService.getBotState(botDbId);

  const newLeavingGroupsChatIds = leaving_groups_chat_ids.filter(
    (id) => id !== chatName
  );

  botStateService.updateBotState(botDbId, {
    leaving_groups_chat_ids: newLeavingGroupsChatIds,
    leaving_groups: newLeavingGroupsChatIds.length > 0,
  });
  // for now i cant delete by name, cuz in db i can have multiple groups with same name
  // they would be from different bots! here i need to know chat_id!!
  // groupsRepositoryService.deleteOneByName(chatName);
}

// list
export const chatManageListeners: TListener[] = [
  {
    event_type: BotEventTypes.CHAT_JOINED,
    listener: listenChatJoin,
  },
  {
    event_type: BotEventTypes.CHAT_LEFT,
    listener: listenChatLeave,
  },
];
