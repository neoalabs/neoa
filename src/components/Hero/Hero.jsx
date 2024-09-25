// src/components/Hero.jsx
import React from 'react';
import styled from 'styled-components';
import FuturisticAnimation from '../FuturisticAnimation'; // Import the enhanced background animation


// Styled components for Hero Section
const HeroContainer = styled.div`
  background-color: #000;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative; /* To position the animated background correctly */
  overflow: hidden; /* Hide overflowing animated elements */
`;

const GradientHeading = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  background: linear-gradient(90deg, #00C6FF, #0072FF, #9D00FF);
  -webkit-background-clip: text;
  color: transparent;
  margin: 0;
  z-index: 2; /* Above the animated background */

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.5rem;
  color: #fff;
  margin-top: 1rem;
  max-width: 600px;
  z-index: 2; /* Above the animated background */

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled.a`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: #6A00F4;
  color: #fff;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
  z-index: 2; /* Above the animated background */

  &:hover {
    background-color: #9D00FF;
  }
`;

const Hero = () => {
  return (
    <>
      <HeroContainer id="home">
        <FuturisticAnimation /> {/* Enhanced Animated Background */}
        <GradientHeading>Building the Future with Innovative Technology</GradientHeading>
        <SubHeading>
          Delivering cutting-edge Web & Mobile Apps, Market Research, and AI Solutions across Retail, Healthcare, Finance, Marketing, and Real Estate.
        </SubHeading>
        <CTAButton href="#services">Get Started</CTAButton>
      </HeroContainer>
    </>
  );
};

export default Hero;
