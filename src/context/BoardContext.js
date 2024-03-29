// contexts/TaskContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import ReactFlow, { MiniMap, Controls,Background, useNodesState, useEdgesState, addEdge,ReactFlowProvider } from 'reactflow';

const BoardContext = createContext();

export const useBoard = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {

  //React flow context
  const getNodeId = () => `randomnode_${+new Date()}_${+Math.random(100)}}`;
  function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  }
  function CurrentDate() {
    const now = new Date();
    const formattedDate = formatDate(now);
    return formattedDate;
  }
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  //Theme context
  const [alignment, setAlignment] = useState('Paper');

   //Iffy approach to get data from localstorage 
  //Multiple renders take place and remmeber this is Server side
  useEffect(() => {
    
  }, []);


  //Saving to localStorage methods and states
  const [isSavedBoard, setIsSavedBoard] = useState(true);

  const saveDataToLocalStorageBoard = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem('nodes', JSON.stringify(nodes));

      localStorage.setItem('theme', JSON.stringify(alignment));
      setIsSavedBoard(true); // Indicate that data has been saved
    }
  };

  

  const prevNodesRef = useRef(nodes);
  const prevAlignmentRef = useRef(alignment);
  
  const haveNodesPositionOrLengthChanged = (prevNodes, newNodes) => {
    if (prevNodes.length !== newNodes.length) return true;
    
    for (let i = 0; i < prevNodes.length; i++) {
      const prevNode = prevNodes[i];
      const newNode = newNodes.find(n => n.id === prevNode.id);
      // Assuming newNode always exists; you might need to handle cases where it doesn't
      if (!newNode || prevNode.position.x !== newNode.position.x || prevNode.position.y !== newNode.position.y) {
        return true;
      }
    }
    return false;
  };
  
  // Effect to detect relevant changes and set `isSavedBoard` to false accordingly
  useEffect(() => {
    const nodesChanged = haveNodesPositionOrLengthChanged(prevNodesRef.current, nodes);
    const alignmentChanged = prevAlignmentRef.current !== alignment;
    

    if (prevNodesRef.current.length !=0 && (nodesChanged || alignmentChanged)) {
      console.log("Significant change detected, setting isSavedBoard to false");
      setIsSavedBoard(false);
    }

    // Update refs for next comparison
    prevNodesRef.current = nodes;
    prevAlignmentRef.current = alignment;
  }, [nodes, alignment]);





  //Context for the reactFlow board

  

  // Add other states and functions you want to make globally available
  const value = {
    isSavedBoard,
    setIsSavedBoard,
    saveDataToLocalStorageBoard,

    nodes,
    setNodes,
    onNodesChange,

    edges,
    setEdges,
    onEdgesChange,

    alignment,
    setAlignment

    // Add more as needed
  };


  
  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};
