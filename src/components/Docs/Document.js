import React, { useState, useRef, useEffect } from 'react';
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import "./Documents.css";
import { TwitterPicker } from 'react-color';

export default function DocumentComp() {
  const [title, setTitle] = useState('Untitled');
  const [color, setColor] = useState('#F9F9F9');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const pickerRef = useRef(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleColorClick = () => {
    setShowColorPicker(!showColorPicker);
  }

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    setShowColorPicker(false); // Close color picker after selection
  }

  const handleOutsideClick = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowColorPicker(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const editor = useCreateBlockNote({
    domAttributes: {
      TextCursorPosition: {
        class: 'cursor'
      }
    },
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome, write what you wish",
      },
      {
        type: "paragraph",
        content: "Select different blocks to see the JSON change below",
      },
    ],
  });
  const customColors = ['#fff','#F9F9F9','#F9EAEA','#EAF3F9','#F7FFF4','#FFF9F4',
                      '#FFF4FE','#F7CDF4','#ECECEC'];


  return (
    <div style={{ backgroundColor: `${color}` }} className='documentContainer'>
      {/* Color Picker */}
      {showColorPicker && (
        <div className="color-picker" ref={pickerRef}>
          <TwitterPicker triangle="top-left"
            color={color} onChange={handleColorChange} colors={customColors} 
            
            styles={{ default: { input: { display: 'none' },hash: { display: 'none' } } }}
            />
        </div>
      )}

      {/* BlockNoteView */}
      <BlockNoteView data-theming-css-demo editor={editor}>

        {/* Circle showing current color */}
        <div className="color-circle" style={{ backgroundColor: `${color}` }} onClick={handleColorClick}></div>

        <input onChange={handleTitleChange} className='heading1' value={title} placeholder="Document title..." style={{ fontStyle: 'normal' }} />
      </BlockNoteView>
    </div>
  );
}
