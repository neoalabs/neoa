// Form data type
interface FormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
}

// Form field animation variants
const inputVariants = {
  focus: {
    borderColor: 'rgba(59, 130, 246, 0.8)',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
    y: -4,
  },
  blur: {
    borderColor: 'rgba(75, 85, 99, 0.1)',
    boxShadow: 'none',
    y: 0,
  },
};// Animated text for hero section
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
};// Import Particles component dynamically with SSR disabled
const Particles = dynamic(() => import('./Particles'), { 
ssr: false 
});

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
};import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { 
ArrowRight, 
ChevronRight, 
Code, 
Smartphone,
Zap,
Play,
Star,
Check,
MessageSquare,
BrainCircuit,
Box,
Sparkles,
Mail,
Phone,
MapPin,
Calendar,
Clock,
Menu,
X,
ExternalLink,
ChevronLeft,
Search,
AlertCircle
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Custom hook for mouse parallax effect
const useMouseParallax = (strength = 20) => {
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const moveX = (clientX - centerX) / centerX * strength;
    const moveY = (clientY - centerY) / centerY * strength;
    
    setMousePosition({ x: moveX, y: moveY });
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, [strength]);

return mousePosition;
};

interface Service3DCardProps {
title: string;
description: string;
icon: React.ReactNode;
color: string;
index: number;
}

