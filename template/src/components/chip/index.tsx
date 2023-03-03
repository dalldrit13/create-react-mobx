interface Props {
  children: any
}
export default function Chip({ children }: Props) {
  return (
    <div className="chip">{children}</div>
  )
}