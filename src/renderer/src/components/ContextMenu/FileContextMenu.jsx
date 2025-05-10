import { forwardRef, useRef, useImperativeHandle, useState } from 'react'
import { createRendererLogger } from '../../utils/logger'
import styles from './FileContextMenu.module.css'
import { useClickOutside } from '../../hooks/useClickOutside'
import clsx from 'clsx'

const log = createRendererLogger('FileContextMenu')

export default function FileContextMenu({ menuPos, path, setShowFileMenu }) {
  const menuRef = useRef(null)
  const [showNameField, setShowNameField] = useState(false)
  const [item, setItem] = useState({ name: '', type: '', path })

  useClickOutside(menuRef, () => setShowFileMenu(false))

  function handleDeleteFile() {
    log.debug(`[handleDeleteFile] called`)
    setShowFileMenu(false)
    window.electron.ipcRenderer.send('FileContextMenu:delete', path)
  }

  function handleItemChange(event) {
    setItem((prev) => ({ ...prev, name: event.target.value }))
  }

  function handleEnterPress(event) {
    if (event.key === 'Enter') {
      log.debug(`[handleEnterPress] enter pressed`)
      log.debug(`[handleItemChange] item: ${JSON.stringify(item)}`)
      window.electron.ipcRenderer.send('FileContextMenu:create', item)
    }
  }

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
          setItem((prev) => ({ ...prev, type: 'dir' }))
        }}
      >
        New Folder
      </button>
      <button
        className={styles.buttons}
        onClick={() => {
          setShowNameField((prev) => !prev)
          setItem((prev) => ({ ...prev, type: 'file' }))
        }}
      >
        New File
      </button>
      <button className={styles.buttons} onClick={handleDeleteFile}>
        Delete
      </button>

      {showNameField && (
        <input
          className={styles.nameField}
          type="text"
          value={item.name}
          onChange={handleItemChange}
          onKeyDown={handleEnterPress}
        />
      )}
    </div>
  )
}
