import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './App.module.css'
import MainView from './components/MainView/MainView.jsx'
import Ribbon from './components/Ribbon/Ribbon.jsx'
import SideBar from './components/SideBar/SideBar.jsx'
import WorkSpaceDialog from './components/Dialogs/WorkSpaceDialog/WorkSpaceDialog.jsx'
import Overlay from './components/Overlay/Overlay.jsx'
import { createRendererLogger } from './utils/logger.js'

const log = createRendererLogger('[App]')

function App() {
  const [showSideBar, setShowSideBar] = useState(false)
  const [showWorkSpaceDialog, setShowWorkSpaceDialog] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  function toggleSideBar() {
    setShowSideBar((prev) => !prev)
  }

  useEffect(() => {
    if (window.api && window.api.askWorkSpaceDialog) {
      log.debug('Setting up askWorkSpaceDialog listener')
      window.api.askWorkSpaceDialog(() => {
        setShowWorkSpaceDialog(true)
      })
    } else {
      console.error('window.api or askWorkSpaceDialog is not available')
    }
  }, [])

  return (
    <div className={styles.appContainer}>
      {showOverlay && <Overlay />}

      <Ribbon toggleSideBar={toggleSideBar} />

      {showSideBar && <SideBar isVisible={showSideBar} />}

      <MainView />

      {showWorkSpaceDialog &&
        createPortal(
          <WorkSpaceDialog setVisible={setShowWorkSpaceDialog} />,
          document.body
        )}
    </div>
  )
}

export default App
