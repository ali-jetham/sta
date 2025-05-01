import styles from './Editor.module.css'
import { useState, useCallback, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@uiw/react-codemirror'
import { autocompletion } from '@codemirror/autocomplete'
import { markdown, markdownLanguage, markdownKeymap } from '@codemirror/lang-markdown'
import { nord } from '@uiw/codemirror-theme-nord'
import {
  bracketCompletions,
  dateAutoCompletions,
  priorityAutoCompletions
} from '../../utils/markdownCompletions'

export default function Editor({ fileContent, onFileChange }) {
  const [fontSize, setFontSize] = useState(11)

  const onChange = useCallback((val, viewUpdate) => {
    onFileChange(val)
  }, [])

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
            override: [bracketCompletions, dateAutoCompletions, priorityAutoCompletions],
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
