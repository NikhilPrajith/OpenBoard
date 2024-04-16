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

// Dynamically import Document component with SSR disabled
const DocumentNoSSR = dynamic(() => import('@/components/Docs/Document'), {
  ssr: false,
});

export default function Home() {

  const searchParams = useSearchParams();
  const documentID = searchParams.get('documentId'); // Retrieve documentID from URL
  
  const {
    isSavedBoard, saveDataToLocalStorageBoard, onSave, setDocumentId
  } = useBoard();
 
  const roomId = searchParams.get('roomId');
  /*
  useEffect(() => {
    enterRoom(roomId);
    return () => leaveRoom();
  }, [enterRoom, leaveRoom, roomId]);*/
  
  return (
    <div>
      {/* Pass documentID to the DocumentNoSSR component */}
      <InfiniteCanvasNoSSR documentID={documentID} />
    </div>
  );
}
