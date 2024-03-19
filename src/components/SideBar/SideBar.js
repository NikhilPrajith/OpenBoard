import React from 'react'
import styles from "./SideBar.module.css"
import CustomTab from '../Tab/Tab'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import IconButton from '@mui/material/IconButton';


export default function SideBar({alignment, setAlignment, themes, showSideBar, changeTheme,addImageFunction, setShowSidebar}) {
  const toggleSidebar = () => {
    setShowSidebar(!showSideBar);
  };

  return (
    <div style={{position:'absolute', top:'0',right:'0', width:'230px',height:'100%'}}>
    
    {showSideBar &&
    
    <div className={styles.container}>
      <CustomTab alignment={alignment} setAlignment={setAlignment} themes={themes} showSideBar={showSideBar} setShowSidebar={setShowSidebar} changeTheme={changeTheme} addImageFunction={addImageFunction}></CustomTab>
    </div>}
    <button onClick={toggleSidebar} className={styles.toggleButton} style={{border: '0.1px rgb(212, 210, 210) solid',borderBottomLeftRadius:'6px',borderTopLeftRadius:'6px',height:'80px', position: 'absolute', top: '50%', left: showSideBar ? '-28px' : 'unset', right: !showSideBar ? '0' : 'unset', transform: 'translateY(-50%)', zIndex: 1000}}>
    <IconButton sx={{color:'black', fontSize:'12px', margin:!open ? 'auto': 'initial'}} onClick={()=>{setShowSidebar(!showSideBar)}}>
          {showSideBar ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </IconButton>
      </button>
    </div>
  )
}
