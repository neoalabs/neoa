// src/components/AIFunStuff/AIFunStuff.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import axios from 'axios';

const AIFunSection = styled.section`
  padding: 80px 20px;
  background: #fff;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #0A192F;
  margin-bottom: 2rem;
`;

const ArtGenerator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 12px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const GenerateButton = styled(Button)`
  margin-bottom: 2rem;
`;

const ArtResult = styled.div`
  width: 300px;
  height: 300px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const AIFunStuff = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);

  const generateAIArt = async () => {
    if (!prompt) return;

    try {
      // Example API call to OpenAI's DALL·E
      const response = await axios.post('/api/generate-art', { prompt });
      setImage(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating AI art:', error);
    }
  };

  return (
    <AIFunSection>
      <SectionTitle>Create Your Own AI Art</SectionTitle>
      <ArtGenerator>
        <Input
          type="text"
          placeholder="Enter a description for your artwork"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <GenerateButton onClick={generateAIArt}>Generate</GenerateButton>
        <ArtResult>
          {image ? <img src={image} alt="AI Generated Art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <p>AI-generated art will appear here.</p>}
        </ArtResult>
      </ArtGenerator>
    </AIFunSection>
  );
};

export default AIFunStuff;
