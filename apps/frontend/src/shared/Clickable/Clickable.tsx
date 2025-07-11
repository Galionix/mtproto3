import Link from "next/link";
import styles from "./Clickable.module.scss";
import { IconType } from "react-icons/lib";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useModal } from "../../Modal/Modal";
// import { FaExternalLinkAlt } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";


const cx = classNames.bind(styles);
type TClickableProps = {
  children?: React.ReactNode;
  onClick?: (e?: any) => void;

  comp?: "button" | "link";

  className?: string;
  text?: string;
  href?: string;
  target?: string;
  icon?: IconType;
  title?: string;
  danger?: boolean;
  primary?: boolean;
  warning?: boolean;
  disabled?: boolean;
  onClickMessage?: React.ReactNode;
  modalId?: string;
};

export const Clickable = ({
  children,
  onClick = () => null,
  comp = "button",
  className = "",
  text = "",
  href,
  target,
  icon,
  danger,
  primary,
  warning,
  disabled,
  title,
  onClickMessage,
  modalId,
}: TClickableProps) => {
  const Component = comp === "link" ? Link : "button";
  // const gapStyle = icon && text !== "" ? styles.gap : "";
  const IconComponent = icon || (() => null);
  const classNames = cx("h-fit w-fit", {
    button: comp === "button",
    link: comp === "link",
    base: true,
    danger,
    primary,
    warning,
    gap: icon && text,
    disabled,
  });
  const [classes, setClasses] = useState(null);

  const router = useRouter();
  const onClickHandler = href
    ? () => {
        router.push(href);
      }
    : onClick;

  const preparedOnCLickHandler = (e) => {

    if (onClickMessage) {
      showModal();
    } else {
      onClickHandler(e);
    }
  };

  useEffect(() => {
    if (
      "startViewTransition" in document &&
      document.startViewTransition instanceof Function
    ) {
      document.startViewTransition(() => {
        flushSync(() => {
          setClasses(classNames);
        });
      });
    } else {
      setClasses(classNames);
    }
  }, [classNames]);

  const [ConfirmModal, { showModal }] = useModal({
    id: modalId,
    children: () => <span>{onClickMessage}</span>,
    onSubmit: onClickHandler,
    className: styles.modal,
  });

  return (
    <>
      <Component
        suppressHydrationWarning={true}
        title={title || text}
        href={href}
        target={target}
        onClick={preparedOnCLickHandler}
        className={`${classes} ${className}`}
        disabled={disabled}
      >
        {<IconComponent />}
        <span suppressHydrationWarning={true}>{text}</span>
        {children}
        {comp === "link" && <IoArrowRedoOutline className={styles.linkIcon} />}
      </Component>
      {onClickMessage && ConfirmModal}
    </>
  );
};
