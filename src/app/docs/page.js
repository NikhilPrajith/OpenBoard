import React from 'react'

import dynamic from 'next/dynamic';
const DocumentNoSSR = dynamic(() => import('@/components/Docs/Document'), {
  ssr: false,
});


export default function page() {
  return (
    <div>
        <div><DocumentNoSSR></DocumentNoSSR></div>
      
    </div>
  )
}
