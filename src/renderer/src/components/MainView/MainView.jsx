import { useState, useEffect, useRef } from 'react'
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
  const prevFileRef = useRef()

  window.electron.ipcRenderer.on('MainView:openFile', (event, { data, path }) => {
    log.debug(`[MainView:openFile.on] ${path} with data ${data}`)
    if (!data || !path) {
      log.error([`[MainView:openFile.on] data: ${data} path: ${path}`])
    } else {
      setFile(data)
      setFilePath(path)
      prevFileRef.current = data
    }
  })

  function onFileChange(value) {
    setFile(value)
  }

  function saveFile() {
    log.debug(`[saveFile] called`)
    log.info(`[saveFile] file changed, saving ${file} with ${filePath}`)
    if (file !== prevFileRef) {
      window.electron.ipcRenderer.invoke('file:saveFile', file, filePath)
    }
  }

  return (
    <div className={`${styles.mainViewContainer} noselect`}>
      <MainHeader view={view} setView={setView} saveFile={saveFile} />

      {view === 'kanban' ? <Kanban fileContent={file} /> : null}
      {view === 'editor' ? <Editor fileContent={file} onFileChange={onFileChange} /> : null}
    </div>
  )
}
