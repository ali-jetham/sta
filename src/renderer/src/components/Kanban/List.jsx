import styles from './List.module.css'
import Task from './Task'

export default function List({ name, tasks }) {
  const tasksEl = tasks.map((task) => (
    <Task
      text={task.mainText}
      status={task.status}
      priority={task.priority}
      start={task.start}
      due={task.due}
      done={task.done}
      created={task.created}
    />
  ))

  return (
    <div className={styles.listContainer}>
      <div className={styles.headingContainer}>{name}</div>

      <div className={styles.tasksContainer}>{tasksEl}</div>
    </div>
  )
}
