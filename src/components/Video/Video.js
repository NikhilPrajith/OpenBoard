import React, { useState } from 'react';
import styles from "./Video.module.css";

import { Handle, Position, NodeResizer } from 'reactflow';

import { RiDragMoveLine } from "react-icons/ri";
import { MdOutlineDragHandle } from "react-icons/md";

export default function Video({isConnectable, selected }) {
  const [inputUrl, setInputUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [isEditing, setIsEditing] = useState(true);

  const detectVideoTypeAndSetEmbedUrl = (url) => {
    // YouTube URL patterns
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/i;
    const youtubeMatch = url.match(youtubePattern);

    // Vimeo URL patterns
    const vimeoPattern = /^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)/i;
    const vimeoMatch = url.match(vimeoPattern);

    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[4]}`;
    } else if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[3]}`;
    }
    
    // If not YouTube or Vimeo, assume it's a direct embed URL
    return url;
  };

  const handleInputChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleInputConfirm = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      const detectedEmbedUrl = detectVideoTypeAndSetEmbedUrl(inputUrl);
      setEmbedUrl(detectedEmbedUrl);
    }
  };

  return (
    <>
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
          placeholder="Paste the video URL here"
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
