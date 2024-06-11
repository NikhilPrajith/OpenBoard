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
import { FaTrash } from "react-icons/fa6";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { BsThreeDots } from "react-icons/bs";

export default function PreviewCard({data, index}) {

  const {setNodes, setEdges, setAlignment, documentId, setDocumentName, deleteBoard} = useBoard();

  const [openMenu, setOpenMenu] = React.useState(false);
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
    

    router.push(`/canvas?documentId=${id}`);
        
  }
  
  const date = data.createdOn.toDate(); // Convert Firestore Timestamp to JavaScript Date object
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const imageList =["https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGphcGFuZXNlJTIwYXJ0fGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1578926314433-e2789279f4aa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8amFwYW5lc2UlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1580196969807-cc6de06c05be?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGphcGFuZXNlJTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D"
  ]

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
    <div className={styles.mainContainer} onClick={()=>edit(data.id, data.name)}>
      <div className={styles.moreActionContainer}>
          <Menu placement="right-start">
          <MenuHandler>
            <div className={styles.moreActionButton}> <BsThreeDots/></div>
          </MenuHandler>
          <MenuList>
            
            <MenuItem onClick={()=>edit(data.id, data.name)}>Open</MenuItem>
            <MenuItem>
              <div className={styles.delete} onClick={(e)=>{handleDelete(e,data.id)}}>Delete</div></MenuItem>
          </MenuList>
        </Menu>

      </div>
      <div className={styles.imageCont} style={{
        backgroundImage:`url(${imageList[index % imageList.length]})`
      }}></div>
      <div className={styles.parent}>
        <div className={styles.cont}>
          <div>
            <MdSpaceDashboard/>
          </div>
          <div style={{backgroundColor: data.color, width:'5px', height:'10px', border:'0.01px #eee solid'}}></div>

          <div className={styles.header}>{data.name}</div>
        </div>
        <div className={styles.cont2}>
          <div className={styles.createdOn}>
            Created {formattedDate}
            
          </div>
        </div>
      </div>

    </div>
  )
}
//<div className={styles.delete} onClick={(e)=>{handleDelete(e,data.id)}}><FaTrash/></div>

