import React, { useState } from 'react';
import axios from 'axios';
import styles from './CoolStuff.module.css';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { IoSearch } from "react-icons/io5";

const Stickers = ({addImageFunction}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [alignment, setAlignment] = React.useState('stickers');
  
  const handleSearch = async () => {
    const key = process.env.NEXT_PUBLIC_GIPHY_API;
    try {
      let url;
      if (alignment === 'stickers') {
        url = `https://api.giphy.com/v1/stickers/search?q=${searchQuery}&limit=12&api_key=${key}`;
      } else {
        url = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&limit=12&api_key=${key}`;
      }
      const response = await axios.get(url);
      setSearchResults(response.data.data);
    } catch (error) {
      setSearchResults([]);
      console.error('Error fetching stickers or gifs:', error);
    }
  };

  const handleClickImage = (url) => {
    console.log("clickImage",url);
    addImageFunction(url);
  }
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for stickers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBar}
        />
        <button
          onClick={handleSearch}
          className={styles.searchBarButton}
        >
          <IoSearch/>
        </button>
      </div>
      <div className={styles.lookingFor}></div>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="Platform"
        style={{ width: '100%',display: 'flex',
        justifyContent: 'center',
        alignContent: 'center' }} // Set width to 100%
      >
        <ToggleButton value="stickers" style={{ fontFamily: 'inherit', fontSize: '9px',
      textTransform: 'none',
      padding: '5px',width:'100%', borderRadius:'25px',marginRight:'10px'}}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'rgb(120, 151, 213)', // Your custom styles here
          color: 'white',
          // Add more styles as needed
        },
      }}
      >
          <div>
            Stickers
          </div>
        </ToggleButton>
        <ToggleButton value="gifs" style={{ fontFamily: 'inherit', fontSize: '9px',
      textTransform: 'none',
      padding: '5px',width:'100%', borderRadius:'25px',marginLeft:'10px', borderLeft:'1px solid rgba(0, 0, 0, 0.12)'}}
      
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'rgb(120, 151, 213)', // Your custom styles here
          color: 'white',
          // Add more styles as needed
        },
      }}>
          <div>
            Gifs
          </div>
        </ToggleButton>
      </ToggleButtonGroup>

      {searchResults.length ==0 && <div className={styles.searchSomething}>Very Quiet... 😶‍🌫️</div>}
      {searchResults.length !=0 && <div className={`grid grid-cols-2 gap-4 ${styles.resultCont}`}>
        {searchResults.map((result) => (
          <div onClick={()=>{handleClickImage(result.images.fixed_height.url)}} key={result.id} className={`border border-gray-300 rounded ${styles.imageParent}`}>
            <img style={{height:'100%'}} src={result.images.fixed_height.url} alt={result.title} />
          </div>
        ))}
      </div>}
    </div>
  );
};

export default Stickers;
