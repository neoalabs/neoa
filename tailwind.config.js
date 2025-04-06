// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          // Deep space gradients
          space: {
            darkest: '#0A0F1C',
            dark: '#121A2F',
            DEFAULT: '#1A2342',
            light: '#252D56',
            lightest: '#30396A',
          },
          // Neon accent colors
          neon: {
            cyan: '#0AECF0',
            purple: '#A742F5',
            magenta: '#F037A5',
            blue: '#2D9CDB',
          },
        },
        fontFamily: {
          sans: ['Outfit', 'Space Grotesk', 'system-ui', 'sans-serif'],
          serif: ['IBM Plex Serif', 'Georgia', 'serif'],
          mono: ['IBM Plex Mono', 'monospace'],
        },
        animation: {
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'float': 'float 8s ease-in-out infinite',
          'glow': 'glow 2s ease-in-out infinite alternate',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          glow: {
            '0%': { 
              textShadow: '0 0 5px rgba(10, 236, 240, 0.3)',
              boxShadow: '0 0 5px rgba(10, 236, 240, 0.3)'
            },
            '100%': { 
              textShadow: '0 0 20px rgba(10, 236, 240, 0.6), 0 0 30px rgba(10, 236, 240, 0.4), 0 0 40px rgba(10, 236, 240, 0.2)',
              boxShadow: '0 0 20px rgba(10, 236, 240, 0.6), 0 0 30px rgba(10, 236, 240, 0.4), 0 0 40px rgba(10, 236, 240, 0.2)'
            },
          },
        },
        backdropBlur: {
          xs: '2px',
        },
        backgroundImage: {
          'gradient-space': 'linear-gradient(to bottom, #0A0F1C, #1A2342)',
          'gradient-neon': 'linear-gradient(45deg, #0AECF0, #A742F5)',
        },
        boxShadow: {
          'neon': '0 0 10px rgba(10, 236, 240, 0.5)',
          'neon-strong': '0 0 20px rgba(10, 236, 240, 0.8)',
          'inner-glow': 'inset 0 0 10px rgba(10, 236, 240, 0.2)',
        },
        borderRadius: {
          'xl': '1rem',
          '2xl': '1.5rem',
          '3xl': '2rem',
        },
        transitionDuration: {
          '2000': '2000ms',
          '3000': '3000ms',
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }