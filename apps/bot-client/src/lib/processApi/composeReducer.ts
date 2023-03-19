import { ServerEvents } from "@core/types/server";
import { IDefaultListenerArgs, TCombinedListeners } from "./combineListeners";

// This code is a general reducer that takes a message
// from a server event and passes it to the appropriate listener,
// which is one of the combined listeners.
// The message is destructured to extract the event_type and the
// rest of the payload.The event_type is used to call the appropriate listener,
//  and the payload is passed to the listener.

export const generalReducer = (
  args: IDefaultListenerArgs,
  combinedListeners: TCombinedListeners
) => {
  return async (message: ServerEvents) => {
    const { event_type, ...payload } = message;
    if (event_type in combinedListeners) {
      return await combinedListeners[event_type](args)(payload);
    }
  };
};
