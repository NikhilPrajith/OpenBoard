'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Features from '@/components/Features/Features';
import Heading from '@/components/Information/Heading';
import Tasker from '@/components/Tasker/Tasker';
import Board from '@/components/Tasker/Board/Board';
import { useTasks } from '@/context/TaskContext';

// Dynamically import InfiniteCanvas with SSR disabled
const InfiniteCanvasNoSSR = dynamic(() => import('@/components/InfiniteCanvas'), {
  ssr: false,
});

const DocumentNoSSR = dynamic(() => import('@/components/Docs/Document'), {
  ssr: false,
});

export default function Home() {

  const [type, setType] = useState('Endless Board');
  const [open, setOpen] = useState(false);

  // Determine display styles based on the `type`
  const displayStyleForType = (currentType) => {
    return type === currentType ? { display: 'block' } : { display: 'none' };
  };
  const date = 'Today';
  // Initialize the taskLists state with two default ToDoTask components


  return (
    <div>
      <div style={{ position: 'absolute', top: '0' }}>
        <Features setOpenParent={setOpen} type={type} setType={setType}></Features>
        <Heading type={type} open={open} ></Heading>
      </div>

      {/* Apply styles to toggle visibility instead of conditional rendering */}
      <div style={displayStyleForType('Endless Board')}>
        <InfiniteCanvasNoSSR />
      </div>
      <div style={displayStyleForType('Tasker')}>
        <div><Tasker></Tasker></div>
      </div>
      <div style={displayStyleForType('Lists')}>
        <div><Board></Board></div>
      </div>
      <div style={displayStyleForType('Docs')}>
        <div><DocumentNoSSR></DocumentNoSSR></div>
      </div>
    </div>
  );
}
