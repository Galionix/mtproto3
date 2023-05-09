import { BotEventTypes } from "@core/types/client";
import { infoListeners } from "./listeners/info.listeners";
import { accountListeners } from "./listeners/account.listeners";
import { chatManageListeners } from "./listeners/chat_manage.listeners";
import { generalListeners } from "./listeners/general.listeners";
import { TGenericMessage } from "@core/types/index";

export type TListener = {
  event_type: keyof typeof BotEventTypes;
  // TODO: fix this any
  // this will lead us to road of chain requests. Think it through later
  listener: (
    message: any
  ) =>
    | void
    | TGenericMessage<any, any>
    | Promise<void>
    | Promise<TGenericMessage<any, any>>;
};
const listeners: TListener[] = [
  ...infoListeners,
  ...accountListeners,
  ...chatManageListeners,
  ...generalListeners,
];

export const combinedListeners = listeners.reduce(
  (acc, { event_type, listener }) => {
    acc[event_type as any] = listener;
    return acc;
  },
  {} as Record<keyof typeof BotEventTypes, TListener["listener"]>
);
