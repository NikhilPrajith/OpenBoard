import React,{useState} from 'react';
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';

import { TwitterPicker } from 'react-color';

import { Handle, Position,NodeResizer } from 'reactflow';
import "./Card.css"
import "./Documents.css"
import { MdOutlineDragHandle } from "react-icons/md";

import { IoIosClose } from "react-icons/io";

export default function InViewDocument({editor, handleContentUpdate, color, setColor, handleTitleChange, title}) {
  //const {editor, saveFunc} = data


  const customColors = ['#fff', '#F9F9F9', '#F9EAEA', '#EAF3F9', '#F7FFF4', '#FFF9F4',
  '#FFF4FE', '#F7CDF4', '#ECECEC'];


  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    setShowColorPicker(false); // Close color picker after selection
  }

  const [showColorPicker, setShowColorPicker] = useState(false);
  const handleColorClick = () => {
    setShowColorPicker(!showColorPicker);
  }

  return (
    <>
    <div style={{ backgroundColor: `${color}` }} className='documentContainer inviewCont'>
      {/* Color Picker */}
      {showColorPicker && (
        <div className="color-picker">
          <TwitterPicker triangle="top-left"
            color={color} onChange={handleColorChange} colors={customColors}

            styles={{ default: { input: { display: 'none' }, hash: { display: 'none' } } }}
          />
        </div>
      )}

      <button  className='saveNowButton' onClick={handleContentUpdate}>SaveNow</button>
      {/* BlockNoteView */}
      <BlockNoteView theme="light" data-theming-css-demo editor={editor} autoFocus={true}>

        {/* Circle showing current color */}
        <div className="color-circle" style={{ backgroundColor: `${color}` }} onClick={handleColorClick}></div>

        <input onChange={handleTitleChange} className='heading1' value={title} placeholder="Document title..." style={{ fontStyle: 'normal' }} />
      </BlockNoteView>
    </div>
    </>
  )
}
