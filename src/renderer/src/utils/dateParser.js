import { createRendererLogger } from './logger'

const log = createRendererLogger('dateParser')

export function getTodayDate() {
  log.debug(`[getTodayDate] called`)
  const today = new Date()
  return today.toLocaleDateString('en-CA')
}

export function getTomorrowDate() {
  log.debug(`[getTomorrowDate] called`)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toLocaleDateString('en-CA')
}

export function getNextWeekDate() {
  log.debug(`[getNextWeekDate] called`)
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  return nextWeek.toLocaleDateString('en-CA')
}

export function getNextMonthDate() {
  log.debug(`[getNextMonthDate] called`)
  const nextMonth = new Date()
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  return nextMonth.toLocaleDateString('en-CA')
}

export function getNextYearDate() {
  log.debug(`[getNextYearDate] called`)
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  return date.toLocaleDateString('en-CA')
}
