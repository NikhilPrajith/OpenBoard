import React, {useState,useEffect,useCallback} from 'react';
import ReactFlow, { MiniMap, Controls,Background, useNodesState, useEdgesState, addEdge,ReactFlowProvider } from 'reactflow';
import styles from "./InfinitaCanvas.module.css"
import ToDoTaskNode from './ToDoTask/ToDoTaskNode';
import 'reactflow/dist/style.css';
import BasicTools from './BasicTools/BasicTools';
import StickyNote from './StickyNote/StickyNote';
import DraggableTimer from './Timer/DraggableTimer';
import ParticleEffect from './ParticleJs/ParticleEffect';
import SnowEffect from './ParticleJs/Snow';
import SideBar from './SideBar/SideBar';
import ImageNode from './CoolStuff/ImageNode';


  const snapGrid = [10, 10];


const defaultViewport = { x: 0, y: 0, zoom: 0.75 };
  const initBgColor = 'color(srgb 0.1349 0.1546 0.2544)';
  const snowColor= 'rgb(148, 213, 255)';
  const nodeTypes = {
    taskListNode: ToDoTaskNode,
    stickyNote: StickyNote,
    timer: DraggableTimer,
    stickers: ImageNode,
  };

export default function InfiniteCanvas({}){
  


  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);
  const [selectedEffect, setSelectedEffect] = useState('stary')
  const [showEffect, setShowEffect] = useState(true);

  const getNodeId = () => `randomnode_${+new Date()}_${+Math.random(100)}}`;

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  useEffect(() => {

    setNodes([
      {

      id: getNodeId(),
      type: 'timer',
      style: {padding: 4 },
      position: {
        x:window.innerWidth /2 +110,
        y: 10,
        },
      },
      {

        id: getNodeId(),
        type: 'stickyNote',
        style: {padding: 4 },
        position: {
          x:window.innerWidth /5 *4,
          y: 300,
          },
        },
      {

        id: getNodeId(),
        type: 'stickyNote',
        style: {padding: 4 },
        position: {
          x:window.innerWidth /5 *4 +100,
          y: 400,
          },
        },
        {

          id: getNodeId(),
          type: 'stickyNote',
          style: {padding: 4 },
          position: {
            x:window.innerWidth /5 *4 +200,
            y: 500,
            },
          },
          {

            id: getNodeId(),
            type: 'taskListNode',
            style: {padding: 4 },
            position: {
              x:window.innerWidth /5,
              y: 300,
              },
            },

    ]);

  }, []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );
  
  const onAdd = (type) => {
    let dragHandle = '';
    if (type == 'taskListNode'){
      dragHandle = '.dragHandle'
    }
    const newNode = {
      id: getNodeId(),
      type: type,
      dragHandle: dragHandle,
      style: {padding: 4 },
      position: {
        x: Math.random() * window.innerWidth +100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };
  const onAddStcikers = (url) => {
    console.log("add image url", url)

    const newNode = {
      id: getNodeId(),
      type: 'stickers',
      data:{url:url},
      style: {padding: 4 },
      position: {
        x: Math.random() * window.innerWidth +100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };
  const changeTheme = (theme) =>{
    console.log("theme info", theme);
    setBgColor(theme.backgroundColor);

    setSelectedEffect(theme.effect);
    if(theme.effect == ''){
      setShowEffect(false);
    }else{
      setShowEffect(true);
    }

  }


  return (
    <div style={{ height: '100vh', width:'100%' }}>

      <ReactFlowProvider>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}

      style={{ background: bgColor }}

        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        attributionPosition="bottom-left"
        snapToGrid={false}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        onConnect={onConnect}

        onDrop={onDrop}
        onDragOver={onDragOver}
        >
        {showEffect && <ParticleEffect selectedEffect={selectedEffect}></ParticleEffect> }
      <Background size={1.4} variant="dots"></Background>
      </ReactFlow>
        <BasicTools addingNode={onAdd}></BasicTools>
        <SideBar changeTheme={changeTheme} addImageFunction={onAddStcikers}></SideBar>
      </ReactFlowProvider>
    </div>
  );
};

