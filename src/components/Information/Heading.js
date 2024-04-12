import React from 'react';
import styles from "./Information.module.css";
import { useTasks } from '@/context/TaskContext';
import { useBoard } from '@/context/BoardContext';
import useStore from '@/context/BoardContext';

import ToggleButton from '@mui/material/ToggleButton';

export default function Heading({open, type}) {
  const {isSaved, saveDataToLocalStorage} = useTasks();
  const {isSavedBoard, saveDataToLocalStorageBoard, onSave} = useBoard();
  //const {isSavedBoard,saveFlow} = useStore();

  const [selected, setSelected] = React.useState(false);

  //collaboration:
  return (
    <div className={styles.headingContainer}>
        <div className={styles.titleCont} style={{ marginLeft: open ? '120px' : '0px', transition: 'margin-left 0.1s ease' }}>
          <div className={styles.title}>Vibing</div>
          <div className={styles.subtitle}>A fun time project</div>
        </div>
        <div className={styles.infoCont}>

        <ToggleButton
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}
        >
          Share
        </ToggleButton>
        {type != 'Endless Board' && <>
          <div className={styles.isSavedText}>{isSaved ? <span className={styles.saved}>Data Persisted</span> : 
                <span className={styles.unsaved}>Unsaved changes!</span>}
              <div className={styles.autoSave}>Auto saves every 10 seconds</div>
          </div>
          {!isSaved  && <div className={styles.saveNowButton} onClick={saveDataToLocalStorage}>Save Now</div>}
          </>}
          {type == 'Endless Board' && <>
          <div className={styles.isSavedText}>{isSavedBoard ? <span className={styles.saved}>Board Persisted</span> : 
                <span className={styles.unsaved}>Unsaved baord changes!</span>}
              <div className={styles.autoSave}>Auto save not available</div>
          </div>
          {!isSavedBoard && <div className={styles.saveNowButton} onClick={onSave}>Save Now</div>}
          </>}
          <a target="_blank" rel="noopener noreferrer" className={styles.feedbackButton} href="https://forms.gle/YKWZ8iL1w6fHmp1RA">
            Feedback
          </a>
        </div>
    </div>
  );
}
