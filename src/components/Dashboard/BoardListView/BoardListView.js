import React from 'react'
import styles from "./BoardListView.module.css"
import useAuth from '../../../context/Authentication/AuthProvider'
import PreviewCard from './PreviewCard';

export default function BoardListView() {

    const {user,data,logout} = useAuth();
    

  return (
    <div style={{width:'100%'}} className="py-4">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.boards && data?.boards.map((board, index) => (
           <PreviewCard key={index} data={board}></PreviewCard>
        ))}

      </div>
    </div>
  )
}
