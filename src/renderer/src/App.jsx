import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './App.module.css'
import MainView from './components/MainView/MainView.jsx'
import Ribbon from './components/Ribbon/Ribbon.jsx'
import SideBar from './components/SideBar/SideBar.jsx'
import WorkSpaceDialog from './components/Dialogs/WorkSpaceDialog/WorkSpaceDialog.jsx'
import Overlay from './components/Overlay/Overlay.jsx'
import { createRendererLogger } from './utils/logger.js'
import CreateContextMenu from './components/CreateContextMenu/CreateContextMenu.jsx'

const log = createRendererLogger('[App]')

function App() {
  const [showSideBar, setShowSideBar] = useState(false)
  const [showWorkSpaceDialog, setShowWorkSpaceDialog] = useState(false)
  const [showCreateMenu, setShowCreateMenu] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)

  function sideBarToggle() {
    setShowSideBar((prev) => !prev)
  }

  useEffect(() => {
    if (window.api && window.api.askWorkSpaceDialog) {
      log.info('Setting up askWorkSpaceDialog listener')
      window.api.askWorkSpaceDialog(() => {
        log.info('askWorkSpaceDialog callback executed')
        setShowWorkSpaceDialog(true)
      })
    } else {
      console.error('window.api or askWorkSpaceDialog is not available')
    }
  }, [])

  return (
    <div className={`${styles.appContainer}`}>
      {showOverlay && <Overlay />}

      <Ribbon sideBarToggle={sideBarToggle} />

      {showSideBar && <SideBar isVisible={showSideBar} />}

      <MainView />

      {showWorkSpaceDialog &&
        createPortal(<WorkSpaceDialog setVisible={setShowWorkSpaceDialog} />, document.body)}

      {showCreateMenu && createPortal(<CreateContextMenu />, document.body)}
    </div>
  )
}

export default App
