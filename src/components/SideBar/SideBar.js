import React from 'react'
import styles from "./SideBar.module.css"
import CustomTab from '../Tab/Tab'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import IconButton from '@mui/material/IconButton';
import { useTasks } from '@/context/TaskContext';

export default function SideBar({themes, showSideBar, changeTheme,addImageFunction, setShowSidebar}) {
  const toggleSidebar = () => {
    setShowSidebar(!showSideBar);
  };
  const {alignment,setAlignment} = useTasks();



  return (
    <div>
    
    {showSideBar &&
    
    <div className={styles.container}>
      <CustomTab alignment={alignment} setAlignment={setAlignment} themes={themes} showSideBar={showSideBar} setShowSidebar={setShowSidebar} changeTheme={changeTheme} addImageFunction={addImageFunction}></CustomTab>
    </div>}
    <button onClick={toggleSidebar} className={styles.toggleButton} style={{border: '0.1px rgb(212, 210, 210) solid',borderBottomLeftRadius:'6px',borderTopLeftRadius:'6px',height:'80px', position: 'absolute', top: '50%', left: showSideBar ? 'unset' : 'unset', right: !showSideBar ? '0' : '231px', transform: 'translateY(-50%)', zIndex: 1000}}>
    <IconButton sx={{color:'black', fontSize:'12px', margin:!open ? 'auto': 'initial'}} onClick={()=>{setShowSidebar(!showSideBar)}}>
          {showSideBar ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </IconButton>
      </button>
    </div>
  )
}
