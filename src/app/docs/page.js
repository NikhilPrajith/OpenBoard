import React from 'react'
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
