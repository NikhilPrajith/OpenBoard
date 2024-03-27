import React, { useState, useEffect } from 'react';
import styles from './Tasker.module.css';
import ToDoTask from '../ToDoTask/ToDoTask';

import { FaPlus, FaRegClock, FaEllipsisV, FaRegCalendarAlt,FaTrash } from 'react-icons/fa';
import TaskList from './TaskList/TaskList';
import TaskEditor from './TaskEditor/TaskEditor';
import SideBar from '../SideBar/SideBar';
import Sidehandle from './Sidehandle/Sidehandle';
import Board from './Board/Board';
import { useTasks } from '@/context/TaskContext';



export default function Tasker({}) {

  return (
    <div className={styles.container}>
      <div>
        <TaskList></TaskList>
      </div>
      <div>
        <TaskEditor></TaskEditor>
      </div>
    </div>
  );
}
