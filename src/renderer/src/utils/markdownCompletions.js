import { insertCompletionText } from '@codemirror/autocomplete'
import { createRendererLogger } from './logger.js'
import {
  getTodayDate,
  getTomorrowDate,
  getNextWeekDate,
  getNextMonthDate,
  getNextYearDate
} from './dateParser.js'

const log = createRendererLogger('markdownCompletions')

function applyCompletion(completionText, cursorOffset) {
  return (view, completion, from, to) => {
    view.dispatch(insertCompletionText(view.state, completionText, from, to))
    view.dispatch({
      selection: { anchor: from + cursorOffset, head: from + cursorOffset }
    })
  }
}

export const bracketCompletions = (context) => {
  const match = context.matchBefore(/\[\w*/)
  if (match) {
    const textBefore = context.state.sliceDoc(Math.max(0, match.from - 2), match.from);

    return {
      from: match.from + 1, // Start completions *after* the '['
      options: completions,
      validFor: /^\w*$/ // Allow typing variable names after '['
    }
  }
  return null
}

export const dateAutoCompletions = (context) => {
  const match = context.matchBefore(/(due|done):: \w*/) // TODO: handle spaces also, for eg: "next week"
  if (match) {
    log.debug(JSON.stringify(match))
    const calcFrom = match.text.split("::")[0].length + 3
    return {
      from: match.from + calcFrom,
      options: dateCompletions,
      validFor: /\w*/
    }
  }
  return null
}

export function priorityAutoCompletions(context) {
  const match = context.matchBefore(/priority:: \w*/)
  // log.debug(`[priorityAutoCompletions] ${JSON.stringify(match)}`)
  if (match) {
    return {
      from: match.from + 11,
      options: priorityCompletions,
      validFor: /\w*/
    }
  }
}

const dateCompletions = [
  {
    label: 'today',
    type: 'variable',
    apply: applyCompletion(getTodayDate(), 10),
    boost: 4
  },
  {
    label: 'tomorrow',
    type: 'variable',
    apply: applyCompletion(getTomorrowDate(), 10),
    boost: 3
  },
  {
    label: 'next week',
    type: 'variable',
    apply: applyCompletion(getNextWeekDate(), 10),
    boost: 2
  },
  {
    label: 'next month',
    type: 'variable',
    apply: applyCompletion(getNextMonthDate(), 10),
    boost: 1
  },
  {
    label: 'next year',
    type: 'variable',
    apply: applyCompletion(getNextYearDate(), 10),
    boost: 1
  }
]

const completions = [
  {
    label: 'due',
    type: 'variable',
    apply: applyCompletion('due:: '),
    boost: 4
  },
  {
    label: 'done',
    type: 'variable',
    apply: applyCompletion('done:: ', 7),
    boost: 3
  },
  {
    label: 'created',
    type: 'variable',
    apply: applyCompletion('created:: ', 10),
    boost: 2
  },
  {
    label: 'priority',
    type: 'variable',
    apply: applyCompletion('priority:: ', 11),
    boost: 1
  }
]

const priorityCompletions = [
  {
    label: 'high',
    type: 'variable',
    boost: 3
  },
  {
    label: 'medium',
    type: 'variable',
    boost: 2
  },
  {
    label: 'low',
    type: 'variable',
    boost: 1
  }
]
