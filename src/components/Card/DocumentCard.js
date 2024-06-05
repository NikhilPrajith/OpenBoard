import React, { useState, useEffect } from 'react';

import { Handle, Position } from 'reactflow';
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import "../Docs/Documents.css";
import { TwitterPicker } from 'react-color';
import styles from "./DocumentCard.module.css";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function DocumentCardComp({
  isConnectable,
  id,
  data,
  dragHandle = false,
  selected,
  dragging
}) {

  useEffect(() => {
    if(dragging || !selected){
      data.close();
    }
  }, [selected, dragging])
  



  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      
      <div  className={styles.containerClass}>
        <Card className="w-96 h-56" disabled="true">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              DocumentCard
            </Typography>
            <Typography>
              The place is closw
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 absolute bottom-0">
            <Button disabled="true" onClick={data.open()}>Edit</Button>
          </CardFooter>
        </Card>
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
