import classNames from "classnames/bind";
import s from "./TextInput.module.scss";
import { FaStarOfLife } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const cx = classNames.bind(s);

type TTextInputProps = {
  label: string;
  fullWidth?: boolean;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  type?: "text" | "password";
  disabled?: boolean;
  required?: boolean;
  showClear?: boolean;
};
export const TextInput = ({
  label,
  value,
  onChange,
  className,
  placeholder,
  type = "text",
  disabled = false,
  required = false,
  showClear = true,
  fullWidth = false,
}: TTextInputProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const classNames = cx({
    textInput: true,
    disabled,
    fullWidth,
  });
  const renderedPlaceholder = placeholder || `Enter ${label} here...`;

  return (
    <div className={cx(classNames, className)}>
      <label>{label}</label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChangeHandler}
        placeholder={renderedPlaceholder}
        disabled={disabled}
        required={required}
      />
      {showClear && value !== "" && (
        <ImCancelCircle
          className={s.clearIcon}
          onClick={() => {
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
} & TTextInputProps;

export const TextInputWithChoicesList = ({
  choices,
  ...props
}: TTextInputWithChoicesProps) => {
  const invalid = props.value !== "" && !choices.includes(props.value);

  const [open, setOpen] = useState(invalid);

  useEffect(() => {
    setOpen(invalid);
  }, [invalid]);

  const classNames = cx({
    textInputWithChoices: true,
    invalid,
  });

  return (
    <div className={classNames}>
      <TextInput {...props} />
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
                // console.log("choice: ", choice);
                props.onChange(choice);
                // console.log("props.onChange: ", props.onChange);
                // props.value = choice;
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
