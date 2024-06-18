import React, { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { FaPlus, FaRegClock, FaEllipsisV, FaRegCalendarAlt,FaTrash } from 'react-icons/fa';
import {TiDelete} from 'react-icons/ti';
import { RiDeleteBack2Fill } from "react-icons/ri";
import styles from './ToDoTask.module.css';
import { RiDraggable } from "react-icons/ri";

import confetti from 'canvas-confetti';

import { useSpring, animated } from 'react-spring';
import { useTasks } from '@/context/TaskContext';

const taskCategories = {
  '😴': 'rgb(195, 198, 249)',
  '😍': 'rgb(199, 242, 249)',
  '🥸': 'rgb(238, 199, 249)',
  '😭': 'rgb(249, 211, 199)',
  '🤫': 'rgb(249, 238, 199)',
  '😵‍💫': 'rgb(249, 199, 242)',
  '🤕': 'rgb(207, 249, 199)',
};
const ToDoTask = ({blank, data}) => {
  const {addTask_TaskNode,updateCategory_TaskNode,toggleCompletion} = useTasks();
  const [tasks, setTasks] = useState( data.tasks || [
  ]);
  

  const [deadline, setDeadline] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [title, setTitle] = useState(data.title || "");

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
    const {newId, category} = addTask_TaskNode();
    setTasks([...tasks, { id: newId, title: '',category: category, bgColor: taskCategories[category], completed: false }]);
  };

  const updateCategory = (id, newCategory) => {
    updateCategory_TaskNode(id, newCategory)
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        return { ...task, category: newCategory, bgColor: taskCategories[newCategory] };
      }
      return task;
    }));
  };

  const toggleCompletionFunc = (taskId) => {
    toggleCompletion(taskId)
    setTasks(tasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };
  const strikeThroughAnimation = useSpring({
    from: { textDecoration: "none" },
    to: { textDecoration: "line-through" },
    reset: true,
  });
  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Update the state with the new value
    data.title = event.target.value;
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const onValueChangeTitle = (index, event) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], title: event.target.value };
    setTasks(updatedTasks);
};

  useEffect(() => {
    data.tasks = tasks
  }, [tasks])
  
  return (
    <div  className={styles.container}>
      <canvas ref={confettiRef} className={styles.confettiCanvas} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}></canvas>

      <div className={styles.header}>
        {/* Header content, e.g., datetime inputs */}
        <input className={styles.taskHeader} placeholder='Task Title...' value={title} onChange={handleTitleChange}>
              
              </input>
      </div>
      <div className={styles.taskContainer} ref={taskListRef}>
        {tasks.map((task, index) => (
          <animated.div key={task.id} className={styles.taskItem} style={task.completed ? strikeThroughAnimation : {}}>
            <div className={styles.taskItemDiv1}>
            <input
              type="checkbox"
              id={`checkbox-${task.id}`}
              checked={task.completed}
              onChange={() => toggleCompletionFunc(task.id)}
            />
              <input onChange={(event) =>{onValueChangeTitle(index,event)}} value={task.title} htmlFor={`checkbox-${task.id}`} className={styles.taskLabel} placeholder='Task Title...'>
              
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
          </animated.div>
        ))}
      
      </div>
      <button onClick={addTask} className={styles.addButton}>
        <FaPlus /> <span>Add task</span>
      </button>
    </div>
  );
};

export default ToDoTask;
