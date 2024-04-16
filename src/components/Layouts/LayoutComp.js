'use client'
import React, {useState} from 'react'
import Features from '../Features/Features';
import Heading from '../Information/Heading';

export default function LayoutComp({ children }) {

  const [open, setOpen] = useState(false);
  return (
    <div>
        <div style={{ position: 'absolute', top: '0' }}>
            <Features setOpenParent={setOpen}></Features>
            <Heading open={open}></Heading>
          </div>
          { children }
      
    </div>
  )
}
