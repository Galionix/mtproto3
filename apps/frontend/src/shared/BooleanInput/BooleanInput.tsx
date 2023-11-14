type TBooleanInputProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
};

export const BooleanInput = ({
  value,
  onChange,
  label,
}: TBooleanInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        checked={value}
        onChange={handleChange}
      />
      {label && <label className="form-check-label">{label}</label>}
    </div>
  );
};
