// pages/case-studies/index.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import Card from '../../components/common/Card';
import { Filter } from 'lucide-react';

// Case study data type
interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: {
    src: string;
    alt: string;
  };
  client: string;
  year: string;
  featured: boolean;
}

// Case studies data
const caseStudies: CaseStudy[] = [
  {
    slug: 'nova-finance',
    title: 'Nova Finance Dashboard',
    description: 'A cutting-edge financial platform with real-time data visualization and AI-powered insights.',
    category: 'Web Application',
    tags: ['Finance', 'Dashboard', 'Data Visualization'],
    image: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Nova Finance Dashboard',
    },
    client: 'FinTech Solutions',
    year: '2023',
    featured: true,
  },
  {
    slug: 'echo-social',
    title: 'Echo Social Platform',
    description: 'Next-generation social platform designed for creators with integrated monetization tools.',
    category: 'Mobile Application',
    tags: ['Social Media', 'Creator Economy', 'Mobile'],
    image: {
      src: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Echo Social Platform',
    },
    client: 'Echo Inc.',
    year: '2023',
    featured: true,
  },
  {
    slug: 'pulse-health',
    title: 'Pulse Health Tracker',
    description: 'Health and fitness tracking platform with personalized insights and coaching.',
    category: 'Mobile Application',
    tags: ['Healthcare', 'IoT', 'Mobile'],
    image: {
      src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Pulse Health Tracker',
    },
    client: 'Pulse Health',
    year: '2023',
    featured: true,
  },
  {
    slug: 'quantum-analytics',
    title: 'Quantum Analytics Platform',
    description: 'Advanced analytics platform providing businesses with actionable insights from complex data.',
    category: 'Web Application',
    tags: ['Analytics', 'AI', 'Enterprise'],
    image: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Quantum Analytics Platform',
    },
    client: 'Quantum Data',
    year: '2022',
    featured: false,
  },
  {
    slug: 'nebula-commerce',
    title: 'Nebula E-Commerce',
    description: 'Scalable e-commerce platform with personalized shopping experiences and advanced inventory management.',
    category: 'Web Application',
    tags: ['E-Commerce', 'Retail', 'Enterprise'],
    image: {
      src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Nebula E-Commerce',
    },
    client: 'Nebula Retail',
    year: '2022',
    featured: false,
  },
  {
    slug: 'horizon-travel',
    title: 'Horizon Travel App',
    description: 'Innovative travel platform that offers personalized recommendations and seamless booking experiences.',
    category: 'Mobile Application',
    tags: ['Travel', 'Booking', 'Mobile'],
    image: {
      src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Horizon Travel App',
    },
    client: 'Horizon Travels',
    year: '2022',
    featured: false,
  },
  {
    slug: 'aurora-design-system',
    title: 'Aurora Design System',
    description: 'Comprehensive design system that ensures consistency across digital products for a global brand.',
    category: 'Design',
    tags: ['Design System', 'UI/UX', 'Branding'],
    image: {
      src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Aurora Design System',
    },
    client: 'Global Tech Co.',
    year: '2022',
    featured: false,
  },
  {
    slug: 'cosmic-learning',
    title: 'Cosmic Learning Platform',
    description: 'Interactive e-learning platform with adaptive learning paths and progress tracking.',
    category: 'Web Application',
    tags: ['Education', 'E-Learning', 'SaaS'],
    image: {
      src: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Cosmic Learning Platform',
    },
    client: 'Cosmic Education',
    year: '2021',
    featured: false,
  },
  {
    slug: 'vortex-crm',
    title: 'Vortex CRM',
    description: 'Customer relationship management system with AI-powered insights and automation.',
    category: 'Web Application',
    tags: ['CRM', 'Enterprise', 'AI'],
    image: {
      src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Vortex CRM',
    },
    client: 'Vortex Solutions',
    year: '2021',
    featured: false,
  },
  {
    slug: 'zenith-banking',
    title: 'Zenith Banking App',
    description: 'Secure and intuitive mobile banking application with advanced fraud detection.',
    category: 'Mobile Application',
    tags: ['Finance', 'Banking', 'Security'],
    image: {
      src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Zenith Banking App',
    },
    client: 'Zenith Bank',
    year: '2021',
    featured: false,
  },
  {
    slug: 'orbital-dashboard',
    title: 'Orbital IoT Dashboard',
    description: 'Real-time monitoring dashboard for IoT devices with predictive maintenance capabilities.',
    category: 'Web Application',
    tags: ['IoT', 'Dashboard', 'Industry'],
    image: {
      src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Orbital IoT Dashboard',
    },
    client: 'Orbital Industries',
    year: '2020',
    featured: false,
  },
  {
    slug: 'stellar-marketplace',
    title: 'Stellar NFT Marketplace',
    description: 'Digital marketplace for buying, selling, and trading non-fungible tokens.',
    category: 'Web Application',
    tags: ['Blockchain', 'NFT', 'Marketplace'],
    image: {
      src: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Stellar NFT Marketplace',
    },
    client: 'Stellar Digital',
    year: '2020',
    featured: false,
  },
];

// Category data
const categories = [
  'All',
  'Web Application',
  'Mobile Application',
  'Design',
];

export default function CaseStudiesIndex() {
  // Filter state
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter case studies by category
  const filteredCaseStudies = activeCategory === 'All'
    ? caseStudies
    : caseStudies.filter(study => study.category === activeCategory);
  
  return (
    <DefaultLayout 
      title="Case Studies | Futura"
      description="Explore our portfolio of successful client projects across various industries and technologies."
    >
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-64 -right-64 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-64 -left-64 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our <span className="gradient-text">Case Studies</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Explore our portfolio of successful projects and discover how we help businesses achieve their digital goals.
            </motion.p>
          </div>
          
          {/* Filter Controls */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Showcasing {filteredCaseStudies.length} projects
              </h2>
              
              <button
                className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-5 h-5 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <div className="hidden md:flex space-x-4">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                      activeCategory === category
                        ? 'bg-neon-cyan text-space-darkest'
                        : 'bg-space-light/20 text-gray-300 hover:bg-space-light/30'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mobile Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="md:hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                          activeCategory === category
                            ? 'bg-neon-cyan text-space-darkest'
                            : 'bg-space-light/20 text-gray-300'
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Featured Case Studies */}
          {activeCategory === 'All' && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {caseStudies
                  .filter(study => study.featured)
                  .map((study, index) => (
                    <motion.div
                      key={study.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <Card
                        title={study.title}
                        description={study.description}
                        image={study.image}
                        tags={study.tags}
                        href={`/case-studies/${study.slug}`}
                        metadata={{
                          client: study.client,
                          year: study.year,
                        }}
                        variant="caseStudy"
                      />
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
          
          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCaseStudies
                .filter(study => activeCategory !== 'All' || !study.featured)
                .map((study, index) => (
                  <motion.div
                    key={study.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: 0.05 * index, duration: 0.5 }}
                    layout
                  >
                    <Card
                      title={study.title}
                      description={study.description}
                      image={study.image}
                      tags={study.tags}
                      href={`/case-studies/${study.slug}`}
                      metadata={{
                        client: study.client,
                        year: study.year,
                      }}
                      variant="caseStudy"
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}