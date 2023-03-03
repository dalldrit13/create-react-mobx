import { Link } from 'react-router-dom'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  light?: boolean
  disabled?: boolean
  href?: string
}

export default function Button({ light, disabled = false, onClick = ()=>{}, className = '', href, children, ...rest }: Props) {
  var button = <button className={(className) + (light ? ' light' : '')} disabled={disabled} onClick={onClick} {...rest}>
   {children}
  </button>

  if (href) {
    return (
      <Link to={href}>
        {button}
      </Link>
    )
  }
  
  return button
}