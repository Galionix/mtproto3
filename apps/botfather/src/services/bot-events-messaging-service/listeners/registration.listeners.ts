import { TChatJoined, BotEventTypes, TPhoneNumber } from "@core/types/client";
import { TListenerArgs } from "../bot-events.service";
import { TListener } from "../listeners";

function listenRequestPhoneNumber({
  services,
  message,
  api_id,
}: TListenerArgs<TPhoneNumber>) {
  console.log("bot ", api_id, " requested phone number");
  const { botStateService } = services;
  botStateService.updateBotState(api_id, {
    requestedPhoneNumber: true,
  });
}

function listenRequestPhoneCode({
  services,
  message,
  api_id,
}: TListenerArgs<TPhoneNumber>) {
  console.log("bot ", api_id, " requested phone code");
  const { botStateService } = services;
  botStateService.updateBotState(api_id, {
    requestedPhoneCode: true,
  });
}

export const registrationListeners: TListener[] = [
  {
    event_type: BotEventTypes.PHONE_NUMBER,
    listener: listenRequestPhoneNumber,
  },
  {
    event_type: BotEventTypes.PHONE_CODE,
    listener: listenRequestPhoneCode,
  },
];
