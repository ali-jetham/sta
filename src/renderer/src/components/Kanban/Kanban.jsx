import styles from './Kanban.module.css'
import { useState, useEffect } from 'react'
import { createRendererLogger } from '../../utils/logger.js'
import { useKanban } from '../../hooks/useKanban.js'

const log = createRendererLogger('Kanban')

export default function Kanban({ fileContent }) {
  const kanban = useKanban(fileContent)

  return (
    <div className={styles.kanbanContainer}>
      <List />
      <List />
      <List />
      <List />
    </div>
  )
}

function List() {
  const [cards, setCards] = useState()

  return <div>List</div>
}

function Card() {
  return <div>Card</div>
}
