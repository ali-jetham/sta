import styles from './ListContextMenu.module.css'
import { useRef } from 'react'
import { SquarePlus, Trash } from 'lucide-react'
import { useClickOutside } from '../../hooks/useClickOutside'

const ListContextMenu = ({ menuPos, setShowListContextMenu, setIsAddingTask }) => {
  const menuRef = useRef()

  useClickOutside(menuRef, () => setShowListContextMenu(false))

  return (
    <div
      ref={menuRef}
      className={styles.menuContainer}
      style={{ top: menuPos.top, left: menuPos.left }}
    >
      <button
        className={styles.buttons}
        onClick={() => {
          setIsAddingTask(true)
          setShowListContextMenu(false)
        }}
      >
        <SquarePlus size={16} />
        <span>New task</span>
      </button>

      <button className={styles.buttons}>
        <Trash size={16} />
        <span>Delete list</span>
      </button>
    </div>
  )
}

export default ListContextMenu
