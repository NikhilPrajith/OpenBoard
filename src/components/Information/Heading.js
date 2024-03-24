import React from 'react';
import styles from "./Information.module.css";

export default function Heading({open}) {
  return (
    <div className={styles.headingContainer}>
        <div className={styles.titleCont} style={{ marginLeft: open ? '120px' : '0px', transition: 'margin-left 0.1s ease' }}>
          <div className={styles.title}>Vibing</div>
          <div className={styles.subtitle}>A fun time project</div>
        </div>
        <div>
          <a target="_blank" rel="noopener noreferrer" className={styles.feedbackButton} href="https://forms.gle/YKWZ8iL1w6fHmp1RA">
            Feedback
          </a>
        </div>
    </div>
  );
}
