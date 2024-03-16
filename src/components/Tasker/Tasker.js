import React, { useState } from 'react';
import styles from './Tasker.module.css';
import ToDoTask from '../ToDoTask/ToDoTask';

import { FaPlus, FaRegClock, FaEllipsisV, FaRegCalendarAlt,FaTrash } from 'react-icons/fa';

export default function Tasker({ open }) {
  // Initialize the taskLists state with two default ToDoTask components
  const [taskLists, setTaskLists] = useState([{}, {}]); // Using empty objects as placeholders

  const addTaskList = () => {
    // Add a new ToDoTask component to the taskLists array
    setTaskLists([...taskLists, {}]); // Again, using an empty object as a placeholder
  };

  return (
    <div className={styles.container} style={{ marginLeft: open ? '230px' : '85px', transition: 'margin-left 0.1s ease' }}>
      {taskLists.map((_, index) => (
        <div key={index}><ToDoTask blank={true}/></div> 
      ))}
      <button onClick={addTaskList} className={styles.addButton}>
        <FaPlus /> <span>Add List</span>
      </button>
    </div>
  );
}
