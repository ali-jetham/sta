import styles from './MainHeader.module.css'
import { Settings, SquarePlus, FileType2 } from 'lucide-react'

export default function MainHeader() {
    return (
        <div className={styles.mainHeaderContainer}>

            <p className={styles.projectName}>projectName</p>

            <div className={styles.actionButtons}>
                <Settings />
                <SquarePlus />
                <FileType2 />
                <SquarePlus />
            </div>
        </div>
    )
};

