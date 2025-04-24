import styles from './CreateContextMenu.module.css'

export default function CreateContextMenu() {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.menu}>
        <div>New File</div>
        <div>New Folder</div>
        <div>Delete File</div>
        <div>Delete Folder </div>
      </div>
    </div>
  )
}
