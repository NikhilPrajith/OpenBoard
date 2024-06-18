// SoundBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { FaPlay, FaPause } from "react-icons/fa";

const sounds = [
  { label: "Rain", src: "/sounds/lightRain.mp3", icon: "🌧️" },
  { label: "Coffee Shop", src: "/sounds/coffee-shop.mp3", icon: "☕" },
  { label: "Waves", src: "/sounds/waves.mp3", icon: "🌊" },
];

const SoundBar = ({ globalAudioRef }) => {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = (src) => {
    if (audio && audio.src.endsWith(src)) {
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
      setPlaying(!playing);
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(src);
      newAudio.addEventListener("ended", handleAudioEnd);
      setAudio(newAudio);
      newAudio.play();
      setPlaying(true);
      globalAudioRef.current = newAudio;
    }
  };

  const handleAudioEnd = () => {
    setPlaying(false);
  };

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", handleAudioEnd);
      audio.loop = true; // Loop the audio to ensure it plays for at least 6 minutes
    }
    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleAudioEnd);
      }
    };
  }, [audio]);

  useEffect(() => {
    if (globalAudioRef.current && globalAudioRef.current !== audio) {
      if (audio) {
        audio.pause();
        setPlaying(false);
      }
    }
  }, [globalAudioRef.current]);

  return (
    <Card className="max-w-sm mx-auto mt-6" style={{ borderRadius: "6px" }}>
      <CardBody>
        <Typography variant="h6" className="mb-4">
          Lofi Sound Bar
        </Typography>
        <div>
          {sounds.map((sound) => (
            <div key={sound.label} className="flex items-center mb-2">
              <span className="mr-2">{sound.icon}</span>
              <Button
                className="flex-grow flex items-center justify-between"
                onClick={() => togglePlay(sound.src)}
              >
                {playing && audio && audio.src.endsWith(sound.src) ? (
                  <FaPause />
                ) : (
                  <FaPlay />
                )}
                <span className="ml-2">{sound.label}</span>
              </Button>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default SoundBar;
