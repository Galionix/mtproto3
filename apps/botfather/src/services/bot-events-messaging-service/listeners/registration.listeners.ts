import {
  TChatJoined,
  BotEventTypes,
  TPhoneNumber,
  Ta2FA_CODE,
} from "@core/types/client";
import { TListenerArgs } from "../bot-events.service";
import { TListener } from "../listeners";

function listenRequestPhoneNumber({
  services,
  message,
  botDbId,
}: TListenerArgs<TPhoneNumber>) {
  console.log("bot ", botDbId, " requested phone number");
  const { botStateService } = services;
  botStateService.updateBotState(botDbId, {
    requestedPhoneNumber: true,
  });
}

function listenRequestPhoneCode({
  services,
  message,
  botDbId,
}: TListenerArgs<TPhoneNumber>) {
  console.log("bot ", botDbId, " requested phone code");
  const { botStateService } = services;
  botStateService.updateBotState(botDbId, {
    requestedPhoneCode: true,
  });
}
function listenRequest2FACode({
  services,
  message,
  botDbId,
}: TListenerArgs<Ta2FA_CODE>) {
  console.log("bot ", botDbId, " requested phone code");

  const { botStateService } = services;
  botStateService.updateBotState(botDbId, {
    requested2FACode: true,
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
  {
    event_type: BotEventTypes.a2FA_CODE,
    listener: listenRequest2FACode,
  },
];
