import React, { useState, useEffect } from 'react';
import styles from './Tasker.module.css';
import ToDoTask from '../ToDoTask/ToDoTask';

import { FaPlus, FaRegClock, FaEllipsisV, FaRegCalendarAlt,FaTrash } from 'react-icons/fa';
import TaskList from './TaskList/TaskList';
import TaskEditor from './TaskEditor/TaskEditor';
import SideBar from '../SideBar/SideBar';
import Sidehandle from './Sidehandle/Sidehandle';
import Board from './Board/Board';



export default function Tasker({ open , tasks, setTasks, selectedTask, setSelectedTask, listCategories, taskCategories}) {

  const date = 'Today'

  const handleSelectTask = (task) => {
    console.log("selected taks", task, tasks)
    setSelectedTask(task);
  };
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };


  return (
    <div className={styles.container}>
      <div>
        <TaskList listCategories={listCategories} handleSelectTask={handleSelectTask} selectedTask={selectedTask} tasks={tasks} setTasks={setTasks} taskCategories={taskCategories} date={date}></TaskList>
      </div>
      <div>
        <TaskEditor listCategories={listCategories}  taskCategories={taskCategories} updateTask={updateTask} selectedTask={selectedTask}></TaskEditor>
      </div>
    </div>
  );
}
