import styles from './Task.module.css'
import { Square, SquareCheckBig, SquareSlash, X } from 'lucide-react'
import clsx from 'clsx'
import { useState } from 'react'
import Editor from '../Editor/Editor'
import { taskToMarkdown } from '../../utils/markdownParser'
import { createRendererLogger } from '../../utils/logger'

const log = createRendererLogger('Task')

export default function Task({ task, updateTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(task.mainText)

  function handleDoubleClick() {
    setIsEditing(true)
    setContent(taskToMarkdown(task, true))
  }

  function onEnterDown(e) {
    if (e.key === 'Enter') {
      setIsEditing(false)
      updateTask(content, task.id)
    }
  }

  function onContentChange(newContent) {
    setContent(newContent)
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

      {isEditing && (
        <Editor
          content={content}
          onContentChange={onContentChange}
          onKeyDown={onEnterDown}
          fontSizeProp={9}
          highlightLine={false}
          foldGutterProp={false}
        />
      )}

      {!isEditing && (
        <div className={styles.mainContent} onDoubleClick={handleDoubleClick}>
          <div className={styles.mainText}>{task.mainText}</div>
          <div className={styles.metadata}>
            {task.priority && (
              <div>
                <span className={styles.metadataKey}>priority</span>
                <span
                  className={clsx(styles.metadataValue, {
                    [styles.priorityHigh]: task.priority === 'high',
                    [styles.priorityMedium]: task.priority === 'medium',
                    [styles.priorityLow]: task.priority === 'low'
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

      {isEditing && (
        <button onClick={() => setIsEditing(false)} className={styles.editingCloseButton}>
          <X />
        </button>
      )}
    </div>
  )
}
