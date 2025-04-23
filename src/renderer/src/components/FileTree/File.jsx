import styles from './File.module.css'
import { File as FileIcon } from 'lucide-react'

export default function File({ name, type }) {
    return (
        <div className={styles.file}>
            <FileIcon size={16} />
            <span>{name}</span>
        </div>
    )
};