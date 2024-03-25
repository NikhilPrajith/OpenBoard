import React, { useState } from 'react';
import styles from "./Text.module.css"; // Ensure this CSS file has the required styles
import { NodeResizer } from 'reactflow';
import TextEdit from './TextEdit';

export default function TextNode({ selected, data }) {
  const [fontSize, setFontSize] = useState(data?.fontSize || '32px');
  const [color, setColor] = useState(data?.color || '#000000');
  const [backgroundColor, setBackgroundColor] = useState(data?.transparent || 'transparent');
  const [textAlign, setTextAlign] = useState(data?.textAlign || 'left');
  const [italic, setItalic] = useState(false);
  const [bold, setBold] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strike, setStrike] = useState(false);
  const [text, setTextValue] = useState('Random text');
  const [showControls, setShowControls] = useState(false);

  const handleChange = (name, value) => {
    switch (name) {
      case 'fontSize':
        setFontSize(value);
        break;
      case 'textAlign':
        setTextAlign(value);
        break;
      case 'bold':
        setBold(!bold);
        break;
      case 'italic':
        setItalic(!italic);
        break;
      case 'underline':
        setUnderline(!underline);
        break;
      case 'strikeThrough':
        setStrike(!strike);
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
  };

  return (
    <div 
      style={{ width: '100%', height: '100%' }} 
      className="dragHandle"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {showControls && (
        <TextEdit 
          strike={strike} 
          underline={underline} 
          details={textStyle} 
          handleChange={handleChange}
        />
      )}
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
  );
}
