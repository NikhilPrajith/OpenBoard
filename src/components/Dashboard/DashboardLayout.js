'use client'
import React, { useState, useEffect } from 'react';
import styles from './DashboardLayout.module.css';

import TaskEditor from '../Tasker/TaskEditor/TaskEditor';
import BoardList from './BoardList/BoardList';
import DocList from './DocList/DocList';



export default function DashboardLayout({}) {

  return (
    <div className={styles.container}>
      <div>
        <BoardList></BoardList>

      </div>
      {/*<div>
        <DocList></DocList>

  </div>*/}
      {/*<div>
        <TaskEditor></TaskEditor>
      </div>*/}
    </div>
  );
}
