import { BotEventTypes, TBotGeneralEvents } from "@core/types/client";
import { TListenerArgs } from "../bot-events.service";
import { Logger } from "@nestjs/common";

const l = new Logger("general.listeners");
function listenLogEventToState({
  services,
  message,
  api_id,
}: TListenerArgs<TBotGeneralEvents>) {
  l.log(message, "listenLogEventToState");
  const { botStateService } = services;

  // first we need to check if event log is less than process.env.BOT_EVENT_LOG_MAX_SIZE
  // if it is, we just push new event to the end of the array
  // if it is not, we need to remove first element and push new event to the end of the array

  const botState = botStateService.getBotState(api_id);

  if (botState) {
    const { eventLogs } = botState;

    if (eventLogs.length >= parseInt(process.env.BOT_EVENT_LOG_MAX_SIZE)) {
      eventLogs.shift();
    }
    eventLogs.push(message);
  }
}

export const generalListeners = [
  {
    event_type: BotEventTypes.LOG_EVENT,
    listener: listenLogEventToState,
  },
];
