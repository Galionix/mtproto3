import { useEffect, useState } from "react";
import { useModal } from "../../Modal/Modal";

type TPopConfirmProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
  children?: React.ReactNode;
};

export const PopConfirm = ({
  message,
  onConfirm,
  onCancel,
  className,
  children,
}: TPopConfirmProps) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  // const handleConfirm = () => {
  //     onConfirm();
  // };

  // const handleCancel = () => {
  //     onCancel();
  // };

  const [Modal, { showModal }] = useModal({
    id: "confirm-apply-raw-data-modal",
    children: () => <span>{message}</span>,
    onSubmit: onConfirm,
    onCancel: onCancel,
  });

  useEffect(() => {
    if (show) {
      showModal();
    }
  }, [show, showModal]);

  return (
    <>
      <span onClick={handleShow}>{children}</span>
      {Modal}
    </>
  );
};
