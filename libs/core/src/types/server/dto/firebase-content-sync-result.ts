/*
{
  "images": {
    "deleted": [],
    "downloaded": [],
    "existing": [
      "Screenshot_2023-11-15_143144.png"
    ]
  },
  "audios": {
    "deleted": [],
    "downloaded": [],
    "existing": [
      "step1.ogg",
      "step2.ogg",
      "step3.ogg",
      "step4.ogg"
    ]
  },
  "videos": {
    "deleted": [],
    "downloaded": [],
    "existing": [
      "doc_2023-11-18_09-26-34.mp4"
    ]
  }
}
*/

export type FirebaseContentSyncResult = {
  images: {
    deleted: string[];
    downloaded: string[];
    existing: string[];
  };
  audios: {
    deleted: string[];
    downloaded: string[];
    existing: string[];
  };
  videos: {
    deleted: string[];
    downloaded: string[];
    existing: string[];
  };
};
