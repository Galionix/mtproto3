import { BotEventTypes, BotEvents } from "@core/types/client";
import { infoListeners } from "./listeners/info.listeners";
import { accountListeners } from "./listeners/account.listeners";
import { chatManageListeners } from "./listeners/chat_manage.listeners";
import { generalListeners } from "./listeners/general.listeners";
import { TGenericMessage } from "@core/types";
import { TListenerArgs } from "./bot-events.service";
import { ServerEvents } from "@core/types/server";
import { registrationListeners } from "./listeners/registration.listeners";

export type TListener = {
  event_type: keyof typeof BotEventTypes;
  // this will lead us to road of chain requests. Think it through later
  listener: (
    message: TListenerArgs<BotEvents>
  ) =>
    | void
    | TGenericMessage<BotEvents, ServerEvents>
    | Promise<void>
    | Promise<ServerEvents>
    | Promise<TGenericMessage<ServerEvents>>;
};
const listeners: TListener[] = [
  ...infoListeners,
  ...accountListeners,
  ...chatManageListeners,
  ...generalListeners,
  ...registrationListeners,
];

export const combinedListeners = listeners.reduce(
  (acc, { event_type, listener }) => {
    acc[event_type] = listener;
    return acc;
  },
  {} as Record<keyof typeof BotEventTypes, TListener["listener"]>
);
