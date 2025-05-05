import styles from './List.module.css'
import Task from './Task'

export default function List({ list, updateTask, updateStatus }) {
  const tasksEl = list.tasks.map((task) => (
    <Task listId={list.id} task={task} updateTask={updateTask} updateStatus={updateStatus} />
  ))

  return (
    <div className={styles.listContainer}>
      <div className={styles.headingContainer}>{list.listName}</div>

      <div className={styles.tasksContainer}>{tasksEl}</div>
    </div>
  )
}
