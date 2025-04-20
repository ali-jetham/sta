import styles from './FileTree.module.css'
import { useState, useEffect } from 'react'
import { Folder, FolderOpen } from 'lucide-react'
import { createRendererLogger } from '../../utils/logger'

const log = createRendererLogger('FileTree')

export default function FileTree(props) {

    const [tree, setTree] = useState(null)

    useEffect(() => {
        window.electron.ipcRenderer.invoke('getFileTree')
            .then((response) => setTree(response))
            .catch((error) => log.error(`Failed to get file tree ${error}`))
    }, []
    )

    if (tree === null) {
        return
    }

    const directories = tree.filter(file => file.type === 'directory')
    const directoryEl = directories.map(dir => <Directory name={dir.name} />)

    const files = tree.filter(file => file.type === 'file')
    const filesEl = files.map(file => <File name={file.name} />)


    return (
        <div className={styles.fileTreeContainer}>
            <h1 className={styles.workspaceHeading}>Workspace</h1>

            {directoryEl}
            {filesEl}
        </div>
    )
};

function File({ name, type }) {
    return (
        <div className={styles.file}>
            {name}
        </div>
    )
};

function Directory({ name }) {

    const [collapsed, setCollapsed] = useState(true)

    return (
        <div className={styles.dir}>
            {collapsed ? <Folder size={16} /> : <FolderOpen size={16} />}
            <span className={styles.dirName}>{name}</span>
        </div >
    )
}