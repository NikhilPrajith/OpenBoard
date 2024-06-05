import React, {useState, useEffect,Fragment} from 'react';
import styles from "./Information.module.css";
import { useTasks } from '@/context/TaskContext';
import { useBoard } from '@/context/BoardContext';
import useStore from '@/context/BoardContext';

import { Disclosure, Menu, Transition } from '@headlessui/react'


import ToggleButton from '@mui/material/ToggleButton';
import { Avatar } from '@/primitives/Avatar';


import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useAuth from '@/context/Authentication/AuthProvider';
import LoginForm from '../Account/Login/LoginForm';
import SignUpForm from '../Account/SignUp/SignUpForm';

import { IoPersonCircle } from "react-icons/io5";
import { DocumentHeaderName } from './DocumentHeaderName';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useDocument } from '@/context/DocumentContext';

import {Typography, Spinner } from '@material-tailwind/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Placeholder Login component
const Login = ({ onSwitch,closeDialog }) => (
  <>
    <DialogContent>
      <LoginForm onSwitch={onSwitch} closeDialog={closeDialog}></LoginForm>

    </DialogContent>
  </>
);


// Placeholder SignUp component
const SignUp = ({ onSwitch,closeDialog }) => (
  <>
    <DialogContent>
      <SignUpForm onSwitch={onSwitch} closeDialog={closeDialog}></SignUpForm>
    </DialogContent>
  </>
);

