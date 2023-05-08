import { BotEventTypes } from "@core/types/client";

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
