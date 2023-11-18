/* eslint-disable @next/next/no-img-element */
import {
  FullMetadata,
  StorageReference,
  getMetadata,
  getStorage,
  listAll,
  ref,
  ref as storageRef,
} from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { storage } from "../../firestore";
import { useEffect, useState } from "react";
import { Layout } from "../../src/shared/Layout/Layout";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { deleteFile, listFirebaseStorageFiles } from "./resourcesUtils";
import { Tabs } from "../../src/shared/Tabs/Tabs";
import { NoData } from "../../src/shared/NoData/NoData";
import { UploadedFile } from "@nestjs/common";
import { UploadFile } from "../../src/shared/UploadFile/UploadFile";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useModal } from "../../src/Modal/Modal";
import { ClickableCopy } from "../../src/shared/ClickableCopy/ClickableCopy";
import s from "./ViewResourcesPage.module.scss";
import { FaTrash } from "react-icons/fa";
import { SyncButton } from "./SyncButton";
// import { listFirebaseStorageFiles } from "@core/functions";

const ViewResourcesPage = () => {
  const [images, setImages] = useState([]);
  const [audios, setAudios] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imageForModal, setImageForModal] = useState<FullMetadata>();

  useEffect(() => {
    listFirebaseStorageFiles("images", setImages);
    listFirebaseStorageFiles("audios", setAudios);
    listFirebaseStorageFiles("videos", setVideos);
  }, []);
  const [modalImageUrl] = useDownloadURL(
    imageForModal ? storageRef(storage, imageForModal?.fullPath) : null
  );

  const [BigImagePreview, { showModal, hideModal }] = useModal({
    title: "Preview " + imageForModal?.name || "",
    children: () => (
      <>
        <div>
          <TransformWrapper>
            <TransformComponent>
              <img
                style={{
                  maxWidth: "calc(100vw - 100px)",
                  maxHeight: "calc(100vh - 200px)",
                }}
                src={modalImageUrl}
                alt={"imageForModal?.name"}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </>
    ),
  });
  useEffect(() => {
    if (imageForModal) {
      showModal();
    }
  }, [imageForModal]);

  const renderImagesContent = () => {
    if (images.length === 0) {
      return (
        <>
          <UploadFile
            onUpload={() => {
              listFirebaseStorageFiles("images", setImages);
            }}
            path="images"
          />
          <NoData title="images" />
        </>
      );
    }
    return (
      <>
        <UploadFile
          onUpload={() => {
            listFirebaseStorageFiles("images", setImages);
          }}
          path="images"
        />
        <ul className="flex flex-row flex-wrap gap-2">
          {images.map((image) => {
            return (
              <li key={image.name}>
                <RenderImage
                  image={image}
                  setImages={setImages}
                  setImageForModal={setImageForModal}
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  const renderAudiosContent = () => {
    if (audios.length === 0) {
      return (
        <>
          <NoData title="audios" />
          <UploadFile
            onUpload={() => {
              listFirebaseStorageFiles("audios", setAudios);
            }}
            path="audios"
          />
        </>
      );
    }
    return (
      <>
        <UploadFile
          onUpload={() => {
            listFirebaseStorageFiles("audios", setAudios);
          }}
          path="audios"
        />
        {/* </> */}
        <ul>
          {audios.map((audio) => (
            <li key={audio.name}>
              <RenderAudio audio={audio} setAudios={setAudios} />
            </li>
          ))}
        </ul>
      </>
    );
  };

  const renderVideosContent = () => {
    if (videos.length === 0) {
      return (
        <>
          <NoData title="videos" />
          <UploadFile
            onUpload={() => {
              listFirebaseStorageFiles("videos", setVideos);
            }}
            path="videos"
          />
        </>
      );
    }

    return (
      <>
        <UploadFile
          onUpload={() => {
            listFirebaseStorageFiles("videos", setVideos);
          }}
          path="videos"
        />
        <ul>
          {videos.map((video) => (
            <li key={video.name}>
              <RenderVideo video={video} setVideos={setVideos} />
            </li>
          ))}
        </ul>
      </>
    );
  };

  const tabs = [
    { name: "Images", content: renderImagesContent() },
    { name: "Audios", content: renderAudiosContent() },
    { name: "Videos", content: renderVideosContent() },
  ];

  return (
    <Layout>
      <h1>View Resources</h1>
      <SyncButton className="ml-auto" />
      <Tabs tabs={tabs} />
      {BigImagePreview}
    </Layout>
  );
};
export default ViewResourcesPage;

const RenderImage = ({
  image,
  setImages,
  setImageForModal,
}: {
  image: FullMetadata;
  setImages: (images: FullMetadata[]) => void;
  setImageForModal: (image: FullMetadata) => void;
}) => {
  const [value, loading, error] = useDownloadURL(
    storageRef(storage, image.fullPath)
  );
  return (
    <div className={s.imageContainer}>
      <img
        onClick={() => {
          setImageForModal(image);
        }}
        style={{ width: "200px", height: "200px" }}
        src={value}
        alt={image.name}
      />
      <ClickableCopy style={{ maxWidth: "200px" }} text={image.name} />

      <Clickable
        comp="button"
        danger
        icon={FaTrash}
        onClick={() => {
          //
          deleteFile(image.fullPath, () => {
            listFirebaseStorageFiles("images", setImages);
          });
        }}
      />
    </div>
  );
};

const RenderAudio = ({
  audio,
  setAudios,
}: {
  audio: FullMetadata;
  setAudios: (audios: FullMetadata[]) => void;
}) => {
  const [value, loading, error] = useDownloadURL(
    storageRef(storage, audio.fullPath)
  );
  return (
    <div className="flex flex-row items-center gap-2">
      {!loading && value && (
        <audio controls>
          <source src={value} type={audio.contentType} />
        </audio>
      )}
      <ClickableCopy text={audio.name} />
      <Clickable
        danger
        comp="button"
        icon={FaTrash}
        onClick={() => {
          deleteFile(audio.fullPath, () => {
            listFirebaseStorageFiles("audios", setAudios);
          });
        }}
      />
    </div>
  );
};

const RenderVideo = ({
  video,
  setVideos,
}: {
  video: FullMetadata;
  setVideos: (videos: FullMetadata[]) => void;
}) => {
  const [value, loading, error] = useDownloadURL(
    storageRef(storage, video.fullPath)
  );
  return (
    <div className={s.imageContainer}>
      {!loading && value && (
        <video style={{ maxWidth: "200px" }} controls>
          <source src={value} type={video.contentType} />
        </video>
      )}
      <ClickableCopy text={video.name} />
      <Clickable
        danger
        comp="button"
        icon={FaTrash}
        onClick={() => {
          deleteFile(video.fullPath, () => {
            listFirebaseStorageFiles("videos", setVideos);
          });
        }}
      />
    </div>
  );
};
