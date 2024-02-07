import { ServerEventTypes } from "@core/types/server";
import { IDefaultListenerArgs } from "../processApi/combineListeners";
import { Api, TelegramClient } from "telegram";
import { getMediaPath, getMediaPath2 } from "../../constants";
import { CustomFile } from "telegram/client/uploads";
import { statSync } from "fs";
import { logEvent } from "../processApi/logEventTostate";

export const removePhotos =
  ({ client }: IDefaultListenerArgs) =>
  async () => {
    try {
      const photos = await fetchAllProfilePhotos(client);

      await deleteProfilePhotos(client, photos);
    } catch (error) {
      logEvent("ERROR_REMOVE_PHOTOS", JSON.stringify({ error }));
    }
  };

export const removePhotosListener = {
  event_type: ServerEventTypes.REMOVE_PHOTOS,
  listener: removePhotos,
};

// async function uploadPhoto(client, filePath) {
//   await client.connect();

//   const file =

//   return file;
// }
async function fetchAllProfilePhotos(client: TelegramClient) {
  try {
    const result = await client.invoke(
      new Api.photos.GetUserPhotos({
        userId: new Api.InputPeerSelf(), // Targeting the current user
        offset: 0, // Starting from the beginning
        limit: 100, // Adjust based on the number of photos you expect
      })
    );

    return result.photos;
  } catch (error) {
    console.error("Failed to fetch profile photos:", error);
    return [];
  }
}
function isPhotoWithAccessHash(photo: Api.TypePhoto): photo is Api.Photo {
  return "accessHash" in photo;
}

async function deleteProfilePhotos(
  client: TelegramClient,
  photos: Api.TypePhoto[]
) {
  const validPhotos = photos.filter(isPhotoWithAccessHash);
  try {
    // Ensure you're using the correct properties from the photos
    const inputPhotos = validPhotos.map((photo) => {
      // Assuming `photo` has the necessary properties. Adjust according to the actual structure.
      return new Api.InputPhoto({
        id: photo.id,
        accessHash: photo.accessHash,
        fileReference: photo.fileReference,
      });
    });

    const deleteResults = await client.invoke(
      new Api.photos.DeletePhotos({
        id: inputPhotos, // Pass the array of InputPhoto objects
      })
    );

    console.log("Deleted photos:", deleteResults);
  } catch (error) {
    console.error("Failed to delete profile photos:", error);
  }
}
