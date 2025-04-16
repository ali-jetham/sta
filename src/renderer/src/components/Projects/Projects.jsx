import { useState } from 'react'
import styles from './Projects.module.css'

export default function Projects() {

  const [files, setFile] = useState()

  return (
    <div className={`${styles} noselect`}>
      <ul>
        <li>project 1</li>
        <li>project 1</li>
        <li>project 1</li>
      </ul>
    </div>
  )
}
