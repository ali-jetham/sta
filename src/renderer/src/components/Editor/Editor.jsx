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

export default function Editor({
  content,
  onContentChange,
  highlightLine,
  fontSizeProp,
  foldGutterProp = true,
  onKeyDown
}) {
  const [fontSize, setFontSize] = useState(fontSizeProp)

  const onChange = useCallback((val, viewUpdate) => {
    onContentChange(val)
  }, [])

  return (
    <div className={styles.editorContainer}>
      <CodeMirror
        value={content}
        onChange={onChange}
        onKeyDown={onKeyDown}
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
          foldGutter: foldGutterProp,
          highlightActiveLineGutter: false,
          closeBrackets: true,
          tabSize: 4,
          highlightActiveLine: highlightLine,
          history: true,
          defaultKeymap: true
        }}
      />
    </div>
  )
}
