import styles from './Directory.module.css'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Folder, FolderOpen } from 'lucide-react'
import { createRendererLogger } from '../../utils/logger'
import File from './File'
import CreateContextMenu from '../CreateContextMenu/CreateContextMenu'
import { useClickOutside } from '../../hooks/useClickOutside'

const log = createRendererLogger('Directory')

export default function Directory({ name, path, setTree }) {
  const [collapsed, setCollapsed] = useState(true)
  const [firstClick, setFirstClick] = useState(false)
  const [children, setChildren] = useState(null)
  const [showCreateMenu, setShowCreateMenu] = useState(false)
  const createMenuRef = useRef()

  useClickOutside(createMenuRef, () => setShowCreateMenu(false))

  function handleContextMenu() {
    log.info('handleContextMenu() called')
    setShowCreateMenu(true)
  }

  function handleDirClick() {
    setCollapsed((prev) => !prev)

    if (!firstClick) {
      setFirstClick(true)
      log.info('[handleDirClick] first click set to true')
      window.electron.ipcRenderer
        .invoke('getFileTree', path)
        .then((response) => {
          log.info('[handleDirClick] then response')
          setChildren(response)
          setTree((prevTree) => {
            const updatedTree = prevTree.map((item) => {
              if (item.path === path && item.type === 'directory') {
                return { ...item, children: response }
              }
              return item
            })
            log.verbose(`updatedTree: ${JSON.stringify(updatedTree, null, 2)}`)
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
                <Directory
                  key={child.path}
                  name={child.name}
                  path={child.path}
                  setTree={setTree}
                  children={child.children}
                  setShowCreateContext={setShowCreateContext}
                />
              ) : (
                <File
                  key={child.path}
                  fileName={child.name}
                  path={child.path}
                />
              )
            )}
          </div>
        </div>
      )}
      {showCreateMenu &&
        createPortal(<CreateContextMenu ref={createMenuRef} />, document.body)}
    </div>
  )
}
