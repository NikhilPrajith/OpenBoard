import React from 'react'
import styles from "./DocListView.module.css"
import useAuth from '../../../context/Authentication/AuthProvider'
import PreviewCard from './PreviewCard';

export default function DocListView() {

    const {user,data,logout} = useAuth();
    

  return (
    <div style={{width:'100%'}} className="py-4">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.docs && data?.docs.map((doc, index) => (
           <PreviewCard key={index} data={doc}></PreviewCard>
        ))}

      </div>
    </div>
  )
}
