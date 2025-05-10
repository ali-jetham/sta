import styles from './Directory.module.css'
import { createRendererLogger } from '../../utils/logger'
import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Folder, FolderOpen } from 'lucide-react'
import { useClickOutside } from '../../hooks/useClickOutside'
import File from './File'
import FileContextMenu from '../ContextMenu/FileContextMenu'

const log = createRendererLogger('Directory')

export default function Directory({ name, path, setTree }) {
  const [collapsed, setCollapsed] = useState(true)
  const [firstClick, setFirstClick] = useState(false)
  const [children, setChildren] = useState([])
  const [showFileMenu, setShowFileMenu] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 300 })

  function handleContextMenu(event) {
    log.debug('handleContextMenu() called')
    setMenuPos({ top: event.clientX, left: event.clientY })
    setShowFileMenu(true)
  }

  function handleDirClick() {
    setCollapsed((prev) => !prev)

    if (!firstClick) {
      setFirstClick(true)
      log.info('[handleDirClick] first click set to true')
      window.electron.ipcRenderer
        .invoke('file:getTree', path)
        .then(({ fileTree }) => {
          setChildren(fileTree)
          setTree((prevTree) => {
            const updatedTree = prevTree.map((item) => {
              if (item.path === path && item.type === 'directory') {
                return { ...item, children: fileTree }
              }
              return item
            })
            // log.verbose(`updatedTree: ${JSON.stringify(updatedTree, null, 2)}`)
            return updatedTree
          })
        })
        .catch((error) => {
          log.error(`${error}`)
        })
    }
  }

  return (
    <div className={styles.directoryContainer}>
      <div
        className={styles.directory}
        onClick={handleDirClick}
        onContextMenu={handleContextMenu}
      >
        {collapsed ? <Folder size={16} /> : <FolderOpen size={16} />}
        <span className={styles.dirName}>{name}</span>
      </div>
      {!collapsed && children && (
        <div className={styles.childrenContainer}>
          <div className={styles.guideLine}></div>

          <div className={styles.children}>
            {children.map((child) =>
              child.type === 'directory' ? (
                <Directory name={child.name} path={child.path} setTree={setTree} />
              ) : (
                <File fileName={child.name} path={child.path} />
              )
            )}
          </div>
        </div>
      )}

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
