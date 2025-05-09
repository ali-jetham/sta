import { useState, useEffect } from 'react'
import { createRendererLogger } from '../utils/logger.js'
import { parseTaskLine, kanbanToMarkdown } from '../utils/markdownParser.js'
import { Save } from 'lucide-react'

const log = createRendererLogger('useKanban')

export function useKanban(fileContent, setFile, saveFile) {
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

  function addTask(listId, mainText) {
    log.debug(`[addTask] with listId: ${listId} mainText: ${mainText}`)

    const newTask = parseTaskLine(mainText)
    log.verbose(`[addTask] newTask: ${JSON.stringify(newTask, null, 2)}`)

    setKanban((prevKanban) => {
      const updatedKanban = prevKanban.map((list) =>
        list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
      )
      log.verbose(updatedKanban)
      setFile(kanbanToMarkdown(updatedKanban))
      saveFile()
      return updatedKanban
    })
  }

  function deleteTask(listId, taskId) {
    log.debug(`[deleteTask] with listId: ${listId} taskId: ${taskId}`)

    setKanban((prevKanban) => {
      const updatedKanban = prevKanban.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )

      log.verbose(`[deleteTask] updatedKanban: ${JSON.stringify(updatedKanban, null, 2)}`)

      setFile(kanbanToMarkdown(updatedKanban))
      saveFile()
      return updatedKanban
    })
  }

  function updateTask(taskString, listId, taskId) {
    log.debug(`[updatedTask] called for id: ${taskId} taskLine: ${taskString}`)
    const newTask = parseTaskLine(taskString, taskId)
    log.verbose(`[updateTask] updatedTask: ${JSON.stringify(newTask, null, 2)}`)

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
    setFile(kanbanToMarkdown(kanban))
    saveFile()
  }

  function updateStatus(status, listId, taskId) {
    log.debug(`[switchStatus] called`)
    const newStatus = status === '' ? '/' : status === '/' ? 'x' : ''
    log.info(`[updatedTask] newStatus: ${newStatus}`)

    setKanban((prevKanban) => {
      const updatedKanban = prevKanban.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
              )
            }
          : list
      )
      setFile(kanbanToMarkdown(updatedKanban))
      return updatedKanban
    })
  }

  function updateListName(listId, newName) {
    log.info(`[updateListName] called with newName: ${newName}`)
    setKanban((prevKanban) => {
      const updatedkanban = prevKanban.map((list) =>
        list.id === listId
          ? {
              ...list,
              listName: newName
            }
          : list
      )
      setFile(kanbanToMarkdown(updatedkanban))
      saveFile(kanbanToMarkdown(updatedkanban))
      return updatedkanban
    })
  }

  function updateTaskList(taskId, taskListId, newListId) {
    setKanban((prevKanban) => {
      let taskToMove
      const updatedKanban = prevKanban.map((list) => {
        if (list.id === taskListId) {
          const updatedTasks = list.tasks.filter((task) => {
            if (task.id === taskId) {
              taskToMove = task
              return false
            }
            return true
          })
          return { ...list, tasks: updatedTasks }
        }
        return list
      })

      log.debug(`[updateTaskList] task: ${JSON.stringify(taskToMove, null, 2)}`)

      const finalKanban = updatedKanban.map((list) => {
        if (list.id === newListId && taskToMove) {
          return { ...list, tasks: [...list.tasks, taskToMove] }
        }
        return list
      })
      setFile(kanbanToMarkdown(finalKanban))
      saveFile(kanbanToMarkdown(finalKanban))
      return finalKanban
    })
  }

  function getMarkdown() {
    return kanbanToMarkdown(kanban)
  }

  return {
    kanban,
    addTask,
    deleteTask,
    updateTask,
    updateStatus,
    updateListName,
    updateTaskList
  }
}
