'use client'
import React from 'react';
import { TaskProvider } from '@/context/TaskContext';
import { BoardProvider } from '@/context/BoardContext';
import { AuthProvider } from '@/context/Authentication/AuthProvider';
import AuthStateChanged from '@/context/Authentication/AuthStateChanged';
import { DocumentProvider } from '@/context/DocumentContext';

export default function Provider({children}) {

  
  return (
    <>
    <AuthProvider>
      <AuthStateChanged>
        <DocumentProvider>
          <TaskProvider>
              <BoardProvider>
                {children}
              </BoardProvider>
          </TaskProvider>
        </DocumentProvider>
      </AuthStateChanged>
    </AuthProvider>
    </>
  )
}
