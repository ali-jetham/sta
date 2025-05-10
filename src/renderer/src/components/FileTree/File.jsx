import styles from './File.module.css'
import { createRendererLogger } from '../../utils/logger'
import { File as FileIcon } from 'lucide-react'
import { useState } from 'react'
import FileContextMenu from '../ContextMenu/FileContextMenu'

const log = createRendererLogger('File')

export default function File({ fileName, path }) {
  const [showFileMenu, setShowFileMenu] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 300 })

  function handleClick() {
    log.info(`open file with name: ${fileName} and path: ${path}`)
    window.electron.ipcRenderer.send('file:openFile', path)
  }

  function handleContextMenu(event) {
    log.debug('handleContextMenu() called')
    setMenuPos({ top: event.clientX, left: event.clientY })
    setShowFileMenu(true)
  }

  return (
    <div className={styles.file} onClick={handleClick} onContextMenu={handleContextMenu}>
      <FileIcon size={16} />
      <span>{fileName}</span>

      {showFileMenu && (
        <FileContextMenu
          menuPos={menuPos}
          path={path}
          setShowFileMenu={setShowFileMenu}
        />
      )}
    </div>
  )
}
