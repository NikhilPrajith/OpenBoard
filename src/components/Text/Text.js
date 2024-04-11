import React, { useState } from 'react';
import styles from "./Text.module.css"; // Ensure this CSS file has the required styles
import { NodeResizer } from 'reactflow';
import TextEdit from './TextEdit';

export default function TextNode({ selected, data }) {
  const [fontSize, setFontSize] = useState(data?.fontSize || '32px');
  const [color, setColor] = useState(data?.color || '#000000');
  const [backgroundColor, setBackgroundColor] = useState(data?.transparent || 'transparent');
  const [textAlign, setTextAlign] = useState(data?.textAlign || 'left');
  const [italic, setItalic] = useState(data?.italic || false);
  const [bold, setBold] = useState(data?.bold || false);
  const [underline, setUnderline] = useState(data?.underline || false);
  const [strike, setStrike] = useState(data?.strike || false);
  const [text, setTextValue] = useState(data?.text || 'Random text');
  const [showControls, setShowControls] = useState(false);

  const handleChange = (name, value) => {
    switch (name) {
      case 'fontSize':
        setFontSize(value);
        data.fontSize = value;
        break;
      case 'textAlign':
        setTextAlign(value);
        data.textAlign = value;
        break;
      case 'bold':
        setBold(!bold);
        data.bold = !bold;
        break;
      case 'italic':
        setItalic(!italic);
        data.italic = !italic;
        break;
      case 'underline':
        setUnderline(!underline);
        data.underline = !underline;
        break;
      case 'strikeThrough':
        setStrike(!strike);
        data.strike = !strike;
        break;
      case 'color':
        const tempColor = `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})`;
        setColor(tempColor);
        data.color = tempColor;
        break;
      default:
        break;
    }
  };

  const textStyle = {
    fontSize,
    color,
    backgroundColor, // This should be backgroundColor, not data?.transparent
    fontWeight: bold ? 'bold' : 'normal',
    padding: '5px',
    borderRadius: '5px',
    minWidth: '100px',
    minHeight: '150px',
    width: '100%',
    height: '100%',
    cursor: 'text',
    textAlign,
    textDecoration: `${strike ? 'line-through' : ''} ${underline ? 'underline' : ''}`,
    fontStyle: italic ? 'italic' : 'normal',
    overflowY: 'auto', // Make the textarea scrollable
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
    data.text = event.target.value;
  };

  return (
    <>
    {selected && (
      <TextEdit 
        bold={bold}
        strike={strike} 
        underline={underline} 
        details={textStyle} 
        handleChange={handleChange}
      />
    )}
    <div 
    
      style={{ width: '100%', height: '100%' }} 
      className="dragHandle nowheel"
    >
      <NodeResizer 
        color="#000" 
        isVisible={selected} 
      />
      <textarea 
        className={`${styles.inputText} dragHandle`} 
        value={text} 
        onChange={handleTextChange}  
        style={textStyle}
      />
    </div>
    </>
  );
}
