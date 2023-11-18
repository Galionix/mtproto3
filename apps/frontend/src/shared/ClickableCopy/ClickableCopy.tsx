import { FaCopy } from "react-icons/fa";
import { Clickable } from "../Clickable/Clickable";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import cx from "classnames";

export const ClickableCopy = ({
  text,
  className,
  title,
  style,
}: {
  style?: React.CSSProperties;
  text: string;
  className?: string;
  title?: string;
}) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className={className} style={style}>
      <CopyToClipboard
        text={text}
        onCopy={() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
        className={cx(
          "flex flex-row items-center gap-1",
          copied ? "!bg-green-500" : "bg-white"
        )}
      >
        <Clickable title={title}>
          <span className="text-xs">{text}</span>
          <FaCopy />
        </Clickable>
      </CopyToClipboard>
    </div>
  );
};
