export default function Loading({ style = {} }) {
  return (<div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', ...style }}><div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>)
}