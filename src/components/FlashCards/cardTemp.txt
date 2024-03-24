import React, { useState } from 'react';
import styles from './FlashCard.module.css';

import IconButton from '@mui/material/IconButton';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { MdOutlineDragHandle } from "react-icons/md";
import { MdModeEdit,MdDelete,MdAddCircle } from "react-icons/md";

const initialCards = [
  { question: "Study Cards", answer: "Your answer" },
  // Add more cards as needed
];

export default function FlashCards() {
  const [cards, setCards] = useState(initialCards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [showAnswer, revealAnswer] = useState(false);

  const handleFlipCard = () => {
    if (!isEditing) setIsFlipped(!isFlipped);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedQuestion(cards[currentCardIndex].question);
    setEditedAnswer(cards[currentCardIndex].answer);
  };
  const handleAdd = () => {
    setEditedQuestion('');
    setEditedAnswer('');
    setCurrentCardIndex(cards.length); // Prepare to add a new card
    setIsEditing(true);
  };
  const handleDelete = () => {
    const updatedCards = cards.filter((_, index) => index !== currentCardIndex);
    setCards(updatedCards);
    // Adjust the currentCardIndex if the last card was deleted
    if (currentCardIndex >= updatedCards.length) {
      setCurrentCardIndex(updatedCards.length - 1);
    }
  };

  const handleSave = () => {
    const updatedCards = [...cards];
    updatedCards[currentCardIndex] = { question: editedQuestion, answer: editedAnswer };
    setCards(updatedCards);
    setIsEditing(false);
    setIsFlipped(false);
  };

  const handleNextCard = () => {
    if (!isEditing && cards.length > 1) {
      const cardElement = document.querySelector(`.${styles.card}`);
      cardElement.classList.add(styles["card-leaving"]);
  
      // Wait for animation to complete before actually changing the card
      setTimeout(() => {
        revealAnswer(false);
        setIsFlipped(false);
        setIsEditing(false);
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
        cardElement.classList.remove(styles["card-leaving"]);
      }, 500); // Matches the animation duration
    }
  };

  const handlePrevCard = () => {
    revealAnswer(false);
    setIsFlipped(false);
    setIsEditing(false);
    setCurrentCardIndex((prevIndex) => prevIndex === 0 ? cards.length - 1 : prevIndex - 1);
  };
  const toggleAnswer=()=>{
    revealAnswer(!showAnswer);
  }

  return (
    <>

<div className={styles.nodeDrag}><MdOutlineDragHandle></MdOutlineDragHandle></div>
    
    <div className={styles.container}>
      
      <div className={styles.cardStack}>
        {isEditing ? (
          <div className={styles.card}>
            <input className={styles.editInput} value={editedQuestion} onChange={(e) => setEditedQuestion(e.target.value)} placeholder="Question"/>
            <input className={styles.editInput} value={editedAnswer} onChange={(e) => setEditedAnswer(e.target.value)} placeholder="Answer"/>
            <button className={styles.saveButton} onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div className={`${styles.card}`}>
            <div className={styles.front}>
              <div>{cards[currentCardIndex].question}</div>
              <div className={styles.cardNumber}>{currentCardIndex + 1}/{cards.length}</div>
              <button className={styles.revealButton} onClick={toggleAnswer}>{showAnswer ? 'Hide Answer' : 'Reveal answer'}</button>
              <div className={styles.answer}>
              {showAnswer ? `Answer: ${cards[currentCardIndex].answer}` : ''}
              </div>
            </div>
          </div>
        )}
      </div>
      {!isEditing && (
        <>
        <IconButton className={styles.prevButton} sx={{color:'black', fontSize:'12px', margin:!open ? 'auto': 'initial'}} onClick={handlePrevCard}>
          <IoIosArrowBack />
        </IconButton>
        <IconButton className={styles.nextButton} sx={{color:'black', fontSize:'12px', margin:!open ? 'auto': 'initial'}} onClick={handleNextCard}>
          <IoIosArrowForward />
        </IconButton>
        <div className={styles.editButton}>
          <button className={styles.edit} onClick={handleEdit}><MdModeEdit/></button>

          <button className={styles.delete} onClick={handleDelete}><MdDelete/></button>

          <button className={styles.add} onClick={handleAdd}><MdAddCircle/></button>
          </div>
        </>
      )}
    </div>
    </>
  );
}
