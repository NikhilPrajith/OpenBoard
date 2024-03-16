import React, { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { FaPlus, FaRegClock, FaEllipsisV, FaRegCalendarAlt,FaTrash } from 'react-icons/fa';
import {TiDelete} from 'react-icons/ti';
import { RiDeleteBack2Fill } from "react-icons/ri";
import styles from './ToDoTask.module.css';
import { RiDraggable } from "react-icons/ri";

const taskCategories = {
  '😴': 'rgb(195, 198, 249)',
  '😍': 'rgb(199, 242, 249)',
  '🥸': 'rgb(238, 199, 249)',
  '😭': 'rgb(249, 211, 199)',
  '🤫': 'rgb(249, 238, 199)',
  '😵‍💫': 'rgb(249, 199, 242)',
  '🤕': 'rgb(207, 249, 199)',
};
const ToDoTask = ({blank}) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: '', category: '😍', bgColor: taskCategories['😍'] , completed: false },
  ]);
  

  const [deadline, setDeadline] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [title, setTitle] = useState('My Tasks');

  const taskListRef = useRef(null);

  useEffect(() => {
    const sortable = Sortable.create(taskListRef.current, {
      animation: 150,
      onEnd: (event) => {
        const { oldIndex, newIndex } = event;
        const reorderedTasks = Array.from(tasks);
        const [removed] = reorderedTasks.splice(oldIndex, 1);
        reorderedTasks.splice(newIndex, 0, removed);
        setTasks(reorderedTasks);
      },
    });

    // Cleanup function to prevent memory leaks
    return () => {
      if (sortable) {
        sortable.destroy();
      }
    };
  }, [tasks]); // Re-run when tasks change

  const addTask = () => {
    const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

    const randomIndex = Math.floor(Math.random() * Object.keys(taskCategories).length);
    setTasks([...tasks, { id: newId, title: '',category: Object.keys(taskCategories)[randomIndex], bgColor: taskCategories[Object.keys(taskCategories)[randomIndex]], completed: false }]);
  };
  const updateCategory = (id, newCategory) => {
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        return { ...task, category: newCategory, bgColor: taskCategories[newCategory] };
      }
      return task;
    }));
  };

  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Update the state with the new value
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* Header content, e.g., datetime inputs */}
        <input className={styles.taskHeader} placeholder='Task Title...' value={title} onChange={handleTitleChange}>
              
              </input>
      </div>
      <div className={styles.taskContainer} ref={taskListRef}>
        {tasks.map((task, index) => (
          <div key={task.id} className={styles.taskItem}>
            <div className={styles.taskItemDiv1}>
            <input
              type="checkbox"
              id={`checkbox-${task.id}`}
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
              <input value={task.title} htmlFor={`checkbox-${task.id}`} className={styles.taskLabel} placeholder='Task Title...'>
              
              </input>
            </div>
            <div className={styles.taskItemDiv2}>
            <select
              value={task.category}
              style={{ backgroundColor: task.bgColor }}
              onChange={(e) => updateCategory(task.id, e.target.value)}
              className={styles.categorySelect}
            >
              {Object.entries(taskCategories).map(([emoji, color]) => (
                <option key={emoji} value={emoji}>{emoji}</option>
              ))}
            </select>

              <TiDelete size={18} className={styles.deleteIcon} onClick={() => deleteTask(task.id)} />
              <RiDraggable className={styles.dragHandle} />
            </div>
          </div>
        ))}
      <button onClick={addTask} className={styles.addButton}>
        <FaPlus /> <span>Add task</span>
      </button>
      </div>
    </div>
  );
};

export default ToDoTask;
