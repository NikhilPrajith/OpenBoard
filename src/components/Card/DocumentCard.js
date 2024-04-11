import React, { useState, useEffect } from 'react';

import { Handle, Position } from 'reactflow';
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import "../Docs/Documents.css";
import { TwitterPicker } from 'react-color';
import styles from "./DocumentCard.module.css"

export default function DocumentCardComp({
  isConnectable,
  id,
  data,
  dragHandle = false,
  type,
  selected,
  zIndex,
  xPos,
  yPos,
  dragging,
  targetPosition,
  sourcePosition
}) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#fff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isExpanded, setIsExpanded] = useState(selected); // Initially expanded if selected

  useEffect(() => {
    setIsExpanded(selected); // Adjust when selection changes
  }, [selected]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleColorClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    setShowColorPicker(false); // Close color picker after selection
  };

  const toggleExpand = () => {
    if (!dragging) {
      setIsExpanded(!isExpanded);
    }
  };

  const editor = useCreateBlockNote({
    domAttributes: {
      TextCursorPosition: {
        class: 'cursor'
      }
    },
  });

  const customColors = ['#fff', '#F9F9F9', '#F9EAEA', '#EAF3F9', '#F7FFF4', '#FFF9F4',
    '#FFF4FE', '#F7CDF4', '#ECECEC'];

  const containerStyles = isExpanded ? 
    { width: '100%', height: '800px', borderRadius: '6px', backgroundColor: `${color}` } : 
    { width: '450px', height: '250px', borderRadius: '6px', backgroundColor: `${color}` };

  const containerClass = isExpanded ? 'documentContainer nodrag nowheel' : 'documentContainer';

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div style={containerStyles} className={`${containerClass} ${styles.baseCont}`} onClick={toggleExpand}>
        {/* Color Picker */}
        {showColorPicker && (
          <div className={styles.colorPicker}>
            <TwitterPicker triangle="top-left"
              color={color} onChange={handleColorChange} colors={customColors}
              styles={{ default: { input: { display: 'none' }, hash: { display: 'none' } } }}
            />
          </div>
        )}

        {/* BlockNoteView */}
        <BlockNoteView theme="light" data-theming-css-demo editor={editor} autoFocus={true}>
          {/* Circle showing current color */}
          <div className={styles.colorCircle} style={{ backgroundColor: `${color}` }} onClick={handleColorClick}></div>
          <input onChange={handleTitleChange} className={styles.heading1} value={title} placeholder="Document title" style={{ fontStyle: 'normal' }} />
        </BlockNoteView>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
    </>
  );
}
