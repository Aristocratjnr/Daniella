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
        const p = audioRef.current.play();
        if (p && typeof (p as any).catch === 'function') {
          (p as Promise<void>).catch(() => {});
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const attempt = () => {
      const p = audio.play();
      if (p && typeof (p as any).then === 'function') {
        (p as Promise<void>)
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(true);
      }
    };
    attempt();
    const onGesture = () => attempt();
    document.addEventListener('pointerdown', onGesture, { once: true });
    document.addEventListener('touchstart', onGesture, { once: true });
    document.addEventListener('keydown', onGesture, { once: true });

    return () => {
      document.removeEventListener('pointerdown', onGesture);
      document.removeEventListener('touchstart', onGesture);
      document.removeEventListener('keydown', onGesture);
      if (audioRef.current) audioRef.current.pause();
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
        autoPlay
        playsInline
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
  padding: 8px 16px;
  border-radius: 30px;
  background: ${({ $isPlaying }) => 
    $isPlaying 
      ? 'linear-gradient(145deg, #7e57c2, #9575cd)' 
      : 'linear-gradient(145deg, #9e9e9e, #bdbdbd)'};
  color: white;
  cursor: pointer;
  font-size: clamp(0.95rem, 3vw, 1.05rem);
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
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    bottom: 20px;
    right: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px;
    bottom: calc(12px + env(safe-area-inset-bottom));
    right: 12px;
    border-width: 2px;
  }
`;

export default BackgroundMusic;
