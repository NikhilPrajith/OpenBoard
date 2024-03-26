import React from 'react'
import styles from './Sidehandle.module.css'

export default function Sidehandle({setMode}) {
  return (
    <div className={styles.container}>
      
      <div className={styles.tabTitle}>Menu</div>
      <div className={styles.cont}>
        <div className={styles.title}>Tasks</div>
        <button onClick={()=>{setMode('List')}}> List</button>

        <button onClick={()=>{setMode('Board')}}>Board</button>
      </div>
    </div>
  )
}
