import React, { useState } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

export default function ImageNode({ data, isConnectable, selected }) {
  // State to store the width and height
  const [size, setSize] = useState({ width: '100px', height: '100%' });

  // Function to handle resizing
  const handleResize = (newSize) => {
    setSize({width:'100%', height:'100%'});
  };

  return (
    <>
      <NodeResizer 
        color="#fff" 
        isVisible={selected} 
        onResize={handleResize} 
      />
      <div 
        style={{
          width: `${size.width}`, 
          height: `${size.height}`,
          position: 'relative', 
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
