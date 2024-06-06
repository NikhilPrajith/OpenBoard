import React, { useState } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import styles from "./ImageEmbed.module.css";

import { IoSearch } from "react-icons/io5";

export default function ImageEmbed({addImageFunction}) {

  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addImageFunction(searchQuery,"ImageEmbed");
    }
  };
  const handleSearch =()=>{

    addImageFunction(searchQuery, "ImageEmbed");
  }

  return (
    <div className={styles.container}>
    <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Paste Image Url..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.searchBar}
        />
        <button
          onClick={handleSearch}
          className={styles.searchBarButton}
        >
          <IoSearch />
        </button>
      </div>
      </div>
  );
}
