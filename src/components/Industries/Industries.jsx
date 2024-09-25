// src/components/Industries/Industries.jsx
import React from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaHeartbeat, FaDollarSign, FaBullhorn, FaBuilding } from 'react-icons/fa';

const IndustriesSection = styled.section`
  padding: 80px 20px;
  background: #fff;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #0A192F;
  margin-bottom: 2rem;
`;

const IndustriesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const IndustryCard = styled.div`
  background: #F0F4F8;
  width: 250px;
  margin: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const IndustryIcon = styled.div`
  font-size: 2.5rem;
  color: #64FFDA;
  margin-bottom: 1rem;
`;

const IndustryTitle = styled.h3`
  font-size: 1.3rem;
  color: #0A192F;
  margin-bottom: 0.5rem;
`;

const IndustryDescription = styled.p`
  font-size: 0.9rem;
  color: #333;
`;

const Industries = () => {
  return (
    <IndustriesSection id="industries">
      <SectionTitle>Industries We Serve</SectionTitle>
      <IndustriesContainer>
        <IndustryCard>
          <IndustryIcon><FaShoppingCart /></IndustryIcon>
          <IndustryTitle>Retail & E-commerce</IndustryTitle>
          <IndustryDescription>Enhancing online shopping experiences and optimizing retail operations.</IndustryDescription>
        </IndustryCard>
        <IndustryCard>
          <IndustryIcon><FaHeartbeat /></IndustryIcon>
          <IndustryTitle>HealthCare</IndustryTitle>
          <IndustryDescription>Developing solutions to improve patient care and streamline healthcare services.</IndustryDescription>
        </IndustryCard>
        <IndustryCard>
          <IndustryIcon><FaDollarSign /></IndustryIcon>
          <IndustryTitle>Finance & Trading</IndustryTitle>
          <IndustryDescription>Providing secure and efficient financial applications and trading platforms.</IndustryDescription>
        </IndustryCard>
        <IndustryCard>
          <IndustryIcon><FaBullhorn /></IndustryIcon>
          <IndustryTitle>Marketing</IndustryTitle>
          <IndustryDescription>Creating data-driven marketing strategies and innovative campaigns.</IndustryDescription>
        </IndustryCard>
        <IndustryCard>
          <IndustryIcon><FaBuilding /></IndustryIcon>
          <IndustryTitle>Real Estate</IndustryTitle>
          <IndustryDescription>Offering digital solutions for property management and real estate transactions.</IndustryDescription>
        </IndustryCard>
      </IndustriesContainer>
    </IndustriesSection>
  );
};

export default Industries;
