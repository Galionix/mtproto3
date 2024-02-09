import { ServerEventTypes } from "@core/types/server";
import { IDefaultListenerArgs } from "../processApi/combineListeners";
import { Api, TelegramClient } from "telegram";
import { getMediaPath, getMediaPath2 } from "../../constants";
import { CustomFile } from "telegram/client/uploads";
import { statSync } from "fs";
import { logEvent } from "../processApi/logEventTostate";
import { EBotErrorTypes } from "@core/types/client";

export const hidePhoneNumber =
  ({ client }: IDefaultListenerArgs) =>
  async () => {
    try {
      const result = await client.invoke(
        new Api.account.SetPrivacy({
          key: new Api.InputPrivacyKeyPhoneNumber(),
          rules: [new Api.InputPrivacyValueDisallowAll()],
        })
      );

      console.log("Privacy updated:", result);
    } catch (error) {
      logEvent(EBotErrorTypes.ERROR_REMOVE_PHOTOS, JSON.stringify({ error }));
    }
  };

export const hidePhoneNumberListener = {
  event_type: ServerEventTypes.HIDE_PHONE_NUMBER,
  listener: hidePhoneNumber,
};
