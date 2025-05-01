import { useState } from 'react'
import styles from './Kanban.module.css'

export default function Kanban({ fileContent }) {
  const [content, setContent] = useState(fileContent)

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
