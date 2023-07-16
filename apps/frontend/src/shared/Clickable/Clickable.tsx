import Link from "next/link";
import styles from "./Clickable.module.scss";
import { IconType } from "react-icons/lib";
import { useRouter } from "next/router";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
export type TClickeableProps = {
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
  title,
}: TClickeableProps) => {
  const Component = comp === "link" ? Link : "button";
  // const gapStyle = icon && text !== "" ? styles.gap : "";
  const IconComponent = icon || (() => null);

  const router = useRouter();
  const onClickHandler = href
    ? () => {
        router.push(href);
      }
    : onClick;

  const classNames = cx({
    button: comp === "button",
    link: comp === "link",
    danger,
    primary,
    gap: icon && text,
  });

  return (
    <Component
      title={title || text}
      href={href}
      target={target}
      onClick={onClickHandler}
      className={`${classNames} ${className}`}
    >
      {<IconComponent />}
      <span>{text}</span>
      {children}
    </Component>
  );
};
