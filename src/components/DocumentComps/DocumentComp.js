import React from 'react';
import styles from "./DocumentComp.module.css";
import MainDocument from './MainDocument';

export default function DocumentComp({close}) {
  return (
    <div>
        <button className={styles.closeButton} onClick={close}>Close</button>
        <MainDocument></MainDocument>
      
    </div>
  )
}
