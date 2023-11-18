import {
  FullMetadata,
  StorageReference,
  getMetadata,
  getStorage,
  listAll,
  ref,
  ref as storageRef,
} from "firebase/storage";

export const storage = getStorage();

// const storage = getStorage();
export const getFilesMetadata = async (files: StorageReference[]) => {
  const metadataPromises = files.map((file) => getMetadata(file));
  return await Promise.all(metadataPromises);
};
export const listFirebaseStorageFiles = async (
  path: string,
  setFiles?: (images: FullMetadata[]) => void
) => {
  const listRef = ref(storage, path + "/");
  const result = await listAll(listRef);
  const res = await getFilesMetadata(result.items);
  const filesWithUrl = res.map((file) => {
    return {
      ...file,
      fullPathUrl: storageRef(storage, file.fullPath),
    };
  });
  setFiles && setFiles(filesWithUrl);
  return filesWithUrl;
};
