import React, { useState, useEffect } from 'react';
import styles from "./TextEdit.module.css"
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TwitterPicker,SketchPicker,ChromePicker } from 'react-color';
import IconButton from '@mui/material/IconButton';
import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { FaAlignLeft,FaAlignRight,FaAlignCenter } from "react-icons/fa";
import { FaStrikethrough, FaItalic, FaUnderline, FaTextHeight } from "react-icons/fa"; 
import { CgFontSpacing,CgFontHeight } from "react-icons/cg";
import { FaBold } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import { FaFont } from "react-icons/fa";
export default function TextEdit({ bold,strike, underline, details, handleChange }) {
  const customColors = ['#fff', '#F9F9F9', '#F9EAEA', '#EAF3F9', '#F7FFF4', '#FFF9F4',
  '#FFF4FE', '#F7CDF4', '#ECECEC'];

  const handleSelectClick = (e) => {
    e.stopPropagation();
  };


  const handleColorChange = (newColor) => {
    console.log(newColor);
    handleChange('color',newColor.rgb)
  }
  const [showColorPicker, setShowColorPicker] = useState(false);
  const handleColorClick = () => {
    setShowColorPicker(!showColorPicker);
  }
  const handleColorPickerClose = () => {
    setShowColorPicker(false)
  }
  const popover = {
    position: 'absolute',
    zIndex: '2',
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }
  return (
    <div className={styles.parent}>


    
        {/*And text decorations*/}
        
        <div className={styles.alignLineParent}>
        
            <div className={styles.alignLine}>
            <label>
            <select 
            className={styles.categorySelect}
            value={details?.fontSize} 
            onClick={handleSelectClick}
            onMouseDown={handleColorPickerClose}
            onChange={(e) => handleChange('fontSize', e.target.value)}
            >
            <option value="48px">Heading 1</option>
            <option value="32px">Heading 2</option>
            <option value="20.799999px">Heading 3</option>
            <option value="16px">Text</option>
            {/* Add more font family options */}
            </select>
        </label>
            <div className={styles.rightBreak}>

            </div>

            <div className={styles.colorPickerCont}  onClick={handleColorClick}><div className={styles.colorCircle} style={{ backgroundColor: `${details?.color}` }}></div><IoIosArrowDown/></div>
            {showColorPicker && (
              <div className={styles.colorPicker}>
                <div style={ popover }>
          <div style={ cover } onClick={handleColorPickerClose }/>
                <ChromePicker triangle="top"
                  color={details?.color} onChange={handleColorChange} colors={customColors}

                  styles={{ default: { input: { display: 'none' }, hash: { display: 'none' } } }}
                />
                </div>
              </div>
            )}
            <div className={styles.rightBreak}>

            </div>
          
            <button

            onMouseDown={handleColorPickerClose}
                onClick={() => handleChange('textAlign', 'left')}
                aria-label="align left"
                className={details?.textAlign === 'left' ? styles.alignActive : ''}
            >
                <FaAlignLeft />
            </button>
            <button 
            onMouseEnter={handleColorPickerClose} onClick={() => handleChange('textAlign', 'center')} aria-label="align center"
                className={details?.textAlign === 'center' ? styles.alignActive : ''}
            >
              
                <FaAlignCenter/>
            </button>
            
            <button 
            onMouseEnter={handleColorPickerClose} onClick={() => handleChange('textAlign', 'end')} aria-label="align right"
                
                className={details?.textAlign === 'end' ? styles.alignActive : ''}
            >
                <FaAlignRight></FaAlignRight>
            </button>
            <div className={styles.rightBreak}>

            </div>
            
            <button 
            onMouseEnter={handleColorPickerClose} onClick={() => handleChange('bold' , 'bold')} className={bold ? styles.alignActive : ''}>
              <FaBold />
            </button>

            <button 
            onMouseEnter={handleColorPickerClose} onClick={() => handleChange('italic' ,'italic')} className={details?.fontStyle != "normal" ? styles.alignActive : ''}>
              <FaItalic />
            </button>
            
            <button 
            onMouseEnter={handleColorPickerClose} onClick={() => handleChange('strikeThrough' ,'strikethrough')} className={strike ? styles.alignActive : ''}>
              <FaStrikethrough />
            </button>
            <button 
            onMouseEnter={handleColorPickerClose} onClick={() => handleChange('underline' ,'underline')} className={underline ? styles.alignActive : ''}>
              <FaUnderline />
            </button>
          </div>
        </div>
      
        </div>

  );
}
