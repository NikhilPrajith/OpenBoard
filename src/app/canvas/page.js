'use client'
import React, { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useBoard } from '@/context/BoardContext';
import useAuth from '@/context/Authentication/AuthProvider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IconButton, Collapse } from '@mui/material';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from './customStyle.module.css'; // Import CSS module
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Tasker from '@/components/Tasker/Tasker';
import { useTasks } from '@/context/TaskContext';

import { DocumentHeaderName } from '@/components/Information/DocumentHeaderName';

// Dynamically import InfiniteCanvas with SSR disabled
const InfiniteCanvasNoSSR = dynamic(() => import('@/components/InfiniteCanvas'), {
  ssr: false,
  suspense: true,  // Enable suspense handling for this dynamic component
});

export default function Home() {
  return (
    <div>
      {/* Wrap the component that uses useSearchParams in Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    </div>
  );
}

function Content() {
  const searchParams = useSearchParams();
  const documentID = searchParams.get('documentId'); // Retrieve documentID from URL
  const { isSavedBoard, saveDataToLocalStorageBoard, onSave, setDocumentId, documentName, nodes } = useBoard();
  const roomId = searchParams.get('roomId');
  const { user, initialLoading } = useAuth();
  const router = useRouter();

  const [canvasShrink, setCanvasShrink] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [activeTab, setActiveTab] = React.useState("canvas");
  const {lastId, allTasks,filterTasksById} = useTasks();

  useEffect(() => {
    if (initialLoading) {
      return;
    }
    if (!user) {
      router.push('/');
    }
    
  }, [user, initialLoading, documentID]);



  const handleTabChange = (value) => {
    setActiveTab(value);
    // Update URL hash based on tab clicked
    window.location.hash = `#${value}`;
  };

  const handleButtonClick = () => {
    setCanvasShrink(!canvasShrink);
    setShowBanner(!showBanner);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'canvas':
        return <div className={`${styles.canvasContainer} ${canvasShrink ? styles.shrink : ''}`}>
          <InfiniteCanvasNoSSR documentID={documentID} showBanner={showBanner} />
        </div>
      case 'tasks':
        return documentID ? <div style={{marginLeft:'64px', marginTop:!showBanner ? "75px" :'0px', overflowY:'scroll' }}><Tasker id={documentID} /></div> : <div>Loading...</div> ;
      case 'documents':
        return <div>Documents</div>;
      default:
        return null;
    }
  };

  const image = "https://images.unsplash.com/photo-1583324746266-6ad2266a2d89?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8";

  return (
    <div className={styles.container}>
      <div className={styles.relative}>
        <Collapse in={showBanner}>
          <div className={styles.banner} style={{backgroundImage:`url(${image})`}}>
              <div className={styles.taskHeader}>
                  <DocumentHeaderName></DocumentHeaderName>
                <div className={styles.numOfTasks}>{nodes?.length || 0} {nodes?.length > 1 ? "nodes" : "node"}</div>
              </div>
          </div>
          <div style={{marginLeft:'65px', width:'50%'}}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                  className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                <Tab
                  value="canvas"

                  onClick={()=>{handleTabChange("canvas")}}
                  className={activeTab === 'canvas' ? "text-gray-900" : ""}
                >
                  Canvas
                </Tab>
                <Tab
                  value="tasks"
                  onClick={()=>{handleTabChange("tasks")}}
                  className={activeTab === 'tasks' ? "text-gray-900" : ""}
                >
                  Tasks
                </Tab>
                <Tab
                  value="calendar"
                  disabled
                  onClick={()=>{handleTabChange("calendar")}}
                  className={activeTab === 'tasks' ? "text-gray-900" : ""}
                >
                  Calendar
                </Tab>
                <Tab
                  value="documents"

                  onClick={()=>{handleTabChange("documents")}}
                  disabled
                  className={activeTab === 'documents' ? "text-gray-900" : ""}
                >
                  Documents
                </Tab>
              </TabsHeader>
            </Tabs>
          </div>
        </Collapse>

        <button onClick={handleButtonClick} style={{top: showBanner ? '55px' : '55px'}} className={styles.toggleButton}>
          {showBanner ? <IoIosArrowUp/> : <IoIosArrowDown/>}
        </button>

          {renderTabContent()}
      </div>
    </div>
  );
}
