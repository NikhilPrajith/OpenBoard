import React, { useState, useEffect } from 'react';
import { Upload, Modal, Input, Button, notification, ColorPicker } from 'antd';

import { Handle, Position,NodeResizer } from 'reactflow';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { TwitterPicker } from 'react-color';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import styles from "./PicNote.module.css";

export default function PicNote({data, selected, isConnectable}) {
  const [dataVal, setData] = useState(data.dataVal || { url: '', caption: '' });
  const [showRemoveIcon, setShowRemoveIcon] = useState(false);
  const [fileTooLarge, setFileTooLarge] = useState(false);

  // Handle file change (upload)
  const onChange = ({ file }) => {
    const maxSizeInBytes = 1024 * 1024 * 1; // 2MB for example
  
    if (file.size > maxSizeInBytes && !fileTooLarge) {
        notification.error({
          message: 'File Size Too Big',
          description: `File size exceeds the maximum limit of ${maxSizeInBytes / 1024 / 1024}MB.`,
          icon: <AiOutlineExclamationCircle style={{ color: '#ff4d4f' }} />,
        });
        setFileTooLarge(true); // Prevents multiple notifications
        return; // Stop processing the file
      }
  
      // Reset the flag if user uploads a different file
      if (file.status === 'done' && fileTooLarge) {
        setFileTooLarge(false);
        return;
      }
  
    if (file.status === 'done') {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => {
        const newUrl = reader.result;
        setData({ ...dataVal, url: newUrl });
        // You might not want to directly mutate the props like below
        // It's better to lift state up or use a context if this is needed
        data.dataVal = { ...dataVal, url: newUrl};
      };
    }
  };
  

  const onPreview = async (file) => {
    let src = file.url || file.thumbUrl;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };


  const uploadButton = (
    <div className={styles.uploadButtonCont}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleTextInput = (e) => {
    const temp = { ...dataVal, caption: e.target.value };
    setData(temp)
    data.dataVal = temp;
  }



  const [color, setColor] = useState(data.color || '#ffffff');

  const handleColorChange = (newColor) => {
    const temp = newColor.toHexString()
    setColor(temp);
    data.color = temp;
    console.log(newColor.toHexString(), "new color");
  };
  

  return (
    <>
    <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    <div className={`${styles.container} nowheel`} style={{backgroundColor: `${color}` }} >

    {selected && <ColorPicker defaultValue={color} disabledAlpha className={styles.colorCircle} value={color} onChange={handleColorChange} />}

      <Upload
        listType="picture-card"
        onChange={onChange}
        onPreview={onPreview}
        showUploadList={false}
        className={styles.uploadButtonParent}
        style={{
            backgroundImage: `url(${dataVal.url})`

        }}
      >
        {dataVal.url ? (

            <img src={dataVal.url} alt="uploaded" style={{ width: '100%' }} />

        ) : uploadButton}
      </Upload>
      <textarea
        rows={3}
        value={dataVal.caption}
        onChange={(e) => handleTextInput(e)}
        placeholder="Enter a caption for the image..."
        maxLength={80}
        className={styles.caption}
      />


    </div>

    <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
        </>
  );
}
