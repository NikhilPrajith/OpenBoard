import React from 'react';
import styles from "./BasicTools.module.css";
import { PiCardsFill, PiTextTBold,PiVideoFill,PiTextTFill } from "react-icons/pi";
import * as Popover from '@radix-ui/react-popover';
import { FcStart,FcAlarmClock,FcRules,FcLike} from "react-icons/fc";
import Themes from '../Themes/Themes';
import { IoIosClose } from "react-icons/io";
import Stickers from '../CoolStuff/Stickers';
import { RiEmojiStickerFill } from "react-icons/ri";
import { IoIosImage } from "react-icons/io";
import { FaLink, FaClipboardList } from "react-icons/fa";
import { MdTimer, MdImage, MdDashboardCustomize } from "react-icons/md";
import { FaNoteSticky, FaLightbulb } from "react-icons/fa6";

export default function BasicTools({ addingNode, themes,changeTheme, addImageFunction }) {
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
        
        {/*<button onClick={(event) => onClick(event, 'linkPreview')}><FaLink/></button>*/}

        
        {/*Sticker button popover*/}
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className={styles.IconButton} aria-label="Update dimensions">
              <RiEmojiStickerFill/>
            </button>
          </Popover.Trigger>
          <Popover.Portal className={styles.PopoverPortal}>
            <Popover.Content className={styles.PopoverContent} sideOffset={0} align="start" side="top">
              <div>
                <p className={styles.Text} style={{ marginBottom: 10 }}>
                 Stcikers
                </p>
                <Stickers addImageFunction={addImageFunction}></Stickers>
              </div>
              <Popover.Close className={styles.PopoverClose} aria-label="Close">
                <IoIosClose />
              </Popover.Close>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* for addittional features */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className={styles.IconButton} aria-label="Update dimensions">
              <MdDashboardCustomize/>
            </button>
          </Popover.Trigger>
          <Popover.Portal className={styles.PopoverPortal}>
            <Popover.Content className={styles.PopoverContent} sideOffset={0} align="start" side="top">
              <div>
                
              </div>
              <Popover.Close className={styles.PopoverClose} aria-label="Close">
                <IoIosClose />
              </Popover.Close>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* Theme button with Popover */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className={styles.IconButton} aria-label="Update dimensions">
              <FaLightbulb/>
            </button>
          </Popover.Trigger>
          <Popover.Portal className={styles.PopoverPortal}>
            <Popover.Content className={styles.PopoverContent} sideOffset={0} align="start" side="top">
              <div>
                <p className={styles.Text} style={{ marginBottom: 10 }}>
                 Themes
                </p>
                <Themes themes={themes} changeTheme={changeTheme}></Themes>
              </div>
              <Popover.Close className={styles.PopoverClose} aria-label="Close">
                <IoIosClose />
              </Popover.Close>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        
      </div>
    </div>
  );
}
