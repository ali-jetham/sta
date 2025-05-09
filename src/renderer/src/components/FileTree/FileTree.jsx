import styles from './FileTree.module.css'
import { createRendererLogger } from '../../utils/logger'
import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import Directory from './Directory'
import File from './File'

const log = createRendererLogger('FileTree')

export default function FileTree() {
  const [workspace, setWorkspace] = useState()
  const [workspacePath, setWorkspacePath] = useState()

  const [tree, setTree] = useState(null)

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('file:getTree')
      .then(({ fileTree, workspaceName, workspacePath }) => {
        setWorkspace(workspaceName)
        setWorkspacePath(workspacePath)
        setTree(fileTree)
      })
      .catch((error) => log.error(`Failed to get file tree ${error}`))
  }, [])

  if (tree === null) {
    return
  }
  log.info(`tree: ${JSON.stringify(tree, null, 2)}`)

  return (
    <div className={`${styles.fileTreeContainer} noselect`}>
      <div className={styles.headingContainer}>
        <h1 className={styles.workspaceHeading}>Workspace</h1>
        {/* <button className={styles.addButton}>
          <Plus size={19.2} />
        </button> */}
      </div>

      <Directory name={workspace} path={workspacePath} setTree={setTree} />
    </div>
  )
}
