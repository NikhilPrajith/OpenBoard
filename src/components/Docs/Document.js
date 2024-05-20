'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import "./Documents.css";
import { TwitterPicker } from 'react-color';
import { useDocument } from '@/context/DocumentContext';

export default function DocumentComp({ documentID }) {
  const {
    title, setTitle, setIsDocSaved, setDocumentData, documentData,
    setTitleChanged, titleChanged, setDocumentId, loading, setLoading,
    restoreDocumentData, initialContent, setInitialContent
  } = useDocument();
  const [color, setColor] = useState('#F9F9F9');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setIsDocSaved(false);
    setTitleChanged(true);
  };

  const handleColorClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    setShowColorPicker(false); // Close color picker after selection
  };

  const saveToInstance = async (blocks) => {
    console.log("Save to instance");
    setIsDocSaved(false);
    setDocumentData(JSON.stringify(blocks));
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : [],
    domAttributes: { TextCursorPosition: { class: 'cursor' } }
  });

  useEffect(() => {
    if (documentID) {
      console.log("has id and call restore");
      restoreDocumentData(documentID);
      console.log("documentID exists", documentID);
      setDocumentId(documentID);
    } else {
      setInitialContent(JSON.stringify([])); // Set to empty if no document ID
      setLoading(false);
    }
  }, [documentID, restoreDocumentData, setDocumentId, setInitialContent, setLoading]);

  const customColors = ['#fff', '#F9F9F9', '#F9EAEA', '#EAF3F9', '#F7FFF4', '#FFF9F4',
    '#FFF4FE', '#F7CDF4', '#ECECEC'];

  return (
    <div style={{ backgroundColor: `${color}` }} className='documentContainer'>
      {/* Color Picker */}
      {showColorPicker && (
        <div className="color-picker">
          <TwitterPicker
            triangle="top-left"
            color={color}
            onChange={handleColorChange}
            colors={customColors}
            styles={{ default: { input: { display: 'none' }, hash: { display: 'none' } } }}
          />
        </div>
      )}

      {/* BlockNoteView */}
      {editor && (
        <BlockNoteView
          theme="light"
          data-theming-css-demo
          editor={editor}
          autoFocus={true}
          onChange={() => {
            saveToInstance(editor.document);
          }}
        >
          {/* Circle showing current color */}
          <div className="color-circle" style={{ backgroundColor: `${color}` }} onClick={handleColorClick}></div>
          <input
            onChange={handleTitleChange}
            className='heading1'
            value={title}
            placeholder="Document title..."
            style={{ fontStyle: 'normal' }}
          />
        </BlockNoteView>
      )}
    </div>
  );
}
