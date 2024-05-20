import React from 'react'
import styles from "./PreviewCard.module.css";
import Image from "next/image";
import useAuth from '../../../context/Authentication/AuthProvider';
import { MdDashboard } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";

import { useRouter } from 'next/navigation';
import { useBoard } from '@/context/BoardContext';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { notification } from 'antd';

export default function PreviewCard({data}) {

  const {setNodes, setEdges, setAlignment, documentId, setDocumentName, deleteBoard} = useBoard();

  const router = useRouter()
  const {user} = useAuth();
  const edit = (id, name) =>{
    console.log("edit clicked")
    if(id != documentId){
      setNodes([]);
      setEdges([]);
      setAlignment('Plain');
      setDocumentName(name);
    }
    

    router.push(`/documents?documentId=${id}`);
        
  }
  
  const date = data.createdOn.toDate(); // Convert Firestore Timestamp to JavaScript Date object
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // This stops the click event from propagating to parent elements
  
    // Confirmation dialog using Ant Design
    notification.open({
      message: 'Confirm Deletion',
      description: 'Are you sure you want to delete this board?',
      btn: <div>
        <button type="danger" size="small" onClick={async () => {
          notification.destroy(); // Close the notification
          const result = await deleteBoard(id);
          // Show the result of the delete operation
          notification.success({
            message: 'Notification',
            description: result,
            duration: 1,
          });
        }}>
          Delete
        </button>
        <button type="default" size="small" onClick={() => notification.destroy()} style={{ marginLeft: 10 }}>
          Cancel
        </button>
      </div>,
      duration: 5, // Keep open indefinitely until an option is chosen
    });
  };
  

  return (
    <div className={styles.parent} style={{backgroundColor: data.color}} onClick={()=>edit(data.id, data.name)}>
      <div className={styles.delete} onClick={(e)=>{handleDelete(e,data.id)}}><MdOutlineDeleteOutline/></div>
      <div className={styles.cont}>
        <div>
          <MdSpaceDashboard/>
        </div>
        <div className={styles.header}>{data.name}</div>
      </div>
      <div className={styles.cont2}>
        <div className={styles.createdOn}>
          Created on: {formattedDate}
        </div>
      </div>

    </div>
  )
}
