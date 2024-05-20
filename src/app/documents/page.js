'use client'
import React, { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Features from '@/components/Features/Features';
import Heading from '@/components/Information/Heading';
import Tasker from '@/components/Tasker/Tasker';
import Board from '@/components/Tasker/Board/Board';
import { useTasks } from '@/context/TaskContext';
import { useSearchParams } from 'next/navigation';
import { useBoard } from '@/context/BoardContext';
import useAuth from '@/context/Authentication/AuthProvider';
import { useRouter } from 'next/navigation';

// Dynamically import InfiniteCanvas with SSR disabled
const InfiniteCanvasNoSSR = dynamic(() => import('@/components/InfiniteCanvas'), {
  ssr: false,
  suspense: true,  // Enable suspense handling for this dynamic component
});

// Dynamically import Document component with SSR disabled
const DocumentNoSSR = dynamic(() => import('@/components/Docs/Document'), {
  ssr: false,
  suspense: true,  // Enable suspense handling for this dynamic component
});

export default function Home() {
  return (
    <div>
      {/* Wrap the component that uses useSearchParams in Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    </div>
  );
}

function Content() {
  const searchParams = useSearchParams();
  const documentID = searchParams.get('documentId'); // Retrieve documentID from URL

  
  const {user, initialLoading} = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (initialLoading) {
      return;
    }
    if (!user) {
      router.push('/');
    }

  }, [user, initialLoading, documentID])

  /*
  useEffect(() => {
    enterRoom(roomId);
    return () => leaveRoom();
  }, [enterRoom, leaveRoom, roomId]);
  */

  return (
      <DocumentNoSSR documentID={documentID} />
  );
}
