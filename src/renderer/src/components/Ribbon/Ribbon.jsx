import { FolderRoot, PanelLeft, Settings } from 'lucide-react'
import styles from './Ribbon.module.css'

export default function Ribbon(props) {
  return (
    <div className={styles.container}>
      <button className={styles.sidebarButton} onClick={props.toggleSideBar}>
        <PanelLeft />
      </button>

      <div className={styles.bottom}>
        <button className={styles.folderRoot}>
          <FolderRoot />
        </button>

        <button className={styles.settings}>
          <Settings />
        </button>
      </div>
    </div>
  )
}
