import { JsonFileData, TState } from "@core/types/client";
import { TelegramClientParams } from "telegram/client/telegramBaseClient";
import { parseProxyString } from "./parseProxyString";
import { systemVersionFaker } from "./systemVersionFaker";

export const getTelegramClientParams = (
  proxy: string,
  jsonData: JsonFileData,
  botName: string
): TelegramClientParams => {
  console.log("getTelegramClientParams proxy: ", proxy);
  console.log("getTelegramClientParams jsonData: ", jsonData);
  const clientParams: TelegramClientParams = {
    connectionRetries: 3,
    systemVersion: systemVersionFaker(botName),
  };

  if (proxy && proxy.length > 3) {
    clientParams["proxy"] = parseProxyString(proxy);
  }
  if ("device" in jsonData && jsonData.device) {
    clientParams["deviceModel"] = jsonData.device;
  }
  // if ("systemVersion" in jsonData && jsonData.systemVersion) {
  // clientParams["systemVersion"] = jsonData.systemVersion;
  // }
  if ("app_version" in jsonData && jsonData.app_version) {
    clientParams["appVersion"] = jsonData.app_version;
  }
  {
    // lang
    if ("lang_code" in jsonData && jsonData.lang_code) {
      clientParams["langCode"] = jsonData.lang_code;
    }
    if ("lang_pack" in jsonData && jsonData.lang_pack) {
      clientParams["langCode"] = jsonData.lang_pack;
    }
  }
  {
    // system_lang
    if ("system_lang_code" in jsonData && jsonData.system_lang_code) {
      clientParams["systemLangCode"] = jsonData.system_lang_code;
    }
    if ("system_lang_pack" in jsonData && jsonData.system_lang_pack) {
      clientParams["systemLangCode"] = jsonData.system_lang_pack;
    }
  }

  // app version
  if ("app_version" in jsonData && jsonData.app_version) {
    clientParams["appVersion"] = jsonData.app_version;
  }

  return clientParams;
};
