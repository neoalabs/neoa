// src/components/Services/Services.jsx
import React from 'react';
import styled from 'styled-components';
import { FaLaptopCode, FaChartLine, FaRobot } from 'react-icons/fa';
import Button from '../Button';

const ServicesSection = styled.section`
  padding: 80px 20px;
  background: #F0F4F8;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #0A192F;
  margin-bottom: 2rem;
`;

const ServicesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ServiceCard = styled.div`
  background: #fff;
  width: 300px;
  margin: 1rem;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: #64FFDA;
  margin-bottom: 1rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: #0A192F;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Services = () => {
  return (
    <ServicesSection id="services">
      <SectionTitle>Our Services</SectionTitle>
      <ServicesContainer>
        <ServiceCard>
          <ServiceIcon><FaLaptopCode /></ServiceIcon>
          <ServiceTitle>Web/Mobile Apps Development</ServiceTitle>
          <ServiceDescription>Creating seamless and scalable applications tailored to your business needs.</ServiceDescription>
          <Button href="/services#web-mobile">Learn More</Button>
        </ServiceCard>
        <ServiceCard>
          <ServiceIcon><FaChartLine /></ServiceIcon>
          <ServiceTitle>Market Research</ServiceTitle>
          <ServiceDescription>Providing insightful data and analysis to drive your business strategies.</ServiceDescription>
          <Button href="/services#market-research">Learn More</Button>
        </ServiceCard>
        <ServiceCard>
          <ServiceIcon><FaRobot /></ServiceIcon>
          <ServiceTitle>AI Solutions</ServiceTitle>
          <ServiceDescription>Developing intelligent systems that enhance your operational efficiency.</ServiceDescription>
          <Button href="/services#ai-solutions">Learn More</Button>
        </ServiceCard>
      </ServicesContainer>
    </ServicesSection>
  );
};

export default Services;
