import React, { useState, useEffect } from "react";
import { TwitterPicker } from "react-color";
import { BiSolidColorFill } from "react-icons/bi";
import * as Popover from '@radix-ui/react-popover';
import styles from "./Callout.module.css";

const selectableColors = [
  "#fef071",
  "#5cf1c0",
  "#ffcdcd",
  "#e5bbf7",
  "#a3d3f9",
];

export default function Callout({ data: propData, selected }) {
  const [title, setTitle] = useState(propData.title || "");
  const [description, setDescription] = useState(propData.description || "");
  const [color, setColor] = useState(propData.color || selectableColors[0]);
  const [emojis, setEmojis] = useState({
    "⬆️": propData.emojis?.["⬆️"] || 0,
    "⬇️": propData.emojis?.["⬇️"] || 0
  });
  const [likedEmojis, setLikedEmojis] = useState(propData.likedEmojis || {});
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    propData.title = title;
    propData.description = description;
    propData.color = color;
    propData.emojis = emojis;
    propData.likedEmojis = likedEmojis;
  }, [title, description, color, emojis, likedEmojis, propData]);

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleEmojiClick = (emoji) => {
    setEmojis((prev) => {
      const newEmojis = { ...prev };
      const newLikedEmojis = { ...likedEmojis };

      if (newLikedEmojis[emoji]) {
        newEmojis[emoji] -= 1;
        delete newLikedEmojis[emoji];
      } else {
        newEmojis[emoji] += 1;
        newLikedEmojis[emoji] = true;
      }

      setLikedEmojis(newLikedEmojis);
      return newEmojis;
    });
  };

  return (
    <div className={`${styles.calloutContainer} nowheel`} style={{ borderColor: color }}>
      {selected && (
        <Popover.Root open={showColorPicker} onOpenChange={setShowColorPicker}>
          <Popover.Trigger asChild>
            <button className={styles.colorPickerButton}>
              <BiSolidColorFill />
            </button>
          </Popover.Trigger>
          <Popover.Content side="right" align="center" sideOffset={5} className={styles.popoverContent}>
            <TwitterPicker
              triangle="top-left"
              color={color}
              onChange={handleColorChange}
              colors={selectableColors}
              styles={{ default: { input: { display: 'none' }, hash: { display: 'none' } } }}
            />
          </Popover.Content>
        </Popover.Root>
      )}
      <input
        className={styles.inputField}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className={styles.descriptionField}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div className={styles.emojiChips}>
          {Object.entries(emojis).map(([emoji, count]) => (
            <div
              key={emoji}
              className={`${styles.emojiChip} ${likedEmojis[emoji] ? styles.liked : ''}`}
              onClick={() => handleEmojiClick(emoji)}
            >
              <span>{emoji}</span>
              {count > 0 && <span>{count}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
