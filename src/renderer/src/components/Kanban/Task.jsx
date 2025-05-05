import styles from './Task.module.css'
import { Circle, Square, SquareCheck, SquareCheckBig, SquareSlash } from 'lucide-react'
import clsx from 'clsx'

export default function Task({ text, status, priority, start, due, done, created }) {
  return (
    <div className={styles.taskContainer}>
      <div className={styles.status}>
        {status === 'x' || status === 'X' ? (
          <SquareCheckBig size={16} />
        ) : status === '/' ? (
          <SquareSlash size={16} />
        ) : (
          <Square size={16} />
        )}
      </div>

      <div>
        <div className={styles.mainText}>{text}</div>
        <div className={styles.metadata}>
          {priority && (
            <div>
              <span className={styles.metadataKey}>priority</span>
              <span
                className={clsx(styles.metadataValue, {
                  [styles.priorityHigh]: priority === 'high',
                  [styles.priorityMedium]: priority === 'medium',
                  [styles.priorityLow]: priority === 'low'
                })}
              >
                {priority}
              </span>
            </div>
          )}
          {start && (
            <div>
              <span className={styles.metadataKey}>start</span>
              <span className={styles.metadataValue}>{start}</span>
            </div>
          )}
          {due && (
            <div>
              <span className={styles.metadataKey}>due</span>
              <span className={styles.dueNormal}>{due}</span>
              {/*TODO; assign class based on due period*/}
            </div>
          )}
          {done && (
            <div>
              <span className={styles.metadataKey}>done</span>
              <span className={clsx(styles.metadataValue, styles.done)}>{done}</span>
            </div>
          )}
          {created && (
            <div>
              <span className={styles.metadataKey}>created</span>
              <span className={styles.metadataValue}>{created}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
