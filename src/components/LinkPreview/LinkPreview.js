import React, { useState, useEffect } from 'react';
import styles from "./LinkPreview.module.css";
import { Handle, Position, NodeResizer } from 'reactflow';
import { RiDragMoveLine } from "react-icons/ri";
import { MdOutlineDragHandle } from "react-icons/md";
import { ReactTinyLink } from 'react-tiny-link';


export default function LinkPreview({isConnectable, selected, data }) {
  const [inputUrl, setInputUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  useEffect(() => {
    // Check if data.url is provided and update states accordingly
    if (data?.url) {
      setInputUrl(data.url);
      setEmbedUrl(data.url);
      setIsEditing(false); // Disable editing mode if a URL is provided
    }
  }, [data?.url]); // This effect runs whenever data.url changes

  const handleInputChange = (event) => {
    setInputUrl(event.target.value);
    data.url = event.target.value;
  };

  const handleInputConfirm = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      setEmbedUrl(inputUrl);
    }
  };

  return (
    < >
    <NodeResizer 
        color="#000" 
        isVisible={selected} 
      />
    <div className={styles.nodeDrag}><MdOutlineDragHandle></MdOutlineDragHandle></div>
    <div className={styles.videoContainer} 
         onMouseEnter={() => setIsEditing(true)}
         onMouseLeave={() => setIsEditing(false)}>
      {(!embedUrl || isEditing) && (
        <input
          type="text"
          value={inputUrl}
          onChange={handleInputChange}
          onKeyDown={handleInputConfirm}
          placeholder="Enter link..."
          className={styles.videoInput}
        />
      )}

        {embedUrl && (
        <iframe
        className={styles.videoFrame}
        src={embedUrl}
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      )}
    </div>
    </>
  );
}
