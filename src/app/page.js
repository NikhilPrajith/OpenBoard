'use client'
import React, { useState, Suspense } from 'react';
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
  suspense: true  // Enable suspense for this component
});

const DocumentNoSSR = dynamic(() => import('@/components/Docs/Document'), {
  ssr: false,
  suspense: true  // Enable suspense for this component
});

export default function Home() {
  const [type, setType] = useState('Endless Board');
  const [open, setOpen] = useState(false);

  const displayStyleForType = (currentType) => {
    return type === currentType ? { display: 'block' } : { display: 'none' };
  };
  const date = 'Today';

  return (
    <div>
      {/* Wrap parts of your component that use useSearchParams with Suspense 
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>*/}
      {/*<div style={displayStyleForType('Endless Board')}>*/}
      <div>
        {/* InfiniteCanvas and Document can be loaded here if needed */}
        <InfiniteCanvasNoSSR />
        {/* <DocumentNoSSR /> Optionally add if needed */}
      </div>
    </div>
  );
}

function Content() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const { isSavedBoard, saveDataToLocalStorageBoard, onSave } = useBoard();

  // Use effect or other logic that depends on roomId here
  /*
  useEffect(() => {
    enterRoom(roomId);
    return () => leaveRoom();
  }, [enterRoom, leaveRoom, roomId]);
  */

  return (
    <div>
      {/* Your additional component logic and JSX can go here */}
      Room ID: {roomId}
    </div>
  );
}
