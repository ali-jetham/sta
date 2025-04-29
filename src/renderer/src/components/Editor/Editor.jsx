import styles from './Editor.module.css'
import { useState, useCallback, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@uiw/react-codemirror'

import {
  markdown,
  commonmarkLanguage,
  markdownKeymap
} from '@codemirror/lang-markdown'
import { nord } from '@uiw/codemirror-theme-nord'

export default function Editor({ fileContent, onFileChange }) {
  const [fontSize, setFontSize] = useState(12)
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
          markdown({ base: commonmarkLanguage, addKeymap: true }),
          EditorView.lineWrapping,
          EditorView.theme({
            '.cm-content': {
              fontSize: fontSize + 'pt'
            }
          })
        ]}
        basicSetup={{
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
