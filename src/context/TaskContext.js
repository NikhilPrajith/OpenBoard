// contexts/TaskContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const taskCategories = {
    '😴': 'rgb(195, 198, 249)',
    '😍': 'rgb(199, 242, 249)',
    '🥸': 'rgb(238, 199, 249)',
    '😭': 'rgb(249, 211, 199)',
    '🤫': 'rgb(249, 238, 199)',
    '😵‍💫': 'rgb(249, 199, 242)',
    '🤕': 'rgb(207, 249, 199)',
  };

  const listCategories = {
    'Personal': 'rgb(195, 198, 249)',
    'Work': 'rgb(199, 242, 249)',
    'Fun': 'rgb(238, 199, 249)',
    'School': 'rgb(249, 211, 199)',
    'IDK': 'rgb(249, 238, 199)',
  };
  const defaultTasks = [{ id: '1', list:'Fun', title: 'Have fun', category: '😍', bgColor: taskCategories['😍'] , completed: false, dueDate : new Date().toISOString().split('T')[0] },

    { id: '2', list:'Personal', title: 'Personal Time', category: '😴', bgColor: taskCategories['😴'] , completed: false, dueDate : new Date().toISOString().split('T')[0],},

    { id: '3', list:'Work', title: 'Work', category: '😭', bgColor: taskCategories['😭'] , completed: false, dueDate : new Date().toISOString().split('T')[0],},
  ]
  const [categories, setListCategories] = useState(() => {
    const localCategories = localStorage.getItem('categories');
    return localCategories ? JSON.parse(localCategories) : listCategories
  });

  const [taskCategoriesState, setTaskCategories] = useState(() => {
    const localTaskCategories = localStorage.getItem('taskCategoriesState');
    return localTaskCategories ? JSON.parse(localTaskCategories) : taskCategories
  });

  const [tasks, setTasks] = useState(() => {
    const localTasks = localStorage.getItem('tasks');
    return localTasks ? JSON.parse(localTasks) : defaultTasks;
  });
  const [selectedTask, setSelectedTask] = useState(tasks ? tasks[0] : null);

  const deleteTask = (taskId, index) => {
    if(!index){
        index = tasks.findIndex(task => task.id === taskId);
    }
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    
    setTasks(updatedTasks);
    
  
    // Check if the deleted task is the currently selected one
    if (selectedTask && taskId === selectedTask.id) {
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
      setSelectedTask(nextSelectedTask);
    }
    
  };
  const addTask = () => {
    const newId =  `randomtask_${+new Date()}_${+Math.random(4000)}}`;

    const randomIndex = Math.floor(Math.random() * Object.keys(taskCategories).length);
    const newTask = { id: newId, list:'Personal', title: '',category: Object.keys(taskCategories)[randomIndex], bgColor: taskCategories[Object.keys(taskCategories)[randomIndex]], completed: false }
    setTasks([...tasks,newTask ]);
    setSelectedTask(newTask)
  };
  const updateCategory = (id, newCategory) => {
    let updatedTask = {};
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        updatedTask = { ...task, category: newCategory, bgColor: taskCategories[newCategory] }
        return updatedTask;
      }
      return task;
    }));
    if(id == selectedTask.id){
      console.log("updating current")
      setSelectedTask(updatedTask)
    }
  };
  //Update a task with a new task
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };
  const toggleCompletion = (taskId) => {
    setTasks(tasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };
  //Title input change
  const onValueChangeTitle = (id, event) => {
    let updatedTask = {}
    console.log("change title", event.target.value);
    
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        updatedTask = { ...task, title: event.target.value }
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    if(id == selectedTask.id){
      console.log("updating current")
      setSelectedTask(updatedTask)
    }
  };
  //update list category
  const updateListCategory = (id, newCategory) => {
    let updatedTask = {};
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        updatedTask = { ...task, list: newCategory }
        return updatedTask;
      }
      return task;
    }));
    if(id == selectedTask.id){
      setSelectedTask(updatedTask)
    }
  };


  const [isSaved, setIsSaved] = useState(true);
  const saveDataToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('taskCategoriesState', JSON.stringify(taskCategoriesState));
    setIsSaved(true); // Indicate that data has been saved
  };
  // Function to update local storage periodically or on specific actions
  useEffect(() => {
    if(isSaved){
      return;
    }
    const handle = setInterval(() => {
      saveDataToLocalStorage();
    }, 10000); // Update local storage every 5000 ms (5 seconds)

    return () => clearInterval(handle); // Clear interval on component unmount
  }, [tasks, categories, taskCategoriesState]);


  useEffect(() => {
    setIsSaved(false);
  }, [tasks, categories, taskCategoriesState]);


  // Add other states and functions you want to make globally available
  const value = {
    tasks,
    setTasks,

    categories,
    setListCategories,
    taskCategoriesState,
    setTaskCategories,

    selectedTask,
    setSelectedTask,

    deleteTask,
    addTask,
    updateCategory, 
    updateTask,
    toggleCompletion,
    onValueChangeTitle,
    updateListCategory,

    isSaved,
    saveDataToLocalStorage
    // Add more as needed
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
