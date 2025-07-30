"use client";

import React, { useState, useRef, useEffect } from 'react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle initial play when component mounts
  useEffect(() => {
    if (audioRef.current) {
      // Try to play immediately (might be blocked by browser)
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay prevented, waiting for user interaction');
          // Set isPlaying to false if autoplay is blocked
          setIsPlaying(false);
        });
      }
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div>
      <button 
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px 15px',
          borderRadius: '20px',
          border: 'none',
          backgroundColor: '#5caff3',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
      >
        {isPlaying ? '🔊 Music On' : '🔇 Music Off'}
      </button>
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="/audio/allmine.mp3" type="audio/mpeg"/>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BackgroundMusic;
