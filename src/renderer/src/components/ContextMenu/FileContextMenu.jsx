import { forwardRef, useRef, useImperativeHandle, useState } from 'react'
import { createRendererLogger } from '../../utils/logger'
import styles from './FileContextMenu.module.css'
import { useClickOutside } from '../../hooks/useClickOutside'

const log = createRendererLogger('FileContextMenu')

export default function FileContextMenu({ menuPos, path, setShowFileMenu }) {
  const menuRef = useRef(null)
  const [showNameField, setShowNameField] = useState(false)
  const [item, setItem] = useState({ name: null, type: null })

  useClickOutside(menuRef, () => setShowFileMenu(false))

  return (
    <div
      ref={menuRef}
      className={styles.menuContainer}
      style={{ top: menuPos.top, left: menuPos.left }}
    >
      <button
        className={styles.buttons}
        onClick={() => {
          setShowNameField((prev) => !prev)
          setItem({ name: null, type: 'dir' })
        }}
      >
        New Folder
      </button>
      <button
        className={styles.buttons}
        onClick={() => {
          setShowNameField((prev) => !prev)
          setItem({ name: null, type: 'file' })
        }}
      >
        New File
      </button>
      <button className={styles.buttons}>Delete</button>

      {showNameField && (
        <input className={styles.nameField} type="text" value={item.name} />
      )}
    </div>
  )
}
