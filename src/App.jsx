// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Industries from './components/Industries/Industries';
import AIFeature from './components/AIFeature/AIFeature';
import Portfolio from './components/Portfolio/Portfolio';
import Testimonials from './components/Testimonials/Testimonials';
import AIFunStuff from './components/AIFunStuff/AIFunStuff';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <Router>
      <ErrorBoundary>
      <Navbar />
      <Hero />
      <Services />
      <Industries />
      <AIFeature />
      <Portfolio />
      <Testimonials />
      <AIFunStuff />
      <Footer />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
