// pages/index.tsx
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import DefaultLayout from '../components/layouts/DefaultLayout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { ArrowRight, Code, Layout, Smartphone, LineChart, Award, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Import Particles component dynamically with SSR disabled
const Particles = dynamic(() => import('../components/sections/Particles'), { 
  ssr: false 
});

// Animated text for hero section
const AnimatedText = ({ text }: { text: string }) => {
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
  };
  
  return (
    <motion.div
      className="flex flex-wrap gap-x-2"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={item}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

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

// Feature cards data
const features = [
  {
    title: 'Web Development',
    description: 'We build high-performance websites and web applications using cutting-edge technologies.',
    icon: <Code size={32} />,
    href: '/services#web-development',
  },
  {
    title: 'UX/UI Design',
    description: 'Our design team creates immersive interfaces that engage users and drive conversions.',
    icon: <Layout size={32} />,
    href: '/services#uxui-design',
  },
  {
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    icon: <Smartphone size={32} />,
    href: '/services#mobile-development',
  },
  {
    title: 'Data Visualization',
    description: 'Transform complex data into meaningful insights with interactive visualizations.',
    icon: <LineChart size={32} />,
    href: '/services#data-visualization',
  },
];

// Case studies data
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
  },
];

// Blog posts data
const blogPosts = [
  {
    title: 'The Future of Web Design: Trends to Watch in 2025',
    description: 'Explore the emerging design patterns and technologies shaping the future of digital experiences.',
    image: { src: 'https://images.unsplash.com/photo-1545239351-cefa43af60f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Web Design Trends' },
    tags: ['Design', 'Trends'],
    href: '/blog/future-web-design-trends',
    metadata: {
      date: 'March 25, 2025',
      readTime: '6 min read',
    },
  },
  {
    title: 'Building Performance-First Web Applications',
    description: 'Performance optimization strategies that boost user experience and conversion rates.',
    image: { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Web Performance' },
    tags: ['Development', 'Performance'],
    href: '/blog/performance-first-applications',
    metadata: {
      date: 'March 10, 2025',
      readTime: '8 min read',
    },
  },
  {
    title: 'Ethical AI in Digital Products',
    description: 'How to implement AI in your digital products while maintaining ethical standards and user trust.',
    image: { src: 'https://images.unsplash.com/photo-1502101872923-d48509bff386?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Ethical AI' },
    tags: ['AI', 'Ethics'],
    href: '/blog/ethical-ai-digital-products',
    metadata: {
      date: 'February 28, 2025',
      readTime: '5 min read',
    },
  },
];

// Client logos
const clients = [
  { name: 'Company A', logo: '/logo-a.svg' },
  { name: 'Company B', logo: '/logo-b.svg' },
  { name: 'Company C', logo: '/logo-c.svg' },
  { name: 'Company D', logo: '/logo-d.svg' },
  { name: 'Company E', logo: '/logo-e.svg' },
  { name: 'Company F', logo: '/logo-f.svg' },
];

export default function HomePage() {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-16 overflow-hidden">
        {/* Only render Particles on client-side */}
        <Particles />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4 inline-block py-1 px-3 bg-accent-teal/10 rounded-full border border-accent-teal/30"
              >
                <span className="text-accent-teal text-sm font-medium">Redefining Digital Experiences</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-ink-dark">
                <AnimatedText text="Creating Digital Products From The Future" />
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-ink-light mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                We build cutting-edge digital experiences that push the boundaries of what's possible online.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Button href="/contact" size="lg">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button href="/case-studies" variant="outline" size="lg">
                  View Our Work
                </Button>
              </motion.div>
            </div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="w-full h-[500px] relative animated-border card-panel overflow-hidden">
                <div className="p-4 h-full flex items-center justify-center">
                  <motion.div
                    className="w-full h-full relative rounded-lg overflow-hidden"
                    animate={{ 
                      boxShadow: ['0 0 10px rgba(11, 166, 170, 0.3)', '0 0 20px rgba(11, 166, 170, 0.6)', '0 0 10px rgba(11, 166, 170, 0.3)'] 
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  >
                    <Image 
                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                      alt="Futuristic Dashboard Interface"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </motion.div>
                </div>
              </div>
              
              {/* Floating elements around the image */}
              <motion.div 
                className="absolute -top-8 -right-8 w-24 h-24 bg-accent-purple/30 rounded-full blur-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
              <motion.div 
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-teal/20 rounded-full blur-2xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-ink-lightest mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-sky-dark rounded-full flex justify-center items-start p-1">
              <motion.div 
                className="w-1.5 h-1.5 bg-accent-teal rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeInWhenVisible>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-ink-dark">
                Delivering <span className="gradient-text">Exceptional</span> Digital Solutions
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-ink-light">
                Our team specializes in creating innovative digital products that combine cutting-edge technology with stunning design.
              </p>
            </FadeInWhenVisible>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FadeInWhenVisible key={index} delay={0.1 * index}>
                <Card
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  href={feature.href}
                  variant="feature"
                />
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Studies Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-64 -right-64 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-64 -left-64 w-96 h-96 bg-accent-teal/20 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div className="max-w-2xl mb-8 md:mb-0">
              <FadeInWhenVisible>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-ink-dark">
                  Our <span className="gradient-text">Latest</span> Case Studies
                </h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.2}>
                <p className="text-xl text-ink-light">
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
            {caseStudies.map((study, index) => (
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
      
      {/* Testimonial Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInWhenVisible>
            <div className="max-w-4xl mx-auto card-panel p-8 md:p-12">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-accent-purple/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-accent-purple" />
                </div>
              </div>
              <blockquote className="text-xl md:text-2xl font-medium text-center text-ink-dark mb-8">
                "Futura completely transformed our digital presence. Their team delivered a cutting-edge solution that exceeded our expectations and helped us increase conversions by 150%."
              </blockquote>
              <div className="flex flex-col items-center">
                <p className="font-bold text-ink-dark">Sarah Johnson</p>
                <p className="text-ink-light">Chief Marketing Officer, TechVision Inc.</p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div className="max-w-2xl mb-8 md:mb-0">
              <FadeInWhenVisible>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-ink-dark">
                  Latest <span className="gradient-text">Insights</span>
                </h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.2}>
                <p className="text-xl text-ink-light">
                  Stay updated with our latest thoughts on technology, design, and digital transformation.
                </p>
              </FadeInWhenVisible>
            </div>
            <FadeInWhenVisible delay={0.3}>
              <Button href="/blog" variant="outline">
                View All Articles
                <ArrowRight className="ml-2 h-4 h-4" />
              </Button>
            </FadeInWhenVisible>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <FadeInWhenVisible key={index} delay={0.1 * index}>
                <Card
                  title={post.title}
                  description={post.description}
                  image={post.image}
                  tags={post.tags}
                  href={post.href}
                  metadata={post.metadata}
                  variant="blog"
                />
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-80 bg-gradient-to-r from-accent-teal/20 to-accent-purple/20 rounded-3xl blur-3xl opacity-40" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto card-panel p-8 md:p-12 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-ink-dark">
                Stay on the cutting edge
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-ink-light mb-8">
                Subscribe to our newsletter to receive the latest insights on technology trends, design inspiration, and digital strategy.
              </p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.3}>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 bg-white border border-sky-medium/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-teal/50 text-ink"
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.4}>
              <p className="text-sm text-ink-lightest mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
      
      {/* Clients Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInWhenVisible>
            <h2 className="text-2xl font-bold text-center mb-12 text-ink-dark">
              Trusted by industry leaders
            </h2>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.2}>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  className="w-32 h-12 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Replace with actual client logos */}
                  <div className="w-full h-full flex items-center justify-center bg-sky-medium/20 rounded-md">
                    <span className="text-ink-dark font-bold">{client.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -bottom-64 -right-64 w-96 h-96 bg-accent-teal/20 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto card-panel p-8 md:p-12 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-ink-dark">
                Ready to build something <span className="gradient-text">amazing</span>?
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-ink-light mb-8 max-w-2xl mx-auto">
                Let's collaborate to create innovative digital experiences that drive growth and engage your audience.
              </p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.3}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button href="/contact" size="lg">
                  Start a Project
                </Button>
                <Button href="/services" variant="outline" size="lg">
                  Explore Our Services
                </Button>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}