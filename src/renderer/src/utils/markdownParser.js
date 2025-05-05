function kanbanToMarkdown() { }

// Take a single task object and return its raw md string
export function taskToMarkdown(task, onlyMaintext = false) {
  const priority = task.priority ? `[priority:: ${task.priority}]` : ''
  const start = task.start ? `[start:: ${task.start}]` : ''
  const due = task.due ? `[due:: ${task.due}]` : ''
  const done = task.done ? `[done:: ${task.done}]` : ''
  const created = task.created ? `[created:: ${task.created}]` : ''

  if (!onlyMaintext) {
    return `- [${task.status}] ${task.mainText} ${priority} ${start} ${due} ${done} ${created}`.trim()
  }
  return `${task.mainText} ${priority} ${start} ${due} ${done} ${created}`.trim()
}