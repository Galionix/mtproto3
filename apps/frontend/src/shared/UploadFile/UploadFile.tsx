/* eslint-disable @typescript-eslint/no-empty-function */
import { getStorage, ref } from "firebase/storage";
import { useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { Clickable } from "../Clickable/Clickable";

const storage = getStorage();
type UploadFileProps = {
  onUpload?: () => void;
  onError?: (error: Error) => void;
  path: string;
};
const prepareFilename = (filename: string) => {
  if (!filename) return "";
  // sanitize filename
  const sanitizedFilename = filename
    .replace(/[^a-z0-9_.-]/gi, "_")
    .slice(0, 100);
  // generate random string
  //   const randomString = Math.random().toString(36).substring(2, 7);
  // return new filename
  return `${sanitizedFilename}`;
};

export const UploadFile = ({
  onUpload = () => {},
  onError = () => {},
  path,
}: UploadFileProps) => {
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [selectedFile, setSelectedFile] = useState<File>();

  const fileRef = ref(
    storage,
    `${path}/${prepareFilename(selectedFile?.name)}`
  );

  const upload = async () => {
    if (selectedFile) {
      try {
        await uploadFile(fileRef, selectedFile, {
          // contentType: 'image/jpeg'
          contentType: selectedFile.type,
        });
        setSelectedFile(undefined);
        onUpload();
      } catch (error) {
        onError(error);
      }
      //   alert(`Result: ${JSON.stringify(result)}`);
      //   if (result.metadata) {
      //     onUpload();
      //   } else if (result.state === "error") {
      //     onError(result.error);
      //     }
    }
  };

  const uploadedPercents = snapshot?.bytesTransferred / snapshot?.totalBytes;

  return (
    <div>
      <p>
        {error && <strong>Error: {error.message}</strong>}
        {uploading && <span>Uploading file...</span>}
        {snapshot && <span>Uploading: {uploadedPercents}%</span>}
        {selectedFile && <span>Selected file: {selectedFile.name}</span>}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : undefined;
            setSelectedFile(file);
          }}
        />
        <Clickable onClick={upload}>Upload file</Clickable>
      </p>
    </div>
  );
};
