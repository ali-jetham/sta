import styles from './Editor.module.css'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import { useEffect } from 'react'
import { createRendererLogger } from '../../utils/logger'

const log = createRendererLogger('Editor')

export default function Editor({ fileContent }) {
  const extensions = [StarterKit]
  const content = fileContent || 'Open a Project'

  const editor = useEditor({
    content,
    extensions,
    autofocus: true
  })

  useEffect(() => {
    if (fileContent) {
      editor.commands.setContent(fileContent)
    }
  }, [fileContent])

  return (
    <>
      <EditorContent className={styles.editorContainer} editor={editor} />
    </>
  )
}
