import { createRendererLogger } from '../../utils/logger'
import styles from './FileContextMenu.module.css'

const log = createRendererLogger('FileContextMenu')

// TODO: rename component to something more appropriate

export default function FileContextMenu({ active, menuPosition, dirPath }) {
  function handleNewFile(e) {
    log.info(`[handleNewFile] called`)
    window.electron.ipcRenderer.send('FileContextMenu:createFile', dirPath)
  }

  return (
    <div
      className={`${styles.menuContainer} ${active ? styles.active : ''}`}
      style={{ top: menuPosition.top, left: menuPosition.left }}
    >
      <button className={styles.buttons}>New Folder</button>
      <button className={styles.buttons} onClick={handleNewFile}>
        New File
      </button>
      <button className={styles.buttons}>Delete</button>
    </div>
  )
}
