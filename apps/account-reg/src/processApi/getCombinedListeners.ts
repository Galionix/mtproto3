import {
  RegistrationEventTypes,
  RegistrationResponseTypes,
} from "@core/types/client";

type EventType = keyof typeof RegistrationEventTypes;

export type TListener = {
  event_type: keyof typeof RegistrationResponseTypes;
  listener: (args: object) => ({ ...args }) => Promise<void> | void;
};

export type TCombinedListeners = Record<EventType, TListener["listener"]>;

export const getCombinedListeners = (listeners: TListener[]) => {
  return listeners.reduce((acc, { event_type, listener }) => {
    acc[event_type] = listener;
    return acc;
  }, {} as TCombinedListeners);
};
