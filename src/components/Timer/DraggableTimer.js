import React, { useState, useEffect, useRef } from 'react';

import { Handle, Position,NodeResizer } from 'reactflow';
import styles from "./DraggableTimer.module.css"
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {AiOutlinePlus,AiOutlineMinus} from "react-icons/ai"
import {GiPauseButton} from "react-icons/gi"
import {FaPlay,FaPause} from "react-icons/fa"
import ToDoTask from '../ToDoTask/ToDoTask';
import { LuTimerReset } from "react-icons/lu";
import { BiReset } from "react-icons/bi";
import {MdOutlineDragHandle} from "react-icons/md";



import confetti from 'canvas-confetti'; 


const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const DraggableTimer = ({isConnectable, data}) => {
    const defaultTime = 5 *60; // Default time is 5 minutes (5 * 60 seconds)
    const [time, setTime] = useState(data?.time || defaultTime);
    const [isRunning, setIsRunning] = useState(false);

  const [title, setTitle] = useState(data?.title || 'Annoying Timer');

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleTimeChange = (delta) => {
        if (!(time+delta <0)){
            setTime(time + delta);
        }
    };

    const handlePlayPause = () => {
        if(time>0){
            setIsRunning(!isRunning);
        }else{
            setIsRunning(false)
        }
    };

    const resetHandle=()=>{
        setIsRunning(false);
        setTime(defaultTime);
    }

    useEffect(() => {
        let timer;

        if (isRunning && time > 0) {
        timer = setInterval(() => {
            if(time == 1){
                setIsRunning(false);
            }
            let originX = 0;
            let originY =0;

            if(timerRef){

            const rect = timerRef.current.getBoundingClientRect();
            // Calculate the center of the timer component
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Convert these to a ratio of the viewport dimensions
            originX = centerX / window.innerWidth;
            originY = centerY / window.innerHeight;
            }
            setTime((prevTime) => {
                if (prevTime === 1) {
                    // Confetti trigger condition
                    confetti({
                        angle: 90,
                        spread: 360,
                        startVelocity: 30,
                        elementCount: 200,
                        dragFriction: 0.12,
                        duration: 3000,
                        stagger: 1,
                        width: "6px",
                        height: "6px",
                        perspective: "500px",
                        colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
                        origin:{x:originX,y:originY}
                    });
                    setIsRunning(false); // Stop the timer
                }
                return prevTime - 1;
            });
        }, 1000);
        } else {
        clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isRunning, time]);

    

  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Update the state with the new value
    data.title = event.target.value;
  };


  const [prevTime, setPrevTime] = useState(null);
  //to avoid updating it frequently
  useEffect(() => {
    if(!prevTime){
        setPrevTime(time);
    }else{
        if(prevTime - time > 3){
            data.time = time;
            setPrevTime(time);
        }
    }
  }, [time])
  
  const timerRef = useRef(null);

    return (
        <>

      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
        <div  ref={timerRef} >

            <div className={`${styles.nodeDrag} dragHandle`}><MdOutlineDragHandle></MdOutlineDragHandle></div>
        <div className={styles.containerParent}>
            <div className={styles.header}>
        {/* Header content, e.g., datetime inputs */}
        <input className={styles.taskHeader} placeholder='Task Title...' value={title} onChange={handleTitleChange}>
              
              </input>
      </div>
            <div style={{margin:'0px !important'}} className={styles.container} elevation={3}>
            
      
                <div className={styles.parent}>
                    <div className={styles.time}>
                        <div
                            className={styles.subtract}
                            onClick={() => handleTimeChange(-60*5)}
                        >
                            <AiOutlineMinus></AiOutlineMinus>
                        </div>
                        {formatTime(time)}
                        <div
                            className={styles.add}
                            onClick={() => handleTimeChange(60*5)}
                        >
                            <AiOutlinePlus></AiOutlinePlus>
                        </div>
                    </div>
                    <div className={styles.controlParent}>
                        
                        <div
                            className={styles.control}
                            onClick={handlePlayPause}
                        >
                            {isRunning ? <FaPause></FaPause> : <FaPlay></FaPlay>}
                        </div>

                            <div onClick={resetHandle} className={styles.reset}><BiReset/></div>
                        
                    </div>
                </div>
            </div>
            </div>
        </div>

      
        <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
        </>
  );
};

export default DraggableTimer;
