// src/components/AnimatedSVG.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for SVG Path Drawing Animation
const draw = keyframes`
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

// Styled component for the SVG wrapper
const SVGWrapper = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Behind other content */
`;

// Styled component for SVG paths with animation
const AnimatedPath = styled.path`
  stroke: #6FC3FF;
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 1000;
  animation: ${draw} 10s linear forwards;
`;

// Example SVG paths resembling neural networks or circuitry
const AnimatedSVG = () => {
  return (
    <SVGWrapper viewBox="0 0 200 200">
      {/* Horizontal Line */}
      <AnimatedPath d="M10,100 L190,100" />
      {/* Vertical Line */}
      <AnimatedPath d="M100,10 L100,190" />
      {/* Diagonal Line */}
      <AnimatedPath d="M10,10 L190,190" />
      {/* Additional Paths for Complexity */}
      <AnimatedPath d="M50,10 L150,190" />
      <AnimatedPath d="M150,10 L50,190" />
      {/* More complex paths */}
      <AnimatedPath d="M30,70 Q100,10 170,70" />
      <AnimatedPath d="M30,130 Q100,190 170,130" />
    </SVGWrapper>
  );
};

export default AnimatedSVG;
