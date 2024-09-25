// src/components/FuturisticAnimation.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for Multi-Layered Gradient Animation
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
`;

// Keyframes for Floating Shapes Animation
const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: translateY(0px) rotate(360deg);
    opacity: 0.8;
  }
`;

// Keyframes for Hover Interaction (Scale Up)
const scaleUp = keyframes`
  to {
    transform: scale(1.2);
    box-shadow: 0 0 20px rgba(110, 199, 255, 0.6);
  }
`;

// Styled component for the animated gradient background
const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3; /* Positioned behind all other elements */

  background: linear-gradient(-45deg, #6FC3FF, #5A76FF, #6FC3FF, #5A76FF);
  background-size: 800% 800%;
  animation: ${gradientAnimation} 20s ease infinite;

  /* Subtle Radial Gradient Overlay for Depth */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(10, 25, 47, 0.5), rgba(10, 25, 47, 0));
    pointer-events: none;
  }

  /* Disable animations for users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// Keyframes for Interactive Shape Movement
const move = keyframes`
  from {
    transform: translateX(0) translateY(0) rotate(0deg);
  }
  to {
    transform: translateX(20px) translateY(-20px) rotate(360deg);
  }
`;

// Styled component for floating shapes
const FloatingShape = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #5A76FF;
  border-radius: ${(props) => props.borderRadius || '50%'};
  opacity: 0.8;
  animation: ${float} 8s ease-in-out infinite, ${move} 12s ease-in-out infinite alternate;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  /* Interactive Hover Effect */
  &:hover {
    animation: ${float} 8s ease-in-out infinite, ${scaleUp} 0.3s forwards;
  }

  /* Responsive Adjustments */
  @media screen and (max-width: 768px) {
    width: ${(props) => props.mobileWidth || '50px'};
    height: ${(props) => props.mobileHeight || '50px'};
  }

  /* Dynamic Transformation Based on Mouse Position */
  transform: translate(${(props) => props.mouseX * 0.02}px, ${(props) => props.mouseY * 0.02}px) rotate(${(props) => props.rotation}deg);
`;

// Specific shapes with different sizes, positions, and animation delays
const Shape1 = styled(FloatingShape)`
  width: 120px;
  height: 120px;
  top: 15%;
  left: 10%;
  border-radius: 40%;
  animation-delay: 0s;

  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60px;
    top: 20%;
    left: 5%;
  }
`;

const Shape2 = styled(FloatingShape)`
  width: 100px;
  height: 100px;
  top: 40%;
  left: 80%;
  border-radius: 60%;
  animation-delay: 2s;

  @media screen and (max-width: 768px) {
    width: 50px;
    height: 50px;
    top: 45%;
    left: 75%;
  }
`;

const Shape3 = styled(FloatingShape)`
  width: 150px;
  height: 150px;
  top: 65%;
  left: 25%;
  border-radius: 20%;
  animation-delay: 4s;

  @media screen and (max-width: 768px) {
    width: 75px;
    height: 75px;
    top: 70%;
    left: 20%;
  }
`;

const Shape4 = styled(FloatingShape)`
  width: 80px;
  height: 80px;
  top: 30%;
  left: 60%;
  border-radius: 50%; /* Perfect Circle */
  animation-delay: 1s;

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
    top: 35%;
    left: 55%;
  }
`;

// Container for all animated elements
const AnimatedElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -3; /* Positioned behind other content */
  pointer-events: none; /* Allows interactions to pass through */
`;

const FuturisticAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });

  // Update mouse position state on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        mouseX: e.clientX,
        mouseY: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Function to generate random rotation values for shapes
  const getRandomRotation = () => Math.random() * 360;

  return (
    <AnimatedElements>
      <AnimatedBackground />
      <Shape1 mouseX={mousePosition.mouseX} mouseY={mousePosition.mouseY} rotation={getRandomRotation()} />
      <Shape2 mouseX={mousePosition.mouseX} mouseY={mousePosition.mouseY} rotation={getRandomRotation()} />
      <Shape3 mouseX={mousePosition.mouseX} mouseY={mousePosition.mouseY} rotation={getRandomRotation()} />
      <Shape4 mouseX={mousePosition.mouseX} mouseY={mousePosition.mouseY} rotation={getRandomRotation()} />
      {/* Add more shapes as needed */}
    </AnimatedElements>
  );
};

export default FuturisticAnimation;
