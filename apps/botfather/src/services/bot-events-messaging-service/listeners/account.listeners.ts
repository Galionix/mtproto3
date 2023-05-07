import { TSetSessionString, processMessagesTypes } from "@core/types/client";
import { TListenerArgs } from "../bot-events.service";
import { TListener } from "../listeners";

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
