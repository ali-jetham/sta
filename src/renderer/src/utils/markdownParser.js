import { createRendererLogger } from './logger'

const log = createRendererLogger('markdownParser')

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

// export function parseTaskLine(taskLine, id) {
//   let match

//   const mainText = taskLine.match(/^\s*[-+*]\s+\[.\]\s+(.*?)(?=\s*\[\w+::|$)/)[1].trim()
//   const status = taskLine.match(/\[\s*([xX\/ ])\s*\]/)[1].trim()

//   match = taskLine.match(/\[priority:: (\w{3,6})/)
//   const priority = match ? match[1] : ''

//   match = taskLine.match(/\[start:: (\d{4}-\d{2}-\d{2})]/)
//   const start = match ? match[1] : ''

//   match = taskLine.match(/\[due:: (\d{4}-\d{2}-\d{2})]/)
//   const due = match ? match[1] : ''

//   match = taskLine.match(/\[done:: (\d{4}-\d{2}-\d{2})]/)
//   const done = match ? match[1] : ''

//   match = taskLine.match(/\[created:: (\d{4}-\d{2}-\d{2})]/)
//   const created = match ? match[1] : ''

//   return {
//     id: id,
//     status,
//     mainText,
//     priority,
//     start,
//     due,
//     done,
//     created
//   }
// }
