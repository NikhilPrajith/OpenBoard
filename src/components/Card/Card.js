import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import * as Popover from '@radix-ui/react-popover';
import Draggable from 'react-draggable';
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';
import '@blocknote/react/style.css';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import './Card.css';
import { IoIosClose } from "react-icons/io";
import "../Docs/Documents.css";
import CardDataNode from './CardDataNode';

export default function CardComp({data, isConnectable}) {
    const {id} = data;
    const [content, setContent] = useState(null);
    const editor = useCreateBlockNote(); // Initialize your BlockNote editor
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleContentUpdate = async () => {
        closePopover();
        const blocks = editor.document; // Fetch current blocks from the editor
        try {
            const htmlContent = await editor.blocksToHTMLLossy(blocks);
            setContent(htmlContent);
        } catch (error) {
            console.error("Failed to convert blocks to HTML:", error);
        }
    };

    // Function to handle closing the popover
    const closePopover = () => setIsPopoverOpen(false);
    const selectableColors = ['rgb(254, 240, 113)',  'rgb(92, 241, 192)', 'rgb(255, 205, 205)', 'rgb(229, 187, 247)', 'rgb(163, 211, 249)', 'rgb(255, 251, 200)', 'rgb(200, 255, 252)', 'white'];
    const [color, setColor] = useState('white');

    

    // Handler to change the sticky note's color
    const handleChangeColor = (newColor) => {
        setColor(newColor);
    };

    

    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen} className=".nodrag .nowheen">
                <Popover.Trigger asChild>
                    <div style={{backgroundColor:`${color}`}}  className='card'>
                        {content && <div className='content' dangerouslySetInnerHTML={{ __html: content }} />}
                        {!content &&<div className="initalDesc" style={{color: color != 'white'? "black": ""}}>
                            Click to create document card!
                        </div>}
                    </div>
                </Popover.Trigger>
                <Popover.Content>
                    <CardDataNode closePopover={closePopover} selectableColors={selectableColors} handleChangeColor={handleChangeColor} color={color} saveFunc={handleContentUpdate} editor={editor} ></CardDataNode>

                </Popover.Content>
            </Popover.Root>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                isConnectable={isConnectable}
            />
        </>
    );
}
