import styles from './MainView.module.css'
import MainHeader from '../MainHeader/MainHeader'
import Kanban from '../Kanban/Kanban'

export default function MainView() {
  return (
    <div className={`${styles.mainViewContainer} noselect`}>

      <MainHeader />
      <Kanban />


    </div>
  )
}
