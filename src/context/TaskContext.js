// contexts/TaskContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import useAuth from "./Authentication/AuthProvider";
import { auth, db } from "@/firebase/firebase.config";

import {
  notification,
} from "antd";

import { AiOutlineExclamationCircle } from 'react-icons/ai';

import { collection,addDoc,setDoc,doc, userDocRef, arrayUnion,updateDoc, getDoc,getDocs,deleteDoc, writeBatch,query, limit,where } from "@firebase/firestore";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {

  const [categories, setListCategories] = useState(null);
  const [taskCategoriesState, setTaskCategories] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(tasks ? tasks[0] : null);
  const { user, data, initialLoading } = useAuth();
  const [lastId, setLastRetrievedId] = useState("all");
  const [toDelete, setToDelete] = useState([]);

  const deleteTask = (taskId, index) => {
    console.log("In delete")
    if (!index) {
      index = tasks.findIndex((task) => task.id === taskId);
    }
    const deletingTask = tasks[index];
    console.log("todelete", deletingTask);
    setToDelete([...toDelete, deletingTask]);
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

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
  const addTask = (idForCanvas) => {
    const newId = `randomtask_${+new Date()}_${+Math.random(4000)}}`;


    console.log(taskCategoriesState, "state of categories");
    const randomIndex = Math.floor(
      Math.random() * Object.keys(taskCategoriesState).length
    );
    
    const newTask = {
      id: newId,
      list: idForCanvas,
      title: "",
      category: Object.keys(taskCategoriesState)[randomIndex],
      bgColor: taskCategoriesState[Object.keys(taskCategoriesState)[randomIndex]],
      completed: false,
      id :  null,
      updated: true,
    };
    setTasks([...tasks, newTask]);
    setSelectedTask(newTask);
  };
  const updateCategory = (id, newCategory) => {
    let updatedTask = {};
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          updatedTask = {
            ...task,
            category: newCategory,
            bgColor: taskCategories[newCategory],
            updated: true,
          };
          return updatedTask;
        }
        return task;
      })
    );
    if (id == selectedTask.id) {
      setSelectedTask(updatedTask);
    }
  };
  //Update a task with a new task
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed, updated:true } : task
      )
    );
  };
  //Title input change
  const onValueChangeTitle = (id, event) => {
    let updatedTask = {};

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        updatedTask = { ...task, title: event.target.value, updated: true };
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    if (id == selectedTask.id) {
      setSelectedTask(updatedTask);
    }
  };
  //update list category
  const updateListCategory = (id, newCategory) => {
    let updatedTask = {};
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          updatedTask = { ...task, list: newCategory, updated: true };
          return updatedTask;
        }
        return task;
      })
    );
    if (id == selectedTask.id) {
      setSelectedTask(updatedTask);
    }
  };

  //No more local storage for tasks

  const [initialDataFromDbLoaded, setInitialDataFromDbLoaded] = useState(false);
  useEffect(() => {
    if(initialLoading || initialDataFromDbLoaded){
      return
    }
    if(!user || !data.name){
      return
    }
    if(data['tasksObj']){
      const getData = async ()=>{
        console.log("taskObj exists",data['tasksObj'] )
        setTaskCategories(data['tasksObj']['taskCategoriesState'])
        setListCategories(data['boards'])
        setIsSaved(true);
        await getAllTaskDocuments();
        setInitialDataFromDbLoaded(true);
      }
      getData();
    }else{
      setInitialDataFromDbLoaded(true);
    }
  }, [user, initialLoading, data]);

  const [isSavedTasks, setIsSaved] = useState(false);

  const getAllTaskDocuments = async () =>{
    console.log("egtting all documents")
    if(!user){
      console.log("no user in getting documents")
      return;
    }
    try {
      console.log("trying to get all documents")
      const tasksCollection = collection(db, 'users', user.uid, 'tasks');
      const tasksQuery = query(tasksCollection, limit(500));
      const querySnapshot = await getDocs(tasksQuery);
      const tasksTemp = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("retrieved tasks", tasksTemp);
      setTasks(tasksTemp)
      setAllTasks(tasksTemp)
    } catch (error) {
      console.error('Error getting all task documents:', error);
      setTasks([])
      return [];
    }

  }
  const getTaskDocumentById = async (listId) => {
    if(!user){
      return;
    }
    try {
      const tasksCollection = collection(db, 'users', user.uid, 'tasks');
      const tasksQuery = query(tasksCollection, where('list', '==', listId));
      const querySnapshot = await getDocs(tasksQuery);
      const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasks)
    } catch (error) {
      console.error('Error getting tasks by list ID:', error);
      setTasks([])
    }
  };
  const filterTasksById = (listId) => {
    
    console.log("filtering", lastId, tasks);
    if(!user){
      return;
    }
    if(listId == 'all'){
      console.log("the id is all", listId)
      //its possible that the values in it changed so we have to call it again
      getAllTaskDocuments();
      setToDelete([])

      setIsSaved(true);
      return;
    }
    setLastRetrievedId(listId);
    const temp=  allTasks.filter(task => task.list === listId);
    setTasks(temp);
    setIsSaved(true);
    setToDelete([])
  };

  // Function to update local storage periodically or on specific actions
  /*
  useEffect(() => {

    const handle = setInterval(() => {
      if (!isSaved) {
        saveDataToLocalStorage();
      }
    }, 5000); // Update local storage every 5000 ms (5 seconds)

    return () => clearInterval(handle); // Clear interval on component unmount
  }, [tasks, categories, taskCategoriesState, isSaved]);*/

  useEffect(() => {
    setIsSaved(false);
  }, [tasks, categories, taskCategoriesState]);

  const saveTasksToDb = async () => {
    console.log("save to db called")
    if (!user) {
      return; // Ensure user is logged in before trying to save data
    }
    
    try {
      const userData = data;
      const tasksObjToSave = {
        tasks: tasks,
        categories: categories,
        taskCategoriesState: taskCategoriesState,
      };
  
      const batch = writeBatch(db);

      for (const item of toDelete) {
        const taskDocRef = doc(db, `users/${user.uid}/tasks`, item.id);
        batch.delete(taskDocRef); // Add deletion to the batch
      }
  
      // Clear the toDelete array after deletion
      setToDelete([]);


      console.log("tasks", tasks, "----")
      // Iterate over each task
      for (const task of tasks) {
        console.log("going through tasks")
        if (task.id === null) {
          console.log("no task id present")
          // Create a new document under users/user.uid/tasks
          const newDocRef = doc(collection(db, `users/${user.uid}/tasks`)); // Get a new document reference
          task.id = newDocRef.id; // Assign the generated id to the task
          task.updated = false; // Set updated to false
          batch.set(newDocRef, task); // Add the task to the batch
        } else if (task.updated) {
          console.log("task updated")
          // Update the existing document
          const taskDocRef = doc(db, `users/${user.uid}/tasks`, task.id); // Reference to the existing document
          task.updated = false; // Set updated to false
          batch.set(taskDocRef, task, { merge: true }); // Add the task update to the batch
        }
      }
  
      // Commit the batch
      await batch.commit();
  
      // Save the tasksObj to the user's document
      await setDoc(
        doc(db, "users", user.uid),
        { tasksObj: tasksObjToSave },
        { merge: true }
      );
  
      setIsSaved(true);
      if(lastId == 'all'){
        setAllTasks(tasks);
      }
    } catch (error) {
      console.log("error", error)
      notification.error({
        message: "Failed to save tasks!",
        description: "Please try again.",
        icon: <AiOutlineExclamationCircle style={{ color: "#ff4d4f" }} />,
      });
    }
  };

  const deleteTasksByListId = async (listId) => {
    console.log("delete by listId called with", listId);
    if (!user) {
      return; // Ensure user is logged in before trying to delete data
    }
  
    try {
      // Reference to the user's tasks collection
      const tasksRef = collection(db, `users/${user.uid}/tasks`);
      
      // Query to find tasks with the given listId
      const q = query(tasksRef, where("list", "==", listId));
      
      // Execute the query and get the documents
      const querySnapshot = await getDocs(q);
      
      // Initialize a batch
      const batch = writeBatch(db);
      
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref); // Add each document deletion to the batch
      });
      
      // Commit the batch
      await batch.commit();
      
      console.log("Tasks with listId", listId, "have been deleted.");
    } catch (error) {
      console.log("error", error);
      notification.error({
        message: "Failed to delete tasks!",
        description: "Please try again.",
        icon: <AiOutlineExclamationCircle style={{ color: "#ff4d4f" }} />,
      });
    }
  };

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

    getTaskDocumentById,

    isSavedTasks,

    saveTasksToDb,
    allTasks,
    lastId,
    filterTasksById,
    getAllTaskDocuments,

    initialDataFromDbLoaded,
    deleteTasksByListId
    
    // Add more as needed

    //Task Node functions
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
