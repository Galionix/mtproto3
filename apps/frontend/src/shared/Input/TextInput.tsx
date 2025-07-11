import classNames from "classnames/bind";
import s from "./TextInput.module.scss";
import { FaStarOfLife } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { Skeleton } from "../Skeleton/Skeleton";

const cx = classNames.bind(s);

type TTextInputProps = {
  label?: string;
  fullLabel?: string;
  fullWidth?: boolean;
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  type?: "text" | "password" | "number";
  disabled?: boolean;
  required?: boolean;
  showClear?: boolean;
  defaultValue?: string;
  ariaLabel?: string;
  area?: boolean;
  style?: any;
  width?: number;
  onCtrlEnter?: () => void;
  loading?: boolean;
  rows?: number;
};
export const TextInput = ({
  onCtrlEnter,
  label,
  value,
  area,
  fullLabel,
  onChange,
  className,
  placeholder,
  type = "text",
  disabled = false,
  required = false,
  showClear = true,
  fullWidth = false,
  loading = false,
  width,
  defaultValue = "",
  ariaLabel,
  rows = 1,
  style,
}: TTextInputProps) => {
  const Component = area ? "textarea" : "input";
  const onKeyUpHandler = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      onCtrlEnter?.();
    }
  };

  const onChangeHandler = (e) => {
    if (!onChange) return;
    onChange(e.target.value);
  };

  const inputRef = useRef<any>(null);
  const classNames = cx({
    textInput: true,
    disabled,
    fullWidth,
  });
  const renderedPlaceholder =
    fullLabel || placeholder || `Enter ${label} here...`;

  return (
    <div
      className={cx(classNames, className)}
      style={{
        width: `${width}px`,
        maxWidth: `${width}px`,
        ...style,
      }}
    >
      <Skeleton enabled={loading}>
        <label>{label || renderedPlaceholder}</label>
        <Component
          {...(area ? { rows } : {})}
          ref={inputRef}
          type={type}
          value={value}
          onKeyUp={onKeyUpHandler}
          onChange={onChangeHandler}
          placeholder={renderedPlaceholder}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel}
        />
        {showClear && !disabled && value !== "" && (
          <ImCancelCircle
            className={s.clearIcon}
            onClick={() => {
              if (!onChange) return;
              onChange("");
              inputRef.current?.focus();
            }}
          />
        )}
        {required && value === "" && (
          <FaStarOfLife
            title={`${label} is required field!`}
            className={s.requiredStar}
          />
        )}
      </Skeleton>
    </div>
  );
};

type TTextInputWithChoicesProps = {
  choices: string[];
  onError?: (error?: string) => void;
  onClearError?: () => void;
  multiple?: boolean;
} & TTextInputProps;

export const TextInputWithChoicesList = ({
  choices,
  onError,
  onClearError,
  style,
  multiple,
  // loading = false,

  ...props
}: TTextInputWithChoicesProps) => {
  const { defaultValue } = props;

  const invalid = !multiple
    ? props.value && !choices.includes(props.value)
    : props.value && props.value.split(",").some((v) => !choices.includes(v));

  useEffect(() => {
    if (defaultValue !== "") {
      if (!props.onChange) return;
      props.onChange(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);
  const [open, setOpen] = useState(invalid);
  const checkedItems = props.value ? props.value.split(",") : [];
  // const [selectedItems, setSelectedItems] = useState(checkedItems);

  useEffect(() => {
    onError?.(invalid ? "Invalid choice!" : undefined);
    !invalid && onClearError?.();
    // if (!invalid) setOpen(true);
  }, [invalid]);

  const classNames = cx({
    textInputWithChoices: true,
    invalid,
  });

  return (
    <div className={classNames} style={style}>
      <Skeleton enabled={props.loading}>
        <TextInput {...props} style={style} />
        {open ? (
          <AiOutlineArrowUp
            className={s.arrow}
            onClick={() => setOpen(!open)}
          />
        ) : (
          <AiOutlineArrowDown
            className={s.arrow}
            onClick={() => setOpen(!open)}
          />
        )}
        {open && (
          <ul>
            {choices.map((choice) => (
              <li
                className={cx({ selected: checkedItems.includes(choice) })}
                key={choice}
                onClick={() => {
                  if (!props.onChange) return;
                  if (multiple) {
                    const newItems = checkedItems.includes(choice)
                      ? checkedItems.filter((item) => item !== choice)
                      : [...checkedItems, choice];
                    props.onChange(newItems.join(","));
                  } else {
                    props.onChange(choice);
                  }
                  // props.onChange(choice);
                  !multiple && setOpen(false);
                }}
              >
                {choice}
              </li>
            ))}
          </ul>
        )}
      </Skeleton>
    </div>
  );
};
