import { TChatJoined, BotEventTypes } from "@core/types/client";
import { TListenerArgs } from "../bot-events.service";
import { TListener } from "../listeners";

function listenChatJoin({
  services,
  message,
  api_id,
}: TListenerArgs<TChatJoined>) {
  const { botStateService } = services;
  const { chatName } = message;

  const { joining_groups_chat_ids } = botStateService.getBotState(api_id);

  const newJoiningGroupsChatIds = joining_groups_chat_ids.filter(
    (id) => id !== chatName
  );

  botStateService.updateBotState(api_id, {
    joining_groups_chat_ids: newJoiningGroupsChatIds,
    joining_groups: newJoiningGroupsChatIds.length > 0,
  });
}

function listenChatLeave({
  services,
  message,
  api_id,
}: TListenerArgs<TChatJoined>) {
  const { botStateService } = services;
  const { chatName } = message;

  const { leaving_groups_chat_ids } = botStateService.getBotState(api_id);

  const newLeavingGroupsChatIds = leaving_groups_chat_ids.filter(
    (id) => id !== chatName
  );

  botStateService.updateBotState(api_id, {
    leaving_groups_chat_ids: newLeavingGroupsChatIds,
    leaving_groups: newLeavingGroupsChatIds.length > 0,
  });
}

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
