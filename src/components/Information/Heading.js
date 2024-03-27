import React from 'react';
import styles from "./Information.module.css";
import { useTasks } from '@/context/TaskContext';

export default function Heading({open}) {
  const {isSaved, saveDataToLocalStorage} = useTasks();
  return (
    <div className={styles.headingContainer}>
        <div className={styles.titleCont} style={{ marginLeft: open ? '120px' : '0px', transition: 'margin-left 0.1s ease' }}>
          <div className={styles.title}>Vibing</div>
          <div className={styles.subtitle}>A fun time project</div>
        </div>
        <div className={styles.infoCont}>
          <div className={styles.isSavedText}>{isSaved ? <span className={styles.saved}>Data Persisted</span> : 
                <span className={styles.unsaved}>Unsaved changes!</span>}
              <div className={styles.autoSave}>Auto saves every 5 seconds</div>
          </div>
          {!isSaved  && <div className={styles.saveNowButton} onClick={saveDataToLocalStorage}>Save Now</div>}
          <a target="_blank" rel="noopener noreferrer" className={styles.feedbackButton} href="https://forms.gle/YKWZ8iL1w6fHmp1RA">
            Feedback
          </a>
        </div>
    </div>
  );
}
