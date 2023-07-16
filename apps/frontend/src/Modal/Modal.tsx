import { useRef } from "react";
import s from "./Modal.module.scss";
import { Clickable } from "../shared/Clickable/Clickable";
type TModalProps = {
  id: string;
  children: React.ReactNode;
  onCancel?: () => void;
  onSubmit?: () => void;
  danger?: boolean;
};
export const Modal = ({
  id,
  children,
  onCancel,
  onSubmit,
  danger = false,
}: TModalProps) => {
  const ref = useRef(null);
  return (
    <dialog ref={ref} id={id} className={s.modal}>
      <div className={s.modalContent}>
        {children}
        <div className={s.modalFooter}>
          <Clickable
            onClick={() => {
              onCancel && onCancel();
              ref.current.close();
            }}
          >
            Cancel
          </Clickable>
          <Clickable
            onClick={() => {
              onSubmit && onSubmit();
              ref.current.close();
            }}
            danger
          >
            Submit
          </Clickable>
        </div>
      </div>
    </dialog>
  );
};
