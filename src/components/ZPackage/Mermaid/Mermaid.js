import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Button, Textarea } from '@material-tailwind/react';
import { NodeResizer } from '@reactflow/node-resizer'; // Adjust the import based on your setup
import '@reactflow/node-resizer/dist/style.css'; // Ensure the resizer styles are imported
import styles from './Mermaid.module.css'; // Assuming you have some custom styles

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
});

export default function MermaidNode({ data, selected }) {
  const [isEditing, setIsEditing] = useState(false);
  const [mermaidCode, setMermaidCode] = useState('graph TD;\nA-->B;\nA-->C;\nB-->D;\nC-->D;');
  const diagramRef = useRef(null);

  useEffect(() => {
    if (!isEditing) {
      // Ensuring mermaid content is loaded
      mermaid.contentLoaded();
    }
  }, [isEditing, mermaidCode]);

  return (
    <div className="relative p-4 bg-white shadow-lg rounded-md w-full h-full nowheel">
      {selected && isEditing ? (
        <div>
          <Textarea
            label="Mermaid Code"
            value={mermaidCode}
            onChange={(e) => setMermaidCode(e.target.value)}
            rows={4}
            className="mb-4"
          />
          <Button color="blue" onClick={() => setIsEditing(false)}>
            Create Diagram
          </Button>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div ref={diagramRef} className={`mermaid ${styles.diagram}`}>
            {mermaidCode}
          </div>
          {selected && (
            <Button color="blue" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      )}
      <NodeResizer color="#000" isVisible={selected} />
    </div>
  );
}
