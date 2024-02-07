import { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

/**
 * A hook to get a download URL for a file stored in Firebase Storage by its path.
 * @param filePath The path of the file within Firebase Storage.
 * @returns The URL of the file.
 */
export const useFirebaseStorageUrl = (
  folder: "audios" | "videos" | "images",
  filePath: string
) => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const storage = getStorage();
    if (!storage) return console.error("Failed to get storage");
    const storageRef = ref(storage, `${folder}/${filePath}`);

    getDownloadURL(storageRef)
      .then((downloadUrl) => {
        setUrl(downloadUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to get download URL:", error);
        setError(error);
        setLoading(false);
      });
  }, [folder, filePath]);

  return { url, loading, error };
};
