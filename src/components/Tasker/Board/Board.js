import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import {TiDelete} from 'react-icons/ti';
import { RiDeleteBack2Fill } from "react-icons/ri";
import styles from './Board.module.css';
import { RiDraggable } from "react-icons/ri";

import confetti from 'canvas-confetti';

import { useSpring, animated } from 'react-spring';
import { MdDateRange } from "react-icons/md";

// Assuming uuid has been correctly imported and available
// Static IDs for the example
const itemsFromBackend = [
  { id: "task-1", content: "First task" },
  { id: "task-2", content: "Second task" },
  { id: "task-3", content: "Third task" },
  { id: "task-4", content: "Fourth task" },
  { id: "task-5", content: "Fifth task" }
];




function Board({categories, setListCategories, tasks, listCategories, setTasks, taskCategories, selectedTask, setSelectedTask }) {
  const onDragEnd = (result, columns, setColumns) => {

    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      updateListCategory(removed.id,destColumn.name )
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  


  useEffect(() => {
    const tasksByCategory = tasks.reduce((acc, task) => {
      if (!acc[task.list]) {
        acc[task.list] = [];
      }
      acc[task.list].push(task);
      return acc;
    }, {});
  
    const columnsFromBackend = Object.entries(listCategories).reduce((acc, [category, color], index) => {
      const columnId = `column-${index + 1}`;
  
      // Use the pre-grouped tasks if available, or default to an empty array
      // Directly use the color associated with the category from listCategories
      acc[columnId] = {
        name: category,
        items: tasksByCategory[category] || [],
        color: color, // Directly use the color from listCategories
      };
  
      return acc;
    }, {});

    setColumns(columnsFromBackend);
  }, [tasks])
  
  const deleteTask = (taskId) => {
    const index = tasks.findIndex(task => task.id === taskId);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    
    setTasks(updatedTasks);
  
    // Check if the deleted task is the currently selected one
    if (selectedTask && taskId === selectedTask.id) {
      let nextSelectedTask = null;
  
      // If there are still tasks after deletion, proceed to find the next selection
      if (updatedTasks.length > 0) {
        // If the deleted task was not the last, select the next task in the list
        // Otherwise, select the previous task (now at the current index - 1)
        nextSelectedTask = updatedTasks[index] || updatedTasks[index - 1];
      }
  
      // Set the next selected task or null if no tasks left
      setSelectedTask(nextSelectedTask);
    }
  };
  

  
  const [columns, setColumns] = useState({});

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

  const toggleCompletion = (taskId) => {
    setTasks(tasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task));

  };
  const strikeThroughAnimation = useSpring({
    from: { textDecoration: "none" },
    to: { textDecoration: "line-through" },
    reset: true,
  });
  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Update the state with the new value
  };


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
  

  return (
    <div className={styles.boardContCont}>
    <div className={styles.mainheader}>
        {/* Header content, e.g., datetime inputs */}
        <div className={styles.maintaskHeader}>
              Simplified Lists 
              <div className={styles.numOfTasks}>{Object.keys(listCategories).length} lists</div>
              </div>
      </div>
    <div className={styles.boardCont}>
      
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {columns && <>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              key={columnId}
              className={styles.container}
            >
              <div className={styles.header}>
                <div className={styles.taskHeader}>{column.name}</div>

              <div className={styles.numOfTasks}>{Object.keys(column.items).length} tasks</div>
              </div>
              <div className={styles.contentContainerDrag} style={{ margin: 8 }}>
                <StrictModeDroppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background:column.color,
                        opacity: snapshot.isDraggingOver ? "0.3" : '1',
                        padding: 4,
                        width:'364px',
                        minHeight:'200px',
                        height:'100%',

                        borderRadius:'6px',
                      }}
                      className={styles.taskContainer}
                    >
                      {column.items.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                margin: "0 0 8px 0",
                                color: "white",
                                ...provided.draggableProps.style,
                              }}
                            >
                              <div key={task.id} className={styles.taskItemCont} style={{backgroundColor: 'white'}}>
                                <div  className={styles.taskItem}>
                                <div className={styles.taskItemDiv1}>
                                <input
                                  type="checkbox"
                                  id={`checkbox-${task.id}`}
                                  checked={task.completed}
                                  onChange={() => toggleCompletion(task.id)}
                                />
                                  <input onChange={(event) =>{onValueChangeTitle(task.id,event)}} value={task.title || ""} htmlFor={`checkbox-${task.id}`} className={styles.taskLabel} placeholder='Task Title...'>
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

                                  <TiDelete size={18} className={styles.deleteIcon} onClick={(e) => {e.stopPropagation();deleteTask(task.id)}} />
                                  
                                </div>
                                </div>
                                <div className={styles.lineTwo}>
                                  {task.dueDate && <div className={styles.dateCont}><MdDateRange color='grey'/><span>{task.dueDate}</span></div>}
                                  {task.list && <div className={styles.dateCont}><span>{task.list}</span></div>}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              </div>
            </div>
          );
        })}
        </>}

        </DragDropContext>
      </div>
      </div>
    );
  }
  
  export default Board;
     
