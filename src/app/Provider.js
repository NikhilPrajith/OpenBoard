'use client'
import React from 'react';
import { TaskProvider } from '@/context/TaskContext';
import { BoardProvider } from '@/context/BoardContext';
import { AuthProvider } from '@/context/Authentication/AuthProvider';
import AuthStateChanged from '@/context/Authentication/AuthStateChanged';

export default function Provider({children}) {

  
  return (
    <>
    <AuthProvider>
      <AuthStateChanged>
        <TaskProvider>
            <BoardProvider>
              {children}
            </BoardProvider>
        </TaskProvider>
      </AuthStateChanged>
    </AuthProvider>
    </>
  )
}
