import React from 'react';
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';

import { Handle, Position,NodeResizer } from 'reactflow';
import "./Card.css"
import "../Docs/Documents.css"
import { MdOutlineDragHandle } from "react-icons/md";

import { IoIosClose } from "react-icons/io";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export default function CardDataNode({data, closePopover, isConnectable, saveFunc, editor, handleChangeColor, color, selectableColors}) {
  //const {editor, saveFunc} = data
  return (
    <>
    <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      

    <div className="nodeDrag dragHandle"><MdOutlineDragHandle></MdOutlineDragHandle></div>
    <div className='documentEditingContChange nowheel nodrag'>

    <div style={{backgroundColor:`${color}`}} className='colorIndicator'></div>
        <div className='colorPicker'>
            {selectableColors.map((color) => (
            <button
                key={color}
                className='colorOption'
                style={{ backgroundColor: color }}
                onClick={() => handleChangeColor(color)}
            ></button>

              
            ))}
          <div className='controlSec'>
            <button  className='saveNowButton' onClick={saveFunc}>SaveNow</button>

            <div onClick={closePopover}>
              <IoIosClose />
            </div>
          </div>
        </div>
        <BlockNoteView
            data-theming-css-demo
                            theme="light"
                            editor={editor}
                            autoFocus={true}
        />
      
    </div>
    </>
  )
}
