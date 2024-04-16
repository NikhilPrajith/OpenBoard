import React, { useState } from 'react';

import { Handle, Position } from 'reactflow';
import styles from "./StickyNote.module.css";
import {MdOutlineDragHandle} from "react-icons/md";


// Define a limited set of selectable colors
const selectableColors = ['rgb(254, 240, 113)', 'rgb(92, 241, 192)', 'rgb(255, 205, 205)', 'rgb(229, 187, 247)', 'rgb(163, 211, 249)', 'white'];

export default function StickyNote({isConnectable, data }) {

  const [color, setColor] = useState(data.color);
  const [text, setText] = useState(data.text || '');

  const [title, setTitle] = useState(data.title || 'My Note');

  // Handler to change the sticky note's color
  const handleChangeColor = (newColor) => {
    setColor(newColor);
    data.color = newColor;
  };
  const handleTextChange = (event) => {
    setText(event.target.value); // Update the text state with the new value from the textarea
    data.text = event.target.value;
  };

  


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    data.title = event.target.value; // Update the state with the new value
  };
  return (
    <div>

    <div className={styles.container} style={{ backgroundColor: color }}>
        <div className={styles.colorPicker}>
            {selectableColors.map((color) => (
            <button
                key={color}
                className={styles.colorOption}
                style={{ backgroundColor: color }}
                onClick={() => handleChangeColor(color)}
            ></button>
            ))}
        </div>
        <input className={styles.taskHeader} placeholder='Task Title...' value={title} onChange={handleTitleChange}>
              
              </input>
      <textarea className={styles.textArea} placeholder="Write away..."></textarea>
      
    </div>
      </div>
  );
}
