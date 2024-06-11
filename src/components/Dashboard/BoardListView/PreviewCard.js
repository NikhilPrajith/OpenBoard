import React from "react";
import styles from "./PreviewCard.module.css";
import Image from "next/image";
import useAuth from "../../../context/Authentication/AuthProvider";
import { MdDashboard } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";

import { useRouter } from "next/navigation";
import { useBoard } from "@/context/BoardContext";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { notification } from "antd";
import { FaTrash } from "react-icons/fa6";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { BsThreeDots } from "react-icons/bs";

export default function PreviewCard({ data, index }) {
  const {
    setNodes,
    setEdges,
    setAlignment,
    documentId,
    setDocumentName,
    deleteBoard,
    pubishAsTemplate,
    copyFlowElementsForComponents
  } = useBoard();

  const [openMenu, setOpenMenu] = React.useState(false);
  const router = useRouter();
  const { user, data: userData } = useAuth();
  const edit = (id, name) => {
    console.log("edit clicked");
    if (id != documentId) {
      setNodes([]);
      setEdges([]);
      setAlignment("Plain");
      setDocumentName(name);
    }

    router.push(`/canvas?documentId=${id}`);
  };

  const date = data.createdOn.toDate(); // Convert Firestore Timestamp to JavaScript Date object
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const imageList = [
    "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGphcGFuZXNlJTIwYXJ0fGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1578301977886-43be7b983104?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBhaW50aW5nc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1579541591970-e5780dc6b31f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBhaW50aW5nc3xlbnwwfDB8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1579541592065-da8a15e49bc7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhaW50aW5nc3xlbnwwfDB8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1579168133409-34acb719c8b6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHBhaW50aW5nc3xlbnwwfDB8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1578926078693-4eb3d4499e43?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHBhaW50aW5nc3xlbnwwfDB8MHx8fDA%3D",

  ];

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // This stops the click event from propagating to parent elements

    // Confirmation dialog using Ant Design
    notification.open({
      message: "Confirm Deletion",
      description: "Are you sure you want to delete this board?",
      btn: (
        <div>
          <button
            type="danger"
            size="small"
            onClick={async () => {
              notification.destroy(); // Close the notification
              const result = await deleteBoard(id);
              // Show the result of the delete operation
              notification.success({
                message: "Notification",
                description: result,
                duration: 1,
              });
            }}
          >
            Delete
          </button>
          <button
            type="default"
            size="small"
            onClick={() => notification.destroy()}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        </div>
      ),
      duration: 5, // Keep open indefinitely until an option is chosen
    });
  };
  const publish = async (e, id, name) =>{
    e.stopPropagation();
    pubishAsTemplate(data.id, data.name);
  }

  const createCompWithObjects = async (e, id, name) =>{
    e.stopPropagation();
    copyFlowElementsForComponents(data.id, data.name);
  }

  return (
    <div
      className={styles.mainContainer}
      onClick={() => edit(data.id, data.name)}
    >
      <div className={styles.moreActionContainer}>
        <Menu placement="right-start">
          <MenuHandler>
            <div className={styles.moreActionButton}>
              {" "}
              <BsThreeDots />
            </div>
          </MenuHandler>
          <MenuList>
            {userData.admin && (
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  publish(e, data.id, data.name);
                }}
              >
                Publish As Template
              </MenuItem>
            )}
            {userData.admin && (
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  createCompWithObjects(e, data.id, data.name);
                }}
              >
                Create Component From Flow
              </MenuItem>
            )}
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                edit(data.id, data.name);
              }}
            >
              Open
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(e, data.id);
              }}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div
        className={styles.imageCont}
        style={{
          backgroundImage: `url(${imageList[index % imageList.length]})`,
        }}
      ></div>
      <div className={styles.parent}>
        <div className={styles.cont}>
          <div>
            <MdSpaceDashboard />
          </div>
          <div
            style={{
              backgroundColor: data.color,
              width: "5px",
              height: "10px",
              border: "0.01px #eee solid",
            }}
          ></div>

          <div className={styles.header}>{data.name}</div>
        </div>
        <div className={styles.cont2}>
          <div className={styles.createdOn}>Created {formattedDate}</div>
        </div>
      </div>
    </div>
  );
}
//<div className={styles.delete} onClick={(e)=>{handleDelete(e,data.id)}}><FaTrash/></div>
