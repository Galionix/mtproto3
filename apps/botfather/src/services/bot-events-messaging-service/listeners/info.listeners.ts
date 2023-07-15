import { processMessagesTypes, TBotErrorMessage } from "@core/types/client";
import { TListenerArgs } from "../bot-events.service";
import { TListener } from "../listeners";

function listenStarted({ services, api_id }: TListenerArgs) {
  const { botStateService, l } = services;
  //
  l.log("Bot started: ", api_id);
  botStateService.updateBotState(api_id, {
    isStarted: true,
    startedDate: Date.now(),
  });
}
function listenStopped({ services, api_id }: TListenerArgs) {
  const { botStateService, l } = services;
  //
  l.log("Bot stopped: ", api_id);

  botStateService.updateBotState(api_id, {
    isStopped: true,
    stoppedDate: Date.now(),
  });
}
function listenError({
  services,
  message,
  api_id,
}: TListenerArgs<TBotErrorMessage>) {
  const { botStateService, l } = services;
  // probably this will never happen, but just in case
  l.log("Bot errored: ", api_id);
  botStateService.updateBotState(api_id, {
    isErrored: true,
    error: message.error.message,
  });
}

export const infoListeners: TListener[] = [
  {
    event_type: processMessagesTypes.STARTED,
    listener: listenStarted,
  },
  {
    event_type: processMessagesTypes.STOPPED,
    listener: listenStopped,
  },
  {
    event_type: processMessagesTypes.ERROR,
    listener: listenError,
  },
];
