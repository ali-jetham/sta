import styles from './SideBar.module.css'
import Projects from '../Projects/Projects'
import { useEffect, useState, useRef } from "react";

export default function SideBar() {
  const [resizing, setResizing] = useState(false)
  const [width, setWidth] = useState(192)
  const containerRef = useRef(null);

  useEffect(() => {
    function handleMouseMove(event) {
      if (resizing) {
        const containerLeft = containerRef.current.getBoundingClientRect().left;
        const newWidth = event.clientX - containerLeft;
        setWidth(newWidth)
      }
    }

    function handleMouseUp() {
      setResizing(false)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)

    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

  }, [resizing])

  return (
    <div ref={containerRef} className={`${resizing ? "resizing" : ""} ${styles.container} `} style={{ width: `${width}px` }}>
      <div className={styles.sidebar}>
        <Projects />
      </div>
      <div
        className={styles.divider}
        onMouseDown={() => setResizing(true)}>
      </div>
    </div >
  )
}
