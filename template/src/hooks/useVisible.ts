import { useEffect, useCallback, useState } from "react"

export default function useVisible(options: any) {
  const [el, setEl] = useState()
  const containerRef = useCallback((node: any) => setEl(node), [])
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const checkVisible = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    let observer = new IntersectionObserver(checkVisible, options)
    if (el) observer.observe(el)
    
    return () => {
      if (el) observer.unobserve(el)
    }
  }, [el, options])
  
  return [containerRef, isVisible, el]
}