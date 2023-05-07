import { TListener } from "../bot-events-messaging-service/listeners";
import {
  TSetSessionString,
  processMessagesTypes,
} from "./../../../../../libs/core/src/types/client/bot-events/processMessages";
import { TListenerArgs } from "./../bot-events-messaging-service/bot-events.service";

function listenSetSessionString({
  services,
  message,
  api_id,
}: TListenerArgs<TSetSessionString>) {
  const { botRepositoryService } = services;
  botRepositoryService.updateSessionString(api_id, message.sessionString);
}

export const accountListeners: TListener[] = [
  {
    event_type: processMessagesTypes.SET_SESSION_STRING,
    listener: listenSetSessionString,
  },
];
