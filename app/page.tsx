"use client";

import React, { useState, useEffect } from "react";
import { Inter, Dancing_Script } from 'next/font/google';
import Head from 'next/head';

// Font declarations must be at the module level
const inter = Inter({ subsets: ['latin'] });
const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});
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
    const [animationSpeed, setAnimationSpeed] = useState(1);
  const [animationDirection, setAnimationDirection] = useState(1);
  const [bounce, setBounce] = useState(false);

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
    
    // Add some fun variations to the animation
    setAnimationSpeed(prev => Math.min(prev + 0.2, 2));
    setAnimationDirection(prev => -prev);
    
    // Trigger bounce effect
    setBounce(true);
    setTimeout(() => setBounce(false), 500);
    
    // Change bunny state with some randomness
    const randomBunnyState = Math.floor(Math.random() * 2);
    setBunnyState(bunnyObj[randomBunnyState] as string);
    
    // Add a little delay before moving to make it more playful
    setTimeout(() => {
      setRandomPosition(getRandomPosition(isMobile));
    }, 100);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isMobile) {
      e.preventDefault();
      handleNoButtonInteraction();
    }
  };

  // Fonts are now declared at the module level

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <StyledHome data-testid="container">
        <BackgroundMusic/>
        <div className="home-container">
          {bunnyState === "yes" ? (
            <h1 className="title">dherdy is happy to go with you😘</h1>
          ) : (
            <h1 className="title">Daniella, will you go out with me?</h1>
          )}
          <div className={`animation ${bounce ? 'bounce' : ''} ${bunnyState === 'yes' ? 'celebrate' : ''}`}>
            {bunnyState === "normal" && (
              <Lottie 
                options={bunnyPleaseOptions} 
                height={300} 
                width={300} 
                speed={animationSpeed}
                direction={animationDirection}
                isStopped={false}
                isPaused={false}
              />
            )}
            {bunnyState === "cry" && (
              <Lottie 
                options={bunnyCryOptions} 
                height={300} 
                width={300} 
                speed={animationSpeed}
                direction={animationDirection}
              />
            )}
            {bunnyState === "yes" && (
              <Lottie 
                options={bunnyYesOptions} 
                height={400} 
                width={400} 
                speed={1.5}
                isStopped={false}
                isPaused={false}
              />
            )}
            {bunnyState === "punch" && (
              <Lottie 
                options={bunnyPunchOptions} 
                height={300} 
                width={300} 
                speed={animationSpeed}
              />
            )}
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
      </StyledHome>
    </>
  );
}

const StyledHome = styled.main`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
  touch-action: manipulation;
  font-family: ${inter.style.fontFamily}, sans-serif;
  
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
      font-size: clamp(1.8rem, 6vw, 3.5rem);
      color: #333;
      font-family: ${dancingScript.style.fontFamily}, cursive;
      margin: 0 0 1rem;
      line-height: 1.3;
      transition: all 0.5s ease;
      position: relative;
      padding: 0 1rem;
      text-align: center;
      width: 100%;
      word-wrap: break-word;
      overflow-wrap: break-word;
      hyphens: auto;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        height: 3px;
        background: linear-gradient(90deg, transparent, #ff6b6b, transparent);
        border-radius: 50%;
        filter: blur(2px);
      }
      
      @media (max-width: 1024px) {
        font-size: clamp(1.6rem, 5.5vw, 3rem);
        line-height: 1.2;
      }
      
      @media (max-width: 768px) {
        font-size: clamp(1.4rem, 6vw, 2.2rem);
        margin-bottom: 0.5rem;
        padding: 0.3rem 0.8rem;
        line-height: 1.2;
      }
      
      @media (max-width: 480px) {
        font-size: clamp(1.2rem, 5.5vw, 1.8rem);
        padding: 0.3rem 0.5rem;
        line-height: 1.15;
      }
    }

    .animation {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform-origin: center;
      
      &.bounce {
        animation: bounce 0.5s ease;
      }
      
      &.celebrate {
        animation: celebrate 1s ease-in-out;
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes celebrate {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(5deg); }
        50% { transform: scale(1.05) rotate(-5deg); }
        75% { transform: scale(1.1) rotate(5deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
      
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
      font-size: clamp(1rem, 3vw, 1.2rem);
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      min-width: 100px;
      text-align: center;
      white-space: nowrap;
      
      &:first-child {
        background: linear-gradient(145deg, #4caf50, #66bb6a);
        color: white;
        border: 3px solid #2e7d32;
        font-family: 'Dancing Script', cursive, sans-serif;
        font-size: 1.4rem;
        font-weight: bold;
        letter-spacing: 1px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        
        &:hover {
          transform: scale(1.05);
          background: linear-gradient(145deg, #43a047, #4caf50);
          border-color: #1b5e20;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        }
        
        &:active {
          transform: scale(0.98);
        }
      }
      
      @media (max-width: 768px) {
        padding: 0.7rem 1.5rem;
        font-size: clamp(0.9rem, 2.8vw, 1.1rem);
      }
      
      @media (max-width: 480px) {
        padding: 0.6rem 1.2rem;
        font-size: clamp(0.85rem, 2.5vw, 1rem);
        min-width: 85px;
      }
    }
  }
`;

export default Home;