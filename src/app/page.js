'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Features from '@/components/Features/Features';
import Heading from '@/components/Information/Heading';
import Tasker from '@/components/Tasker/Tasker';

// Dynamically import InfiniteCanvas with SSR disabled
const InfiniteCanvasNoSSR = dynamic(() => import('@/components/InfiniteCanvas'), {
  ssr: false,
});

const DocumentNoSSR = dynamic(() => import('@/components/Docs/Document'), {
  ssr: false,
});

export default function Home() {
  const [type, setType] = useState('Tasker');
  const [open, setOpen] = useState(false)

  // Determine display styles based on the `type`
  const displayStyleForType = (currentType) => {
    return type === currentType ? { display: 'block' } : { display: 'none' };
  };

  return (
    <div>
      <div style={{ position: 'absolute', top: '0' }}>
        <Features setOpenParent={setOpen} type={type} setType={setType}></Features>
        <Heading open={open} ></Heading>
      </div>

      {/* Apply styles to toggle visibility instead of conditional rendering */}
      <div style={displayStyleForType('Endless Board')}>
        <InfiniteCanvasNoSSR />
      </div>
      <div style={displayStyleForType('Tasker')}>
        <div><Tasker open={open}></Tasker></div>
      </div>
      <div style={displayStyleForType('Docs')}>
        <div><DocumentNoSSR></DocumentNoSSR></div>
      </div>
    </div>
  );
}
