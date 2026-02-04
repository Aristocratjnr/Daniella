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
  
  const handleYesClick = async () => {
    setBunnyState("yes");
    if (typeof window !== "undefined") {
      const mod = await import("canvas-confetti");
      const confetti = mod.default;
      confetti({
        particleCount: 120,
        spread: 80,
        startVelocity: 45,
        decay: 0.9,
        scalar: isMobile ? 0.9 : 1.1,
        origin: { y: isMobile ? 0.85 : 0.6 },
      });
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        startVelocity: 45,
        origin: { x: 0, y: isMobile ? 0.9 : 0.7 },
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        startVelocity: 45,
        origin: { x: 1, y: isMobile ? 0.9 : 0.7 },
      });
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
            <h1 className="title">David is happy to go with you😘</h1>
          ) : (
            <h1 className="title">Daniella, will you be my valentine😩?</h1>
          )}
          <div className={`animation ${bounce ? 'bounce' : ''} ${bunnyState === 'yes' ? 'celebrate' : ''}`}>
            {bunnyState === "normal" && (
              <Lottie 
                options={bunnyPleaseOptions} 
              height={isMobile ? 240 : 300} 
              width={isMobile ? 240 : 300} 
                speed={animationSpeed}
                direction={animationDirection}
                isStopped={false}
                isPaused={false}
              />
            )}
            {bunnyState === "cry" && (
              <Lottie 
                options={bunnyCryOptions} 
              height={isMobile ? 240 : 300} 
              width={isMobile ? 240 : 300} 
                speed={animationSpeed}
                direction={animationDirection}
              />
            )}
            {bunnyState === "yes" && (
              <Lottie 
                options={bunnyYesOptions} 
              height={isMobile ? 320 : 400} 
              width={isMobile ? 320 : 400} 
                speed={1.5}
                isStopped={false}
                isPaused={false}
              />
            )}
            {bunnyState === "punch" && (
              <Lottie 
                options={bunnyPunchOptions} 
              height={isMobile ? 240 : 300} 
              width={isMobile ? 240 : 300} 
                speed={animationSpeed}
              />
            )}
          </div>
          {bunnyState !== "yes" && (
            <div className="buttons">
              <button 
                onClick={handleYesClick} 
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
                No😒
              </Button>
            </div>
          )}
          <div className="signature">
          
          </div>
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
    margin-top: -5rem;
    
    @media (max-width: 768px) {
      gap: 1.2rem;
      padding: 0.8rem;
      margin-top: -4rem;
    }
    
    @media (max-width: 480px) {
      gap: 1rem;
      padding: 0.6rem;
      margin-top: -3rem;
    }
    
    .title {
      font-size: clamp(2.2rem, 4.5vw, 3.2rem);
      color: #333;
      font-family: ${dancingScript.style.fontFamily}, cursive;
      margin: -1.8rem 0 0.4rem;
      line-height: 1.3;
      transition: all 0.5s ease;
      position: relative;
      padding: 0 1rem;
      text-align: center;
      width: 100%;
      white-space: nowrap;
      
      
      @media (max-width: 1024px) {
        font-size: 2rem;
        line-height: 1.2;
      }
      
      @media (max-width: 768px) {
        font-size: 1.5rem;
        margin: -1.2rem 0 0.45rem;
        padding: 0.3rem 0.8rem;
        line-height: 1.15;
      }
      
      @media (max-width: 480px) {
        font-size: 1.25rem;
        padding: 0.3rem 0.5rem;
        line-height: 1.1;
        margin: -0.9rem 0 0.4rem;
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

  .signature {
    position: relative;
    bottom: 10px;
    left: 0;
    right: 0;
    font-family: 'Dancing Script', cursive, sans-serif;
    font-size: 1.1rem;
    color: #888;
    opacity: 0.7;
    text-align: center;
    padding: 5px 0;
    z-index: 10;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(2px);
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
      bottom: 0;
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
    
    @media (max-width: 768px) {
      gap: 1rem;
      margin-top: 0.8rem;
      padding: 0.8rem 0;
    }
    
    @media (max-width: 480px) {
      gap: 0.8rem;
      margin-top: 0.6rem;
      padding: 0.6rem 0;
      min-height: 50px;
    }

    button {
      padding: 0.6rem 1.8rem;
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
        padding: 0.4rem 1.2rem;
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
        padding: 0.5rem 1.3rem;
        
        &:first-child {
          padding: 0.35rem 1rem;
        }
        font-size: clamp(0.9rem, 2.8vw, 1.1rem);
      }
      
      @media (max-width: 480px) {
        padding: 0.45rem 1rem;
        
        &:first-child {
          padding: 0.3rem 0.85rem;
        }
        font-size: clamp(0.85rem, 2.5vw, 1rem);
        min-width: 85px;
      }
    }

    .no-button {
      border: 3px solid #d81b60;
    }
  }
`;

export default Home;
