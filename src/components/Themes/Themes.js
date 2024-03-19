import React, { useState, useEffect } from 'react';
import styles from "./Themes.module.css";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Themes({alignment, setAlignment, changeTheme,themes}) {

  
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    changeTheme(newAlignment)

  };
  

  return (
    <div className={styles.container}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="Theme selection"
        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}
      >
        <div style={{margin:'16px', paddingTop:'8px', width:'100%'}} className="grid grid-cols-2 gap-4">
        {themes && <>{Object.keys(themes).map((themeKey) => (
          <ToggleButton
            key={themeKey}
            value={themeKey}
                style={{color: `${themes[themeKey].textColor}`,backgroundSize:'cover',backgroundPosition:'center', backgroundImage:`url(${themes[themeKey].images[0]})`, fontFamily: 'inherit', fontSize: '9px', textTransform: 'none', padding: '5px', width: '100%', borderRadius: '25px', marginRight: '10px' }}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgb(120, 151, 213)', // Example styling, adjust as needed
                border:'2px black solid'
              },
            }}
          >
            {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
          </ToggleButton>
        ))} </>}
        </div>
      </ToggleButtonGroup>

      {/* Render theme data or handle it however you need */}
    </div>
  );
}
