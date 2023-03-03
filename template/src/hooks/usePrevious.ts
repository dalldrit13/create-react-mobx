import { useState, useMemo } from "react"

export default function usePrevious(val: any) {
  const [state, setState] = useState([val])
  
  return useMemo(() => {
    let copy = [...state]
    copy.unshift(val)
    let prev = copy.pop()
    setState(copy)
    return prev
  }, [val])
}