import React, { useState, useEffect } from 'react';
import styles from './Tasker.module.css';
import ToDoTask from '../ToDoTask/ToDoTask';

import { FaPlus, FaRegClock, FaEllipsisV, FaRegCalendarAlt,FaTrash } from 'react-icons/fa';
import TaskList from './TaskList/TaskList';
import TaskEditor from './TaskEditor/TaskEditor';

const taskCategories = {
  '😴': 'rgb(195, 198, 249)',
  '😍': 'rgb(199, 242, 249)',
  '🥸': 'rgb(238, 199, 249)',
  '😭': 'rgb(249, 211, 199)',
  '🤫': 'rgb(249, 238, 199)',
  '😵‍💫': 'rgb(249, 199, 242)',
  '🤕': 'rgb(207, 249, 199)',
};

export default function Tasker({ open }) {
  const date = 'Today';
  // Initialize the taskLists state with two default ToDoTask components
  const [tasks, setTasks] = useState([
    
    { id: 1, title: 'Have fun', category: '😍', bgColor: taskCategories['😍'] , completed: false, dueDate : new Date().toISOString().split('T')[0] },

    { id: 3, title: 'Work', category: '😭', bgColor: taskCategories['😭'] , completed: false, dueDate : new Date().toISOString().split('T')[0],},


  ]);
  const [selectedTask, setSelectedTask] = useState(tasks? tasks[0] : null);

  

  const handleSelectTask = (task) => {
    console.log("selected taks", task, tasks)
    setSelectedTask(task);
  };
  const updateTask = (updatedTask) => {
    console.log('updated task')
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    console.log("after", tasks)
  };


  return (
    <div className={styles.container}>
      <div>
        <TaskList handleSelectTask={handleSelectTask} selectedTask={selectedTask} tasks={tasks} setTasks={setTasks} taskCategories={taskCategories} date={date}></TaskList>
      </div>
      <div>
        <TaskEditor taskCategories={taskCategories} updateTask={updateTask} selectedTask={selectedTask}></TaskEditor>
      </div>
    </div>
  );
}
