import React, { useState } from 'react';
import styles from "./Text.module.css";
import { Handle, Position, NodeResizer } from 'reactflow';
import TextEdit from './TextEdit';

export default function TextNode({ isConnectable, selected, data }) {
  const [fontSize, setFontSize] = useState(data?.fontSize || 16);
  const [color, setColor] = useState(data?.color || '#000000');
  const [backgroundColor, setBackgroundColor] = useState(data?.backgroundColor || '#FFFFFF');
  const [fontFamily, setFontFamily] = useState(data?.fontFamily || 'Arial');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'fontSize':
        setFontSize(value);
        break;
      case 'color':
        setColor(value);
        break;
      case 'backgroundColor':
        setBackgroundColor(value);
        break;
      case 'fontFamily':
        setFontFamily(value);
        break;
      default:
        break;
    }
  };

  const textStyle = {
    fontSize: `${fontSize}px`,
    color: color,
    backgroundColor: backgroundColor,
    fontFamily: fontFamily,
    padding: '5px',
    borderRadius: '5px',
    minWidth: '100px', // Adjust as needed
    minHeight: '20px', // Adjust as needed
    cursor: 'text',
  };


  return (
    <>
      <NodeResizer 
        color="#000" 
        isVisible={selected} 
      />
      <TextEdit details={textStyle}></TextEdit>
      <div style={textStyle}>
        <input
          type="text"
          name="fontSize"
          value={fontSize}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <input
          type="color"
          name="color"
          value={color}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <input
          type="color"
          name="backgroundColor"
          value={backgroundColor}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <input
          type="text"
          name="fontFamily"
          value={fontFamily}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        sdsd
      </div>
    </>
  );
}
