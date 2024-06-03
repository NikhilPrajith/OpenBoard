import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import styles from "./CodeEditor.module.css";
import { Handle, Position, NodeResizer } from "reactflow";
import { useBoard } from "@/context/BoardContext";

export default function CodeEditor({ data, selected }) {
  const [code, setCode] = useState(
    data.code ||
      `
const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res);

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed);
    return res ? go(f, res[1], acc.concat([res[0]])) : acc;
  };
  return go(f, seed, []);
};
`
  );

  const [size, setSize] = useState({
    width: data.width || "130px",
    height: data.height || "100%",
  });
  const { setIsSavedBoard } = useBoard();
  // Function to handle resizing
  const handleResize = (newSize) => {
    setSize({ width: "100%", height: "100%" });
    data.width = "100%";
    data.height = "100%";
  };

  const handleCodeChange = (value) => {
    console.log("handling code change", value)
    setCode(value);
    data.code = value;
    setIsSavedBoard(false);
  };

  return (
    <>
      <NodeResizer
        color="#000"
        isVisible={selected}
        onResize={handleResize}
        keepAspectRatio={false}
      />
      <div className={`${styles.codeEditorContainer} nowheel`}>
        <div className={styles.titleBar}>
          <div className={styles.buttons}>
            <span className={styles.close}></span>
            <span className={styles.minimize}></span>
            <span className={styles.maximize}></span>
          </div>
        </div>
        <CodeMirror
          value={code}
          options={{
            mode: "javascript",
            theme: "material-darker",
            lineNumbers: true,
            tabSize: 2,
          }}
          onChange={(editor, metadata, value) => {
            // final value, no need to setState here
            console.log("is the value set?", editor);
            handleCodeChange(editor);
          }}
          className={styles.codeMirror}
        />
      </div>
    </>
  );
}
