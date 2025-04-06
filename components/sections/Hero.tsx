// components/sections/Hero.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '../common/Button';
import { ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Import Particles component dynamically with SSR disabled
const Particles = dynamic(() => import('./Particles'), { 
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

export default function Hero() {
  // State to track client-side rendering
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-16 overflow-hidden">
      {isClient && <Particles />}
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
  );
}