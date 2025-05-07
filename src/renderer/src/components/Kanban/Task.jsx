import styles from './Task.module.css'
import { Square, SquareCheckBig, SquareSlash, X } from 'lucide-react'
import clsx from 'clsx'
import { useState } from 'react'
import Editor from '../Editor/Editor'
import { createRendererLogger } from '../../utils/logger'

const log = createRendererLogger('Task')

export default function Task({ listId, task, updateTask, updateStatus }) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(task.mainText)

  function handleDoubleClick() {
    setIsEditing(true)
  }

  function onEnterDown(e) {
    if (e.ctrlKey && e.key === 'Enter') {
      setIsEditing(false)
      log.debug(`[onEnterDown] with taskId: ${task.id}`)
      updateTask(content, listId, task.id)
    }
  }

  function onContentChange(newContent) {
    setContent(newContent)
  }

  function onStatusClick() {
    log.debug(`[onStatusClick] with status: ${task.status}`)
    updateStatus(task.status, listId, task.id)
  }

  return (
    <div className={styles.taskContainer}>
      <div className={styles.status}>
        {task.status === 'x' || task.status === 'X' ? (
          <button className={styles.statusButton} onClick={onStatusClick}>
            <SquareCheckBig size={16} />
          </button>
        ) : task.status === '/' ? (
          <button className={styles.statusButton} onClick={onStatusClick}>
            <SquareSlash size={16} />
          </button>
        ) : (
          <button className={styles.statusButton} onClick={onStatusClick}>
            <Square size={16} />
          </button>
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
                <span className={clsx(styles.metadataValue, styles.done)}>
                  {task.done}
                </span>
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
          <X size={16} />
        </button>
      )}
    </div>
  )
}
