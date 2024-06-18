import React from 'react';
import { Tooltip, Chip, Button } from '@material-tailwind/react';
import { FaInfoCircle, FaLightbulb } from 'react-icons/fa';
import styles from './Information.module.css';

export default function BoardInformationPanel() {
  return (
    <div className="relative">
      <Tooltip
        content={
          <div className="bg-white p-4 text-sm text-gray-700">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Chip value="Shift" color="black" className="text-white text-xs" />
                <span className="text-xs text-gray-600">Hold Shift to select multiple</span>
              </div>
              <div className="flex items-center space-x-2">
                <Chip value="Scroll" color="black" className="text-white text-xs" />
                <span className="text-xs text-gray-600">Scroll to zoom</span>
              </div>
              <div className="flex items-center space-x-2">
                <Chip value="Theme" color="black" className="text-white text-xs" />
                <FaLightbulb className="text-black text-xs" />
                <span className="text-xs text-gray-600">to change themes</span>
              </div>
            </div>
          </div>
        }
        placement="top-start"
        className="bg-white text-gray-600"
      >
        <button className="text-black">
          <FaInfoCircle size={15} />
        </button>
      </Tooltip>
    </div>
  );
}
