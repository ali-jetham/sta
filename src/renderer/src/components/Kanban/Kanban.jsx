import styles from './Kanban.module.css'
import { createRendererLogger } from '../../utils/logger.js'
import { useKanban } from '../../hooks/useKanban.js'
import List from './List.jsx'
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor
} from '@dnd-kit/core'
import { useState, useMemo } from 'react'
import Task from './Task.jsx'

const log = createRendererLogger('Kanban')

export default function Kanban({
  fileContent,
  setFile,
  saveFile,
  isAddingList,
  setIsAddingList
}) {
  const {
    kanban,
    addTask,
    deleteTask,
    updateTask,
    updateStatus,
    addList,
    updateListName,
    updateTaskList
  } = useKanban(fileContent, setFile, saveFile)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  )

  const [newListName, setNewListName] = useState('')
  const [activeTask, setActiveTask] = useState({ taskId: null, listId: null })
  const activeTaskData = useMemo(() => {
    if (!activeTask.taskId || !kanban) {
      return null
    }

    for (const list of kanban) {
      if (list.id === activeTask.listId) {
        const task = list.tasks.find((task) => task.id === activeTask.taskId)
        if (task) {
          return task
        }
      }
    }

    return null
  }, [activeTask, kanban])

  if (!kanban) {
    return
  }

  const listEl = kanban.map((list) => (
    <List
      list={list}
      addTask={addTask}
      deleteTask={deleteTask}
      updateTask={updateTask}
      updateStatus={updateStatus}
      updateListName={updateListName}
    />
  ))

  function handleAddList() {
    addList(newListName)
  }

  function handleNewListNameOnChange(event) {
    setNewListName(event.target.value)
  }

  function handleDragStart(event) {
    log.debug(
      `[handleDragStart] taskId: ${event.active.id} listId; ${event.active.data.current.taskListId}`
    )
    setActiveTask({
      taskId: event.active.id,
      listId: event.active.data.current.taskListId
    })
  }

  function handleDragEnd(event) {
    const { active, over } = event
    log.debug(
      `[handleDragEnd] active: ${JSON.stringify(active, null, 2)} over: ${JSON.stringify(over, null, 2)}`
    )
    if (active && over) {
      updateTaskList(active.id, active.data.current.taskListId, over.id)
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.kanbanContainer}>
        {listEl}
        {isAddingList && (
          <div className={styles.addList}>
            <input type="text" value={newListName} onChange={handleNewListNameOnChange} />
            <div>
              <button onClick={handleAddList}>Add</button>
              <button onClick={() => setIsAddingList(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTaskData && <Task task={activeTaskData} listId={activeTask.listId} />}
      </DragOverlay>
    </DndContext>
  )
}
