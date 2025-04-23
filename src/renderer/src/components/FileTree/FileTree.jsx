import styles from './FileTree.module.css'
import { useState, useEffect, Children } from 'react'
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

    log.info(`tree: ${JSON.stringify(tree, null, 2)}`)

    const directories = tree.filter(file => file.type === 'directory')
    const directoryEl = directories.map(dir => <Directory name={dir.name} path={dir.path} setTree={setTree} />)

    const files = tree.filter(file => file.type === 'file')
    const filesEl = files.map(file => <File name={file.name} />)


    return (
        <div className={`${styles.fileTreeContainer} noselect`}>
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

function Directory({ name, path, tree, setTree }) {

    const [collapsed, setCollapsed] = useState(true)
    const [firstClick, setFirstClick] = useState(false)

    function handleDirClick() {
        setCollapsed(prev => !prev)

        if (!firstClick) {
            setFirstClick(true)
            log.info('[handleDirClick] first click set to true')
            window.electron.ipcRenderer.invoke('getFileTree', path)
                .then((response) => {
                    log.info('[handleDirClick] then response')
                    setTree((prevTree) => {
                        const updatedTree = prevTree.map((item) => {
                            if (item.path === path && item.type === 'directory') {
                                return { ...item, children: response }
                            }
                            return item
                        })
                        log.verbose(`[Directory] updatedTree: ${JSON.stringify(updatedTree, null, 2)}`)
                        return updatedTree
                    })
                })
                .catch((error) => {
                    log.error(`[Directory] ${error}`)
                })
        }
    }

    return (
        <div
            onClick={handleDirClick}
            className={styles.dir}
        >
            {collapsed ? <Folder size={16} /> : <FolderOpen size={16} />}
            <span className={styles.dirName}>{name}</span>
        </div >
    )
}