export default function Heading({open, type}) {
  const router = useRouter();
  const pathname = usePathname();
  const {isSavedTasks, saveDataToLocalStorageTasks, saveTasksToDb} = useTasks();
  const {
    isSavedBoard, saveDataToLocalStorageBoard, onSave,
    saveBoardState,
    restoreBoardState, renameBoard, documentName, cloneBoardToAccount} = useBoard();
  //const {isSavedBoard,saveFlow} = useStore();

  const {setIsDocSaved, isDocSaved, saveDocumentData,documentId} = useDocument();

  const [selected, setSelected] = React.useState(false);
  /*
  const handleShare=()=>{
    if(selected){
      setSelected(false);
      leaveRoom();
    }else{
      setSelected(true);
      const roomId = "aramondRoomName"
      enterRoom(roomId);
    }
  }*/



  const [openLoginPanel, setOpenPanel] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const switchComponent = () => setShowLogin(!showLogin);

  const handleOpen = () => {setOpenPanel(true)};
  const handleClose = () => {setOpenPanel(false)};
  
  const {user,data,logout} = useAuth();
  useEffect(() => {
  
  }, [user])
  


  const saveFunction =()=>{
    if(user){
      console.log("db save")
      saveBoardState()
    }else{
      console.log("local save")
      onSave();
    }
  }


  const shouldShowHeaderName = [ '/canvas'].includes(pathname);

  const showSave = [ '/canvas'].includes(pathname);

  const showLocalSave = [ '/'].includes(pathname);

  const showDocSave = [ '/documents'].includes(pathname);

  const showTaskSave = [ '/tasks'].includes(pathname);

  const previewingTemplate = ['/templates/canvas'].includes(pathname);
  const handleLocalClone = async() =>{
    await onSave();
    router.push("/")
    
  }
  const handleCloneToAccount =async ()=>{
    const id = await cloneBoardToAccount();
    router.push(`/canvas?documentId=${id}`);
  }

  //collaboration:
  return (
    <div className={styles.headingContainer}>
        <div className={styles.titleCont} style={{ marginLeft: open ? '120px' : '0px', transition: 'margin-left 0.1s ease' }}>
          <Typography variant="h5"><a href="/">Vibing</a></Typography>
          <div className={styles.subtitle}>A fun time project</div>
        </div>

        <div>
         {shouldShowHeaderName && <DocumentHeaderName></DocumentHeaderName> }
         {previewingTemplate && <div className={styles.parent}>Previewing: <span style={{color:'color(srgb 0.8975 0.7331 0.9688)'}}>{documentName}</span></div>}
        </div>
        <div className={styles.infoCont}>

        {user && showSave && <>
          <div className={styles.isSavedText}>{isSavedBoard ? <span className={styles.saved}>Data Persisted</span> : 
                <span className={styles.unsaved}>Unsaved changes!</span>}
              <div className={styles.autoSave}>Auto save unavailable</div>
          </div>
          {!isSavedBoard  && <div className={styles.saveNowButton} onClick={saveFunction}>Save Now</div>}
          <div style={{width:'0.1px', border:'0.1px #eee solid', height:'17px'}}></div>
          </>}
        
          {showLocalSave && <>
          <div className={styles.isSavedText}>{isSavedBoard ? <span className={styles.saved}>Data Persisted</span> : 
                <span className={styles.unsaved}>Unsaved changes!</span>}
              <div className={styles.autoSave}>Auto save unavailable</div>
          </div>
          {!isSavedBoard  && <div className={styles.saveNowButton} onClick={onSave}>Save Locally!</div>}
          <div style={{width:'0.1px', border:'0.1px #eee solid', height:'17px'}}></div>
          </>}
          {/*Saving for tasks*/}
          { showTaskSave && <>
          <div className={styles.isSavedText}>{isSavedTasks ? <span className={styles.saved}>Data Persisted</span> : 
                <span className={styles.unsaved}>Unsaved changes!</span>}
              <div className={styles.autoSave}>Auto save unavailable</div>
          </div>
          {!isSavedTasks  && <div>
            {user ? <div className={styles.saveNowButton} onClick={saveTasksToDb}>Save Now!</div> :
            <div className={styles.saveNowButton} onClick={saveDataToLocalStorageTasks}>Save Locally!</div>
          }</div>}
          <div style={{width:'0.1px', border:'0.1px #eee solid', height:'17px'}}></div>
          </> }


          {/*Need document ID otherwise saving is not possible */}
          {showDocSave && user &&  documentId &&<>
          <div className={styles.isSavedText}>{isDocSaved ? <span className={styles.saved}>Doc Data Persisted!</span> : 
                <span className={styles.unsaved}>Unsaved changes!</span>}
              <div className={styles.autoSave}>Auto save unavailable</div>
          </div>
          {!isDocSaved  && <div className={styles.saveNowButton} onClick={saveDocumentData}>Save Now!</div>}
          <div style={{width:'0.1px', border:'0.1px #eee solid', height:'17px'}}></div>
          </>}
          {previewingTemplate &&<>
          <div className={styles.saveNowButton} onClick={handleLocalClone} style={{backgroundColor:'color(srgb 0.8975 0.7331 0.9688)'}}>Clone Locally!</div>
          {user && <div className={styles.saveNowButton} onClick={handleCloneToAccount} style={{backgroundColor:'color(srgb 0.8975 0.7331 0.9688)'}}>Clone to Account!</div>}
          </>}

          <a target="_blank" rel="noopener noreferrer" className={styles.feedbackButton} href="https://forms.gle/YKWZ8iL1w6fHmp1RA">
            Feedback
          </a>

          {!user && handleClose && <button onClick={handleOpen} className={styles.feedbackButton}>
                    Login
            </button>}


            {user &&
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
                  <Avatar
                className={styles.profileAvatar}
                name={user.displayName}
                size={29}
                src={`https://liveblocks.io/avatars/avatar-2.png`}
              />

                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="dashboard"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sx text-black')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sx text-black')}
                            onClick={()=>{logout()}}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>}
          <Dialog open={openLoginPanel} onClose={handleClose}>
          {showLogin ? (
            <Login onSwitch={switchComponent} closeDialog={handleClose} />

          ) : (
            <SignUp onSwitch={switchComponent} closeDialog={handleClose}/>
          )}


          
        </Dialog>
        </div>
    </div>
  );
}
