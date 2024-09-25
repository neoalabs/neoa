// src/components/AIFeature/AIFeature.jsx
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const AISection = styled.section`
  padding: 80px 20px;
  background: #0A192F;
  color: #fff;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const AIContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const AIDescription = styled.div`
  max-width: 600px;
  margin: 1rem;
`;

const AIHeading = styled.h3`
  font-size: 1.8rem;
  color: #64FFDA;
  margin-bottom: 1rem;
`;

const AIText = styled.p`
  font-size: 1rem;
  color: #ddd;
  margin-bottom: 1.5rem;
`;

const AIImage = styled.div`
  margin: 1rem;
  width: 300px;
  height: 300px;
  background: #fff;
  border-radius: 8px;
  /* Placeholder for interactive demo */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AIFeature = () => {
  return (
    <AISection id="ai-innovations">
      <SectionTitle>Our AI Innovations</SectionTitle>
      <AIContent>
        <AIDescription>
          <AIHeading>AI-Driven Solutions</AIHeading>
          <AIText>Harness the power of artificial intelligence to transform your business operations. From intelligent data analytics to automated solutions, our AI services are designed to drive efficiency and innovation.</AIText>
          <Button href="/services#ai-solutions">Explore AI Solutions</Button>
        </AIDescription>
        <AIImage>
          {/* Embed AI Demo or Animation Here */}
          <p>AI Demo Placeholder</p>
        </AIImage>
      </AIContent>
    </AISection>
  );
};

export default AIFeature;
