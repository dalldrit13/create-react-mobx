interface Props {
  progress: number
  total: number
}

export default function ProgressBar({ progress, total }: Props) {
  const percent = Math.floor((progress / total) * 100)
  return (<div className="progress"><div style={{ width: `${percent}%` }}></div></div>)
}