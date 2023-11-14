import { useRef, useState } from "react";
import s from "./Modal.module.scss";
import { Clickable } from "../shared/Clickable/Clickable";
import { v4 } from "uuid";
import cx from "classnames";

type TModalProps<T = null> = {
  id?: string;
  children: (args?: T) => React.ReactNode;
  onCancel?: () => void;
  onSubmit?: (args?: T) => void;
  danger?: boolean;
  actionProps?: T;
  className?: string;
  title?: string;
};
export function Modal<T = null>({
  id,
  className,
  children,
  onCancel,
  onSubmit,
  actionProps = null,
  danger = false,
  title,
}: TModalProps<T>) {
  const ref = useRef(null);

  const ChildrenElement = children(actionProps);
  const preventMouseScroll = (e: React.WheelEvent<HTMLDialogElement>) => {
    console.log("e: ", e);
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <dialog
      ref={ref}
      id={id}
      className={cx(className, s.modal)}
      onScroll={preventMouseScroll}
    >
      {title && <h1>{title}</h1>}
      <div className={s.modalContent}>
        {ChildrenElement}
        <div className={s.modalFooter}>
          <Clickable
            onClick={() => {
              onCancel && onCancel();
              const dialog = document.getElementById(id) as HTMLDialogElement;
              dialog?.close();
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
            primary
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
  // console.log("actionProps: ", actionProps);
  const { id = `modal_${v4()}`, children, onCancel, onSubmit, danger } = props;

  const showModal = (props: T) => {
    setActionProps(props);
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog?.showModal();
    const rootElement = document.getElementsByTagName("html")[0];
    rootElement.style.overflow = "hidden";
  };
  const hideModal = () => {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog?.close();
    const rootElement = document.getElementsByTagName("html")[0];
    rootElement.style.overflow = "auto";
  };
  const preparedSubmit = () => {
    onSubmit && onSubmit(actionProps);
    hideModal();
  };

  const modal = (
    <Modal
      id={id}
      onCancel={onCancel || hideModal}
      onSubmit={preparedSubmit}
      danger={danger}
      actionProps={actionProps}
      className={props.className}
      title={"Just one more thing before you proceed..."}
    >
      {children}
    </Modal>
  );

  return [
    modal,
    {
      showModal,
      hideModal,
      setActionProps,
    },
  ];
}
