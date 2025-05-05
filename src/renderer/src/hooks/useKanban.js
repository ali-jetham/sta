import { useState, useEffect } from 'react'
import { createRendererLogger } from '../utils/logger.js'
import { parseTaskLine } from '../utils/markdownParser.js'

const log = createRendererLogger('useKanban')

export function useKanban(fileContent) {
  const [kanban, setKanban] = useState([])

  useEffect(() => {
    const lines = fileContent.split(/\r?\n/)
    const newKanban = []
    let listId = 0
    let currentList = null
    const regex = /^(-|\*|\+)\s\[\s*( |x|X|\/)\s*\]\s/

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('## ')) {
        const listName = lines[i].split('## ')[1]
        listId++
        const newList = { id: listId, listName, markCompleted: false, tasks: [] }
        newKanban.push(newList)
        currentList = newList
      } else if (regex.test(lines[i]) && currentList) {
        currentList.tasks.push(parseTaskLine(lines[i], i))
      }
    }
    setKanban(newKanban)
  }, [fileContent])

  function updateTask(taskString, listId, taskId) {
    log.debug(`[updatedTask] called for id: ${taskId} status: ${status} taskLine: ${taskString}`)
    const newTask = parseTaskLine(taskString, taskId)
    log.verbose(`[updateTask] ${JSON.stringify(newTask, null, 2)}`)

    setKanban((prevKanban) => {
      return prevKanban.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: list.tasks.map((task) => {
              if (task.id === taskId) {
                return { ...newTask }
              }
              return task
            })
          }
        }
        return list
      })
    })
  }

  function updateStatus(status, listId, taskId) {
    log.debug(`[switchStatus] called`)
    const newStatus = status === '' ? '/' : status === '/' ? 'x' : ''
    log.info(`[updatedTask] newStatus: ${newStatus}`)

    setKanban((prevKanban) => {
      return prevKanban.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
              )
            }
          : list
      )
    })
  }

  log.verbose(`Kanban is ${JSON.stringify(kanban, null, 2)}`)
  return { kanban, updateTask, updateStatus }
}
