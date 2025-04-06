// pages/index.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import DefaultLayout from '../components/layouts/DefaultLayout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { 
  ArrowRight, 
  ChevronRight, 
  Code, 
  Layout, 
  Smartphone, 
  LineChart, 
  Award, 
  MousePointer, 
  Eye, 
  Zap,
  ArrowUpRight,
  Star,
  Check,
  Play
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Import Particles component dynamically with SSR disabled
const Particles = dynamic(() => import('../components/sections/Particles'), { 
  ssr: false 
});

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

// 3D Card Component for Services
const Service3DCard = ({ title, description, icon, color, index }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  color: string;
  index: number;
}) => {
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
            className="text-xl font-bold mb-3"
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-ink-light mb-6"
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
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Highlighted Text Animation
const HighlightedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
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
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute left-0 bottom-0 w-full h-3 bg-accent-teal/20 rounded-sm -z-0"
        initial={{ width: 0 }}
        animate={inView ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
      />
    </motion.span>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, delay = 0 }: { end: number; duration?: number; delay?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        setCount(Math.min(Math.floor(start), end));
        
        if (start >= end) {
          clearInterval(timer);
        }
      }, 1000 / 60);
      
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);
  
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {count}
    </motion.span>
  );
};

// Feature card data
const features = [
  {
    title: 'Web Development',
    description: 'We build high-performance websites and web applications using cutting-edge technologies.',
    icon: <Code size={32} />,
    href: '/services#web-development',
    color: 'teal'
  },
  {
    title: 'UX/UI Design',
    description: 'Our design team creates immersive interfaces that engage users and drive conversions.',
    icon: <Layout size={32} />,
    href: '/services#uxui-design',
    color: 'purple'
  },
  {
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    icon: <Smartphone size={32} />,
    href: '/services#mobile-development',
    color: 'coral'
  },
  {
    title: 'Data Visualization',
    description: 'Transform complex data into meaningful insights with interactive visualizations.',
    icon: <LineChart size={32} />,
    href: '/services#data-visualization',
    color: 'blue'
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

// Stats data
const stats = [
  { value: 98, label: 'Client Satisfaction', symbol: '%' },
  { value: 75, label: 'Projects Completed', symbol: '+' },
  { value: 12, label: 'Industry Awards', symbol: '+' },
  { value: 250, label: 'Happy Clients', symbol: '+' },
];

// Process steps
const processSteps = [
  {
    title: 'Discovery',
    description: 'We learn about your business, goals, and vision to define the project scope.',
    icon: <Eye size={24} />
  },
  {
    title: 'Strategy',
    description: 'We develop a comprehensive strategy and technical approach tailored to your needs.',
    icon: <MousePointer size={24} />
  },
  {
    title: 'Execution',
    description: 'Our team designs and develops your solution using cutting-edge technologies.',
    icon: <Code size={24} />
  },
  {
    title: 'Launch',
    description: 'We deploy your solution and ensure a smooth transition to the live environment.',
    icon: <Zap size={24} />
  }
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
  // State for scroll position
  const [scrollY, setScrollY] = useState(0);
  
  // Mouse position for parallax effect
  const mousePosition = useMouseParallax(10);
  
  // For scroll-based animations
  const { scrollYProgress } = useScroll();
  
  // Video modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  // Selected case study for expanded view
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<number | null>(null);
  
  // Refs for scroll sections
  const servicesRef = useRef<HTMLElement>(null);
  const caseStudiesRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  
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
  
  // Parallax effect values based on scroll
  const heroImageY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const heroGradientY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-16 overflow-hidden">
        {/* Animated Particles */}
        <Particles count={80} />
        
        {/* Background gradients */}
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ y: heroGradientY }}
        >
          <motion.div 
            className="absolute -top-64 left-1/4 w-96 h-96 bg-accent-teal/20 rounded-full blur-3xl opacity-30"
            animate={{ 
              x: mousePosition.x * -0.5,
              y: mousePosition.y * -0.5,
            }}
            transition={{ type: 'spring', stiffness: 75 }}
          />
          <motion.div 
            className="absolute top-1/3 -right-32 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl opacity-30"
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
                className="inline-flex items-center mb-6 py-1.5 px-4 bg-gradient-to-r from-accent-teal/10 to-accent-purple/10 rounded-full border border-accent-teal/30 backdrop-blur-sm"
              >
                <motion.div
                  className="w-4 h-4 rounded-full bg-accent-teal mr-2"
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
                <span className="text-accent-teal text-sm font-medium">Redefining Digital Experiences</span>
              </motion.div>
              
              {/* Hero Title with staggered animation */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-ink-dark">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="overflow-hidden"
                >
                  <motion.span
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="inline-block"
                  >
                    Creating 
                  </motion.span>{" "}
                  <motion.span
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="inline-block"
                  >
                    <span className="gradient-text">Digital</span>
                  </motion.span>{" "}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="overflow-hidden"
                >
                  <motion.span
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="inline-block"
                  >
                    Products 
                  </motion.span>{" "}
                  <motion.span
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="inline-block"
                  >
                    From
                  </motion.span>{" "}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="overflow-hidden"
                >
                  <motion.span
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="inline-block"
                  >
                    The 
                  </motion.span>{" "}
                  <motion.span
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className="inline-block coral-gradient-text"
                  >
                    Future
                  </motion.span>
                </motion.div>
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-ink-light mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                We build cutting-edge digital experiences that push the boundaries of what's possible online.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Button href="/contact" size="lg">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                
                <motion.button
                  className="flex items-center font-medium text-ink-light hover:text-accent-teal gap-3 transition-colors duration-300 py-2"
                  onClick={() => setVideoModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center">
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
                      <Play className="h-5 w-5 text-accent-teal fill-accent-teal" />
                    </motion.div>
                  </div>
                  <span>Watch Showreel</span>
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
                  className="text-sm text-ink-light hover:text-accent-teal flex items-center gap-1 transition-colors duration-300"
                >
                  <div className="w-6 h-0.5 bg-ink-light/30"></div>
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection(caseStudiesRef)}
                  className="text-sm text-ink-light hover:text-accent-teal flex items-center gap-1 transition-colors duration-300"
                >
                  <div className="w-6 h-0.5 bg-ink-light/30"></div>
                  Case Studies
                </button>
                <button 
                  onClick={() => scrollToSection(processRef)}
                  className="text-sm text-ink-light hover:text-accent-teal flex items-center gap-1 transition-colors duration-300"
                >
                  <div className="w-6 h-0.5 bg-ink-light/30"></div>
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
                    className="absolute inset-8 rounded-2xl backdrop-blur-sm border border-white/20 bg-gradient-to-br from-white/5 to-white/10 z-0 shadow-2xl"
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
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border border-white/30"
                    animate={{ 
                      x: mousePosition.x * 0.02,
                      y: mousePosition.y * 0.02,
                      rotateX: mousePosition.y * -0.005,
                      rotateY: mousePosition.x * 0.005,
                    }}
                    transition={{ type: 'spring', stiffness: 75 }}
                  >
                    <Image 
                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                      alt="Futuristic Dashboard Interface"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-3xl"
                    />
                    
                    {/* Overlay gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-accent-teal/20 to-accent-purple/20 mix-blend-overlay"
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
                        <div className="w-10 h-10 rounded-full bg-accent-teal/20 flex items-center justify-center">
                          <LineChart className="w-5 h-5 text-accent-teal" />
                        </div>
                        <div>
                          <div className="text-xs text-white/70">Conversion Rate</div>
                          <div className="text-white font-medium">+ 23.5%</div>
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
                        <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center">
                          <Star className="w-5 h-5 text-accent-purple" />
                        </div>
                        <div>
                          <div className="text-xs text-white/70">User Satisfaction</div>
                          <div className="text-white font-medium">98.2%</div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Floating elements */}
                  <motion.div 
                    className="absolute -top-8 right-12 w-16 h-16 rounded-lg bg-white backdrop-blur-xl shadow-xl flex items-center justify-center border border-white/20 z-20"
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
                    <Code className="w-8 h-8 text-accent-teal" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-5 left-12 w-16 h-16 rounded-lg bg-white backdrop-blur-xl shadow-xl flex items-center justify-center border border-white/20 z-20"
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
                    <Layout className="w-8 h-8 text-accent-purple" />
                  </motion.div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-10 -right-10 w-32 h-32 bg-accent-purple/30 rounded-full blur-3xl opacity-50 z-0"
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
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-teal/30 rounded-full blur-3xl opacity-50 z-0"
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
            <span className="text-sm text-ink-lightest mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-sky-dark rounded-full flex justify-center items-start p-1">
              <motion.div 
                className="w-1.5 h-1.5 bg-accent-teal rounded-full"
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
          <div className="glass-panel p-4 py-12 md:py-16 rounded-3xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold mb-2 gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <AnimatedCounter end={stat.value} delay={index * 0.1} />
                    {stat.symbol}
                  </motion.div>
                  <motion.p 
                    className="text-ink-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {stat.label}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section ref={servicesRef} className="py-20 md:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-teal/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center mb-4 py-1 px-3 bg-gradient-to-r from-accent-teal/5 to-accent-teal/10 rounded-full border border-accent-teal/30"
            >
              <span className="text-accent-teal text-sm font-medium">Our Expertise</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-ink-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Delivering <HighlightedText text="Exceptional" delay={0.2} /> Digital Solutions
            </motion.h2>
            
            <motion.p 
              className="text-xl text-ink-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Our team specializes in creating innovative digital products that combine cutting-edge technology with stunning design.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <Button href="/services" variant="outline">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Process Section */}
      <section ref={processRef} className="py-20 md:py-32 relative bg-gradient-to-b from-accent-teal/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center mb-4 py-1 px-3 bg-gradient-to-r from-accent-purple/5 to-accent-purple/10 rounded-full border border-accent-purple/30"
            >
              <span className="text-accent-purple text-sm font-medium">Our Approach</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-ink-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A <HighlightedText text="Proven" delay={0.2} /> Process
            </motion.h2>
            
            <motion.p 
              className="text-xl text-ink-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              We follow a systematic approach to ensure every project is delivered with excellence.
            </motion.p>
          </div>
          
          <div className="relative">
            {/* Process Step Timeline */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-teal/30 to-transparent hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {processSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <motion.div 
                    className="relative z-10 w-24 h-24 rounded-full bg-white/80 backdrop-blur-sm shadow-xl flex items-center justify-center mx-auto mb-6 border border-accent-teal/20"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 20px rgba(11, 166, 170, 0.3)'
                    }}
                  >
                    <div className="absolute inset-1 bg-gradient-to-br from-accent-teal/5 to-accent-purple/5 rounded-full" />
                    <div className="relative z-10">
                      <div className="flex flex-col items-center">
                        <div className="text-accent-teal">{step.icon}</div>
                        <div className="text-lg font-bold mt-1">{index + 1}</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-bold mb-3 text-center"
                    whileHover={{ color: '#0BA6AA' }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.title}
                  </motion.h3>
                  
                  <p className="text-ink-light text-center">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Process Benefits */}
          <div className="mt-20 glass-panel p-8 rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <div className="w-12 h-12 rounded-full bg-accent-teal/10 text-accent-teal flex items-center justify-center mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Efficient Delivery</h3>
                <p className="text-ink-light">Our structured approach ensures timely delivery without compromising quality.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col"
              >
                <div className="w-12 h-12 rounded-full bg-accent-purple/10 text-accent-purple flex items-center justify-center mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Transparent Communication</h3>
                <p className="text-ink-light">We keep you informed at every stage with clear, consistent updates.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col"
              >
                <div className="w-12 h-12 rounded-full bg-accent-coral/10 text-accent-coral flex items-center justify-center mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Continuous Improvement</h3>
                <p className="text-ink-light">We iterate based on feedback and data to ensure optimal results.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies Section */}
      <section ref={caseStudiesRef} className="py-20 md:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-64 -right-64 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-64 -left-64 w-96 h-96 bg-accent-teal/20 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div className="max-w-2xl mb-8 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center mb-4 py-1 px-3 bg-gradient-to-r from-accent-teal/5 to-accent-coral/10 rounded-full border border-accent-coral/30"
              >
                <span className="text-accent-coral text-sm font-medium">Featured Projects</span>
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-ink-dark"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Our <HighlightedText text="Latest" delay={0.2} /> Case Studies
              </motion.h2>
              
              <motion.p 
                className="text-xl text-ink-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Explore our recent projects and discover how we've helped businesses transform their digital presence.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button href="/case-studies" variant="outline">
                View All Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          
          {/* Interactive Case Studies Display */}
          <div className="relative">
            <AnimatePresence>
              {expandedCaseStudy !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-10"
                >
                  <motion.div 
                    className="glass-panel p-0 overflow-hidden rounded-3xl"
                    layoutId={`case-study-${expandedCaseStudy}`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <motion.div className="aspect-w-16 aspect-h-9 w-full relative">
                        <Image 
                          src={caseStudies[expandedCaseStudy].image.src}
                          alt={caseStudies[expandedCaseStudy].image.alt}
                          layout="fill"
                          objectFit="cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-teal/30 to-accent-purple/30 mix-blend-overlay" />
                      </motion.div>
                      
                      <div className="p-8 lg:p-12 flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {caseStudies[expandedCaseStudy].tags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs px-3 py-1 rounded-full bg-accent-teal/10 text-accent-teal"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4">{caseStudies[expandedCaseStudy].title}</h3>
                        <p className="text-ink-light mb-6 lg:text-lg">{caseStudies[expandedCaseStudy].description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <div className="text-sm text-ink-lightest">Client</div>
                            <div className="font-medium">{caseStudies[expandedCaseStudy].metadata.client}</div>
                          </div>
                          <div>
                            <div className="text-sm text-ink-lightest">Year</div>
                            <div className="font-medium">{caseStudies[expandedCaseStudy].metadata.year}</div>
                          </div>
                        </div>
                        
                        <div className="mt-auto flex flex-col sm:flex-row gap-4">
                          <Button href={caseStudies[expandedCaseStudy].href}>
                            View Case Study
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            onClick={() => setExpandedCaseStudy(null)}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  layoutId={`case-study-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -10 }}
                  onClick={() => setExpandedCaseStudy(index)}
                  className="cursor-pointer"
                >
                  <div className="glass-panel p-0 overflow-hidden h-full rounded-3xl border border-white/10 hover:border-accent-teal/30 transition-colors duration-300">
                    <div className="aspect-w-16 aspect-h-9 w-full relative">
                      <Image 
                        src={study.image.src}
                        alt={study.image.alt}
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-darkest/50 to-transparent" />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {study.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6 relative">
                      <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                      <p className="text-ink-light mb-6 line-clamp-2">{study.description}</p>
                      
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                        <div className="text-sm text-ink-lightest">
                          {study.metadata.client}
                        </div>
                        <div className="flex items-center text-accent-teal text-sm font-medium">
                          <span>View Details</span>
                          <ArrowUpRight className="ml-1 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-panel p-0 rounded-3xl">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Testimonial Image */}
                <div className="relative col-span-2 min-h-[300px] lg:min-h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Happy client"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/40 to-transparent mix-blend-multiply" />
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-4 right-4 lg:right-auto lg:left-4 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Testimonial Content */}
                <div className="col-span-3 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent-teal mr-1 fill-accent-teal" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl font-medium mb-8">
                    "Futura completely transformed our digital presence with their innovative approach. Their team delivered a cutting-edge solution that exceeded our expectations and helped us increase conversions by 150%. They're not just service providers; they're true partners in our success."
                  </blockquote>
                  
                  <div className="mt-auto">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
                          alt="Sarah Johnson"
                          width={48}
                          height={48}
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold">Sarah Johnson</div>
                        <div className="text-ink-light text-sm">Chief Marketing Officer, TechVision Inc.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-teal/20 rounded-full blur-3xl opacity-60 z-0" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-purple/20 rounded-full blur-3xl opacity-60 z-0" />
          </motion.div>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div className="max-w-2xl mb-8 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center mb-4 py-1 px-3 bg-gradient-to-r from-accent-blue/5 to-accent-blue/10 rounded-full border border-accent-blue/30"
              >
                <span className="text-accent-blue text-sm font-medium">Our Thinking</span>
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-ink-dark"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Latest <HighlightedText text="Insights" delay={0.2} />
              </motion.h2>
              
              <motion.p 
                className="text-xl text-ink-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Stay updated with our latest thoughts on technology, design, and digital transformation.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button href="/blog" variant="outline">
                View All Articles
                <ArrowRight className="ml-2 h-4 h-4" />
              </Button>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
              >
                <Link href={post.href} className="block h-full">
                <div className="glass-panel p-0 overflow-hidden h-full rounded-3xl border border-white/10 hover:border-accent-blue/30 transition-colors duration-300">
                  <div className="aspect-w-16 aspect-h-9 w-full relative">
                    <Image 
                      src={post.image.src}
                      alt={post.image.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {post.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 hover:text-accent-blue transition-colors duration-300">{post.title}</h3>
                    <p className="text-ink-light mb-6 line-clamp-2">{post.description}</p>
                    
                    <div className="flex justify-between items-center text-sm text-ink-lightest pt-4 border-t border-white/10">
                      <div>{post.metadata.date}</div>
                      <div>{post.metadata.readTime}</div>
                    </div>
                  </div>
                </div>
              </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-80 bg-gradient-to-r from-accent-teal/20 to-accent-purple/20 rounded-3xl blur-3xl opacity-40"
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
            className="max-w-4xl mx-auto glass-panel p-8 md:p-12 text-center rounded-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-ink-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Stay on the <HighlightedText text="cutting edge" delay={0.2} />
            </motion.h2>
            
            <motion.p 
              className="text-xl text-ink-light mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Subscribe to our newsletter to receive the latest insights on technology trends, design inspiration, and digital strategy.
            </motion.p>
            
            <motion.form 
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 bg-white border border-sky-medium/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-teal/50 text-ink"
                required
              />
              <Button type="submit">Subscribe</Button>
            </motion.form>
            
            <motion.p 
              className="text-sm text-ink-lightest mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Clients Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2 
            className="text-2xl font-bold text-center mb-12 text-ink-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Trusted by industry leaders
          </motion.h2>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-12 md:gap-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {clients.map((client, index) => (
              <motion.div
                key={index}
                className="w-32 h-12 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {/* Replace with actual client logos */}
                <div className="w-full h-full flex items-center justify-center bg-sky-medium/20 rounded-md">
                  <span className="text-ink-dark font-bold">{client.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -bottom-64 -right-64 w-96 h-96 bg-accent-teal/20 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto glass-panel p-8 md:p-12 text-center rounded-3xl border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-ink-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ready to build something <span className="gradient-text">amazing</span>?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-ink-light mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Let's collaborate to create innovative digital experiences that drive growth and engage your audience.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button href="/contact" size="lg">
                Start a Project
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Explore Our Services
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Video Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-darkest/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoModalOpen(false)}
          >
            <motion.div 
              className="relative w-full max-w-4xl bg-sky-darkest rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300 z-10"
                onClick={() => setVideoModalOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="aspect-w-16 aspect-h-9">
                {/* Placeholder for video */}
                <div className="w-full h-full bg-sky-darkest flex items-center justify-center">
                  <div className="text-center p-8">
                    <Play className="w-16 h-16 text-accent-teal mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Showreel Video</h3>
                    <p className="text-gray-400">A video player would be embedded here</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DefaultLayout>
  );
}