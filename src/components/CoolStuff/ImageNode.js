import React, { useState } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

export default function ImageNode({ data, isConnectable, selected }) {
  // State to store the width and height
  const [size, setSize] = useState({ width: data.width || '130px', height: data.height|| '100%' });

  // Function to handle resizing
  const handleResize = (newSize) => {
    setSize({width:'100%', height:'100%'});
    data.width = '100%';
    data.height = '100%';
  };

  return (
    <>
      <NodeResizer 
        color="#000" 
        isVisible={selected} 
        onResize={handleResize} 
        keepAspectRatio={true}
      />
      <div 
        style={{
          width: `${size.width}`, 
          height: `${size.height}`,
          position: 'relative', 
          opacity:'0.8'
        }}
      >
        <img 
          src={data.url} 
          style={{ width: '100%', height: '100%' }} 
          alt=""
        />
      </div>
    </>
  );
}
