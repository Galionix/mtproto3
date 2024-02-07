import { BotEventTypes } from "@core/types/client";

export const getEventColor = (event: keyof typeof BotEventTypes) => {
  switch (event) {
    case BotEventTypes.ERROR:
      return "red";
    case BotEventTypes.DIRECT_MESSAGE:
      return "green";
    case BotEventTypes.ERROR_DIRECT_MESSAGE:
      return "red";
    case BotEventTypes.CHAT_JOINED:
      return "blue";
    case BotEventTypes.CHAT_LEFT:
      return "blue";
    case BotEventTypes.ERROR_SCENARIO_HANDLER:
      return "red";
    case BotEventTypes.GET_DATABASE:
      return "blue";
    case BotEventTypes.LOG_EVENT:
      return "orange";
    case BotEventTypes.GET_SPAM_DATABASE:
      return "blue";
    case BotEventTypes.PHONE_CODE:
      return "blue";
    case BotEventTypes.PHONE_NUMBER:
      return "blue";
    case BotEventTypes.SEND_STATE_TO_SERVER:
      return "orange";
    case BotEventTypes.SET_SESSION_STRING:
      return "blue";
    case BotEventTypes.STARTED:
      return "green";
    case BotEventTypes.STATISTICS:
      return "blue";
    case BotEventTypes.STOPPED:
      return "red";
    case BotEventTypes.a2FA_CODE:
      return "blue";
    case BotEventTypes.USERNAME_NOT_AVAILABLE:
      return "red";
    case BotEventTypes.USERNAME_SET:
      return "green";
    default:
      return "black";
  }
};
