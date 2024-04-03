import React, { memo } from 'react';
import { Handle, Position,NodeResizer } from 'reactflow';
import ToDoTask from './ToDoTask';
import { RiDragMoveLine } from "react-icons/ri";
import { MdOutlineDragHandle } from "react-icons/md";
import styles from "./ToDoTask.module.css"

export default function ToDoTaskNode ({ isConnectable,selected }){
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div className={`${styles.nodeDrag} dragHandle`}><MdOutlineDragHandle></MdOutlineDragHandle></div>
      <ToDoTask></ToDoTask>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
    </>
  );
};
