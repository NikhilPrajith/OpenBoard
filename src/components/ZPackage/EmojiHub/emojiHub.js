import React, { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { IoSearch } from "react-icons/io5";

const EmojiHub = ({ addImageFunction }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelect = (emoji) => {
    console.log("ddasdds");
    console.log("selectedEmoji", emoji);
    addImageFunction(emoji.native, 'Emoji');
  };

  return (
    <div className={styles.container}>

      <div className={styles.lookingFor}></div>
      <Picker
        title='Pick your emoji…'
        emoji='point_up'
        data={data}
        onEmojiSelect={handleSelect}
        search={searchQuery}
        style={{ width: '100%' }}
        theme='light'
        include={['people', 'nature', 'foods', 'activity', 'places', 'objects', 'symbols', 'flags']}
      />
    </div>
  );
};

export default EmojiHub;
