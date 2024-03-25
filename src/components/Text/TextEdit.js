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
import { FaBold } from "react-icons/fa";

import { FaFont } from "react-icons/fa";
export default function TextEdit({ strike, underline, details, handleChange }) {

  const handleSelectClick = (e) => {
    e.stopPropagation();
  };
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
            onMouseDown={(e) => e.stopPropagation()}
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
          
            <button
                onClick={() => handleChange('textAlign', 'left')}
                aria-label="align left"
                className={details?.textAlign === 'left' ? styles.alignActive : ''}
            >
                <FaAlignLeft />
            </button>
            <button onClick={() => handleChange('textAlign', 'center')} aria-label="align center"
                className={details?.textAlign === 'center' ? styles.alignActive : ''}
            >
              
                <FaAlignCenter/>
            </button>
            
            <button onClick={() => handleChange('textAlign', 'end')} aria-label="align right"
                
                className={details?.textAlign === 'end' ? styles.alignActive : ''}
            >
                <FaAlignRight></FaAlignRight>
            </button>
            <div className={styles.rightBreak}>

            </div>
            
            <button onClick={() => handleChange('bold' , 'bold')} className={details?.bold ? styles.alignActive : ''}>
              <FaBold />
            </button>

            <button onClick={() => handleChange('italic' ,'italic')} className={details?.fontStyle ? styles.alignActive : ''}>
              <FaItalic />
            </button>
            
            <button onClick={() => handleChange('strikeThrough' ,'strikethrough')} className={strike ? styles.alignActive : ''}>
              <FaStrikethrough />
            </button>
            <button onClick={() => handleChange('underline' ,'underline')} className={underline ? styles.alignActive : ''}>
              <FaUnderline />
            </button>
          </div>
        </div>
      
        </div>

  );
}
