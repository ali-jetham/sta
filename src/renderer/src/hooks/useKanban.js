import { useState, useEffect } from 'react'
import { createRendererLogger } from '../utils/logger.js'
import { start } from 'react-scan/dist/index'
import { Regex } from 'lucide-react'

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

  function updateTask(taskString, id) {
    log.debug(`[updatedTask] called for id: ${id}`)
    setKanban()
  }

  log.verbose(`Kanban is ${JSON.stringify(kanban, null, 2)}`)
  return { kanban, updateTask }
}

function parseTaskLine(line, id) {
  let match
  const status = line.match(/\[\s*([xX\/ ])\s*\]/)[1].trim()
  const mainText = line.match(/^\s*[-+*]\s+\[.\]\s+(.*?)(?=\s*\[\w+::|$)/)[1].trim()
  match = line.match(/\[priority:: (\w{3,6})/)
  const priority = match ? match[1] : ''
  match = line.match(/\[start:: (\d{4}-\d{2}-\d{2})]/)
  const start = match ? match[1] : ''
  match = line.match(/\[due:: (\d{4}-\d{2}-\d{2})]/)
  const due = match ? match[1] : ''
  match = line.match(/\[done:: (\d{4}-\d{2}-\d{2})]/)
  const done = match ? match[1] : ''
  match = line.match(/\[created:: (\d{4}-\d{2}-\d{2})]/)
  const created = match ? match[1] : ''

  return {
    id: id,
    status: status,
    mainText,
    priority,
    start,
    due,
    done,
    created
  }
}
