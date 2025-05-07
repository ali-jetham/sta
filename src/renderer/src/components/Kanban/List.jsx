import { useState } from 'react'
import styles from './List.module.css'
import Task from './Task'
import { EllipsisVertical, X } from 'lucide-react'
import Editor from '../Editor/Editor'
import { createRendererLogger } from '../../utils/logger'

const log = createRendererLogger('List')

export default function List({ list, updateTask, updateStatus, updateListName }) {
  const [isEditing, setIsEditing] = useState(false)
  const [listName, setListName] = useState(list.listName)

  const tasksEl = list.tasks.map((task) => (
    <Task
      listId={list.id}
      task={task}
      updateTask={updateTask}
      updateStatus={updateStatus}
    />
  ))

  function onEnterDown(e) {
    log.info(`[onEnterDown] called`)
    if (e.key === 'Enter') {
      e.preventDefault()
      log.info(`[onEnterDown] with listName: ${listName}`)
      setIsEditing(false)
      updateListName(list.id, listName)
    }
  }

  function onListNameChange(content) {
    log.debug(`[onListNameChange] ${content}`)
    setListName(content)
  }

  return (
    <div className={styles.listContainer}>
      <div className={styles.headingContainer}>
        {isEditing && (
          <div className={styles.headingContent}>
            <Editor
              content={listName}
              onContentChange={onListNameChange}
              onKeyDown={onEnterDown}
              fontSizeProp={11}
              highlightLine={false}
              foldGutterProp={false}
            />
            <button onClick={() => setIsEditing(false)}>
              <X size={20} />
            </button>
          </div>
        )}

        {!isEditing && (
          <div className={styles.headingContent} onDoubleClick={() => setIsEditing(true)}>
            <h3>{listName}</h3>

            <button>
              <EllipsisVertical size={20} />
            </button>
          </div>
        )}
      </div>

      <div className={styles.tasksContainer}>{tasksEl}</div>
    </div>
  )
}
