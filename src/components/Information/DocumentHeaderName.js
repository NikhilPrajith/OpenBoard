import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import styles from "./Information.module.css"
import { useBoard } from '@/context/BoardContext';

import { Upload, Modal, Input, Button, notification, ColorPicker } from 'antd';

import { AiOutlineExclamationCircle } from 'react-icons/ai';


export function DocumentHeaderName({}) {


  const {
    isSavedBoard, saveDataToLocalStorageBoard, onSave,
    saveBoardState,
    restoreBoardState, renameBoard, documentName, setDocumentName} = useBoard();

  const [isRenaming, setRenaming] = useState(false);

  const onDocumentRename = async (name) =>{
    console.log("rename",name)
    const message = await renameBoard(name);
    console.log("return message", message)
    /*
    if(message == 'Success'){
      console.log("message", message)
      notification.success({
        message: 'Renamed Board successfully!',
        icon: <AiOutlineExclamationCircle style={{ color: '#ff4d4f' }} />,
      });
    }else{
      console.log("error", error)
      notification.error({
        message: 'Failed',
        description: 'Renaming board failed. Try again!',
        icon: <AiOutlineExclamationCircle style={{ color: '#ff4d4f' }} />,
      });
    }*/
  }
  const handleRenamingStart = () => {
    setRenaming(true);
  };

  const handleRenamingCancel = () => {
    setRenaming(false);
  };

  const handleRenamingSave = () => {
    onDocumentRename(documentName);
    setRenaming(false);
  };

  const handleNameChange = (event) => {
    setDocumentName(event.target.value);
  };

  const handleNameKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleRenamingSave();
    } else if (event.key === 'Escape') {
      handleRenamingCancel();
    }
  };

  return (
    <div className={styles.parent}>
      {isRenaming ? (
        <input
          autoFocus
          onBlur={handleRenamingCancel}
          onChange={handleNameChange}
          onKeyDown={handleNameKeyDown}
          value={documentName}
          className={styles.headerInput}
        />
      ) : (
        <div className={styles.headerCont}>
          <span>{documentName}</span>
          <button onClick={handleRenamingStart} className={styles.headerEditButton}>
            <FiEdit />
          </button>
        </div>
      )}
    </div>
  );
}
