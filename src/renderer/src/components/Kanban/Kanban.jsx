import styles from './Kanban.module.css'
import { createRendererLogger } from '../../utils/logger.js'
import { useKanban } from '../../hooks/useKanban.js'
import List from './List.jsx'

const log = createRendererLogger('Kanban')

export default function Kanban({ fileContent, setFile, saveFile }) {
  const { kanban, updateTask, updateStatus, updateListName } = useKanban(
    fileContent,
    setFile,
    saveFile
  )

  if (!kanban) {
    return
  }

  log.verbose(`kanban is ${JSON.stringify(kanban, null, 2)}`)

  const listEl = kanban.map((list) => (
    <List
      list={list}
      updateTask={updateTask}
      updateStatus={updateStatus}
      updateListName={updateListName}
    />
  ))

  return <div className={styles.kanbanContainer}>{listEl}</div>
}
