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

export default function BoardHeader({open, type}) {
  const {isSaved, saveDataToLocalStorage} = useTasks();
  const {
    isSavedBoard, saveDataToLocalStorageBoard, onSave,
    saveBoardState,
    restoreBoardState} = useBoard();
  //const {isSavedBoard,saveFlow} = useStore();

  const [selected, setSelected] = React.useState(false);
  const handleShare=()=>{
    if(selected){
      setSelected(false);
      leaveRoom();
    }else{
      setSelected(true);
      const roomId = "aramondRoomName"
      enterRoom(roomId);
    }
  }



  const [openLoginPanel, setOpenPanel] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const switchComponent = () => setShowLogin(!showLogin);

  const handleOpen = () => {setOpenPanel(true)};
  const handleClose = () => {setOpenPanel(false)};
  
  const {user,data,logout} = useAuth();
  useEffect(() => {
    console.log("user", user)
  
  }, [user])
  


  const saveFunction =()=>{
    if(user){
      console.log("firestore save")
      saveBoardState()
    }else{
      console.log("local save")
      onSave();
    }
  }

  const onDocumentRename =(name) =>{
    console.log("new name", name);
  }


  //collaboration:
  return (
    <div className={styles.headingContainer}>
        <div className={styles.titleCont} style={{ marginLeft: open ? '120px' : '0px', transition: 'margin-left 0.1s ease' }}>
          <div className={styles.title}>Vibing</div>
          <div className={styles.subtitle}>A fun time project</div>
        </div>
        <div>
          <DocumentHeaderName onDocumentRename={onDocumentRename}></DocumentHeaderName>
        </div>
        <div className={styles.infoCont}>

        {user && <>
          <div className={styles.isSavedText}>{isSavedBoard ? <span className={styles.saved}>Data Persisted</span> : 
                <span className={styles.unsaved}>Unsaved changes!</span>}
              <div className={styles.autoSave}>Auto saves every 10 seconds</div>
          </div>
          {!isSavedBoard  && <div className={styles.saveNowButton} onClick={saveFunction}>Save Now</div>}
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
                size={32}
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
