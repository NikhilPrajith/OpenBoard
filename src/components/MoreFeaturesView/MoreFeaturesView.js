import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { IoSearch } from "react-icons/io5";
import { useBoard } from "@/context/BoardContext";
import useStore from "@/context/BoardContext";
import styles from "./MoreFeaturesView.module.css";
import { PiCardsThreeFill } from "react-icons/pi";
import { TbCardsFilled } from "react-icons/tb";
import * as Popover from "@radix-ui/react-popover";

import { IoIosClose } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiHub from "../ZPackage/EmojiHub/emojiHub";
import { BsCloudsFill } from "react-icons/bs";
import { FaFileCode } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";
import { MdTimer, MdImage, MdDashboardCustomize } from "react-icons/md";
import {
  Button,
} from "@material-tailwind/react";


export default function MoreFeaturesView({ onClickFunc, addImageFunction }) {
  const [filter, setFilter] = useState("");
  const { alignment, setAlignment } = useBoard();
  //const {alignment, setAlignment} = useStore();

  const handleAlignment = (event, newAlignment) => {
    console.log("changed alignment?");
    setAlignment(newAlignment);
    changeTheme(newAlignment);
  };

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const features = [
    {
      label: "Flash Cards",
      value: "flashCards",
      openWindow: false,
      icon: TbCardsFilled,
      disabled : false
    },
    {
      label: "EmojiHub",
      value: "emojiHub",
      openWindow: true,
      icon: MdEmojiEmotions,
      disabled: false
    },
    {
      label: "Weather",
      value: "weather",
      openWindow: false,
      icon: BsCloudsFill,
      disabled:false
    },
    {
      label: "Terminal",
      value: "codePresentation",
      openWindow: false,
      icon: FaFileCode,
      disabled:false
    },
    {
      label: "Picture Note",
      value: "picNote",
      openWindow: false,
      icon: MdImage,
      disabled:false
    },
    {
      label: "Document",
      value: "documentComp",
      openWindow: false,
      icon: IoMdDocument,
      disabled:true
    },
    {
      label: "Mermaid Diagram",
      value: "mermaidDiagram",
      openWindow: false,
      icon: MdImage,
      disabled:true
    },
  ];

  const filteredFeatures = features.filter((feature) =>
    feature.label.toLowerCase().includes(filter)
  );

  const [popoverContent, setPopoverContent] = useState(null);
  const [open, setOpen] = useState(false);
  const openWindowFunc = (type) => {
    setOpen(true);
    setPopoverContent(type);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            className={styles.searchBar}
          />
          <div className={styles.searchBarButton}>
            <IoSearch />
          </div>
        </div>
        <div
          style={{ margin: "16px", paddingTop: "8px", width: "" }}
          className="grid grid-cols-2 gap-4"
        >
          {filteredFeatures.length > 0 ? (
            filteredFeatures.map(({ label, value, openWindow, icon, disabled }) => (
              <>
                {openWindow ? (
                  <Button
                    key={label}
                    className={`flex items-center gap-2 ${styles.buttonObj}`}
                    onClick={() => openWindowFunc(value)}
                    disabled={disabled}
                    variant="outlined"
                    size="sm"
                  >
                    {React.createElement(icon, { className: "w-4 h-4" })}
                    {label}
                  </Button>
                ) : (
                  <Button
                    key={label}
                    className={`flex items-center gap-2 ${styles.buttonObj}`}
                    onClick={(event) => onClickFunc(value)}
                    disabled={disabled}
                    variant="outlined"
                    size="sm"
                  >
                    {React.createElement(icon, { className: "w-4 h-4" })}
                    {label}
                  </Button>
                )}
              </>
            ))
          ) : (
            <p className={styles.noResult}>No results found...😩</p>
          )}
        </div>
      </div>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <div style={{ display: "none" }}></div>
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content
            className={styles.PopoverContent}
            sideOffset={0}
            align="center"
            side="left"
          >
            <div>
              {popoverContent === "emojiHub" && (
                <div>
                  <p className={styles.Text} style={{ marginBottom: 10 }}>
                    {popoverContent}
                  </p>
                  <EmojiHub addImageFunction={addImageFunction}/>
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
