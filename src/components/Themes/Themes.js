import React, { useState } from 'react';
import styles from "./Themes.module.css";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Themes({changeTheme}) {
  const [alignment, setAlignment] = useState('');
  const [themeData, setThemeData] = useState({});

  const themes = {
    'Plain': {
        images: ['https://media4.giphy.com/media/GxqbOlVTn2lYdqtpkf/200.gif?cid=b3885998fbwuafn0xplobyldximb91bn8rdyq57trcyan94r&ep=v1_stickers_search&rid=200.gif&ct=s'],
        backgroundColor: '#fff',
        effect: ''
      },
      'Bubbles': {
        images: ['https://media4.giphy.com/media/GxqbOlVTn2lYdqtpkf/200.gif?cid=b3885998fbwuafn0xplobyldximb91bn8rdyq57trcyan94r&ep=v1_stickers_search&rid=200.gif&ct=s'],
        backgroundColor: '#f0f0f0',
        effect: 'bubbles'
      },
    'Night': {
      images: ['https://media4.giphy.com/media/GxqbOlVTn2lYdqtpkf/200.gif?cid=b3885998fbwuafn0xplobyldximb91bn8rdyq57trcyan94r&ep=v1_stickers_search&rid=200.gif&ct=s'],
      backgroundColor: 'color(srgb 0.1349 0.1546 0.2544)',
      effect: 'stary'
    },
    'Snowy': {
        images: ['https://media4.giphy.com/media/GxqbOlVTn2lYdqtpkf/200.gif?cid=b3885998fbwuafn0xplobyldximb91bn8rdyq57trcyan94r&ep=v1_stickers_search&rid=200.gif&ct=s'],
        backgroundColor: 'rgb(197, 232, 250)',
        effect: 'snow'
    },
    'Party': {
        images: ['https://media4.giphy.com/media/GxqbOlVTn2lYdqtpkf/200.gif?cid=b3885998fbwuafn0xplobyldximb91bn8rdyq57trcyan94r&ep=v1_stickers_search&rid=200.gif&ct=s'],
        backgroundColor: 'e6e6fa',
        effect: 'confetti'
      },
    'Rainy': {
        images: ['https://media4.giphy.com/media/GxqbOlVTn2lYdqtpkf/200.gif?cid=b3885998fbwuafn0xplobyldximb91bn8rdyq57trcyan94r&ep=v1_stickers_search&rid=200.gif&ct=s'],
        backgroundColor: '#7f8c8d',
        effect: 'rain'
      },
      'NewJeans': {
        images: ['https://media4.giphy.com/media/GxqbOlVTn2lYdqtpkf/200.gif?cid=b3885998fbwuafn0xplobyldximb91bn8rdyq57trcyan94r&ep=v1_stickers_search&rid=200.gif&ct=s'],
        backgroundColor: '#3498db',
        effect: 'newJeans'
      },
      'Spiderman': {
        images: ['https://media4.giphy.com/media/GxqbOlVTn2lYdqtpkf/200.gif?cid=b3885998fbwuafn0xplobyldximb91bn8rdyq57trcyan94r&ep=v1_stickers_search&rid=200.gif&ct=s'],
        backgroundColor: 'rgb(251, 170, 173)',
        effect: 'web'
      }
    // Add more themes here as needed
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    changeTheme(themes[newAlignment])

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
        {Object.keys(themes).map((themeKey) => (
          <ToggleButton
            key={themeKey}
            value={themeKey}
            style={{ fontFamily: 'inherit', fontSize: '9px', textTransform: 'none', padding: '5px', width: '100%', borderRadius: '25px', marginRight: '10px' }}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgb(120, 151, 213)', // Example styling, adjust as needed
                color: 'white',
              },
            }}
          >
            {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
          </ToggleButton>
        ))}
        </div>
      </ToggleButtonGroup>

      {/* Render theme data or handle it however you need */}
    </div>
  );
}
