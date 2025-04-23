import styles from './File.module.css'
import { createRendererLogger } from '../../utils/logger'
import { File as FileIcon } from 'lucide-react'

const log = createRendererLogger('File')

export default function File({ fileName, path }) {

    function handleClick() {
        log.info(`open file with name: ${fileName} and path: ${path}`)
        window.electron.ipcRenderer.invoke('openFile', path)
    }

    return (
        <div className={styles.file} onClick={handleClick}>
            <FileIcon size={16} />
            <span>{fileName}</span>
        </div>
    )
};