import { Injectable } from "@nestjs/common";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { readFile, readdir, writeFile, unlink } from "fs/promises";
import { sep } from "path";
import { firebaseApp } from "../firestore";
import { listFirebaseStorageFiles } from "./fireutils";
import { FirebaseContentSyncResult } from "@core/types/server";
// import { storage } from "../firestore";

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: "Welcome to botfather!" };
  }

  async syncFilesWithCloud() {
    const result = {
      images: {
        deleted: [],
        downloaded: [],
        existing: [],
      },
      audios: {
        deleted: [],
        downloaded: [],
        existing: [],
      },
      videos: {
        deleted: [],
        downloaded: [],
        existing: [],
      },
    };
    const storage = getStorage(firebaseApp);
    // ref(storage);
    // remove all local files
    const imagesWD = "." + sep + "media" + sep + "images";
    const imagesWDFiles = await readdir(imagesWD);
    result.images.existing = imagesWDFiles;

    const audiosWD = "." + sep + "media" + sep + "audios";
    const audiosWDFiles = await readdir(audiosWD);
    result.audios.existing = audiosWDFiles;

    const videosWD = "." + sep + "media" + sep + "videos";
    const videosWDFiles = await readdir(videosWD);
    result.videos.existing = videosWDFiles;

    const firebaseImages = await listFirebaseStorageFiles("images");
    const firebaseAudios = await listFirebaseStorageFiles("audios");

    const firebaseVideos = await listFirebaseStorageFiles("videos");

    const imagesNames = firebaseImages.map((image) => image.name);
    const audiosNames = firebaseAudios.map((audio) => audio.name);
    const videosNames = firebaseVideos.map((video) => video.name);

    const imagesToDelete = imagesWDFiles.filter(
      (image) => !imagesNames.includes(image)
    );
    const audiosToDelete = audiosWDFiles.filter(
      (audio) => !audiosNames.includes(audio)
    );
    const videosToDelete = videosWDFiles.filter(
      (video) => !videosNames.includes(video)
    );

    for (const image of imagesToDelete) {
      await unlink(imagesWD + sep + image);
      result.images.deleted.push(image);
    }

    for (const audio of audiosToDelete) {
      await unlink(audiosWD + sep + audio);
      result.audios.deleted.push(audio);
    }

    for (const video of videosToDelete) {
      await unlink(videosWD + sep + video);
      result.videos.deleted.push(video);
    }

    // download all files from firebase
    for (const image of firebaseImages) {
      if (imagesWDFiles.includes(image.name)) {
        continue;
      }

      const file = await getDownloadURL(image.fullPathUrl);
      const res = await fetch(file);
      const buffer = await res.arrayBuffer();
      const path = imagesWD + sep + image.name;

      await writeFile(path, Buffer.from(buffer));
      result.images.downloaded.push(image.name);
    }

    for (const audio of firebaseAudios) {
      if (audiosWDFiles.includes(audio.name)) {
        continue;
      }

      const file = await getDownloadURL(audio.fullPathUrl);
      const res = await fetch(file);
      const buffer = await res.arrayBuffer();
      const path = audiosWD + sep + audio.name;

      await writeFile(path, Buffer.from(buffer));
      result.audios.downloaded.push(audio.name);
    }
    for (const video of firebaseVideos) {
      if (videosWDFiles.includes(video.name)) {
        continue;
      }

      const file = await getDownloadURL(video.fullPathUrl);
      const res = await fetch(file);
      const buffer = await res.arrayBuffer();
      const path = videosWD + sep + video.name;

      await writeFile(path, Buffer.from(buffer));
      result.videos.downloaded.push(video.name);
    }
    return result as FirebaseContentSyncResult;
  }
}
