import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Handle, Position } from 'reactflow';
import * as Popover from '@radix-ui/react-popover';
import Draggable from 'react-draggable';
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';
import '@blocknote/react/style.css';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import './Card.css';
import { IoIosClose } from "react-icons/io";
import CardDataNode from './CardDataNode';
import InViewDocument from './InViewDocument';

export default function CardComp({data, isConnectable}) {
    const {id} = data;
    const [content, setContent] = useState(null);
    const editor = useCreateBlockNote(); // Initialize ySTour BlockNote editor

    const [openEditor, setOpenEditor] = useState(true)
    const handleOpenAndSetup = () => {
        setOpenEditor(!openEditor);
    };


    const [title, setTitle] = useState('');
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
      }

    const handleContentUpdate = async () => {
        const blocks = editor.document; // Fetch current blocks from the editor
        try {
            const htmlContent = await editor.blocksToHTMLLossy(blocks);
            setContent(htmlContent);
        } catch (error) {
            console.error("Failed to convert blocks to HTML:", error);
        }
    };
    const selectableColors = ['rgb(254, 240, 113)',  'rgb(92, 241, 192)', 'rgb(255, 205, 205)', 'rgb(229, 187, 247)', 'rgb(163, 211, 249)', 'rgb(255, 251, 200)', 'rgb(200, 255, 252)', 'white'];
    const [color, setColor] = useState('#fff');
    

    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div style={{backgroundColor:`${color}`}}  className='card' onClick={handleOpenAndSetup}>
                        <h1>{title}</h1>
                        {content && <div className='content' dangerouslySetInnerHTML={{ __html: content }} />}
                        {!content &&<div className="initalDesc" style={{color: color != 'white'? "black": ""}}>
                            Click to create document card!
                        </div>}
                    </div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                isConnectable={isConnectable}
            />
            {openEditor && ReactDOM.createPortal(
                <InViewDocument handleContentUpdate={handleContentUpdate} handleOpenAndSetup={handleOpenAndSetup} setColor={setColor} color={color} handleTitleChange={handleTitleChange} title={title} editor={editor} />,
                document.body
            )}
        </>
    );
}
