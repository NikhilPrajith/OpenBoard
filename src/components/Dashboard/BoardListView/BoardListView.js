import React, { useState } from 'react';
import styles from './BoardListView.module.css';
import useAuth from '../../../context/Authentication/AuthProvider';
import PreviewCard from './PreviewCard';
import { Button, Input, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { MdSort } from 'react-icons/md';
import { IoIosSearch } from "react-icons/io";

export default function BoardListView() {
  const { user, data, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState({ key: 'createdOn', order: 'asc' });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => ({
      key: prevOrder.key,
      order: prevOrder.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSortKeyChange = (key) => {
    setSortOrder({ key, order: 'asc' });
  };

  const filteredBoards = data?.boards
    ?.filter((board) => board.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ?.sort((a, b) => {
      const valueA = a[sortOrder.key];
      const valueB = b[sortOrder.key];
      if (valueA < valueB) {
        return sortOrder.order === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder.order === 'asc' ? 1 : -1;
      }
      return 0;
    });

  return (
    <div style={{ width: '100%' }} className="py-4">
      <div className="flex items-center justify-between pb-2 mb-2"
        style={{borderBottom:'0.4px rgb(147, 147, 147) solid'}}
      >
        <div className='mr-10'>
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          style={{fontSize:'12px'}}
          className="!border !border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 "
          placeholder="Search boards..."
          labelProps={{
            className: "hidden",
          }}
          icon={<IoIosSearch/>}

        />
        </div>
        <div className="flex items-center space-x-2">
          <Menu>
            <MenuHandler>
              <div className={`flex items-center ${styles.menuButtonHandle}`} >
                <MdSort className="mr-1" />
              </div>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={() => handleSortKeyChange('createdOn')}>
                Sort by date
              </MenuItem>
              <MenuItem onClick={() => handleSortKeyChange('name')}>
                Sort by title
              </MenuItem>
              <MenuItem onClick={handleSortToggle}>
                {sortOrder.order === 'asc' ? (
                  <span className="flex items-center">
                    <AiOutlineSortAscending className="mr-1" />
                    Ascending
                  </span>
                ) : (
                  <span className="flex items-center">
                    <AiOutlineSortDescending className="mr-1" />
                    Descending
                  </span>
                )}
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredBoards && filteredBoards.map((board, index) => (
          <PreviewCard key={index} data={board} index={index}/>
        ))}
      </div>
    </div>
  );
}
