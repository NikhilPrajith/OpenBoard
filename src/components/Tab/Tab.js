import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from "./Tab.module.css";
import Stickers from '../CoolStuff/Stickers';


import IconButton from '@mui/material/IconButton';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import { MdExpandMore } from "react-icons/md";
import Themes from '../Themes/Themes';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function CustomTab({alignment, setAlignment, themes, showSideBar, setShowSidebar, changeTheme, addImageFunction}) {
  const [value, setValue] = React.useState("1");
  const [showFreeDrawingCanvas, setShowFreeDrawingCanvas] = React.useState(false);
  

  const handleChange = (newValue) => {
    setValue(newValue);
  };
 

  return (
    <div className={styles.parent}>
      <div className={styles.controlSection}>
      <Accordion defaultExpanded
        
        sx={{
          boxShadow:'none',
          borderBottom:'0.05px rgb(199, 197, 197) solid',
          fontSize :'12px',
          '&.Mui-expanded': {
            margin:'0px'
          }
          /*
          borderRadius: '0px !important',
          '&.MuiAccordion-root:before': { 
            display: 'none', 
          },
          '&:first-of-type': {
            borderRadius: '0px !important',
          }*/
        }}
      >
        <AccordionSummary
        className={styles.accordionSummary}
        sx={{
          minHeight:'20px !important',
        }}
        
          expandIcon={<MdExpandMore/>}
        >
          <div className={styles.accordionTitle}>Wonderful Themes</div>
        </AccordionSummary>
        <Themes alignment={alignment} setAlignment={setAlignment}  themes={themes} changeTheme={changeTheme}></Themes>
      </Accordion>
        <Accordion 
        
          sx={{
            boxShadow:'none',
            borderBottom:'0.05px rgb(199, 197, 197) solid',
            fontSize :'12px',

          '&.Mui-expanded': {
            margin:'0px'
          }
            /*
            borderRadius: '0px !important',
            '&.MuiAccordion-root:before': { 
              display: 'none', 
            },
            '&:first-of-type': {
              borderRadius: '0px !important',
            }*/
          }}
        >
          <AccordionSummary
          className={styles.accordionSummary}
          sx={{
            minHeight:'20px !important',
          }}
          
            expandIcon={<MdExpandMore/>}
          >
            <div className={styles.accordionTitle}>Stickers and Gifs</div>
          </AccordionSummary>
          <Stickers addImageFunction={addImageFunction}></Stickers>
        </Accordion>
        
      </div>

    </div>
  );
}