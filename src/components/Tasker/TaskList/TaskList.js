import React, { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { FaPlus, FaRegClock, FaEllipsisV, FaRegCalendarAlt,FaTrash } from 'react-icons/fa';
import {TiDelete} from 'react-icons/ti';
import { RiDeleteBack2Fill } from "react-icons/ri";
import styles from './TaskList.module.css';
import { RiDraggable } from "react-icons/ri";

import confetti from 'canvas-confetti';

import { useSpring, animated } from 'react-spring';
import { MdDateRange } from "react-icons/md";


const TaskList = ({blank, setTasks, tasks, taskCategories, date, handleSelectTask, selectedTask}) => {


  const [deadline, setDeadline] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const taskListRef = useRef(null);
  const confettiRef = useRef(null);
  const launchConfetti2 = () => {
      let originX = 0;
      let originY =0;

      if(confettiRef){
        const rect = confettiRef.current.getBoundingClientRect();
            // Calculate the center of the timer component
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Convert these to a ratio of the viewport dimensions
        originX = centerX / window.innerWidth;
        originY = centerY / window.innerHeight;
      }
      confetti({
        angle: 90,
        spread: 40,
        startVelocity: 30,
        elementCount: 200,
        dragFriction: 0.122,
        duration: 2000,
        stagger: 1,
        width: "6px",
        height: "6px",
        perspective: "500px",
        colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
        origin:{x:originX,y:originY}
    });
  };
  const launchConfetti = () => {
    if (confettiRef.current) {
      const canvasConfetti = confetti.create(confettiRef.current, { resize: true });
      canvasConfetti({
        spread: 60,
        duration:1000,
        stagger: 1,
        width: "6px",
        height: "6px",
        perspective: "500px",
        colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
        origin: { y: 1.6 } // Adjust as needed to fit the confetti effect within the canvas area
      });
    }
  };


  const prevCompletionStatesRef = useRef(tasks.map(task => task.completed));
  useEffect(() => {
    // Map current completion states
    const currentCompletionStates = tasks.map(task => task.completed);

    // Check if there's any change in completion status
    const isCompletionStatusChanged = currentCompletionStates.some((state, index) => state !== prevCompletionStatesRef.current[index]);

    // If there's a change in any task's completion status, trigger confetti
    if (isCompletionStatusChanged) {
      if (tasks.every(task => task.completed)) {
        launchConfetti();
      }
      
    }
    // Update the ref with current completion states for the next comparison
    prevCompletionStatesRef.current = currentCompletionStates;
    
  }, [tasks]);



  const addTask = () => {
    const newId =  `randomtask_${+new Date()}_${+Math.random(4000)}}`;

    const randomIndex = Math.floor(Math.random() * Object.keys(taskCategories).length);
    const newTask = { id: newId, title: '',category: Object.keys(taskCategories)[randomIndex], bgColor: taskCategories[Object.keys(taskCategories)[randomIndex]], completed: false }
    setTasks([...tasks,newTask ]);
    handleSelectTask(newTask)
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
    setTasks(tasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };
  const strikeThroughAnimation = useSpring({
    from: { textDecoration: "none" },
    to: { textDecoration: "line-through" },
    reset: true,
  });


  const deleteTask = (taskId, index) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    
    setTasks(updatedTasks);
    
  
    // Check if the deleted task is the currently selected one
    if (selectedTask && taskId === selectedTask.id) {
      console.log("deleting selected")
      let nextSelectedTask = null;
  
      if (updatedTasks.length > 0) {
        // Check if the deleted task was not the last in the list
        if (index < tasks.length - 1) {
          nextSelectedTask = updatedTasks[index]; // Select the next task
        } else {
          nextSelectedTask = updatedTasks[index - 1]; // Select the previous task if the deleted one was the last
        }
      }
      
      // Set the next selected task or null if no tasks left
      handleSelectTask(nextSelectedTask);
    }
    
  };
  
  const onValueChangeTitle = (index, event) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], title: event.target.value };
    setTasks(updatedTasks);
  };
  return (
    <div  className={styles.container}>
      <canvas ref={confettiRef} className={styles.confettiCanvas} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}></canvas>

      <div className={styles.header}>
        {/* Header content, e.g., datetime inputs */}
        <div className={styles.taskHeader}>
              {date} 
              <div className={styles.numOfTasks}>{tasks.length} tasks</div>
              </div>
      </div>
      <button onClick={addTask} className={styles.addButton}>
        <FaPlus /> <span>Add New Task</span>
      </button>
      
      <div className={styles.taskContainer} ref={taskListRef}>
      
        {tasks.map((task, index) => (
          <div onClick={()=> {handleSelectTask(task)}} key={task.id} className={styles.taskItemCont} style={{backgroundColor: selectedTask?.id ==task.id ? '#F8F9FA' : 'white'}}>
            <div  className={styles.taskItem}>
            <div className={styles.taskItemDiv1}>
            <input
              type="checkbox"
              id={`checkbox-${task.id}`}
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
              <input disabled value={task.title} htmlFor={`checkbox-${task.id}`} className={styles.taskLabel} placeholder='Task Title...'>
              
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

              <TiDelete size={18} className={styles.deleteIcon} onClick={(e) => {e.stopPropagation();deleteTask(task.id, index)}} />
              
            </div>
            </div>
            <div className={styles.lineTwo}>
              {task.dueDate && <div className={styles.dateCont}><MdDateRange color='grey'/><span>{task.dueDate}</span></div>}
            </div>
          </div>
        ))}
      
      </div>
    </div>
  );
};

export default TaskList;
