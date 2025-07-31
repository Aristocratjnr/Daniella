"use client";

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import styled from "styled-components";
import bunnyCry from "./animations/bunnyCry.json";
import bunnyPlease from "./animations/bunnyPlease.json";
import bunnyYes from "./animations/bunnyYes.json";
import bunnyPunch from "./animations/bunnyPunch.json";
import Button from "./components/Button";

// Import Lottie with dynamic import and no SSR
const Lottie = dynamic(
  () => import('react-lottie').then((mod) => {
    return function LottieWrapper(props: any) {
      const [isMounted, setIsMounted] = React.useState(false);
      
      React.useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
      }, []);

      if (!isMounted) return null;
      const LottieComponent = mod.default;
      return <LottieComponent {...props} />;
    };
  }),
  { ssr: false, loading: () => null }
);

const BackgroundMusic = dynamic(() => import('./components/BackgroundMusic'), { ssr: false });

const getRandomPosition = (isMobile: boolean = false) => {
  if (typeof window === 'undefined') {
    return { randomLeft: "0px", randomTop: "0px" };
  }

  const buttonWidth = 120; // Approximate button width
  const buttonHeight = 50; // Approximate button height
  const padding = 20; // Minimum padding from screen edges
  
  // For mobile, limit the Y position to the bottom half of the screen
  // and ensure it's not too close to the Yes button
  if (isMobile) {
    const minY = window.innerHeight * 0.6; // Start from 60% down the screen
    const maxY = window.innerHeight - buttonHeight - padding;
    
    return {
      randomLeft: `${padding + Math.random() * (window.innerWidth - buttonWidth - padding * 2)}px`,
      randomTop: `${minY + Math.random() * (maxY - minY)}px`,
    };
  }
  
  // For desktop, use the full screen but keep padding from edges
  return {
    randomLeft: `${padding + Math.random() * (window.innerWidth - buttonWidth - padding * 2)}px`,
    randomTop: `${padding + Math.random() * (window.innerHeight - buttonHeight - padding * 2)}px`,
  };
};

function Home() {
  const bunnyCryOptions = {
    loop: true,
    autoplay: true,
    animationData: bunnyCry,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const bunnyPleaseOptions = {
    loop: true,
    autoplay: true,
    animationData: bunnyPlease,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const bunnyYesOptions = {
    loop: true,
    autoplay: true,
    animationData: bunnyYes,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const bunnyPunchOptions = {
    loop: true,
    autoplay: true,
    animationData: bunnyPunch,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [bunnyState, setBunnyState] = useState("normal");
  const [randomPosition, setRandomPosition] = useState(getRandomPosition());
  const [hasStarted, setHasStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check and set initial position
    checkIfMobile();
    setRandomPosition(getRandomPosition(window.innerWidth <= 768));
    
    // Add event listener for window resize
    const handleResize = () => {
      checkIfMobile();
      setRandomPosition(getRandomPosition(window.innerWidth <= 768));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bunnyObj: { [key: number]: string } = { 0: "cry", 1: "punch" };
  
  const handleNoButtonInteraction = () => {
    setHasStarted(true);
    setRandomPosition(getRandomPosition(isMobile));
    const randomBunnyState = Math.floor(Math.random() * 2);
    setBunnyState(bunnyObj[randomBunnyState] as string);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isMobile) {
      e.preventDefault();
      handleNoButtonInteraction();
    }
  };

  return (
    <StyledHome data-testid="container">
       <BackgroundMusic/>
      <div className="home-container">
        {bunnyState === "yes" ? <div className="title">dherdy is happy to go with you😘💕</div> : <div className="title"> Daniella, will you go out with me🥲?</div>}
        <div className="animation">
          {bunnyState === "normal" && <Lottie options={bunnyPleaseOptions} height={300} width={300} />}
          {bunnyState === "cry" && <Lottie options={bunnyCryOptions} height={300} width={300} />}
          {bunnyState === "yes" && <Lottie options={bunnyYesOptions} height={400} width={400} />}
          {bunnyState === "punch" && <Lottie options={bunnyPunchOptions} height={300} width={300} />}
        </div>
        {bunnyState !== "yes" && (
          <div className="buttons">
            <button 
              onClick={() => setBunnyState("yes")} 
              onMouseEnter={() => !isMobile && setBunnyState("normal")}
              onTouchStart={() => setBunnyState("normal")}
              className="yes-button"
            >
              Yes❤️
            </button>
            <Button
              $randomleft={randomPosition.randomLeft}
              $randomtop={randomPosition.randomTop}
              $hasstarted={hasStarted}
              onMouseEnter={() => !isMobile && handleNoButtonInteraction()}
              onTouchStart={handleNoButtonInteraction}
              onTouchMove={handleTouchMove}
              className="no-button"
            >
              No😩
            </Button>
          </div>
        )}
      </div>
    </StyledHome >
  );
}

const StyledHome = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #feeafb;
  padding: 1rem;
  box-sizing: border-box;
  overflow-x: hidden;
  touch-action: manipulation;

  .home-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 800px;
    padding: 1rem;
    text-align: center;

    .title {
      font-size: clamp(1.5rem, 5vw, 2.5rem);
      color: #5caff3;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      margin: 0;
      line-height: 1.3;
      transition: all 0.3s ease;
    }

    .animation {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      transition: all 0.3s ease;
      
      @media (max-width: 480px) {
        max-width: 280px;
      }
    }
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    position: relative;
    min-height: 60px;
    padding: 1rem 0;
    overflow: visible;

    button {
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      
      &:first-child {
        background-color: #ff6b9d;
        color: white;
        &:hover {
          transform: scale(1.05);
          background-color: #ff4785;
        }
      }
      
      @media (max-width: 480px) {
        padding: 0.7rem 1.5rem;
        font-size: 1rem;
      }
    }
  }
`;

export default Home;