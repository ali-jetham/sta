import { useState } from 'react'
import styles from './MainView.module.css'
import MainHeader from '../MainHeader/MainHeader'
import Kanban from '../Kanban/Kanban'
import Editor from '../Editor/Editor'

export default function MainView() {
  const [view, setView] = useState('editor')

  return (
    <div className={`${styles.mainViewContainer} noselect`}>
      <MainHeader view={view} setView={setView} />

      {view === 'kanban' ? <Kanban /> : null}
      {view === 'editor' ? <Editor /> : null}
    </div>
  )
}
