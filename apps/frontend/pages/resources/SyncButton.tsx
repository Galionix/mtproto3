import { useState } from "react";
import { useModal } from "../../src/Modal/Modal";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { FaSyncAlt } from "react-icons/fa";
import { useResourcesStore } from "./resourcesStore";
import { FirebaseContentSyncResult } from "@core/types/server";

type SyncButtonProps = {
  className?: string;
};
export const SyncButton = ({ className }: SyncButtonProps) => {
  const { setResources } = useResourcesStore();
  //   const [modalOpen, setModalOpen] = useState(false);
  const [syncResult, setSyncResult] =
    useState<FirebaseContentSyncResult | null>(null);

  const openModal = () => {
    // setModalOpen(true);
    showModal();
  };
  //   const closeModal = () => {
  //     hideModal();
  //     // setModalOpen(false);
  //   };

  const SyncModalContent = {
    title: "Syncing result",
    children: () => (
      <div>
        <pre>
          {syncResult ? JSON.stringify(syncResult, null, 2) : "Loading..."}
        </pre>
      </div>
    ),
  };
  const [SyncModal, { showModal, hideModal }] = useModal(SyncModalContent);

  const onClickSync = async () => {
    openModal();

    const res = await fetch(
      "http://localhost:3002/api/v1/sync-files-with-cloud",
      {
        method: "POST",
      }
    );
    // console.log("res: ", res);
    const resJson = (await res.json()) as FirebaseContentSyncResult;
    const resourcesStore = {
      images: resJson.images.downloaded.concat(resJson.images.existing),
      audios: resJson.audios.downloaded.concat(resJson.audios.existing),
      videos: resJson.videos.downloaded.concat(resJson.videos.existing),
    };
    setResources(resourcesStore);
    // console.log("resJson: ", resJson);
    setSyncResult(resJson);
  };

  return (
    <>
      <Clickable icon={FaSyncAlt} className={className} onClick={onClickSync}>
        Sync local resources
      </Clickable>
      {SyncModal}
    </>
  );
};
