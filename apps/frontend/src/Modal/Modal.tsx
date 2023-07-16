import { useRef } from "react";

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
    <dialog ref={ref} id={id}>
      <div className="flex flex-col gap-2">
        {children}
        <div className="flex flex-row gap-2">
          <button
            onClick={() => {
              onCancel && onCancel();
              ref.current.close();
            }}
          >
            Cancel
          </button>
          <button
            className={danger ? "bg-red-500" : "bg-emerald-500"}
            onClick={() => {
              onSubmit && onSubmit();
              ref.current.close();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
};
