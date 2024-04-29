import {
  processMessagesTypes,
  TBotErrorMessage,
  TListGroups,
  TListGroupsPayload,
  TListGroupsResponse,
} from "@core/types/client";
import { TListenerArgs } from "../bot-events.service";
import { TListener } from "../listeners";

function listenStarted({ services, botDbId }: TListenerArgs) {
  const { botStateService, l } = services;
  //
  l.log("Bot started: ", botDbId);
  botStateService.updateBotState(botDbId, {
    isStarted: true,
    startedDate: Date.now(),
  });
}
function listenStopped({ services, botDbId }: TListenerArgs) {
  const { botStateService, l } = services;
  //
  l.log("Bot stopped: ", botDbId);

  botStateService.updateBotState(botDbId, {
    isStopped: true,
    stoppedDate: Date.now(),
  });
}
function listenError({
  services,
  message,
  botDbId,
}: TListenerArgs<TBotErrorMessage>) {
  const { botStateService, l } = services;
  // probably this will never happen, but just in case
  l.log("Bot errored: ", botDbId);
  botStateService.updateBotState(botDbId, {
    isErrored: true,
    error: message.error.message,
  });
}
// listeng groupsList
function listenGroupsList({
  services,
  message,
  botDbId,
}: TListenerArgs<TListGroups>) {
  console.log("message: ", message);
  const { groupsRepositoryService, l } = services;
  const { groups } = message;
  // here groups are raw data from client. it has no set correct id, only chat_id. so here we create an id, which is chat_id + api_id
  const preparedGroups = groups.map((group) => ({
    ...group,
    id: `${group.chat_id}_${botDbId}`,
  }));
  groupsRepositoryService.updateMany(preparedGroups);

  l.log("Bot groups list: ", botDbId);

  // botStateService.updateBotState(api_id, {
  //   groupsList,
  // });
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
  {
    event_type: processMessagesTypes.LIST_GROUPS,
    listener: listenGroupsList,
  },
];
