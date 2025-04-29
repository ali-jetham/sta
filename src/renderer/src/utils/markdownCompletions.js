import { insertCompletionText } from '@codemirror/autocomplete'
import { createRendererLogger } from './logger.js'

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
        return {
            from: match.from + 1, // Start completions *after* the '['
            options: myCompletions,
            validFor: /^\w*$/ // Allow typing variable names after '['
        }
    }
    return null
}

export const myCompletions = [
    {
        label: 'due',
        type: 'variable',
        apply: applyCompletion('due:: ',),
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
        label: 'completed',
        type: 'variable',
        apply: applyCompletion('completed:: ', 12),
        boost: 1
    },
    {
        label: 'priority',
        type: 'variable',
        apply: applyCompletion('priority:: ', 11),
        boost: 1
    }
]

