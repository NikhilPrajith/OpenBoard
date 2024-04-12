import {create} from 'zustand';
import { createClient } from '@liveblocks/client';
import { liveblocks } from '@liveblocks/zustand';
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls,Background, useNodesState, useEdgesState, addEdge,ReactFlowProvider, 
  applyEdgeChanges,
  applyNodeChanges,
  ConnectionLineType,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from 'reactflow';


//New approach with zustand
const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;
let client;

function createLiveblocksClient() {
  return createClient({
    publicApiKey: PUBLIC_API_KEY,
    throttle: 16,
  });
}

const useStore = create((set) => ({
  nodes: [],
  edges: [],
  sharingEnabled: false,

  enableSharing: () => {
    if (!client) {
      client = createLiveblocksClient();
      set({ sharingEnabled: true });
    }
  },

  disableSharing: () => {
    if (client) {
      client.close();
      client = null;
      set({ sharingEnabled: false });
    }
  },

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  // Ensure changes is always an array
  onNodesChange: (changes) => set((state) => {
    console.log("Applying node changes:", changes);
    const newNodes = applyNodeChanges(changes, state.nodes);
    console.log("New nodes state:", newNodes);
    return { nodes: newNodes };
  }),
  
  onEdgesChange: (changes) => set((state) => {
    console.log("Applying edge changes:", changes, "Current edges:", state.edges);
    return { edges: applyEdgeChanges(changes, state.edges) };
  }),

  addNode: (newNode) => set((state) => ({
    nodes: state.nodes.concat(newNode)
  })),

  updateThemeStickers: (newStickers = []) => {
    const filteredNodes = get().nodes.filter(node => !node.id.startsWith('themeStickers'));
    set({ nodes: [...filteredNodes, ...newStickers] });
  },
  // Function to remove all nodes that start with 'themeStickers'
  removeAllThemeStickers: () => {
    const filteredNodes = get().nodes.filter(node => !node.id.startsWith('themeStickers'));
    set({ nodes: filteredNodes });
  },

  // Ensure a proper Connection object is passed
  onConnect: (connection) => set((state) => ({
    edges: addEdge(connection, state.edges),
  })),
}));

export default useStore;




//Old Approach with context
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
  //const [nodes, setNodes, onNodesChange] = useNodesState([]);
  //const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { nodes, setNodes, edges, setEdges, onNodesChange, onEdgesChange, addNode, updateThemeStickers,removeAllThemeStickers } = useStore();

  const [rfInstance, setRfInstance] = useState(null);
  const flowKey = 'example-flow';


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
      setIsSavedBoard(false);
    }

    // Update refs for next comparison
    prevNodesRef.current = nodes;
    prevAlignmentRef.current = alignment;
  }, [nodes, alignment]);


  //Saving
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      console.log("whats the theme", alignment)
      localStorage.setItem('theme', JSON.stringify(alignment));
      setIsSavedBoard(true)
    }
  }, [rfInstance, alignment]);

  //Restore
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      

      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }
    };

    restoreFlow();
  }, [setNodes]);






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
    setAlignment,

    rfInstance,
    setRfInstance,

    onSave,
    onRestore,
    addNode,
    updateThemeStickers,
    removeAllThemeStickers



    // Add more as needed
  };


  
  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};
