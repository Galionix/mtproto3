import { BotEventTypes } from "../../messagesTypes/bot-events";
import { TChatJoined } from "../../messagesTypes/bot-events/chatManage";
import { TListenerArgs } from "../bot-events.service";
import { TListener } from "../listeners";

function listenChatJoin({
  services,
  message,
  api_id,
}: TListenerArgs<TChatJoined>) {
  const { botStateService } = services;
  const { chat_id } = message;

  const { joining_groups_chat_ids } = botStateService.getBotState(api_id);

  const newJoiningGroupsChatIds = joining_groups_chat_ids.filter(
    (id) => id !== chat_id
  );

  botStateService.updateBotState(api_id, {
    joining_groups_chat_ids: newJoiningGroupsChatIds,
    joining_groups: newJoiningGroupsChatIds.length > 0,
  });
}

export const chatManageListeners: TListener[] = [
  {
    event_type: BotEventTypes.CHAT_JOINED,
    listener: listenChatJoin,
  },
];
