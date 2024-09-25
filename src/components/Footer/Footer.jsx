// src/components/Footer/Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #0A192F;
  color: #fff;
  padding: 40px 20px;
`;

const FooterGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const FooterSection = styled.div`
  margin: 1rem;
  min-width: 200px;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #64FFDA;
  margin-bottom: 1rem;
`;

const ContactInfo = styled.p`
  font-size: 0.9rem;
`;

const QuickLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

const QuickLink = styled.li`
  margin-bottom: 0.5rem;
`;

const QuickLinkAnchor = styled.a`
  color: #fff;
  text-decoration: none;
  
  &:hover {
    color: #64FFDA;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIconLink = styled.a`
  color: #fff;
  font-size: 1.5rem;
  
  &:hover {
    color: #64FFDA;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const NewsletterInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const NewsletterButton = styled.button`
  padding: 10px;
  background: #64FFDA;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #0A192F;
  font-weight: bold;
  
  &:hover {
    background: #52e1c7;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.8rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        <FooterSection>
          <SectionTitle>Contact Us</SectionTitle>
          <ContactInfo>
            1234 Innovation Drive,<br />
            Tech City, TX 75001<br />
            Email: contact@neoa.com<br />
            Phone: (123) 456-7890
          </ContactInfo>
        </FooterSection>
        <FooterSection>
          <SectionTitle>Quick Links</SectionTitle>
          <QuickLinks>
            <QuickLink><QuickLinkAnchor href="#home">Home</QuickLinkAnchor></QuickLink>
            <QuickLink><QuickLinkAnchor href="#services">Services</QuickLinkAnchor></QuickLink>
            <QuickLink><QuickLinkAnchor href="#industries">Industries</QuickLinkAnchor></QuickLink>
            <QuickLink><QuickLinkAnchor href="#portfolio">Portfolio</QuickLinkAnchor></QuickLink>
            <QuickLink><QuickLinkAnchor href="#blog">Blog</QuickLinkAnchor></QuickLink>
            <QuickLink><QuickLinkAnchor href="#about">About Us</QuickLinkAnchor></QuickLink>
            <QuickLink><QuickLinkAnchor href="#contact">Contact</QuickLinkAnchor></QuickLink>
          </QuickLinks>
        </FooterSection>
        <FooterSection>
          <SectionTitle>Follow Us</SectionTitle>
          <SocialIcons>
            <SocialIconLink href="https://facebook.com/neoa" target="_blank" rel="noopener noreferrer"><FaFacebook /></SocialIconLink>
            <SocialIconLink href="https://twitter.com/neoa" target="_blank" rel="noopener noreferrer"><FaTwitter /></SocialIconLink>
            <SocialIconLink href="https://linkedin.com/company/neoa" target="_blank" rel="noopener noreferrer"><FaLinkedin /></SocialIconLink>
            <SocialIconLink href="https://instagram.com/neoa" target="_blank" rel="noopener noreferrer"><FaInstagram /></SocialIconLink>
          </SocialIcons>
        </FooterSection>
        <FooterSection>
          <SectionTitle>Newsletter</SectionTitle>
          <NewsletterForm onSubmit={(e) => { e.preventDefault(); /* Handle subscription */ }}>
            <NewsletterInput type="email" placeholder="Your email address" required />
            <NewsletterButton type="submit">Subscribe</NewsletterButton>
          </NewsletterForm>
        </FooterSection>
      </FooterGrid>
      <FooterBottom>
        <p>&copy; 2024 NEOA. All rights reserved.</p>
        <p><a href="/privacy-policy" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</a> | <a href="/terms" style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</a></p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
