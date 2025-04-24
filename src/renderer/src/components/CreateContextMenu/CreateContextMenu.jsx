import styles from './CreateContextMenu.module.css'

export default function CreateContextMenu(props) {
  // style={{ top: props.x, left: props.y }}

  function handleMouseDown(event) {
    event.stopPropagation()
  }

  return (
    <div
      className={styles.menuContainer}
      style={{ top: 0, left: 500 }}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.menu}>
        <div>New File</div>
        <div>New Folder</div>
        <div>Delete File</div>
        <div>Delete Folder </div>
      </div>
    </div>
  )
}
