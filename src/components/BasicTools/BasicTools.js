import React, { useState } from 'react';
import styles from "./BasicTools.module.css";
import { PiCardsFill, PiTextTBold, PiVideoFill, PiTextTFill } from "react-icons/pi";
import * as Popover from '@radix-ui/react-popover';
import { FcStart, FcAlarmClock, FcRules, FcLike } from "react-icons/fc";
import Themes from '../Themes/Themes';
import { IoIosClose } from "react-icons/io";
import Stickers from '../CoolStuff/Stickers';
import { RiEmojiStickerFill } from "react-icons/ri";
import { IoIosImage } from "react-icons/io";
import { FaLink, FaClipboardList } from "react-icons/fa";
import { MdTimer, MdImage, MdDashboardCustomize } from "react-icons/md";
import { FaNoteSticky, FaLightbulb } from "react-icons/fa6";
import MoreFeaturesView from '../MoreFeaturesView/MoreFeaturesView';
import { Button, Typography, Spinner, Input } from '@material-tailwind/react';
import { FaImages } from "react-icons/fa6";
import ImageEmbed from '../ImageUpload/ImageEmbed';
import Shapes from '../Shapes/Shapes';
import { FaShapes } from "react-icons/fa6";


export default function BasicTools({ addShapeToFlow, addingNode, themes, changeTheme, addImageFunction }) {
  const [popoverContent, setPopoverContent] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (content) => {
    setPopoverContent(content);
    setOpen(true);
  };
  const onClick = (event, nodeType) => {
    addingNode(nodeType);
  };

  return (
    <div className={`${styles.container} drag`}>
      <div className={styles.innerContainer}>
        <button onClick={(event) => onClick(event, 'taskListNode')}><FaClipboardList /></button>
        <button onClick={(event) => onClick(event, 'stickyNote')}><FaNoteSticky /></button>
        <button onClick={(event) => onClick(event, 'timer')}><MdTimer /></button>
        <button onClick={(event) => onClick(event, 'video')}><PiVideoFill /></button>
        <button onClick={(event) => onClick(event, 'textElement')}><PiTextTFill /></button>
        <button onClick={() => handleClick('embedImages')}><FaImages /></button>
        
        <button onClick={() => handleClick('stickers')}><RiEmojiStickerFill /></button>
        <button onClick={() => handleClick('shapes')}><FaShapes/></button>
        <button onClick={() => handleClick('componentLibrary')}><MdDashboardCustomize /></button>
        <button onClick={() => handleClick('themes')}><FaLightbulb /></button>
      </div>
      
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <div style={{ display: 'none' }}></div>
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content className={styles.PopoverContent} sideOffset={10} align="center" side="left">
            <div>
              {popoverContent === 'stickers' && (
                <div>
                  <Typography variant="h6" className={styles.Text} style={{ marginBottom: 10 }}>Stickers</Typography>
                  <Stickers addImageFunction={addImageFunction} />
                </div>
              )}
              {popoverContent === 'embedImages' && (
                <div>
                  <Typography variant="h6" className={styles.Text} style={{ marginBottom: 10 }}>Embed Images</Typography>
                  <ImageEmbed addImageFunction={addImageFunction}></ImageEmbed>

                  <Typography variant="small" className={styles.Text} style={{ marginBottom: 10 }}>
                    For uploading images use Picture Note under component Library!
                  
                  
                  </Typography>
                </div>
              )}
              {popoverContent === 'componentLibrary' && (
                <div>
                  <Typography variant="h6" className={styles.Text} style={{ marginBottom: 10 }}>Component Library</Typography>
                  <MoreFeaturesView onClickFunc={(type) => addingNode(type)} addImageFunction={addImageFunction} />
                </div>
              )}
              {popoverContent === 'themes' && (
                <div>
                  <Typography variant="h6" className={styles.Text} style={{ marginBottom: 10 }}>Themes</Typography>
                  <Themes themes={themes} changeTheme={changeTheme} />
                </div>
              )}
              {popoverContent === 'shapes' && (
                <div>
                  <Typography variant="h6" className={styles.Text} style={{ marginBottom: 10 }}>Shapes</Typography>
                  <Shapes addShapeToFlow={addShapeToFlow} ></Shapes>
                </div>
              )}
            </div>
            <Popover.Close className={styles.PopoverClose} aria-label="Close">
              <IoIosClose />
            </Popover.Close>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
