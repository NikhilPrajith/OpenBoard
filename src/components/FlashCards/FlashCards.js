import React, { useState } from 'react';
import styles from './FlashCard.module.css';

import IconButton from '@mui/material/IconButton';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { MdOutlineDragHandle } from "react-icons/md";
import { MdModeEdit,MdDelete,MdAddCircle } from "react-icons/md";
import { PiShuffleBold } from "react-icons/pi";

const initialCards = [
  { question: "Study Card", answer: "Your answer", color:'rgb(229, 187, 247)'  },
  { question: "Who's the best?", answer: "You are!", color:'rgb(92, 241, 192)' },
  { question: "Random card", answer: "An answer", color:'rgb(255, 205, 205)' }
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

  const selectableColors = ['rgb(254, 240, 113)', 'rgb(92, 241, 192)', 'rgb(255, 205, 205)', 'rgb(229, 187, 247)', 'rgb(163, 211, 249)'
                           ];
  const randomColor = () =>{
    return selectableColors[Math.floor(Math.random() * Object.keys(selectableColors).length)]
  }

  const handleFlipCard = () => {
    if (!isEditing) setIsFlipped(!isFlipped);
  };


  const handleEdit = () => {
    setIsEditing(true);
    setEditedQuestion(cards[currentCardIndex].question);
    setEditedAnswer(cards[currentCardIndex].answer);
  };
  const handleAdd = () => {
    const newCard = {
      question: '',
      answer: '',
      color: randomColor() // Ensure each new card gets a random color
    };
    setCards([...cards, newCard]);
    setCurrentCardIndex(cards.length); // Prepare to add a new card
    setIsEditing(true); // Enter editing mode for the new card
  setEditedQuestion(''); // Reset the edited question and answer fields
  setEditedAnswer('');
  };
  const handleDelete = () => {
    if (cards.length > 1) {
      const updatedCards = cards.filter((_, index) => index !== currentCardIndex);
      setCards(updatedCards);
      setCurrentCardIndex(prev => prev >= updatedCards.length ? updatedCards.length - 1 : prev);
    } else {
      // Reset to initial state if the last card is being deleted
      setCards([{ question: "Study Card", answer: "Your answer", color: randomColor() }]);
      setCurrentCardIndex(0);
    }

    revealAnswer(false);
    setIsEditing(false); // Exit editing mode
  };

  const handleSave = () => {
    const updatedCards = cards.map((card, index) => 
      index === currentCardIndex ? { ...card, question: editedQuestion, answer: editedAnswer, color: card.color } : card);
    setCards(updatedCards);
    setIsEditing(false);

    revealAnswer(false);
    setIsFlipped(false);
  };

  const handleNextCard = () => {
    /*
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
    }*/
    console.log(cards)

    setIsEditing(false);

    revealAnswer(false);
    setIsFlipped(false);

    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);

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
  const behindIndex1 = (currentCardIndex + 1) % cards.length;
  const behindIndex2 = (currentCardIndex + 2) % cards.length;
  const colorBehind1 = cards.length > 1 ? cards[behindIndex1].color : 'white'; // Default to 'transparent' if not enough cards
  const colorBehind2 = cards.length > 2 ? cards[behindIndex2].color : 'transparent'; // Default to 'transparent' if not enough cards

  const shuffleCards = () => {
    let shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]]; // swap elements
    }

    revealAnswer(false);
    setCards(shuffledCards);
    setCurrentCardIndex(Math.floor(Math.random() * shuffledCards.length)); // Show a random card location
    setIsFlipped(false); // Reset any flipped card to show the question side
  };
  return (
    <>    
    <div className={styles.container}>
    <div className={styles.cardBehind} style={{backgroundColor: colorBehind1}}></div>
      {cards.length > 2 && <div className={styles.cardBehind2} style={{backgroundColor: colorBehind2}}></div>}
      
      <div className={styles.cardStack} style={{backgroundColor: `${cards[currentCardIndex].color}` }}>
        {isEditing ? (
          <div className={styles.card} style={{backgroundColor: `${cards[currentCardIndex].color}` }}>
            <input className={styles.editInput} value={editedQuestion} onChange={(e) => setEditedQuestion(e.target.value)} placeholder="Question"/>
            <input className={styles.editInput} value={editedAnswer} onChange={(e) => setEditedAnswer(e.target.value)} placeholder="Answer"/>
            <button className={styles.saveButton} onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div className={`${styles.card}`} style={{backgroundColor: `${cards[currentCardIndex].color}` }}>
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

          <button className={styles.shuffle} onClick={shuffleCards}><PiShuffleBold/></button>
          </div>
        </>
      )}
    </div>
    </>
  );
}
