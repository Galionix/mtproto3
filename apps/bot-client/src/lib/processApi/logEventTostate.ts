import { BotEventTypes } from "@core/types/client";
import { state } from "../state";

export function logEvent(
  log_event: keyof typeof BotEventTypes,
  event_message = ""
) {
  const result = {
    event_type: BotEventTypes.LOG_EVENT,
    event_message,
    log_event,
    event_date: Date.now(),
  };

  process.send(result);
}

export function logGlobal(
  log_event: keyof typeof BotEventTypes,
  event_message = "",
  details = {}
) {
  const result = {
    event_type: BotEventTypes.LOG_GLOBAL,
    event_message,
    log_event,
    details,
    api_id: state.apiId,
  };

  process.send(result);
}
