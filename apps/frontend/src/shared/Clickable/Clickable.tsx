import Link from "next/link";
import styles from "./Clickable.module.scss";
import { IconType } from "react-icons/lib";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const cx = classNames.bind(styles);
export type TClickableProps = {
  children?: React.ReactNode;
  onClick?: () => void;

  comp?: "button" | "link";

  className?: string;
  text?: string;
  href?: string;
  target?: string;
  icon?: IconType;
  title?: string;
  danger?: boolean;
  primary?: boolean;
  disabled?: boolean;
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
  disabled,
  title,
}: TClickableProps) => {
  const Component = comp === "link" ? Link : "button";
  // const gapStyle = icon && text !== "" ? styles.gap : "";
  const IconComponent = icon || (() => null);
  const classNames = cx("h-fit w-fit", {
    button: comp === "button",
    link: comp === "link",
    danger,
    primary,
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

  return (
    <Component
      suppressHydrationWarning={true}
      title={title || text}
      href={href}
      target={target}
      onClick={onClickHandler}
      className={`${classes} ${className}`}
      disabled={disabled}
    >
      {<IconComponent />}
      <span suppressHydrationWarning={true}>{text}</span>
      {children}
    </Component>
  );
};
