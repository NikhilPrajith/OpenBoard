'use client'
import Tasker from '@/components/Tasker/Tasker'
import React from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Board from '@/components/Tasker/Board/Board';
import { FaListCheck,FaCalendar } from "react-icons/fa6";
import { BsFillClipboardFill } from "react-icons/bs";

export default function page() {
  const data = [
    {
      label: "List",
      value: "list",
      icon: FaListCheck
    },
    {
      label: "Board",
      value: "board",
      icon: BsFillClipboardFill,
    },
    {
      label: "Calendar",
      value: "calendar",
      icon: FaCalendar
    },
  ];
 
  return (
    <div style={{marginTop:'55px', marginLeft:'65px'}}>
    <Tabs value="list">
      <TabsHeader className='' style={{fontSize:'12px', marginLeft:'16px', marginRight:'16px', marginTop:'16px', backgroundColor:'color(srgb 0.9764 0.9765 0.9766)'}}>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value} styl={{fontSize:'12px !important'}}>
            <div className='flex items-center gap-2'>
              {React.createElement(icon, { className: "w-4 h-4" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
        }}
        style={{padding:'0px !important'}}
      >
        <TabPanel key="list" value="list">
            <Tasker></Tasker>
        </TabPanel>
        <TabPanel key="board" value="board">
            <Board></Board>
        </TabPanel>
      </TabsBody>
    </Tabs>
    </div>
  );
}
