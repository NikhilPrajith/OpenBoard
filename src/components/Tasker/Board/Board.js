import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import {TiDelete} from 'react-icons/ti';
import { RiDeleteBack2Fill } from "react-icons/ri";
import styles from './Board.module.css';
import { RiDraggable } from "react-icons/ri";
import { useTasks } from "@/context/TaskContext";

import confetti from 'canvas-confetti';

import { useSpring, animated } from 'react-spring';
import { MdDateRange } from "react-icons/md";

function Board({}) {
  const {categories, 
        tasks, 
        taskCategoriesState,
        deleteTask, 
        updateCategory, 
        toggleCompletion, 
        onValueChangeTitle, 
        updateListCategory} = useTasks()


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
  
    const columnsFromBackend = Object.entries(categories).reduce((acc, [category, color], index) => {
      const columnId = `column-${index + 1}`;
  
      acc[columnId] = {
        name: category,
        items: tasksByCategory[category] || [],
        color: color,
      };
  
      return acc;
    }, {});

    setColumns(columnsFromBackend);
  }, [tasks])
  

  
  const [columns, setColumns] = useState({});

  const strikeThroughAnimation = useSpring({
    from: { textDecoration: "none" },
    to: { textDecoration: "line-through" },
    reset: true,
  });
  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Update the state with the new value
  };

  return (
      <div className={styles.boardContCont}>
        <div className={styles.mainheader}>
            {/* Header content, e.g., datetime inputs */}
            <div className={styles.maintaskHeader}>
                  Simplified Lists 
                <div className={styles.numOfTasks}>{Object.keys(categories).length} lists</div>
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
                                      {Object.entries(taskCategoriesState).map(([emoji, color]) => (
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
     
