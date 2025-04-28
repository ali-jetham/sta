import styles from './Editor.module.css'
import { useState, useCallback, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import {
  markdown,
  commonmarkLanguage,
  markdownKeymap
} from '@codemirror/lang-markdown'
import { nord } from '@uiw/codemirror-theme-nord'

export default function Editor({ fileContent, onFileChange }) {
  // const [value, setValue] = useState('# Hello World')

  // useEffect(() => {
  //   setValue(fileContent)
  // }, [fileContent])

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
        extensions={[markdown({ base: commonmarkLanguage, addKeymap: true })]}
        basicSetup={{
          lineNumbers: false,
          foldGutter: true,
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
