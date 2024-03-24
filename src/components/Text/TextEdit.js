import React, { useState, useEffect } from 'react';
import styles from "./TextEdit.module.css"
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { FaAlignLeft,FaAlignRight,FaAlignCenter } from "react-icons/fa";
import { FaStrikethrough, FaItalic, FaUnderline, FaTextHeight } from "react-icons/fa"; 
import { CgFontSpacing,CgFontHeight } from "react-icons/cg";

import { FaFont } from "react-icons/fa";
export default function TextEdit({ details }) {
  // Extract properties from details
  const [fontFamily, setFontFamily] = useState(details.fontFamily);
  const [fontSize, setFontSize] = useState(details.fontSize);
  const [fontWeight, setFontWeight] = useState(details.fontWeight);
  const [textAlign, setTextAlign] = useState(details.textAlign);
  const [letterSpacing, setLetterSpacing] = useState(details.charSpacing);

  const [lineSpacing, setLineHeight] = useState(details.lineHeight);

  // New states for text decorations
  const [isItalic, setIsItalic] = useState(details.fontStyle === 'italic');
  const [isStrikethrough, setIsStrikethrough] = useState(details.textDecoration === 'line-through');
  const [isUnderline, setIsUnderline] = useState(details.textDecoration === 'underline');
  const [isOverline, setIsOverline] = useState(details.textDecoration === 'overline');

  useEffect(() => {
    // Update component state when details change
    setFontFamily(details.fontFamily);
    setFontSize(details.fontSize);
    setFontWeight(details.fontWeight);
    setTextAlign(details.textAlign);
    setLetterSpacing(details.charSpacing /10);

    setIsItalic(details.fontStyle === 'italic');
    setIsStrikethrough(details.textDecoration === 'line-through');
    setIsUnderline(details.textDecoration === 'underline');
    setIsOverline(details.textDecoration === 'overline');
  }, [details]);

  const handlePropertyChange = (propName, value) => {
    // Update state
    switch (propName) {
      case 'fontFamily':
        setFontFamily(value);
        break;
      case 'fontSize':
        setFontSize(value);
        break;
      case 'fontWeight':
        setFontWeight(value);
        break;
      case 'textAlign':
        setTextAlign(value);
        break;
      case 'charSpacing':
        setLetterSpacing(value/10);
        break;
      case 'lineHeight':
          setLineHeight(value);
          break;
      default:
        break;
    }

    //details is the active object reference

    details.set(propName, value);
    canvas.requestRenderAll();
    
  };

  const toggleTextStyle = (style) => {
    let newValue;
    switch (style) {
      case 'italic':
        newValue = !isItalic;
        setIsItalic(newValue);
        details.set('fontStyle', newValue ? 'italic' : '');
        break;
      case 'strikethrough':
        newValue = !isStrikethrough;
        setIsStrikethrough(newValue);
        // For simplicity, assuming only one decoration can be active at a time
        details.set('linethrough', newValue);
        break;
      case 'underline':
        newValue = !isUnderline;
        setIsUnderline(newValue);
        details.set('underline', newValue);
        break;
      case 'overline':
        newValue = !isOverline;
        setIsOverline(newValue);

        details.set('overline', newValue); 
        break;
      default:
        break;
    }
    canvas.requestRenderAll();
  };
  return (
    <div className={styles.parent}>
        <div className={styles.lineA}>
        <label>
            <select 
            value={fontFamily} 
            onChange={(e) => handlePropertyChange('fontFamily', e.target.value)}
            >
            <option value="Times New Roman">Times New Roman</option>
            <option value="Arial">Arial</option>
            <option value="Inconsolata">Inconsolata</option>
            <option value="Quicksand">Quicksand</option>
            <option value="Pacifico">Pacifico</option>
            {/* Add more font family options */}
            </select>
        </label>

        {/* Font Size Input */}
        <label>
            <input 
            type="number" 
            value={fontSize} 
            onChange={(e) => handlePropertyChange('fontSize', parseInt(e.target.value, 10))}
            />
        </label>
        </div>

        {/* Font Weight Select */}
        <div className={styles.lineB}>
        <label>
            <select 
            value={fontWeight} 
            onChange={(e) => handlePropertyChange('fontWeight', e.target.value)}
            >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            {/* Add more font weight options */}
            </select>
        </label>

        <label>
            <CgFontSpacing className={styles.icon}/>
            <input 
            type="number" 
            value={letterSpacing} 
            onChange={(e) => handlePropertyChange('charSpacing', parseInt(e.target.value, 10)*10)}
            />
        </label>
        <label>
            <CgFontHeight className={styles.icon}/>
            <input 
            type="number" 
            value={lineSpacing} 
            step="0.1"
            onChange={(e) => handlePropertyChange('lineHeight', e.target.value)}
            />
        </label>
        </div>
        {/*And text decorations*/}
        <div className={styles.alignLineParent}>
            <div className={styles.alignLine}>
            <button
                onClick={() => handlePropertyChange('textAlign', 'left')}
                aria-label="align left"
                className={textAlign === 'left' ? styles.alignActive : ''}
            >
                <FaAlignLeft />
            </button>
            <button onClick={() => handlePropertyChange('textAlign', 'center')} aria-label="align center"
                className={textAlign === 'center' ? styles.alignActive : ''}
            >
                <FaAlignCenter/>
            </button>
            <button onClick={() => handlePropertyChange('textAlign', 'right')} aria-label="align right"
                
                className={textAlign === 'right' ? styles.alignActive : ''}
            >
                <FaAlignRight></FaAlignRight>
            </button>
            <div className={styles.rightBreak}>

            </div>

            <button onClick={() => toggleTextStyle('italic')} className={isItalic ? styles.alignActive : ''}>
              <FaItalic />
            </button>
            <button onClick={() => toggleTextStyle('strikethrough')} className={isStrikethrough ? styles.alignActive : ''}>
              <FaStrikethrough />
            </button>
            <button onClick={() => toggleTextStyle('underline')} className={isUnderline ? styles.alignActive : ''}>
              <FaUnderline />
            </button>
            <button onClick={() => toggleTextStyle('overline')} className={isOverline ? styles.alignActive : ''}>
              <FaTextHeight /> {/* Placeholder for overline */}
            </button>
            </div>
        </div>
      
        </div>

  );
}
