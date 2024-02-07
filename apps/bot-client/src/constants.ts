import { TState } from "@core/types/client";
import { sep } from "path";
import path from "path";

type TSyncableStateKeys = (keyof TState)[];
export const syncableStateKeys: TSyncableStateKeys = ["tasks"];

export const defaultSpamInterval = 3;
export const mediaPathPrefix =
  ".." + sep + ".." + sep + ".." + sep + "media" + sep;
export const getMediaPath = (
  folder: "audios" | "videos" | "images",
  fileName: string
) => mediaPathPrefix + sep + folder + sep + fileName;

export const getMediaPath2 = (
  folder: "audios" | "videos" | "images",
  fileName: string
) =>
  path.join(
    __dirname,
    "..",
    "..",
    "..",
    "media",
    folder,
    // state.voice,
    fileName
  );