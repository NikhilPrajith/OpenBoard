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
  const {setNodes, setEdges, setAlignment, setDocumentName} = useBoard();

  const selectableColors = ['rgb(254, 240, 113)', 'rgb(92, 241, 192)', 'rgb(255, 205, 205)', 'rgb(229, 187, 247)', 'rgb(163, 211, 249)', 'white'];
  const {user,data,logout} = useAuth();
  const createNew = async () => {
  
    if (!user) {
      console.log("User not authenticated");
      return;
    }
  
    try {
      console.log("Firestore instance:", db);
      // Reference to the user-specific 'boards' sub-collection
      const boardsCollectionRef = collection(db, "users", user.uid, "boards");
  
      // Create a new board document with a random color
      const newBoard = {
        owner: user.uid,
        createdAt: new Date(),
        color: selectableColors[Math.floor(Math.random() * selectableColors.length)]
      };
      const boardRef = await addDoc(boardsCollectionRef, newBoard);
  
      // Update user's document with the new board ID
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        boards: arrayUnion({
          id: boardRef.id,
          name: 'Untitled',
          createdOn: new Date(),
          color: newBoard.color
        })
      });
  
      console.log("New board created with ID:", boardRef.id);
      setNodes([]);
      setEdges([]);
      setAlignment('Paper');
      setDocumentName('Untitled');
  
      // Navigate to the /canvas page with the new document ID
      router.push(`/canvas?documentId=${boardRef.id}`);
  
    } catch (error) {
      console.error("Error creating new board: ", error);
      notification.error({
        message: 'Failed to create!',
        description: 'Please try again later.',
        icon: <AiOutlineExclamationCircle style={{ color: '#ff4d4f' }} />,
      });
    }
  };


  return (
    <div  className={styles.container}>
      <div className={styles.header}>
        {/* Header content, e.g., datetime inputs */}
        <div className={styles.taskHeader}>
              Boards 
              <div className={styles.numOfTasks}>{data?.boards?.length || 0} boards</div>
              </div>
      </div>
      <button onClick={createNew} className={styles.addButton}>
        <FaPlus /> <span>Add New Board</span>
      </button>
      <div className={styles.taskContainer} >
          <BoardListView></BoardListView>
      
      </div>
      
    </div>
  );
};

export default BoardList;
