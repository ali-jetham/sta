import { useState } from 'react'
import styles from './MainHeader.module.css'
import { KanbanSquare, SquarePlus, FileType2, Save } from 'lucide-react'

export default function MainHeader(props) {
  function handleViewSwitch() {
    if (props.view === 'kanban') {
      props.setView('editor')
    } else if (props.view === 'editor') {
      props.setView('kanban')
    }
  }

  return (
    <div className={styles.mainHeaderContainer}>
      <p className={styles.projectName}>{props.fileName}</p>

      <div className={styles.actionButtonsContainer}>
        {props.view === 'kanban' && (
          <button className={styles.actionButton}>
            <SquarePlus size={20} />
          </button>
        )}

        {props.view === 'kanban' ? (
          <button className={styles.actionButton} onClick={handleViewSwitch}>
            <FileType2 size={20} />
          </button>
        ) : (
          <button className={styles.actionButton} onClick={handleViewSwitch}>
            <KanbanSquare size={20} />
          </button>
        )}

        <button className={styles.actionButton} onClick={props.saveFile}>
          <Save size={20} />
        </button>
      </div>
    </div>
  )
}
