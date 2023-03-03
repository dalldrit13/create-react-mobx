import { forwardRef, useState } from "react";
import { CloseIcon } from "../../icons";

import Chip from "../chip";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  initialValue?: string[];
  fireKey?: string;
  validate?: RegExp;
  helperText?: string;
  error?: boolean;
  noDuplicates?: boolean;
  onUpdate(_: string[]): string[];
  containerStyle?: React.CSSProperties;
}

const AutoComplete = forwardRef((props: Props, ref: any) => {
  const {
    label,
    helperText,
    type = "text",
    initialValue = [],
    onUpdate = () => {},
    containerStyle = {},
    fireKey = "Enter",
    validate = /[\s\S]{1,}/,
    noDuplicates,
    ...rest
  } = props;
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chips, setChips] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || validate.test(e.target.value)) {
      setError("");
    } else setError("Invalid value");
    setValue(e.target.value);
  };

  const inputProps = { id: label, type, value, onChange: handleChange, ref, className: error ? "error" : "", ...rest };

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === fireKey) {
      if (validate.test(value)) {
        let copy = structuredClone(chips);
        copy.push(value);
        if (noDuplicates) {
          copy = copy.filter((el: any, ind: number, arr: any) => arr.indexOf(el) === ind);
        }
        setValue("");
        setChips(copy);
        onUpdate(copy);
      }
    }
  };

  const removeChip = (ind: number) => () => {
    let copy = [...chips];
    copy.splice(ind, 1);
    setChips(copy);
    onUpdate(copy);
  };

  return (
    <div className="input_container" style={containerStyle}>
      {label && <label htmlFor={label}>{label}</label>}
      <input {...inputProps} onKeyUp={onEnter} />
      <small className={error ? "error" : ""} style={{ marginTop: 5, marginLeft: 5 }}>
        {error || helperText}
      </small>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
        {chips.map((c, ind) => (
          <Chip key={ind}>
            {c}
            <CloseIcon onClick={removeChip(ind)} className="chip_icon" />
          </Chip>
        ))}
      </div>
    </div>
  );
});

export default AutoComplete;
