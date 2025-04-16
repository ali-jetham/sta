import { useState } from 'react'
import styles from './App.module.css'
import MainView from './components/MainView/MainView.jsx'
import Ribbon from './components/Ribbon/Ribbon.jsx'
import SideBar from './components/SideBar/SideBar.jsx'

function App() {
  const [showSideBar, setShowSideBar] = useState(false)
  function sideBarToggle() {
    setShowSideBar((prev) => !prev)
  }

  return (
    <div className={styles.appContainer}>
      <Ribbon sideBarToggle={sideBarToggle} />

      {showSideBar && <SideBar isVisible={showSideBar} />}
      <MainView />
    </div>
  )
}

export default App
