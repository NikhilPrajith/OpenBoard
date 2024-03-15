import React from 'react'
import styles from "./SideBar.module.css"
import CustomTab from '../Tab/Tab'

export default function SideBar({changeTheme,addImageFunction}) {
  return (
    <div className={styles.container}>
      <CustomTab changeTheme={changeTheme} addImageFunction={addImageFunction}></CustomTab>
    </div>
  )
}
