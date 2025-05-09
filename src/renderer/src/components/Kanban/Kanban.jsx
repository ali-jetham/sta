import styles from './Kanban.module.css'
import { createRendererLogger } from '../../utils/logger.js'
import { useKanban } from '../../hooks/useKanban.js'
import List from './List.jsx'
import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core'

const log = createRendererLogger('Kanban')

export default function Kanban({ fileContent, setFile, saveFile }) {
  const { kanban, addTask, updateTask, updateStatus, updateListName, updateTaskList } =
    useKanban(fileContent, setFile, saveFile)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  )

  if (!kanban) {
    return
  }

  log.verbose(`kanban is ${JSON.stringify(kanban, null, 2)}`)

  const listEl = kanban.map((list) => (
    <List
      list={list}
      addTask={addTask}
      updateTask={updateTask}
      updateStatus={updateStatus}
      updateListName={updateListName}
    />
  ))

  function handleDragStart() {
    log.debug('[handleDragStart]')
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
      <div className={styles.kanbanContainer}>{listEl}</div>
    </DndContext>
  )
}
