import {
  getStorage,
  ref,
  deleteObject,
  StorageReference,
  getMetadata,
  FullMetadata,
  listAll,
} from "firebase/storage";

export async function deleteFile(
  path: string,
  onFullfilled = () => {
    console.log("action onFullfilled not provided");
  },
  onRejected = (error) => {
    console.log("action onRejected not provided");
  }
) {
  // Get a reference to the storage service
  const storage = getStorage();

  // Specify the path to the file you want to delete
  //   const filePath = "path/to/your/file.jpg"; // Change this to the path of your file

  // Create a reference to the file
  const fileRef = ref(storage, path);

  try {
    // Use await to wait for the deletion to complete
    await deleteObject(fileRef);
    // console.log("File deleted successfully.");
    onFullfilled();
  } catch (error) {
    // console.error("Error deleting file:", error.message);
    onRejected(error);
  }
}

export const getFilesMetadata = async (files: StorageReference[]) => {
  const metadataPromises = files.map((file) => getMetadata(file));
  return await Promise.all(metadataPromises);
};
export const listFirebaseStorageFiles = async (
  path: string,
  setFiles?: (images: FullMetadata[]) => void
) => {
  const storage = getStorage();
  const listRef = ref(storage, path + "/");
  const result = await listAll(listRef);
  const res = await getFilesMetadata(result.items);
  const filesWithUrl = res.map((file) => {
    return {
      ...file,
      fullPathUrl: ref(storage, file.fullPath),
    };
  });
  setFiles && setFiles(filesWithUrl);
  return filesWithUrl;
};
