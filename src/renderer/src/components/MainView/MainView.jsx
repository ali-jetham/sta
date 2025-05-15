import { useState, useEffect, useRef } from 'react'
import styles from './MainView.module.css'
import MainHeader from '../MainHeader/MainHeader'
import Kanban from '../Kanban/Kanban'
import Editor from '../Editor/Editor'
import { createRendererLogger } from '../../utils/logger'

const log = createRendererLogger('MainView')

export default function MainView() {
  const [view, setView] = useState('editor')
  const [file, setFile] = useState(null)
  const [filePath, setFilePath] = useState()
  const [fileName, setFileName] = useState()
  const prevFileRef = useRef()
  const [isAddingList, setIsAddingList] = useState(false)

  window.electron.ipcRenderer.on(
    'MainView:openFile',
    (event, { data, filePath, fileName }) => {
      // log.verbose(`[MainView:openFile.on] ${path} with data ${data}`)
      if (!filePath) {
        log.error([`[MainView:openFile.on] data: ${data} path: ${filePath}`])
      } else {
        setFile(data)
        setFilePath(filePath)
        setFileName(fileName)
        prevFileRef.current = data
      }
    }
  )

  function saveFile() {
    log.debug(`[saveFile] called`)
    if (file !== prevFileRef) {
      window.electron.ipcRenderer.invoke('file:saveFile', file, filePath)
    }
  }

  return (
    <div className={`${styles.mainViewContainer} noselect`}>
      <MainHeader
        view={view}
        fileName={fileName}
        setFileName={setFileName}
        setView={setView}
        saveFile={saveFile}
        setFile={setFile}
        setIsAddingList={setIsAddingList}
      />

      {file === null && (
        <>
          <h1>Open a file</h1>
        </>
      )}

      {file !== null && view === 'kanban' ? (
        <Kanban
          fileContent={file}
          setFile={setFile}
          saveFile={saveFile}
          isAddingList={isAddingList}
          setIsAddingList={setIsAddingList}
        />
      ) : null}
      {file !== null && view === 'editor' ? (
        <Editor
          content={file}
          onContentChange={setFile}
          highlightLine={true}
          fontSizeProp={11}
        />
      ) : null}
    </div>
  )
}
