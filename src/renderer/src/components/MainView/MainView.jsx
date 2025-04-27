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

  window.electron.ipcRenderer.on(
    'MainView:openFile',
    (event, { htmlData, path }) => {
      log.debug(`on openFileView called for ${path} with data ${htmlData}`)
      setFile(htmlData)
    }
  )

  return (
    <div className={`${styles.mainViewContainer} noselect`}>
      <MainHeader view={view} setView={setView} />

      {view === 'kanban' ? <Kanban /> : null}
      {view === 'editor' ? <Editor fileContent={file} /> : null}
    </div>
  )
}
