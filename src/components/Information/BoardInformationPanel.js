import React from 'react';
import { Popover, PopoverHandler, PopoverContent, Button, Chip } from '@material-tailwind/react';
import { FaInfoCircle, FaLightbulb } from 'react-icons/fa';
import styles from './Information.module.css';

export default function BoardInformationPanel() {
  return (
    <div className="relative">
      <Popover placement="top-start">
        <PopoverHandler>
          <button className="text-black">
            <FaInfoCircle size={15} />
          </button>
        </PopoverHandler>
        <PopoverContent className="bg-white p-4 shadow-lg">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Chip value="Shift" color="black" className="text-white" />
              <span>Hold Shift to select multiple</span>
            </div>
            <div className="flex items-center space-x-2">
              <Chip value="Scroll" color="black" className="text-white" />
              <span>Scroll to zoom</span>
            </div>
            <div className="flex items-center space-x-2">
              <Chip value="Theme" color="black" className="text-white" />
              <FaLightbulb className="text-black" />
              <span>to change themes</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
