'use client'
import React from 'react';
import { TaskProvider } from '@/context/TaskContext';
import { BoardProvider } from '@/context/BoardContext';

export default function Provider({children}) {

  
  return (
    <>
    <TaskProvider>
        <BoardProvider>
          {children}
        </BoardProvider>
    </TaskProvider>
    </>
  )
}
