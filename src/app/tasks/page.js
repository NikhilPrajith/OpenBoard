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

export default function page() {
  const data = [
    {
      label: "List",
      value: "list",
    },
    {
      label: "Board",
      value: "board",
    },
    {
      label: "Calendar",
      value: "calendar",
    },
  ];
 
  return (
    <div style={{marginTop:'55px', marginLeft:'65px'}}>
    <Tabs value="list">
      <TabsHeader className='' style={{marginLeft:'16px', marginRight:'16px', marginTop:'16px', backgroundColor:'color(srgb 0.9764 0.9765 0.9766)'}}>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
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
