import { useState } from 'react'
import styles from './MainHeader.module.css'
import { KanbanSquare, SquarePlus, FileType2 } from 'lucide-react'

export default function MainHeader(props) {
  const [projectName, setProjectName] = useState('projectName')

  function handleViewSwitch() {
    if (props.view === 'kanban') {
      props.setView('editor')
    } else if (props.view === 'editor') {
      props.setView('kanban')
    }
  }

  return (
    <div className={styles.mainHeaderContainer}>
      <p className={styles.projectName}>{projectName}</p>

      <div className={styles.actionButtonsContainer}>
        <button className={styles.actionButton}>
          <SquarePlus size={20} />
        </button>

        {props.view === 'kanban' ? (
          <button className={styles.actionButton} onClick={handleViewSwitch}>
            <FileType2 size={20} />
          </button>
        ) : (
          <button className={styles.actionButton} onClick={handleViewSwitch}>
            <KanbanSquare size={20} />
          </button>
        )}
      </div>
    </div>
  )
}
