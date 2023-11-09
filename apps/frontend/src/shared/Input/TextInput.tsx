import classNames from "classnames/bind";
import s from "./TextInput.module.scss";
import { FaStarOfLife } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

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
};
export const TextInput = ({
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
  defaultValue = "",
  ariaLabel,
  style,
}: TTextInputProps) => {
  const Component = area ? "textarea" : "input";
  // useEffect(() => {
  //   if (value?.length > 30 && value?.length < 31) {
  //     inputRef.current?.focus();
  //   }
  // }, [value?.length]);

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
    <div className={cx(classNames, className)} style={style}>
      <label>{label || renderedPlaceholder}</label>
      <Component
        ref={inputRef}
        type={type}
        value={value}
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
    </div>
  );
};

type TTextInputWithChoicesProps = {
  choices: string[];
  onError?: (error?: string) => void;
  onClearError?: () => void;
} & TTextInputProps;

export const TextInputWithChoicesList = ({
  choices,
  onError,
  onClearError,
  style,
  ...props
}: TTextInputWithChoicesProps) => {
  const { defaultValue } = props;

  const invalid = props.value && !choices.includes(props.value);

  useEffect(() => {
    if (defaultValue !== "") {
      if (!props.onChange) return;
      props.onChange(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);
  const [open, setOpen] = useState(invalid);

  useEffect(() => {
    setOpen(invalid);
    onError?.(invalid ? "Invalid choice!" : undefined);
    !invalid && onClearError?.();
  }, [invalid]);

  const classNames = cx({
    textInputWithChoices: true,
    invalid,
  });

  return (
    <div className={classNames} style={style}>
      <TextInput {...props} style={style} />
      {open ? (
        <AiOutlineArrowUp className={s.arrow} onClick={() => setOpen(!open)} />
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
              key={choice}
              onClick={() => {
                if (!props.onChange) return;
                props.onChange(choice);
                setOpen(false);
              }}
            >
              {choice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
