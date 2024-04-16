'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Features from '@/components/Features/Features';
import Heading from '@/components/Information/Heading';
import Tasker from '@/components/Tasker/Tasker';
import Board from '@/components/Tasker/Board/Board';
import { useTasks } from '@/context/TaskContext';
import { useSearchParams } from 'next/navigation';
import { useBoard } from '@/context/BoardContext';

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

  
  const searchParams = useSearchParams();
  const {
    isSavedBoard, saveDataToLocalStorageBoard, onSave} = useBoard();
 
  const roomId = searchParams.get('roomId')
  /*
  useEffect(() => {
    enterRoom(roomId);
    return () => leaveRoom();
  }, [enterRoom, leaveRoom, roomId]);*/
  


  return (
    <div>
      {/* Apply styles to toggle visibility instead of conditional rendering */}
      <div>
        <InfiniteCanvasNoSSR />
      </div>
    </div>
  );
}
