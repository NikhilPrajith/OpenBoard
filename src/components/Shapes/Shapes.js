import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styles from './Shapes.module.css';
import { PiRectangleThin } from "react-icons/pi";
import { GoCircle, GoDiamond } from "react-icons/go";
import { RiTriangleLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { useBoard } from '@/context/BoardContext';
import useStore from '@/context/BoardContext';
import { Button } from "@material-tailwind/react";
import { MdOutlineRectangle } from "react-icons/md";
import { LuRectangleHorizontal } from "react-icons/lu";
import { CiMedicalCross } from "react-icons/ci";
import { BiCylinder } from "react-icons/bi";
import { PiParallelogram } from "react-icons/pi";
import { FaRegStar, FaRegHeart } from "react-icons/fa";

const shapes = [
  { id: 'rectangle', label: 'Rectangle', icon: MdOutlineRectangle },
  { id: 'roundedRectangle', label: 'RoundedRectangle', icon: LuRectangleHorizontal },
  { id: 'circle', label: 'Circle', icon: GoCircle },
  { id: 'diamond', label: 'Diamond', icon: GoDiamond },
  { id: 'triangle', label: 'Triangle', icon: RiTriangleLine },


  { id: 'cross', label: 'Cross', icon: CiMedicalCross },
  { id: 'parallelogram', label: 'parallelogram', icon: PiParallelogram },
  { id: 'cylinder', label: 'cylinder', icon: BiCylinder },
  
];

export default function Shapes({ addShapeToFlow }) {
  const [filter, setFilter] = useState('');
  const [alignment, setAlignment] = useState(null);

  const handleSearchChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const filteredShapes = shapes.filter((shape) =>
    shape.label.toLowerCase().includes(filter)
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for shapes..."
          onChange={handleSearchChange}
          className={styles.searchBar}
        />
        <div className={styles.searchBarButton}>
          <IoSearch />
        </div>
      </div>

      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="Shape selection"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          overflowY: 'scroll'
        }}
      >
        <div style={{ margin: '16px', paddingTop: '8px', width: '100%' }} className="grid grid-cols-5 gap-2">
          {filteredShapes.length > 0 ? (
            filteredShapes.map((shape) => (
              <div
                key={shape.id}
                className={`${styles.shape}`}
                onClick={() => addShapeToFlow(shape.id)}
              >
                {React.createElement(shape.icon, { className: 'w-4 h-4' })}
              </div>
            ))
          ) : (
            <p className={styles.noResult}>No shapes found...😩</p>
          )}
        </div>
      </ToggleButtonGroup>
    </div>
  );
}
