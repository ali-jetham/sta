import styles from './FileTree.module.css'
import { createRendererLogger } from '../../utils/logger'
import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import Directory from './Directory'
import File from './File'

const log = createRendererLogger('FileTree')

export default function FileTree(props) {
  const workSpacePath = useState()
  const [tree, setTree] = useState(null)

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('getFileTree')
      .then((response) => setTree(response))
      .catch((error) => log.error(`Failed to get file tree ${error}`))
  }, [])

  if (tree === null) {
    return
  }

  log.info(`tree: ${JSON.stringify(tree, null, 2)}`)

  const directories = tree.filter((file) => file.type === 'directory')
  const directoryEl = directories.map((dir) => (
    <Directory
      name={dir.name}
      path={dir.path}
      setTree={setTree}
      setShowCreateContext={props.setShowCreateContext}
    />
  ))

  const files = tree.filter((file) => file.type === 'file')
  const filesEl = files.map((file) => (
    <File fileName={file.name} path={file.path} />
  ))

  return (
    <div className={`${styles.fileTreeContainer} noselect`}>
      <div className={styles.headingContainer}>
        <h1 className={styles.workspaceHeading}>Workspace</h1>
        <button className={styles.addButton}>
          <Plus size={19.2} />
        </button>
      </div>

      {directoryEl}
      {filesEl}
    </div>
  )
}
