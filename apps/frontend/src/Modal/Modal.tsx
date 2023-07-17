import { useRef, useState } from "react";
import s from "./Modal.module.scss";
import { Clickable } from "../shared/Clickable/Clickable";

type TModalProps<T = null> = {
  id: string;
  children: (args?: T) => React.ReactNode;
  onCancel?: () => void;
  onSubmit?: (args?: T) => void;
  danger?: boolean;
  actionProps?: T;
};
export function Modal<T = null>({
  id,
  children,
  onCancel,
  onSubmit,
  actionProps = null,
  danger = false,
}: TModalProps<T>) {
  const ref = useRef(null);

  const ChildrenElement = children(actionProps);
  return (
    <dialog ref={ref} id={id} className={s.modal}>
      <div className={s.modalContent}>
        {ChildrenElement}
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
              onSubmit && onSubmit(actionProps);
              ref.current.close();
            }}
            danger={danger}
          >
            Submit
          </Clickable>
        </div>
      </div>
    </dialog>
  );
}

export function useModal<T>(
  props: TModalProps<T> & {
    actionPropsDefault?: T;
  }
): [
  modal: JSX.Element,
  options: {
    showModal: (props?: T) => void;
    hideModal: () => void;
    setActionProps: (args: T) => void;
  }
] {
  const [actionProps, setActionProps] = useState<T>(props.actionPropsDefault); // [id, ...args
  console.log("actionProps: ", actionProps);
  const { id, children, onCancel, onSubmit, danger } = props;
  const modal = (
    <Modal
      id={id}
      onCancel={onCancel}
      onSubmit={onSubmit}
      danger={danger}
      actionProps={actionProps}
    >
      {children}
    </Modal>
  );
  const showModal = (props: T) => {
    setActionProps(props);
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog?.showModal();
  };
  const hideModal = () => {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog?.close();
  };
  return [
    modal,
    {
      showModal,
      hideModal,
      setActionProps,
    },
  ];
}
