import React, { useEffect } from 'react';
import confetti from 'canvas-confetti'; // Import the confetti library

const SnowEffect = () => {
  useEffect(() => {
    // Snow animation configuration
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    let skew = 1;

    // Function to generate random number within a range
    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    // Function to create a frame of snowfall animation
    const snowFrame = () => {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      // Generate a snow particle
      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          y: (Math.random() * skew) - 0.2,
        },
        colors: ['#ffffff'],
        shapes: ['circle'],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4)
      });

      // Schedule the next frame if there's still time left
      if (timeLeft > 0) {
        requestAnimationFrame(snowFrame);
      }
    };

    // Start the snow animation
    snowFrame();
  }, []); // Run this effect only once when the component mounts

  return <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>; // The component doesn't render anything visible
};

export default SnowEffect;
