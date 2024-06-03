import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import styles from './CodeEditor.module.css';

import { Handle, Position, NodeResizer } from 'reactflow';

export default function CodeEditor({data, selected}) {
  const [code, setCode] = useState(data.code || `
const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj);

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res);

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed);
    return res ? go(f, res[1], acc.concat([res[0]])) : acc;
  };
  return go(f, seed, []);
};
`);

const [size, setSize] = useState({ width: data.width || '130px', height: data.height|| '100%' });

  // Function to handle resizing
  const handleResize = (newSize) => {
    setSize({width:'100%', height:'100%'});
    data.width = '100%';
    data.height = '100%';
  };
  const handleCodeChange =(value)=>{
    setCode(value);
    data.code = value;
  }

  return (
    <>
    <NodeResizer 
        color="#000" 
        isVisible={selected} 
        onResize={handleResize} 
        keepAspectRatio={false}
      />
    <div className={`styles.codeEditorContainer nowheel`}>
      <div className={styles.titleBar}>
        <div className={styles.buttons}>
          <span className={styles.close}></span>
          <span className={styles.minimize}></span>
          <span className={styles.maximize}></span>
        </div>
      </div>
      <CodeMirror
        value={code}
        style={{color:'#'}}
        options={{
          mode: 'javascript',
          theme: 'material-darker',
          lineNumbers: true,
          tabSize: 2,
        }}
        onBeforeChange={(editor, data, value) => {
          handleCodeChange(value);
        }}
        className={styles.codeMirror}
      />
    </div>

    </>
  );
}
