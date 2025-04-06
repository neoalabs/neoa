// components/sections/Particles.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ParticleProps {
  count?: number;
}

const Particles = ({ count = 50 }: ParticleProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    top: string;
    left: string;
    size: number;
    speed: number;
    delay: number;
    color: string;
  }>>([]);

  // Generate particles only on the client side
  useEffect(() => {
    const colors = [
      '#0BA6AA', // accent-teal
      '#8754D1', // accent-purple
      '#FF6B6B', // accent-coral
      '#3E7BFA'  // accent-blue
    ];
    
    const particlesArray = [...Array(count)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 150 + 50,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setParticles(particlesArray);
  }, [count]);

  if (particles.length === 0) {
    return null; // Don't render anything until client-side initialization
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-50"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -500],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: particle.speed / 10,
            repeat: Infinity,
            repeatType: 'loop',
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default Particles;