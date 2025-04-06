// components/sections/CaseStudies.tsx
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Card from '../common/Card';
import Button from '../common/Button';
import { ArrowRight } from 'lucide-react';

// Animation for elements when they come into view
const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
        hidden: { opacity: 0, y: 30 }
      }}
    >
      {children}
    </motion.div>
  );
};

interface CaseStudiesProps {
  featured?: boolean;
  limit?: number;
}

export default function CaseStudies({ featured = false, limit = 3 }: CaseStudiesProps) {
  // Sample case studies data
  const caseStudies = [
    {
      title: 'Nova Finance Dashboard',
      description: 'A cutting-edge financial platform with real-time data visualization and AI-powered insights.',
      image: { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Nova Finance Dashboard' },
      tags: ['Web App', 'Finance', 'Dashboard'],
      href: '/case-studies/nova-finance',
      metadata: {
        client: 'FinTech Solutions',
        year: '2023',
      },
      featured: true,
    },
    {
      title: 'Echo Social Platform',
      description: 'Next-generation social platform designed for creators with integrated monetization tools.',
      image: { src: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Echo Social Platform' },
      tags: ['Mobile App', 'Social Media', 'Creator Economy'],
      href: '/case-studies/echo-social',
      metadata: {
        client: 'Echo Inc.',
        year: '2023',
      },
      featured: true,
    },
    {
      title: 'Pulse Health Tracker',
      description: 'Health and fitness tracking platform with personalized insights and coaching.',
      image: { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Pulse Health Tracker' },
      tags: ['Mobile App', 'Healthcare', 'IoT'],
      href: '/case-studies/pulse-health',
      metadata: {
        client: 'Pulse Health',
        year: '2023',
      },
      featured: true,
    },
    {
      title: 'Quantum Analytics Platform',
      description: 'Advanced analytics platform providing businesses with actionable insights from complex data.',
      image: { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Quantum Analytics Platform' },
      tags: ['Analytics', 'AI', 'Enterprise'],
      href: '/case-studies/quantum-analytics',
      metadata: {
        client: 'Quantum Data',
        year: '2022',
      },
      featured: false,
    },
  ];

  // Filter case studies based on props
  const filteredCaseStudies = featured 
    ? caseStudies.filter(study => study.featured).slice(0, limit)
    : caseStudies.slice(0, limit);

  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-64 -right-64 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-64 -left-64 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl opacity-30" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="max-w-2xl mb-8 md:mb-0">
            <FadeInWhenVisible>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Our <span className="gradient-text">Latest</span> Case Studies
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-gray-300">
                Explore our recent projects and discover how we've helped businesses transform their digital presence.
              </p>
            </FadeInWhenVisible>
          </div>
          <FadeInWhenVisible delay={0.3}>
            <Button href="/case-studies" variant="outline">
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </FadeInWhenVisible>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaseStudies.map((study, index) => (
            <FadeInWhenVisible key={index} delay={0.1 * index}>
              <Card
                title={study.title}
                description={study.description}
                image={study.image}
                tags={study.tags}
                href={study.href}
                metadata={study.metadata}
                variant="caseStudy"
              />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}