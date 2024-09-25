// src/components/Portfolio/Portfolio.jsx
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const PortfolioSection = styled.section`
  padding: 80px 20px;
  background: #F0F4F8;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #0A192F;
  margin-bottom: 2rem;
`;

const PortfolioContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const PortfolioItem = styled.div`
  background: #fff;
  width: 300px;
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const PortfolioImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PortfolioContent = styled.div`
  padding: 1rem;
`;

const PortfolioTitle = styled.h3`
  font-size: 1.3rem;
  color: #0A192F;
  margin-bottom: 0.5rem;
`;

const PortfolioDescription = styled.p`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Portfolio = () => {
  const projects = [
    {
      title: 'Retail E-commerce Platform',
      description: 'Developed a scalable e-commerce platform increasing sales by 30%.',
      image: '/assets/images/project1-thumbnail.jpg',
      link: '/portfolio/project1'
    },
    {
      title: 'Healthcare Management System',
      description: 'Implemented an integrated system improving patient data management.',
      image: '/assets/images/project2-thumbnail.jpg',
      link: '/portfolio/project2'
    },
    // Add more projects as needed
  ];

  return (
    <PortfolioSection id="portfolio">
      <SectionTitle>Our Portfolio</SectionTitle>
      <PortfolioContainer>
        {projects.map((project, index) => (
          <PortfolioItem key={index}>
            <PortfolioImage src={project.image} alt={project.title} />
            <PortfolioContent>
              <PortfolioTitle>{project.title}</PortfolioTitle>
              <PortfolioDescription>{project.description}</PortfolioDescription>
              <Button href={project.link}>View Case Study</Button>
            </PortfolioContent>
          </PortfolioItem>
        ))}
      </PortfolioContainer>
    </PortfolioSection>
  );
};

export default Portfolio;
