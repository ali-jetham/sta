import styles from './List.module.css'
import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { EllipsisVertical, X } from 'lucide-react'
import { createRendererLogger } from '../../utils/logger'
import Editor from '../Editor/Editor'
import Task from './Task'
import ListContextMenu from '../ContextMenu/ListContextMenu'

const log = createRendererLogger('List')

export default function List({
  list,
  updateTask,
  updateStatus,
  updateListName,
  addTask
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [listName, setListName] = useState(list.listName)
  const { isOver, setNodeRef } = useDroppable({ id: list.id })

  const [showListContextMenu, setShowListContextMenu] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskText, setNewTaskText] = useState('')

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

  function handleEllipsisClick(e) {
    setMenuPos({ top: e.clientY, left: e.clientX })
    setShowListContextMenu(true)
  }

  function handleAddTask(e) {
    log.info(`[handleAddTask] called`)
    if (e.key === 'Enter') {
      e.preventDefault()
      log.info(`[handleAddTask] with content: ${newTaskText}`)
      setIsAddingTask(false)
      addTask(list.id, newTaskText)
    }
  }

  function handleNewTaskTextChange(content) {
    // log.debug(`[handleNewTaskTextChange] content: ${content}`)
    setNewTaskText(content)
  }

  return (
    <div ref={setNodeRef} className={styles.listContainer}>
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

            <button onClick={handleEllipsisClick}>
              <EllipsisVertical size={20} />
            </button>
          </div>
        )}
      </div>

      <div className={styles.tasksContainer}>
        {tasksEl}

        {isAddingTask && (
          <div className={styles.addTask}>
            <Editor
              content={newTaskText}
              onContentChange={handleNewTaskTextChange}
              onKeyDown={handleAddTask}
              fontSizeProp={11}
              highlightLine={false}
              foldGutterProp={false}
            />
          </div>
        )}
      </div>

      {showListContextMenu && (
        <ListContextMenu
          menuPos={menuPos}
          setShowListContextMenu={setShowListContextMenu}
          setIsAddingTask={setIsAddingTask}
        />
      )}
    </div>
  )
}
