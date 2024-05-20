import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth,db } from '@/firebase/firebase.config';
import useAuth from './Authentication/AuthProvider';

import { collection,addDoc,setDoc,doc, userDocRef, arrayUnion,updateDoc, getDoc,deleteDoc } from "@firebase/firestore";

// Create context
const DocumentContext = createContext();

// Provide the context
export const DocumentProvider = ({ children }) => {
  const [documentData, setDocumentData] = useState("");
  const [initialContent, setInitialContent] = useState("")
  const [documentId, setDocumentId] = useState(null);
  const [title, setTitle] = useState('');
  const [titleChanged, setTitleChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDocSaved, setIsDocSaved] = useState(true);
  const {user, data} =  useAuth();

  // Function to update document title
  //All functions assume the user is signed in!
  async function renameDocument(newName){
    if (!user) {
      return; // Ensure user is logged in before trying to save data
    }

    // Get the current data
    const userData = data;

    // Find the board within the boards array
    const docIndex = userData.docs.findIndex(doc => doc.id === documentId);
    
    // If the board is found
    if (docIndex !== -1) {
      // Update the board's name
      userData.docs[docIndex].name = newName;

      // Update the document with the new boards array
      await setDoc(doc(db, 'users', user.uid), { docs: userData.docs }, { merge: true });
      setTitleChanged(false);
      return "Success";
    } else {
      return "Error";
    }
  }

  // Function to load document data
  /*
  useEffect(() => {
    const docId = 'some_doc_id'; // This should come dynamically as per your application needs
    const unsubscribe = loadDocument(docId);

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);*/

  const saveDocumentData = async () =>{
    console.log("titleInSave", title);
    console.log("data", documentData);
    if(titleChanged){
      renameDocument(title);
    }
    const docState = {
      data: documentData,
      title: title,
      updatedAt: new Date(), // Store last updated time
    };
    try {
      // Use the modular SDK's methods to handle document references and set data
      const boardDocRef = doc(db, 'users', user.uid, 'documents', documentId); // flowKey should be passed correctly or defined
      await setDoc(boardDocRef, docState, { merge: true }); // Merge true to update only provided fields
  
      setIsDocSaved(true); // Update state to indicate the board is saved
  
    } catch (error) {
      notification.error({
        message: 'Failed to save!',
        description: 'Please try again.',
        icon: <AiOutlineExclamationCircle style={{ color: '#ff4d4f' }} />,
      });
    }

  }
  const restoreDocumentData = async (id) =>{
    
    console.log("restoring data");
    if(!user || !id){
      setLoading(false);
      return;
    }

    try {
      // Reference to the specific board document
      const boardDocRef = doc(db, 'users', user.uid, 'documents', id);
      const docSnap = await getDoc(boardDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.data) {
          setDocumentData(data.data)
          setInitialContent(data.data);
        }else{
          setDocumentData("");
          setInitialContent("");
        }
        if(data.title){
          setTitle(data.title);
        }
        setIsDocSaved(true);
      } else {
        setIsDocSaved(true);
      }
      setLoading(false);
    } catch (error) {
      notification.error({
        message: 'Failed to load!',
        description: `Please try again.`,
        icon: <AiOutlineExclamationCircle style={{ color: '#ff4d4f' }} />,
      });
    }
  }


  return (
    <DocumentContext.Provider value={{ documentData,setDocumentData,
      setInitialContent, initialContent,
      setDocumentId, documentId,
      renameDocument, loading, setIsDocSaved, isDocSaved, 
      title, setTitle,setTitleChanged, titleChanged,
      saveDocumentData,
      restoreDocumentData,
      setLoading,
    }}>
      {children}
    </DocumentContext.Provider>
  );
};

// Hook to use the context
export const useDocument = () => useContext(DocumentContext);

