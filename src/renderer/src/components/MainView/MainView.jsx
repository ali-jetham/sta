import { useState } from 'react'
import styles from './MainView.module.css'
import MainHeader from '../MainHeader/MainHeader'
import Kanban from '../Kanban/Kanban'
import Editor from '../Editor/Editor'
import { createRendererLogger } from '../../utils/logger'

const log = createRendererLogger('MainView')

export default function MainView() {
  const [view, setView] = useState('editor')
  const [file, setFile] = useState()
  const [filePath, setFilePath] = useState()

  window.electron.ipcRenderer.on(
    'MainView:openFile',
    (event, { data, path }) => {
      log.debug(`on openFileView called for ${path} with data ${data}`)
      setFile(data)
      setFilePath(path)
    }
  )

  function onFileChange(value) {
    setFile(value)
  }

  function saveFile() {
    window.electron.ipcRenderer.invoke('file:saveFile', file, filePath)
  }

  return (
    <div className={`${styles.mainViewContainer} noselect`}>
      <MainHeader view={view} setView={setView} saveFile={saveFile} />

      {view === 'kanban' ? <Kanban saveFile={saveFile} /> : null}
      {view === 'editor' ? (
        <Editor fileContent={file} onFileChange={onFileChange} />
      ) : null}
    </div>
  )
}
