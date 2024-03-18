import React, { useState } from 'react';
import axios from 'axios';
import styles from './VideoSearch.module.css'; // Make sure to define your CSS styles
import { IoSearch } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward,IoIosArrowUp,IoIosArrowDown } from "react-icons/io";

const VideoSearch = ({ onAddVideoFunction }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async () => {
    const key =  process.env.NEXT_PUBLIC_YOUTUBE_API; // Replace with your actual YouTube Data API key
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&key=${key}&maxResults=8`;
      const response = await axios.get(url);
      setSearchResults(response.data.items);
      console.log("response",response)
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      setSearchResults([]);
    }
  };

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };
  const handleClickVideo = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    onAddVideoFunction(videoUrl); // Call the passed function with the video URL
  };

  return (
    <div className={styles.videoSearchContainer}>
      <button onClick={toggleSearch} className={styles.toggleButton}>
       Search videos {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </button>
      <div className={`${styles.searchPanel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search YouTube..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBar}
          />
          <button onClick={handleSearch} className={styles.searchBarButton}>
            <IoSearch />
          </button>
        </div>
        <div className={styles.resultsContainer}>
          {searchResults.map((video) => (
            <div key={video.id.videoId} className={styles.resultItem} onClick={() => handleClickVideo(video.id.videoId)}>
              <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} className={styles.videoThumbnail} />
              <div className={styles.videoInfoCont}>
                <div className={styles.videoTitle}>{video.snippet.title}</div>
                <div className={styles.channelTitle}>{video.snippet.channelTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSearch;
