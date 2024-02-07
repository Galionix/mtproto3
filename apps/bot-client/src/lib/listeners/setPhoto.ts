import { ServerEventTypes } from "@core/types/server";
import { IDefaultListenerArgs } from "../processApi/combineListeners";
import { Api } from "telegram";
import { getMediaPath, getMediaPath2 } from "../../constants";
import { CustomFile } from "telegram/client/uploads";
import { statSync } from "fs";
import { logEvent } from "../processApi/logEventTostate";

export const setPhoto =
  ({ client }: IDefaultListenerArgs) =>
  async ({ photoName }: { photoName: string }) => {
    try {
      const path = getMediaPath2("images", photoName);
      const toUpload = new CustomFile(photoName, statSync(path).size, path);
      const file = await client.uploadFile({
        file: toUpload,
        workers: 1,
      });
      await client.invoke(
        new Api.photos.UploadProfilePhoto({
          file: file,
        })
      );
    } catch (error) {
      logEvent("ERROR_SET_PHOTO", JSON.stringify({ error, photoName }));
    }
    logEvent("PHOTO_SET", photoName);
  };

export const changePhotoListener = {
  event_type: ServerEventTypes.SET_PHOTO,
  listener: setPhoto,
};

// async function uploadPhoto(client, filePath) {
//   await client.connect();

//   const file =

//   return file;
// }
