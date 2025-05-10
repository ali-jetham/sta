import styles from './MainHeader.module.css'
import { KanbanSquare, SquarePlus, FileType2, Save, CircleX } from 'lucide-react'

export default function MainHeader({
  view,
  fileName,
  setFileName,
  setView,
  saveFile,
  setFile
}) {
  function handleViewSwitch() {
    if (view === 'kanban') {
      setView('editor')
    } else if (view === 'editor') {
      setView('kanban')
    }
  }

  function handleFileClose() {
    saveFile()
    setFile(null)
    setFileName(null)
  }

  return (
    <div className={styles.mainHeaderContainer}>
      <p className={styles.projectName}>{fileName}</p>

      <div className={styles.actionButtonsContainer}>
        {view === 'kanban' && (
          <button className={styles.actionButton}>
            <SquarePlus size={20} />
          </button>
        )}

        {view === 'kanban' ? (
          <button className={styles.actionButton} onClick={handleViewSwitch}>
            <FileType2 size={20} />
          </button>
        ) : (
          <button className={styles.actionButton} onClick={handleViewSwitch}>
            <KanbanSquare size={20} />
          </button>
        )}

        <button className={styles.actionButton} onClick={saveFile}>
          <Save size={20} />
        </button>

        <button className={styles.actionButton} onClick={handleFileClose}>
          <CircleX size={20} />
        </button>
      </div>
    </div>
  )
}
