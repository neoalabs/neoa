// src/components/Navbar/Navbar.jsx

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from '../Button';

// Keyframes for logo color animation
const colorShift = keyframes`
  0% { color: #ff2d55; }
  25% { color: #5856d6; }
  50% { color: #34c759; }
  75% { color: #5ac8fa; }
  100% { color: #ff2d55; }
`;

// Styled components
const Nav = styled.nav`
  background: ${({ isScrolled }) => (isScrolled ? '#0A0A0A' : 'transparent')};
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  transition: background 0.3s ease;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 0.1rem;
  color: #fff;
  display: flex;
  align-items: center;
  animation: ${colorShift} 10s infinite;
`;

const MobileIcon = styled.div`
  display: none;
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background: #0A0A0A;
    padding: 0;
    z-index: 1;
  }
`;

const NavItem = styled.li`
  height: 80px;

  @media screen and (max-width: 768px) {
    height: auto;
  }
`;

const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #007aff;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 20%;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: #007aff;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    padding: 1.5rem;
    width: 100%;
    display: block;
    text-align: center;
  }
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: block;
    padding: 1.5rem;
    text-align: center;
  }
`;

const StyledButton = styled(Button)`
  background-color: #007aff;
  border: none;
  padding: 10px 24px;
  color: #fff;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #0051a8;
    box-shadow: 0 0 10px #007aff, 0 0 20px #007aff, 0 0 30px #007aff;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Nav isScrolled={isScrolled}>
      <Logo to="/">NEOA</Logo>
      <MobileIcon onClick={toggle}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileIcon>
      <NavMenu isOpen={isOpen}>
        <NavItem>
          <NavLinks to="#home">Home</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="#services">Services</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="#industries">Industries</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="#portfolio">Portfolio</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="#blog">Blog</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="#about">About Us</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="#contact">Contact</NavLinks>
        </NavItem>
        <NavBtn>
          <StyledButton as="a" href="#contact">Get a Quote</StyledButton>
        </NavBtn>
      </NavMenu>
    </Nav>
  );
};

export default Navbar;
