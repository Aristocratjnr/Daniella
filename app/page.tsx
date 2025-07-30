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

const getRandomPosition = () => {
  if (typeof window !== 'undefined') {
    return ({
      randomLeft: `${Math.random() * (window.innerWidth - 100)}px`,
      randomTop: `${Math.random() * (window.innerHeight - 50)}px`,
    })
  } else {
    return ({
      randomLeft: "0px",
      randomTop: "0px",
    })
  }
}

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

  const [bunnyState, setBunnyState] = useState("normal")
  const [hovered, setHovered] = useState(false);
  const [randomPosition, setRandomPosition] = useState(getRandomPosition());
  const [hasStarted, setHasStarted] = useState(false)

  const bunnyObj: { [key: number]: string } = { 0: "cry", 1: "punch" };
  const handleHover = (hoverState: boolean) => {
    setHasStarted(true)
    if (hoverState === true) {
      setRandomPosition(getRandomPosition());
      const randomBunnyState = Math.floor(Math.random() * 2);
      setBunnyState(bunnyObj[randomBunnyState] as string)
    }
    setHovered(hoverState);

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
        {bunnyState !== "yes" && <div className="buttons">
          <button onClick={() => setBunnyState("yes")} onMouseEnter={() => setBunnyState("normal")}>Yes❤️</button>
          <Button
            $randomleft={randomPosition.randomLeft}
            $randomtop={randomPosition.randomTop}
            $hasstarted={hasStarted}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}

          >
            No😩
          </Button>
        </div>}
      </div>
    </StyledHome >
  );
}

const StyledHome = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color:#feeafb;
  .home-container{
    display: flex;
    flex-direction:column;
    gap:3rem;
    align-items: center;
    justify-content: center;
    .title{
      font-size: 2rem;
      color:#5caff3;
      font-family: comic sans ms;
    }
  }
  .buttons{
    display: flex;
    gap: 2rem;
  }
`;

export default Home;