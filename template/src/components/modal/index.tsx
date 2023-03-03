import { usePrevious } from "../../hooks";

interface Props extends React.HTMLProps<HTMLDivElement> {
  open: boolean
  title?: string
  onClose(): React.SyntheticEvent
}

const Modal = (props: Props) => {
  const prevOpen = usePrevious(props.open)
  
  if (!props.open) {
    if (prevOpen) {
      document.body.removeAttribute('style')
    }
    return <></>;
  }
  document.body.style.overflow = 'hidden'
  document.body.style.height = '100vh'

  return (
    <div onClick={props.onClose} className="modal_container">
      <div onClick={e => e.stopPropagation()}>
        {props.title && <h3>{props.title}</h3>}
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
