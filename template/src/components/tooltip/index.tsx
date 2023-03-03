import React, { useState } from "react"

interface Props {
  content: any
  children: any
  position?: "top-center" | "top-left" | "top-right" | "bottom-center" | "bottom-left" | "bottom-right" | "left-center" | "right-center"
}

const Tooltip = ({ children, content, position }: Props) => {
  const [popup, setPopup] = useState<{ open: boolean, style: React.CSSProperties }>({ open: false, style: {}})

  const showPopup = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const { width, height } = e.currentTarget.getBoundingClientRect()
    let style: React.CSSProperties = { bottom: height + 2, right: 0, left: 0, margin: 'auto' }
    switch (position) {
      case "top-left":
        delete style.left
        style.right = width + 2
        break
      case "top-right":
        delete style.right
        style.left = width + 2
        break
      case "bottom-center":
        delete style.bottom
        style.top = height + 2
        break
      case "bottom-left":
        style = { top: height + 2, right: width + 2 }
        break
      case "bottom-right":
        style = { top: height + 2, left: width + 2 }
        break
      case "right-center":
        style = { top: 0, bottom: 0, left: width + 3, margin: 'auto' }
        break
      case "left-center":
        style = { top: 0, bottom: 0, right: width + 3, margin: 'auto' }
    }
    setPopup({ open: true, style })
  }

  if (!children) {
    throw new Error("Tooltip must have child component")
  }
  if (!content) {
    throw new Error("Tooltip must have content")
  }

  return (
    <div style={{ position: 'relative' }} onMouseEnter={showPopup} onMouseLeave={() => setPopup({ ...popup, open: false })}>
      {children}
      {popup.open && <div className="tooltip" style={popup.style}>
        {content}
      </div>}
    </div>
  )
}

export default Tooltip