// 3D Card Component for Services
const Service3DCard = ({ title, description, icon, color, index }: Service3DCardProps) => {
const [isHovered, setIsHovered] = useState(false);
const { ref, inView } = useInView({
  threshold: 0.1,
  triggerOnce: true,
});

return (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="h-full"
  >
    <motion.div
      className={`relative glass-card h-full rounded-2xl p-8 overflow-hidden border border-white/10 backdrop-blur-sm bg-gradient-to-br ${
        color === 'teal' ? 'from-accent-teal/5 to-accent-teal/10' :
        color === 'purple' ? 'from-accent-purple/5 to-accent-purple/10' :
        color === 'coral' ? 'from-accent-coral/5 to-accent-coral/10' :
        'from-accent-blue/5 to-accent-blue/10'
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -5,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(11, 166, 170, 0.2)'
      }}
    >
      {/* Background Gradient Blob */}
      <motion.div 
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${
          color === 'teal' ? 'bg-accent-teal/20' :
          color === 'purple' ? 'bg-accent-purple/20' :
          color === 'coral' ? 'bg-accent-coral/20' :
          'bg-accent-blue/20'
        } blur-3xl opacity-50 z-0`}
        animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="relative z-10">
        <motion.div 
          className={`w-16 h-16 rounded-xl ${
            color === 'teal' ? 'bg-accent-teal/20 text-accent-teal' :
            color === 'purple' ? 'bg-accent-purple/20 text-accent-purple' :
            color === 'coral' ? 'bg-accent-coral/20 text-accent-coral' :
            'bg-accent-blue/20 text-accent-blue'
          } flex items-center justify-center mb-6`}
          animate={isHovered ? { y: -5, rotate: -5 } : { y: 0, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        
        <motion.h3 
          className="text-xl font-bold mb-3 text-white"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-300 mb-6"
          animate={isHovered ? { opacity: 0.9 } : { opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
        
        <motion.div 
          className={`flex items-center font-medium ${
            color === 'teal' ? 'text-accent-teal' :
            color === 'purple' ? 'text-accent-purple' :
            color === 'coral' ? 'text-accent-coral' :
            'text-accent-blue'
          }`}
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Explore
          <motion.div
            animate={isHovered ? { x: 5, opacity: 1 } : { x: 0, opacity: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="ml-2 w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  </motion.div>
);
};

interface HighlightedTextProps {
text: string;
delay?: number;
}

// Highlighted Text Animation
const HighlightedText = ({ text, delay = 0 }: HighlightedTextProps) => {
const { ref, inView } = useInView({
  triggerOnce: true,
  threshold: 0.1,
});

return (
  <motion.span
    ref={ref}
    className="relative inline-block"
    initial={{ opacity: 0, y: 10 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
    transition={{ duration: 0.5, delay }}
  >
    <span className="relative z-10 text-white">{text}</span>
    <motion.span
      className="absolute left-0 bottom-0 w-full h-3 bg-accent-teal/20 rounded-sm -z-0"
      initial={{ width: 0 }}
      animate={inView ? { width: '100%' } : { width: 0 }}
      transition={{ duration: 0.3, delay: delay + 0.2 }}
    />
  </motion.span>
);
};

// The HomePage component
export default function HomePage() {
// State for scroll position
const [scrollY, setScrollY] = useState(0);

// Mouse position for parallax effect
const mousePosition = useMouseParallax(10);

// For scroll-based animations
const { scrollYProgress } = useScroll();

// Video modal state
const [videoModalOpen, setVideoModalOpen] = useState(false);

// Refs for scroll sections
const servicesRef = useRef(null);
const caseStudiesRef = useRef(null);
const processRef = useRef(null);

// Update scroll position for animation effects
useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

// Scroll to a section
const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
  if (ref.current) {
    window.scrollTo({
      top: ref.current.offsetTop - 80,
      behavior: 'smooth',
    });
  }
};

// Feature card data
const features = [
  {
    title: 'Prompt Engineering',
    description: 'Expert optimization of AI prompts to enhance output quality, precision, and relevance for specific use cases and objectives.',
    icon: <MessageSquare size={32} />,
    href: '/services#prompt-engineering',
    color: 'teal'
  },
  {
    title: 'AI Product Development',
    description: 'End-to-end development of innovative AI-powered applications, tools, and platforms tailored to your business needs.',
    icon: <BrainCircuit size={32} />,
    href: '/services#ai-product-development',
    color: 'purple'
  },
  {
    title: 'AI Research',
    description: 'Cutting-edge exploration and application of emerging AI techniques to solve complex business challenges.',
    icon: <Sparkles size={32} />,
    href: '/services#ai-research',
    color: 'coral'
  },
];

// Parallax effect values based on scroll
const heroImageY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
const heroGradientY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

// Navigation component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-2 bg-gray-900/90 backdrop-blur-md shadow-lg' : 'py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="sr-only">NEOA</span>
            <motion.div
              className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-xl">N</span>
            </motion.div>
            <span className="text-white font-bold text-xl hidden sm:inline-block">NEOA</span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm transition-colors duration-300 text-white hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-sm transition-colors duration-300 text-gray-300 hover:text-blue-400"
            >
              Services
            </Link>
            <Link
              href="/case-studies"
              className="text-sm transition-colors duration-300 text-gray-300 hover:text-blue-400"
            >
              Case Studies
            </Link>
            <Link
              href="/blog"
              className="text-sm transition-colors duration-300 text-gray-300 hover:text-blue-400"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm transition-colors duration-300 text-gray-300 hover:text-blue-400"
            >
              Contact
            </Link>
            <motion.button
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-blue-400 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-md md:hidden pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full pb-6 px-4">
              <nav className="flex flex-col space-y-8 mt-8">
                <Link
                  href="/"
                  className="text-xl font-medium transition-colors duration-300 text-white"
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="text-xl font-medium transition-colors duration-300 text-gray-300 hover:text-blue-400"
                >
                  Services
                </Link>
                <Link
                  href="/case-studies"
                  className="text-xl font-medium transition-colors duration-300 text-gray-300 hover:text-blue-400"
                >
                  Case Studies
                </Link>
                <Link
                  href="/blog"
                  className="text-xl font-medium transition-colors duration-300 text-gray-300 hover:text-blue-400"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-xl font-medium transition-colors duration-300 text-gray-300 hover:text-blue-400"
                >
                  Contact
                </Link>
                <button className="self-start px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium mt-4">
                  Get Started
                </button>
              </nav>
              <div className="mt-auto">
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-blue-400">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-blue-400">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Footer component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 relative overflow-hidden border-t border-gray-800">
      {/* Gradient background effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-white font-bold text-xl">NEOA</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-md">
              We build cutting-edge AI solutions that push the boundaries of what's possible with artificial intelligence. Our mission is to create technology that feels like it's from tomorrow.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-medium mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-medium mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/services#prompt-engineering" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Prompt Engineering
                </Link>
              </li>
              <li>
                <Link href="/services#ai-product-development" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  AI Product Development
                </Link>
              </li>
              <li>
                <Link href="/services#ai-research" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  AI Research
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-medium mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-400">info@neoa.ai</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-400">123 AI Avenue, San Francisco, CA 94107</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} NEOA. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

return (
  <div className="bg-gray-900 text-white">
    <Navigation />
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center py-16 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Animated Particles */}
      {isClient && <Particles count={50} />}
      
      {/* Background gradients */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: heroGradientY }}
      >
        <motion.div 
          className="absolute -top-64 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-30"
          animate={{ 
            x: mousePosition.x * -0.5,
            y: mousePosition.y * -0.5,
          }}
          transition={{ type: 'spring', stiffness: 75 }}
        />
        <motion.div 
          className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-30"
          animate={{ 
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
          transition={{ type: 'spring', stiffness: 75 }}
        />
      </motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center mb-6 py-1.5 px-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full border border-blue-500/30 backdrop-blur-sm"
            >
              <motion.div
                className="w-4 h-4 rounded-full bg-blue-500 mr-2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
              <span className="text-blue-400 text-sm font-medium">Pioneering AI Solutions</span>
            </motion.div>
            
            {/* Hero Title with staggered animation */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white">
              <AnimatedText text="Innovating AI Solutions For The Future World" />
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Leverage the power of artificial intelligence to transform your business with cutting-edge solutions.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link href="/contact">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium flex items-center">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              
              <motion.button
                className="flex items-center font-medium text-gray-300 hover:text-white gap-3 transition-colors duration-300 py-2"
                onClick={() => setVideoModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                  >
                    <Play className="h-5 w-5 text-white" />
                  </motion.div>
                </div>
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>
            
            {/* Quick Section Links */}
            <motion.div 
              className="mt-12 flex flex-wrap gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <button 
                onClick={() => scrollToSection(servicesRef)}
                className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors duration-300"
              >
                <div className="w-6 h-0.5 bg-gray-700"></div>
                Services
              </button>
              <button 
                onClick={() => scrollToSection(caseStudiesRef)}
                className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors duration-300"
              >
                <div className="w-6 h-0.5 bg-gray-700"></div>
                Case Studies
              </button>
              <button 
                onClick={() => scrollToSection(processRef)}
                className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors duration-300"
              >
                <div className="w-6 h-0.5 bg-gray-700"></div>
                Our Process
              </button>
            </motion.div>
          </div>
          
          {/* Hero Image with 3D parallax effect */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{ y: heroImageY }}
          >
            <div className="w-full h-[500px] relative z-10">
              <div className="relative w-full h-full">
                {/* Background card */}
                <motion.div 
                  className="absolute inset-8 rounded-2xl backdrop-blur-sm border border-white/10 bg-gradient-to-br from-white/5 to-white/10 z-0 shadow-2xl"
                  animate={{ 
                    x: mousePosition.x * 0.04,
                    y: mousePosition.y * 0.04,
                    rotateX: mousePosition.y * -0.01,
                    rotateY: mousePosition.x * 0.01,
                  }}
                  transition={{ type: 'spring', stiffness: 75 }}
                />
                
                {/* Main image */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border border-white/20"
                  animate={{ 
                    x: mousePosition.x * 0.02,
                    y: mousePosition.y * 0.02,
                    rotateX: mousePosition.y * -0.005,
                    rotateY: mousePosition.x * 0.005,
                  }}
                  transition={{ type: 'spring', stiffness: 75 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 via-blue-900 to-cyan-900 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-3/4 h-3/4 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
                        <div className="relative z-10 text-center">
                          <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 mb-4">NEOA</div>
                          <div className="text-xl text-gray-300">Advanced AI Solutions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay gradient */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay"
                    animate={{ 
                      opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                  />
                  
                  {/* Glass overlay elements */}
                  <motion.div 
                    className="absolute top-8 left-8 p-4 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-lg"
                    animate={{ 
                      x: mousePosition.x * 0.06,
                      y: mousePosition.y * 0.06,
                    }}
                    transition={{ type: 'spring', stiffness: 50 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <BrainCircuit className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-xs text-white/70">Accuracy</div>
                        <div className="text-white font-medium">+ 95.2%</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute bottom-8 right-8 p-4 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-lg"
                    animate={{ 
                      x: mousePosition.x * 0.08,
                      y: mousePosition.y * 0.08,
                    }}
                    transition={{ type: 'spring', stiffness: 50 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Star className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-xs text-white/70">Client Satisfaction</div>
                        <div className="text-white font-medium">99.3%</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-8 right-12 w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 backdrop-blur-xl shadow-xl flex items-center justify-center border border-white/20 z-20"
                  animate={{ 
                    y: [0, -10, 0],
                    x: mousePosition.x * 0.1,
                    rotateZ: mousePosition.x * 0.02,
                  }}
                  transition={{ 
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    },
                    x: { type: 'spring', stiffness: 50 }
                  }}
                >
                  <MessageSquare className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-5 left-12 w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 backdrop-blur-xl shadow-xl flex items-center justify-center border border-white/20 z-20"
                  animate={{ 
                    y: [0, 10, 0],
                    x: mousePosition.x * 0.1,
                    rotateZ: mousePosition.x * -0.02,
                  }}
                  transition={{ 
                    y: {
                      duration: 4,
                      delay: 1,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    },
                    x: { type: 'spring', stiffness: 50 }
                  }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/30 rounded-full blur-3xl opacity-50 z-0"
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
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/30 rounded-full blur-3xl opacity-50 z-0"
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.div 
          className="flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center items-start p-1">
            <motion.div 
              className="w-1.5 h-1.5 bg-blue-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
    
    {/* Stats Section */}
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="p-4 py-12 md:py-16 rounded-3xl bg-gray-800/50 border border-gray-700 backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <motion.div 
                className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                98%
              </motion.div>
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Client Satisfaction
              </motion.p>
            </div>
            
            <div className="text-center">
              <motion.div 
                className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                75+
              </motion.div>
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Projects Completed
              </motion.p>
            </div>
            
            <div className="text-center">
              <motion.div 
                className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                12+
              </motion.div>
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Industry Awards
              </motion.p>
            </div>
            
            <div className="text-center">
              <motion.div 
                className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                250+
              </motion.div>
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Happy Clients
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Services Section */}
    <section ref={servicesRef} className="py-20 md:py-32 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-30" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center mb-4 py-1 px-3 bg-gradient-to-r from-blue-500/5 to-blue-500/10 rounded-full border border-blue-500/30"
          >
            <span className="text-blue-400 text-sm font-medium">Our Expertise</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Delivering <HighlightedText text="Advanced" delay={0.2} /> AI Solutions
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Our team specializes in creating innovative AI solutions that leverage cutting-edge technology to solve complex business challenges.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Service3DCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              index={index}
            />
          ))}
        </div>
        
        {/* Services CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className="px-6 py-2.5 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-blue-500 transition-colors duration-300 flex items-center mx-auto">
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
    
    {/* CTA Section */}
    <section className="py-20 md:py-32 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl opacity-40"
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto p-8 md:p-12 text-center rounded-3xl border border-gray-700 bg-gray-800/50 backdrop-blur-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to build something <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">amazing</span>?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let's collaborate to create innovative AI experiences that drive growth and transform your business.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium">
              Start a Project
            </button>
            <button className="px-6 py-3 border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white rounded-lg font-medium transition-colors duration-300">
              Explore Our Services
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
    
    {/* Case Studies Section */}
    <section ref={caseStudiesRef} className="py-20 md:py-32 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-64 -right-64 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-64 -left-64 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-30" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="max-w-2xl mb-8 md:mb-0">
            <FadeInWhenVisible>
              <div className="inline-flex items-center mb-4 py-1 px-3 bg-gradient-to-r from-purple-500/5 to-purple-500/10 rounded-full border border-purple-500/30">
                <span className="text-purple-400 text-sm font-medium">Featured Projects</span>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Our <HighlightedText text="Latest" delay={0.2} /> Case Studies
              </h2>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-gray-300">
                Explore our recent projects and discover how we've helped businesses transform with AI.
              </p>
            </FadeInWhenVisible>
          </div>
          
          <FadeInWhenVisible delay={0.3}>
            <Link href="/case-studies">
              <button className="px-6 py-2.5 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-purple-500 transition-colors duration-300 flex items-center">
                View All Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </FadeInWhenVisible>
        </div>
        
        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Case Study 1 */}
          <FadeInWhenVisible delay={0.1}>
            <div className="rounded-3xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-colors duration-300 h-full">
              <div className="aspect-w-16 aspect-h-9 w-full relative">
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <div className="p-6 text-center">
                    <BrainCircuit className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">AI-Powered Customer Service</h3>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">
                    Large Language Models
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">AI Customer Service Platform</h3>
                <p className="text-gray-400 mb-6 line-clamp-2">An intelligent customer service platform that uses LLMs to handle queries and reduce response time by 75%.</p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-800">
                  <div className="text-sm text-gray-500">
                    TechCorp Inc.
                  </div>
                  <div className="flex items-center text-blue-400 text-sm font-medium">
                    <span>View Details</span>
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
          
          {/* Case Study 2 */}
          <FadeInWhenVisible delay={0.2}>
            <div className="rounded-3xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-colors duration-300 h-full">
              <div className="aspect-w-16 aspect-h-9 w-full relative">
                <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                  <div className="p-6 text-center">
                    <MessageSquare className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Prompt Engineering Suite</h3>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">
                    Prompt Engineering
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">Enterprise Prompt Engineering Tools</h3>
                <p className="text-gray-400 mb-6 line-clamp-2">A comprehensive suite of prompt engineering tools that improved output quality by 42% for a major enterprise.</p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-800">
                  <div className="text-sm text-gray-500">
                    Innovate AI
                  </div>
                  <div className="flex items-center text-purple-400 text-sm font-medium">
                    <span>View Details</span>
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
          
          {/* Case Study 3 */}
          <FadeInWhenVisible delay={0.3}>
            <div className="rounded-3xl overflow-hidden border border-gray-800 hover:border-cyan-500/30 transition-colors duration-300 h-full">
              <div className="aspect-w-16 aspect-h-9 w-full relative">
                <div className="w-full h-full bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center">
                  <div className="p-6 text-center">
                    <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Predictive Analytics</h3>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">
                    AI Research
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">AI-Driven Market Prediction</h3>
                <p className="text-gray-400 mb-6 line-clamp-2">Custom AI research that led to a predictive model with 87% accuracy for market trend forecasting.</p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-800">
                  <div className="text-sm text-gray-500">
                    Global Finance Group
                  </div>
                  <div className="flex items-center text-cyan-400 text-sm font-medium">
                    <span>View Details</span>
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
    
    {/* Blog Section */}
    <section className="py-20 md:py-32 relative bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="max-w-2xl mb-8 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center mb-4 py-1 px-3 bg-gradient-to-r from-cyan-500/5 to-cyan-500/10 rounded-full border border-cyan-500/30"
            >
              <span className="text-cyan-400 text-sm font-medium">Our Thinking</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Latest <HighlightedText text="Insights" delay={0.2} />
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Stay updated with our latest thoughts on AI technology, trends, and digital transformation.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button className="px-6 py-2.5 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-cyan-500 transition-colors duration-300 flex items-center">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Post 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -10 }}
            className="cursor-pointer"
          >
            <div className="rounded-3xl overflow-hidden border border-gray-800 hover:border-cyan-500/30 transition-colors duration-300 h-full">
              <div className="aspect-w-16 aspect-h-9 w-full relative">
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-cyan-900 flex items-center justify-center">
                  <div className="p-6 text-center">
                    <BrainCircuit className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">The Future of LLMs</h3>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">
                    AI Trends
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-3 text-white hover:text-cyan-400 transition-colors duration-300">The Evolution of Large Language Models: What's Next?</h3>
                <p className="text-gray-400 mb-6 line-clamp-2 flex-grow">Exploring the future developments of LLMs and how they will transform industries in the coming years.</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-800">
                  <div>April 5, 2025</div>
                  <div>5 min read</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Blog Post 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="cursor-pointer"
          >
            <div className="rounded-3xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-colors duration-300 h-full">
              <div className="aspect-w-16 aspect-h-9 w-full relative">
                <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                  <div className="p-6 text-center">
                    <MessageSquare className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Prompt Engineering</h3>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">
                    Best Practices
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-3 text-white hover:text-purple-400 transition-colors duration-300">Advanced Prompt Engineering Techniques for Enterprise</h3>
                <p className="text-gray-400 mb-6 line-clamp-2 flex-grow">Learn the latest prompt engineering techniques that are delivering exceptional results for enterprise applications.</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-800">
                  <div>March 18, 2025</div>
                  <div>7 min read</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Blog Post 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -10 }}
            className="cursor-pointer"
          >
            <div className="rounded-3xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-colors duration-300 h-full">
              <div className="aspect-w-16 aspect-h-9 w-full relative">
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
                  <div className="p-6 text-center">
                    <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">AI Ethics</h3>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">
                    AI Research
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-3 text-white hover:text-blue-400 transition-colors duration-300">Ethical Considerations in AI: Building Responsible Systems</h3>
                <p className="text-gray-400 mb-6 line-clamp-2 flex-grow">Exploring the ethical dimensions of AI development and how to ensure your AI systems are built responsibly.</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-800">
                  <div>March 2, 2025</div>
                  <div>6 min read</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    
    {/* Contact Form Section */}
    <section className="py-20 md:py-32 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-30" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ready to start your AI journey? Fill out the form below and our team will be in touch.
            </motion.p>
          </div>
          
          <motion.div
            className="rounded-3xl p-8 border border-gray-800 bg-gray-900/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form className="space-y-6">
              {/* Name field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Full Name <span className="text-purple-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address <span className="text-purple-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              {/* Service field */}
              <div className="space-y-2">
                <label htmlFor="service" className="block text-sm font-medium text-gray-300">
                  Service Interested In <span className="text-purple-400">*</span>
                </label>
                <select
                  id="service"
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white appearance-none"
                  required
                >
                  <option value="" disabled selected>Select a service</option>
                  <option value="prompt-engineering">Prompt Engineering</option>
                  <option value="ai-product-development">AI Product Development</option>
                  <option value="ai-research">AI Research</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {/* Message field */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message <span className="text-purple-400">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                  placeholder="Tell us about your project..."
                  required
                ></textarea>
              </div>
              
              {/* Submit button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
    
    <Footer />
  </div>
);
}