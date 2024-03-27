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
import { useTasks } from '@/context/TaskContext';


const TaskList = ({}) => {
  
  const {tasks, 
        deleteTask, 
        addTask, 
        updateCategory, 
        setSelectedTask, 
        selectedTask, 
        taskCategoriesState, 
        toggleCompletion} = useTasks()

  const taskListRef = useRef(null);
  const confettiRef = useRef(null);

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


  const strikeThroughAnimation = useSpring({
    from: { textDecoration: "none" },
    to: { textDecoration: "line-through" },
    reset: true,
  });


  return (
    <div  className={styles.container}>
      <canvas ref={confettiRef} className={styles.confettiCanvas} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}></canvas>

      <div className={styles.header}>
        {/* Header content, e.g., datetime inputs */}
        <div className={styles.taskHeader}>
              Tasks 
              <div className={styles.numOfTasks}>{tasks?.length || 0} tasks</div>
              </div>
      </div>
      <button onClick={addTask} className={styles.addButton}>
        <FaPlus /> <span>Add New Task</span>
      </button>
      
      <div className={styles.taskContainer} ref={taskListRef}>
      
        {tasks?.map((task, index) => (
          <div onClick={()=> {setSelectedTask(task)}} key={task.id} className={styles.taskItemCont} style={{backgroundColor: selectedTask?.id ==task.id ? '#F8F9FA' : 'white'}}>
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
            disabled
              value={task.category}
              style={{ backgroundColor: task.bgColor, cursor:'auto' }}
              onChange={(e) => updateCategory(task.id, e.target.value)}
              className={styles.categorySelect}
            >
              {Object.entries(taskCategoriesState).map(([emoji, color]) => (
                <option key={emoji} value={emoji}>{emoji}</option>
              ))}
            </select>

              <TiDelete size={18} className={styles.deleteIcon} onClick={(e) => {e.stopPropagation();deleteTask(task.id, index)}} />
              
            </div>
            </div>
            <div className={styles.lineTwo}>
              {task.dueDate && <div className={styles.dateCont}><MdDateRange color='grey'/><span>{task.dueDate}</span></div>}

              {task.list && <div className={styles.dateCont}><span>{task.list}</span></div>}
            </div>
          </div>
        ))}
      
      </div>
    </div>
  );
};

export default TaskList;
