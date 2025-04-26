import { useState } from 'react'
import styles from './MainHeader.module.css'
import { Settings, SquarePlus, FileType2 } from 'lucide-react'

export default function MainHeader() {
  const [projectName, setProjectName] = useState('projectName')

  return (
    <div className={styles.mainHeaderContainer}>
      <p className={styles.projectName}>{projectName}</p>

      <div className={styles.actionButtons}>
        <SquarePlus size={20} />
        <FileType2 size={20} />
      </div>
    </div>
  )
}
