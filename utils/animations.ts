// utils/animations.ts
import { Variants } from 'framer-motion';

// Fade in animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.3 
    }
  }
};

// Staggered children animation variants
export const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Scale animation variants
export const scale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { 
      duration: 0.3 
    }
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5 
    }
  },
  exit: { 
    opacity: 0, 
    x: -50,
    transition: { 
      duration: 0.3 
    }
  }
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5 
    }
  },
  exit: { 
    opacity: 0, 
    x: 50,
    transition: { 
      duration: 0.3 
    }
  }
};

// Card hover animations
export const cardHover = {
  whileHover: { 
    y: -10,
    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.08), 0 0 15px rgba(11, 166, 170, 0.2)',
    transition: { 
      duration: 0.3 
    }
  },
  whileTap: { 
    y: -5,
    transition: { 
      duration: 0.1 
    }
  }
};

// Button hover animations
export const buttonHover = {
  whileHover: { 
    scale: 1.05,
    transition: { 
      duration: 0.2 
    }
  },
  whileTap: { 
    scale: 0.97,
    transition: { 
      duration: 0.1 
    }
  }
};

// Page transition variants
export const pageTransition: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    }
  }
};

// Float animation (for 3D elements)
export const float = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    }
  }
};

// Shine animation
export const shine = {
  animate: {
    boxShadow: [
      '0 0 10px rgba(11, 166, 170, 0.3)',
      '0 0 20px rgba(11, 166, 170, 0.6)',
      '0 0 10px rgba(11, 166, 170, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse',
    }
  }
};

// Text gradient animation
export const textGradient = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear',
    }
  }
};