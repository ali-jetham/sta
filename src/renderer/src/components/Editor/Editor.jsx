import styles from './Editor.module.css'
import { useState, useCallback, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@uiw/react-codemirror'
import {
  autocompletion,
  completeFromList,
  insertCompletionText
} from '@codemirror/autocomplete'
import {
  markdown,
  markdownLanguage,
  markdownKeymap
} from '@codemirror/lang-markdown'
import { nord } from '@uiw/codemirror-theme-nord'
import { myCompletions } from '../../utils/markdownCompletions'

export default function Editor({ fileContent, onFileChange }) {
  const [fontSize, setFontSize] = useState(12)
  const onChange = useCallback((val, viewUpdate) => {
    onFileChange(val)
  }, [])

  const completions = [
    {
      label: 'due',
      type: 'variable',
      apply: (view, completion, from, to) => {
        view.dispatch(insertCompletionText(view.state, '[due:: ]', from, to))
        view.dispatch({
          selection: { anchor: to + 4, head: to + 4 }
        })
      }
    },
    { label: 'done', type: 'variable' },
    { label: 'created', type: 'variable' },
    { label: 'completed', type: 'variable' },
    { label: 'priority', type: 'variable' }
  ]

  return (
    <div className={styles.editorContainer}>
      <CodeMirror
        value={fileContent}
        onChange={onChange}
        theme={nord}
        autoFocus={true}
        extensions={[
          markdown({
            base: markdownLanguage,
            addKeymap: true,
            extensions: {}
          }),
          EditorView.lineWrapping,
          EditorView.theme({
            '.cm-content': {
              fontSize: fontSize + 'pt'
            }
          }),
          autocompletion({
            closeOnBlur: true,
            override: [completeFromList(completions)],
            activateOnTyping: true
          })
        ]}
        basicSetup={{
          autocompletion: true,
          lineNumbers: false,
          foldGutter: true,
          highlightActiveLineGutter: false,
          closeBrackets: true,
          tabSize: 4,
          highlightActiveLine: true,
          history: true,
          defaultKeymap: true
        }}
      />
    </div>
  )
}
