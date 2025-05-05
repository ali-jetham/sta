import styles from './Task.module.css'
import { Circle, Square, SquareCheck, SquareCheckBig, SquareSlash } from 'lucide-react'
import clsx from 'clsx'
import { useState } from 'react'
import Editor from '../Editor/Editor'
import { taskToMarkdown } from '../../utils/markdownParser'

export default function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState()

  function handleDoubleClick() {
    setIsEditing(true)
    setContent(taskToMarkdown(task, true))
  }

  return (
    <div className={styles.taskContainer}>
      <div className={styles.status}>
        {task.status === 'x' || task.status === 'X' ? (
          <SquareCheckBig size={16} />
        ) : task.status === '/' ? (
          <SquareSlash size={16} />
        ) : (
          <Square size={16} />
        )}
      </div>

      {isEditing && <Editor highlightLine={false} fileContent={content} />}

      {!isEditing && (
        <div className={styles.mainContent} onDoubleClick={handleDoubleClick}>
          <div className={styles.mainText}>{task.mainText}</div>
          <div className={styles.metadata}>
            {task.priority && (
              <div>
                <span className={styles.metadataKey}>priority</span>
                <span
                  className={clsx(styles.metadataValue, {
                    [styles.priorityHigh]: priority === 'high',
                    [styles.priorityMedium]: priority === 'medium',
                    [styles.priorityLow]: priority === 'low'
                  })}
                >
                  {task.priority}
                </span>
              </div>
            )}
            {task.start && (
              <div>
                <span className={styles.metadataKey}>start</span>
                <span className={styles.metadataValue}>{task.start}</span>
              </div>
            )}
            {task.due && (
              <div>
                <span className={styles.metadataKey}>due</span>
                <span className={styles.dueNormal}>{task.due}</span>
                {/*TODO; assign class based on due period*/}
              </div>
            )}
            {task.done && (
              <div>
                <span className={styles.metadataKey}>done</span>
                <span className={clsx(styles.metadataValue, styles.done)}>{task.done}</span>
              </div>
            )}
            {task.created && (
              <div>
                <span className={styles.metadataKey}>created</span>
                <span className={styles.metadataValue}>{task.created}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
