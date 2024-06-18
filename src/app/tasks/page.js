'use client';

import Tasker from '@/components/Tasker/Tasker';
import React, { useState } from 'react';
import {
  Tabs,
  TabsBody,
  TabPanel,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';
import Board from '@/components/Tasker/Board/Board';
import { FaListCheck, FaCalendar } from 'react-icons/fa6';
import { BsFillClipboardFill } from 'react-icons/bs';

export default function Page() {
  const data = [
    {
      label: 'List',
      value: 'list',
      icon: FaListCheck,
    },
    {
      label: 'Board',
      value: 'board',
      icon: BsFillClipboardFill,
    },
    {
      label: 'Calendar',
      value: 'calendar',
      icon: FaCalendar,
    },
  ];

  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="relative flex" style={{ marginTop: '55px', marginLeft: '65px' }}>
      <div className="absolute top-0 left-0 p-4">
        <Menu>
          <MenuHandler>
            <Button className="bg-black text-white rounded-lg" style={{ borderRadius: '8px' }}>
              {data.find((tab) => tab.value === activeTab)?.label}
            </Button>
          </MenuHandler>
          <MenuList>
            {data.map(({ label, value, icon }) => (
              <MenuItem key={value} onClick={() => setActiveTab(value)}>
                <div className="flex items-center gap-2">
                  {React.createElement(icon, { className: 'w-4 h-4' })}
                  {label}
                </div>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      <Tabs value={activeTab} className="flex-grow">  
        <TabsBody className="p-0 m-0">
          {data.map(({ value }) => (
            <TabPanel key={value} value={value} className="p-0 m-0">
              {value === 'list' && <Tasker />}
              {value === 'board' && <Board />}
              {value === 'calendar' && <div>Calendar View</div>}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
