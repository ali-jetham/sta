import styles from './List.module.css'
import Task from './Task'

export default function List({ name, tasks, updateTask }) {
  const tasksEl = tasks.map((task) => <Task task={task} updateTask={updateTask} />)

  return (
    <div className={styles.listContainer}>
      <div className={styles.headingContainer}>{name}</div>

      <div className={styles.tasksContainer}>{tasksEl}</div>
    </div>
  )
}
