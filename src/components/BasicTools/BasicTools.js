import React, { useState } from 'react';
import styles from "./BasicTools.module.css";
import { GoTasklist } from "react-icons/go";
import { FaStickyNote } from "react-icons/fa";
import { RiTimer2Fill } from "react-icons/ri";
import { FaListAlt } from "react-icons/fa";

export default function BasicTools({addingNode}) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");



  const onClick = (event, nodeType) => {
    addingNode(nodeType);
  };

  return (
    <div className={styles.container}>
        <div className={styles.innerContainer}>
              <button onClick={(event) => onClick(event, 'taskListNode')} ><FaListAlt></FaListAlt></button>

              <button onClick={(event) => onClick(event, 'stickyNote')} ><FaStickyNote></FaStickyNote></button>


              <button onClick={(event) => onClick(event, 'timer')} ><RiTimer2Fill></RiTimer2Fill></button>
            
        </div>
    </div>
  );
}
