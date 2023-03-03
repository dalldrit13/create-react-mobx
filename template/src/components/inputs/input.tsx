import { forwardRef } from "react"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  multi?: boolean
  helperText?: string
  error?: boolean
  containerStyle?: React.CSSProperties
}

const Input = forwardRef((props: Props, ref) => {
  const { label, multi, helperText, error, type = 'text', onChange = ()=>{}, value, containerStyle = {}, ...rest } = props
  const inputProps: any = { id: label, type, value, onChange, ref, className: error ? "error" : "", ...rest }
  const input = multi ? <textarea {...inputProps} /> : <input {...inputProps} />
  
  return (
    <div className="input_container" style={containerStyle}>
      {label && <label htmlFor={label}>{label}</label>}
      {input}
      <small className={error ? "error" : ""} style={{ marginTop: 5, marginLeft: 5 }}>{helperText}</small>
    </div>
  )
})

export default Input