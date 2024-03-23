// CustomSlashMenu.js
import React from 'react';

function CustomSlashMenu({ items, selectedIndex, onItemClick }) {
  return (
    <div className={"slash-menu"}>
      {items.map((item, index) => (
        <div
          key={index} // Using index as a key; consider using a unique id if available
          className={`slash-menu-item${selectedIndex === index ? " selected" : ""}`}
          onClick={() => onItemClick(item)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default CustomSlashMenu;
