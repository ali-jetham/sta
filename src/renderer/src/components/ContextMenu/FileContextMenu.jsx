import { forwardRef, useRef, useImperativeHandle, useState } from 'react'
import { createRendererLogger } from '../../utils/logger'
import styles from './FileContextMenu.module.css'

const log = createRendererLogger('FileContextMenu')

const FileContextMenu = forwardRef((props, ref) => {
  const { active, menuPosition, dirPath } = props
  const menuRef = useRef(null)
  const [showNameField, setShowNameField] = useState(false)

  useImperativeHandle(ref, () => {
    return menuRef.current
  })

  function handleNewFile(e) {
    log.info(`[handleNewFile] called`)
    window.electron.ipcRenderer.send('FileContextMenu:createFile', { dirPath, fileName })
  }

  return (
    <div
      ref={menuRef}
      className={`${styles.menuContainer} ${active ? styles.active : ''}`}
      style={{ top: menuPosition.top, left: menuPosition.left }}
    >
      <button className={styles.buttons}>New Folder</button>
      <button
        className={styles.buttons}
        onClick={() => setShowNameField((prev) => !prev)}
      >
        New File
      </button>
      <button className={styles.buttons}>Delete</button>

      {showNameField && <input className={styles.nameField} type="text" />}
    </div>
  )
})

export default FileContextMenu
