'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Features from '@/components/Features/Features';
import Heading from '@/components/Information/Heading';
import Tasker from '@/components/Tasker/Tasker';
import Board from '@/components/Tasker/Board/Board';

// Dynamically import InfiniteCanvas with SSR disabled
const InfiniteCanvasNoSSR = dynamic(() => import('@/components/InfiniteCanvas'), {
  ssr: false,
});

const DocumentNoSSR = dynamic(() => import('@/components/Docs/Document'), {
  ssr: false,
});

export default function Home() {
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
  const [type, setType] = useState('Lists');
  const [open, setOpen] = useState(false)

  // Determine display styles based on the `type`
  const displayStyleForType = (currentType) => {
    return type === currentType ? { display: 'block' } : { display: 'none' };
  };
  const date = 'Today';
  // Initialize the taskLists state with two default ToDoTask components
  const [tasks, setTasks] = useState([
    
    { id: '1', list:'Personal', title: 'Have fun', category: '😍', bgColor: taskCategories['😍'] , completed: false, dueDate : new Date().toISOString().split('T')[0] },

    { id: '3', list:'Work', title: 'Work', category: '😭', bgColor: taskCategories['😭'] , completed: false, dueDate : new Date().toISOString().split('T')[0],},


  ]);
  const [selectedTask, setSelectedTask] = useState(tasks? tasks[0] : null);
  const [lists, setLists] = useState(listCategories)

  return (
    <div>
      <div style={{ position: 'absolute', top: '0' }}>
        <Features setOpenParent={setOpen} type={type} setType={setType}></Features>
        <Heading open={open} ></Heading>
      </div>

      {/* Apply styles to toggle visibility instead of conditional rendering */}
      <div style={displayStyleForType('Endless Board')}>
        <InfiniteCanvasNoSSR />
      </div>
      <div style={displayStyleForType('Tasker')}>
        <div><Tasker tasks={tasks} setTasks={setTasks} selectedTask={selectedTask} setSelectedTask={setSelectedTask} open={open} taskCategories={taskCategories} listCategories={listCategories}></Tasker></div>
      </div>
      <div style={displayStyleForType('Lists')}>
        <div><Board tasks={tasks} setTasks={setTasks} taskCategories={taskCategories} listCategories={listCategories} open={open}></Board></div>
      </div>
      <div style={displayStyleForType('Docs')}>
        <div><DocumentNoSSR></DocumentNoSSR></div>
      </div>
    </div>
  );
}
