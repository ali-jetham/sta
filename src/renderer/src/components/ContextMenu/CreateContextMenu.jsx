import styles from './CreateContextMenu.module.css'

export default function ContextMenu({ active, menuPosition }) {
  return (
    <div
      className={`${styles.menuContainer} ${active ? styles.active : ''}`}
      style={{ top: menuPosition.top, left: menuPosition.left }}
    >
      <div>New Folder</div>
      <div>New File</div>
      <div>Delete</div>
    </div>
  )
}
