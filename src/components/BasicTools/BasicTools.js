import React, { useState } from 'react';
import styles from "./BasicTools.module.css";
import { GoTasklist } from "react-icons/go";
import { FaStickyNote } from "react-icons/fa";
import { RiTimer2Fill } from "react-icons/ri";
import { FaListAlt } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { AiFillControl } from "react-icons/ai";
import { RxCardStack } from "react-icons/rx";
import { PiCardsFill } from "react-icons/pi";
import { PiTextTBold } from "react-icons/pi";

export default function BasicTools({addingNode, setShowSidebar, showSideBar}) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");



  const onClick = (event, nodeType) => {
    addingNode(nodeType);
  };

  return (
    <div className={`${styles.container} drag` }>
        <div className={styles.innerContainer}>
              <button onClick={(event) => onClick(event, 'taskListNode')} ><FaListAlt></FaListAlt></button>

              <button onClick={(event) => onClick(event, 'stickyNote')} ><FaStickyNote></FaStickyNote></button>


              <button onClick={(event) => onClick(event, 'timer')} ><RiTimer2Fill></RiTimer2Fill></button>

              <button onClick={(event) => onClick(event, 'video')} ><MdVideoLibrary></MdVideoLibrary></button>

              <button onClick={(event) => onClick(event, 'flashCards')} ><PiCardsFill></PiCardsFill></button>

              <button onClick={(event) => onClick(event, 'textElement')} ><PiTextTBold></PiTextTBold></button>

            
        </div>
    </div>
  );
}
