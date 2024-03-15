import React from 'react';
import styles from "./Information.module.css";

export default function Heading() {
  return (
    <div className={styles.headingContainer}>
        <div className={styles.title}>Partner</div>
        <div className={styles.subtitle}>A fun time project</div>
    </div>
  );
}
