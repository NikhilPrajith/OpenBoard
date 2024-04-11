import React, { useState } from 'react';
import styles from "./Themes.module.css";
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { IoSearch } from "react-icons/io5";
import { useBoard } from '@/context/BoardContext';

export default function Themes({ changeTheme, themes }) {
  const [filter, setFilter] = useState('');
  const {alignment, setAlignment} = useBoard();


  const handleAlignment = (event, newAlignment) => {
    console.log("changed alignment?")
    setAlignment(newAlignment);
    changeTheme(newAlignment);
  };

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  // Filter themes based on search input
  const filteredThemes = Object.keys(themes).filter((themeKey) =>
    themeKey.toLowerCase().includes(filter)
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for themes..."
        onChange={handleSearchChange}
          className={styles.searchBar}
        />
        <div
          className={styles.searchBarButton}
        >
          <IoSearch/>
        </div>
      </div>

      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="Theme selection"
        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center', height:'250px', overflowY:'scroll' }}
      >
        <div style={{ margin: '16px', paddingTop: '8px', width: '' }} className="grid grid-cols-2 gap-4">
          {filteredThemes.length > 0 ? (
            filteredThemes.map((themeKey) => (
              <ToggleButton
                key={themeKey}
                value={themeKey}
                style={{
                  color: `${themes[themeKey].textColor}`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${themes[themeKey].images[0]})`, fontFamily: 'inherit', fontSize: '9px', textTransform: 'none', padding: '5px', width: '100%', borderRadius: '6px', marginRight: '10px'
                }}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgb(120, 151, 213)',
                    border: '2px black solid'
                  },
                }}
              >
                {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
              </ToggleButton>
            ))
          ) : (
            <p className={styles.noResult}>No themes found...😩</p>
          )}
        </div>
      </ToggleButtonGroup>
    </div>
  );
}
