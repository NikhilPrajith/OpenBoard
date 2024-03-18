import React from 'react';
import styles from "./Information.module.css";

export default function Heading({open}) {
  return (
    <div className={styles.headingContainer}>
        <div className={styles.titleCont} style={{ marginLeft: open ? '120px' : '0px', transition: 'margin-left 0.1s ease' }}>
          <div className={styles.title}>Partner</div>
          <div className={styles.subtitle}>A fun time project</div>
        </div>
    </div>
  );
}
