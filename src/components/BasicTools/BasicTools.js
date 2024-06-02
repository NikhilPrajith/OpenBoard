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

export default function BasicTools({ addingNode, themes, changeTheme, addImageFunction }) {
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
        <button onClick={(event) => onClick(event, 'picNote')}><MdImage/></button>
        <button onClick={() => handleClick('stickers')}><RiEmojiStickerFill /></button>
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
                  <p className={styles.Text} style={{ marginBottom: 10 }}>Stickers</p>
                  <Stickers addImageFunction={addImageFunction} />
                </div>
              )}
              {popoverContent === 'componentLibrary' && (
                <div>
                  <p className={styles.Text} style={{ marginBottom: 10 }}>Component Library</p>
                  <MoreFeaturesView onClickFunc={(type) => addingNode(type)} addImageFunction={addImageFunction} />
                </div>
              )}
              {popoverContent === 'themes' && (
                <div>
                  <p className={styles.Text} style={{ marginBottom: 10 }}>Themes</p>
                  <Themes themes={themes} changeTheme={changeTheme} />
                </div>
              )}
            </div>
            <Popover.Close className={styles.PopoverClose} aria-label="Close">
              <IoIosClose />
            </Popover.Close>
            <Popover.Arrow className="PopoverArrow" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
