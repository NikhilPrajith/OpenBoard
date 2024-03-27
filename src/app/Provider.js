'use client'
import React from 'react';
import { TaskProvider } from '@/context/TaskContext';

export default function Provider({children}) {
  return (
    <TaskProvider>{children}</TaskProvider>
  )
}
