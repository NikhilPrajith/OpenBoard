import React from 'react';
import styles from "./BasicTools.module.css";
import { FaListAlt, FaStickyNote } from "react-icons/fa";
import { RiTimer2Fill } from "react-icons/ri";
import { MdVideoLibrary } from "react-icons/md";
import { PiCardsFill, PiTextTBold } from "react-icons/pi";
import * as Popover from '@radix-ui/react-popover';
import { Cross2Icon } from '@radix-ui/react-icons';
import { FcStart,FcAlarmClock,FcRules,FcLike} from "react-icons/fc";
import Themes from '../Themes/Themes';
import { IoIosClose } from "react-icons/io";
import Stickers from '../CoolStuff/Stickers';
import { RiEmojiStickerFill } from "react-icons/ri";
import { BsCardText } from "react-icons/bs";
import { IoIosImage } from "react-icons/io";
import { FaLink } from "react-icons/fa";

export default function BasicTools({ addingNode, themes,changeTheme, addImageFunction }) {
  const onClick = (event, nodeType) => {
    addingNode(nodeType);
  };

  return (
    <div className={`${styles.container} drag`}>
      <div className={styles.innerContainer}>
        <button onClick={(event) => onClick(event, 'taskListNode')}><FcRules /></button>
        <button onClick={(event) => onClick(event, 'stickyNote')}><FaStickyNote /></button>
        <button onClick={(event) => onClick(event, 'timer')}><FcAlarmClock /></button>
        <button onClick={(event) => onClick(event, 'video')}><FcStart /></button>
        <button onClick={(event) => onClick(event, 'textElement')}><PiTextTBold /></button>

        <button onClick={(event) => onClick(event, 'flashCards')}><PiCardsFill/></button>

        <button onClick={(event) => onClick(event, 'picNote')}><IoIosImage/></button>
        
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


        {/* Theme button with Popover */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className={styles.IconButton} aria-label="Update dimensions">
              <FcLike/>
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
