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
        // Light theme palette
        sky: {
          lightest: '#F7FAFF', // Extremely light blue tint (background)
          light: '#EDF2FC',    // Light blue-tinted background
          DEFAULT: '#E1EBFA',  // Main light blue background
          medium: '#C7D9F2',   // Medium blue for interactive elements
          dark: '#93B5E1',     // Darker blue for accents
          darkest: '#5A8ACF',  // Deep blue for strong accents
        },
        // Primary accent colors
        accent: {
          teal: '#0BA6AA',     // Primary accent replacing neon cyan
          purple: '#8754D1',   // Secondary accent replacing neon purple
          coral: '#FF6B6B',    // Warm accent color replacing neon magenta
          blue: '#3E7BFA',     // Bright blue accent
        },
        // Text colors
        ink: {
          lightest: '#6B7280', // Lightest text for subtle content
          light: '#4B5563',    // Light text for secondary content
          DEFAULT: '#1F2937',  // Standard text color
          dark: '#111827',     // Dark text for headings
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
        'shine': 'shine 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shine: {
          '0%': { 
            boxShadow: '0 0 5px rgba(11, 166, 170, 0.3)'
          },
          '100%': { 
            boxShadow: '0 0 20px rgba(11, 166, 170, 0.6), 0 0 30px rgba(11, 166, 170, 0.3)'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(to bottom, #F7FAFF, #E1EBFA)',
        'gradient-accent': 'linear-gradient(45deg, #0BA6AA, #8754D1)',
        'gradient-sunrise': 'linear-gradient(45deg, #FF6B6B, #FFB347)',
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'accent': '0 5px 15px rgba(11, 166, 170, 0.2)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
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