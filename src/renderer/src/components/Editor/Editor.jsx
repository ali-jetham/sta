import styles from './Editor.module.css'
import StarterKit from '@tiptap/starter-kit'
import { EditorProvider } from '@tiptap/react'
import TaskList from '@tiptap/extension-task-list'

export default function Editor() {
  const extensions = [StarterKit]
  const content = '<p>Hello World!</p>'

  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      editable={true}
      autofocus={true}
      editorContainerProps={{ className: styles.editorContainer }}
    ></EditorProvider>
  )
}
