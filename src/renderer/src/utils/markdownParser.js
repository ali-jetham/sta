import { createRendererLogger } from './logger'

const log = createRendererLogger('markdownParser')

// TODO: optimize/simplify this function
export function parseTaskLine(taskLine, id) {
  let match
  let mainText = ''
  let status = ''
  let priority = ''
  let start = ''
  let due = ''
  let done = ''
  let created = ''

  const hasMarker = /^[-+*]\s+\[[xX\/ ]\]/.test(taskLine)

  if (hasMarker) {
    try {
      match = taskLine.match(/^\s*[-+*]\s+\[\s*([xX\/ ])\s*\]\s*(.*?)(?=\s*\[\w+::|$)/)
      if (match && match[2]) {
        mainText = match[2].trim()
      }

      match = taskLine.match(/\[\s*([xX\/ ])\s*\]/)
      if (match && match[1]) {
        status = match[1].trim()
      }
    } catch (error) {
      log.error(error)
    }
  } else {
    mainText = taskLine
  }

  const attributeRegex = /\[\w+::\s[^\]]+\]/g
  mainText = mainText.replace(attributeRegex, '').trim()

  match = taskLine.match(/\[priority::\s([^\]]+)\]/)
  priority = match ? match[1] : ''

  match = taskLine.match(/\[start::\s([^\]]+)\]/)
  start = match ? match[1] : ''

  match = taskLine.match(/\[due::\s([^\]]+)\]/)
  due = match ? match[1] : ''

  match = taskLine.match(/\[done::\s([^\]]+)\]/)
  done = match ? match[1] : ''

  match = taskLine.match(/\[created::\s([^\]]+)\]/)
  created = match ? match[1] : ''

  return {
    id: id,
    status,
    mainText,
    priority,
    start,
    due,
    done,
    created
  }
}

export function kanbanToMarkdown(kanban) {
  log.info(`[kanbanToMarkdown] called`)
  let rawMd = String.raw``
  let first = false

  kanban.forEach((list) => {
    if (!first) {
      first = true
      rawMd += `## ${list.listName.trimEnd()}\n\n`
    } else {
      rawMd += `\n\n## ${list.listName}\n\n`
    }
    list.tasks.forEach((task) => {
      const status = task.status === '' ? ' ' : task.status
      const priority = task.priority ? ` [priority:: ${task.priority}]` : ''
      const start = task.start ? ` [start:: ${task.start}]` : ''
      const due = task.due ? ` [due:: ${task.due}]` : ''
      const done = task.done ? ` [done:: ${task.done}]` : ''
      const created = task.created ? ` [created:: ${task.created}]` : ''

      rawMd +=
        `- [${status}] ${task.mainText}${priority}${start}${due}${done}${created}`.trimEnd() +
        '\n'
    })
  })

  return rawMd
}
