import React, { forwardRef } from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: string[]
  helperText?: string
  error?: boolean
  containerStyle?: React.CSSProperties
}

const Select = forwardRef((props: Props, ref) => {
  const { label, options = [], helperText, error, onChange = null, value, containerStyle = {}, ...rest } = props
  const selectProps: any = { id: label, value, onChange, ref, className: error ? "error" : "", ...rest };

  return (
    <div className="input_container" style={containerStyle}>
      {label && <label htmlFor={label}>{label}</label>}
      <select {...selectProps}>
        {options.map((opt, ind) => (
          <option key={ind} value={opt}>{opt}</option>
        ))}
      </select>
      <small className={error ? "error" : ""} style={{ marginTop: 5, marginLeft: 5 }}>
        {helperText}
      </small>
    </div>
  );
});

export default Select;
