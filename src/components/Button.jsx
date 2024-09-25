// src/components/Button.jsx
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.a`
  background-color: #5A76FF;
  color: #fff;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6FC3FF;
  }
`;

const Button = ({ href, children }) => {
  return <StyledButton href={href}>{children}</StyledButton>;
};

export default Button;
