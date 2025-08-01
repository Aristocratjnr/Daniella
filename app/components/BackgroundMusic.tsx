"use client";

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

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
      <MusicButton onClick={toggleMusic} $isPlaying={isPlaying}>
        {isPlaying ? '🔊 Music On' : '🔇 Music Off'}
      </MusicButton>
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

const MusicButton = styled.button<{ $isPlaying: boolean }>`
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 1000;
  padding: 12px 20px;
  border-radius: 30px;
  background: ${({ $isPlaying }) => 
    $isPlaying 
      ? 'linear-gradient(145deg, #7e57c2, #9575cd)' 
      : 'linear-gradient(145deg, #9e9e9e, #bdbdbd)'};
  color: white;
  cursor: pointer;
  font-size: 1.1rem;
  font-family: 'Dancing Script', cursive, sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  border: 3px solid ${({ $isPlaying }) => $isPlaying ? '#5e35b1' : '#616161'};
  transform: scale(1);
  
  &:hover {
    transform: scale(1.05);
    background: ${({ $isPlaying }) => 
      $isPlaying 
        ? 'linear-gradient(145deg, #673ab7, #7e57c2)' 
        : 'linear-gradient(145deg, #757575, #9e9e9e)'};
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(103, 58, 183, 0.3);
  }
`;

export default BackgroundMusic;
