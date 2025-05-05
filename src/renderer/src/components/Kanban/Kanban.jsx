import styles from './Kanban.module.css'
import { createRendererLogger } from '../../utils/logger.js'
import { useKanban } from '../../hooks/useKanban.js'
import List from './List.jsx'

const log = createRendererLogger('Kanban')

export default function Kanban({ fileContent }) {
  const { kanban, updateTask } = useKanban(fileContent)

  if (!kanban) {
    return
  }

  const listEl = kanban.map((list) => (
    <List name={list.listName} tasks={list.tasks} updateTask={updateTask} />
  ))

  return <div className={styles.kanbanContainer}>{listEl}</div>
}
