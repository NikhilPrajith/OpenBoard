import React, { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { FaPlus, FaRegClock, FaEllipsisV, FaRegCalendarAlt,FaTrash } from 'react-icons/fa';
import styles from './BoardList.module.css';
import BoardListView from '../BoardListView/BoardListView';
import useAuth from '@/context/Authentication/AuthProvider';
import { auth,db } from '@/firebase/firebase.config';
import { useRouter } from 'next/navigation';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

import { collection,addDoc,setDoc,doc, userDocRef, arrayUnion,updateDoc } from "@firebase/firestore";

import { Upload, Modal, Input, Button, notification, ColorPicker } from 'antd';
import { useBoard } from '@/context/BoardContext';

const BoardList = ({}) => {

  const router = useRouter()
  const {setNodes, setEdges, setAlignment, setDocumentName, createNew} = useBoard();

  const selectableColors = ['rgb(254, 240, 113)', 'rgb(92, 241, 192)', 'rgb(255, 205, 205)', 'rgb(229, 187, 247)', 'rgb(163, 211, 249)', 'white'];
  const {user,data,logout} = useAuth();

  const createNewHandle = async () =>{
    console.log("Create new clicked")
    const id = await createNew();
    router.push(`/canvas?documentId=${id}`);
  };


  return (
    <div  className={styles.container}>
      <div className={styles.header} style={{

          background:'url("https://images.unsplash.com/photo-1585157603875-17aacca6182a?q=80&w=3119&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',

          backgroundSize:'cover',
          backgroundPosition:'center',
          }}>
        {/* Header content, e.g., datetime inputs */}
        <div className={styles.taskHeader}>
              Boards 
              <div className={styles.numOfTasks}>{data?.boards?.length || 0} boards</div>
              </div>
      </div>
      <div className={styles.taskContainer} >
          <BoardListView createNewHandleFunc={createNewHandle}></BoardListView>
      
      </div>
      
    </div>
  );
};

export default BoardList;
