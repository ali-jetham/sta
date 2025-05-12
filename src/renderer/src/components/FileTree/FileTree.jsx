import styles from './FileTree.module.css'
import { createRendererLogger } from '../../utils/logger'
import { useState, useEffect } from 'react'
import Directory from './Directory'

const log = createRendererLogger('FileTree')

export default function FileTree() {
  const [workspace, setWorkspace] = useState()
  const [workspacePath, setWorkspacePath] = useState()
  const [tree, setTree] = useState()

  async function getTree() {
    try {
      const { fileTree, workspaceName, workspacePath } =
        await window.electron.ipcRenderer.invoke('file:getTree')
      setWorkspace(workspaceName)
      setWorkspacePath(workspacePath)
      setTree([...fileTree])
      log.verbose(`[getTree] new tree: ${JSON.stringify(fileTree, null, 2)}`)
    } catch (error) {
      log.error(`Failed to get file tree ${error}`)
    }
  }

  // const handleTreeChanged = () => {
  //   log.info('File tree changed, refreshing...')
  //   getTree()
  // }
  // window.electron.ipcRenderer.on('file:treeChanged', handleTreeChanged)

  useEffect(() => {
    getTree()
  }, [])

  if (tree === null) {
    return
  }

  return (
    <div className={`${styles.fileTreeContainer} noselect`}>
      <div className={styles.headingContainer}>
        <h1 className={styles.workspaceHeading}>Workspace</h1>
        {/* <button className={styles.addButton}>
          <Plus size={19.2} />
        </button> */}
      </div>

      <Directory tree={tree} name={workspace} path={workspacePath} setTree={setTree} />
    </div>
  )
}
