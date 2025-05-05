import styles from './List.module.css'
import Task from './Task'

export default function List({ name, tasks }) {
  const tasksEl = tasks.map((task) => <Task task={task} />)

  return (
    <div className={styles.listContainer}>
      <div className={styles.headingContainer}>{name}</div>

      <div className={styles.tasksContainer}>{tasksEl}</div>
    </div>
  )
}
