import { createRendererLogger } from './logger.js'
import { insertCompletionText } from '@codemirror/autocomplete'

const log = createRendererLogger('markdownCompletion')

export function myCompletions(context) {
  let word = context.matchBefore(/\[$/)
  log.info(word.text)

  //   if (word.from === word.to && !context.explicit) return null
  if (!word || (word.from === word.to && !context.explicit)) return null

  function applyCompletion(completionText, cursorOffset) {
    return (view, completion, from, to) => {
      view.dispatch(insertCompletionText(view.state, completionText, from, to))
      view.dispatch({
        selection: { anchor: to + cursorOffset, head: to + cursorOffset }
      })
    }
  }

  return {
    from: word.from,
    options: [
      {
        label: 'due',
        type: 'variable',
        apply: applyCompletion('[due:: ]', 7),
        boost: 4
      },
      {
        label: 'done',
        type: 'variable',
        apply: applyCompletion('[done:: ]', 8),
        boost: 3
      },
      {
        label: 'created',
        type: 'variable',
        apply: applyCompletion('[created:: ]', 11),
        boost: 2
      },
      {
        label: 'completed',
        type: 'variable',
        apply: applyCompletion('[completed:: ]', 13),
        boost: 1
      },
      {
        label: 'priority',
        type: 'variable',
        apply: applyCompletion('[priority:: ]', 12),
        boost: 1
      }
    ]
  }
}
