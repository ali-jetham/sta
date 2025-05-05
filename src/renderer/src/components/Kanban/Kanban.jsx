import styles from './Kanban.module.css'
import { createRendererLogger } from '../../utils/logger.js'
import { useKanban } from '../../hooks/useKanban.js'
import List from './List.jsx'

const log = createRendererLogger('Kanban')

export default function Kanban({ fileContent }) {
  const { kanban, updateTask, updateStatus } = useKanban(fileContent)

  if (!kanban) {
    return
  }

  const listEl = kanban.map((list) => (
    <List list={list} updateTask={updateTask} updateStatus={updateStatus} />
  ))

  return <div className={styles.kanbanContainer}>{listEl}</div>
}
