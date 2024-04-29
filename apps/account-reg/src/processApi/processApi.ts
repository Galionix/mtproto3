import { getCombinedListeners } from "./getCombinedListeners";

export const processMessageListeners = [
  // {
  //     event_type: RegistrationEventTypes.REQUEST_CODE,
  //     listener: recieveCodeListener,
  // },
];

export const processMessageListenersMap = getCombinedListeners(
  processMessageListeners
);
