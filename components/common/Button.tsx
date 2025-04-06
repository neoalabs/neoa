// components/common/Button.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  ariaLabel?: string;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'right',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  ariaLabel,
}: ButtonProps) {
  // Base classes
  const baseClasses = `flex items-center justify-center transition-all duration-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-lightest ${
    fullWidth ? 'w-full' : ''
  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: `bg-accent-teal text-white border border-accent-teal hover:bg-accent-teal/90 hover:shadow-accent focus:ring-accent-teal`,
    secondary: `bg-accent-purple text-white border border-accent-purple hover:bg-accent-purple/90 hover:shadow-accent focus:ring-accent-purple`,
    ghost: `bg-transparent text-ink hover:bg-sky-medium/10 focus:ring-accent-teal`,
    outline: `bg-transparent border border-sky-dark text-ink-dark hover:border-accent-teal hover:text-accent-teal hover:bg-sky-light/50 focus:ring-accent-teal`,
  };
  
  // Combine classes
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  // Animation props
  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.03 },
    whileTap: { scale: disabled ? 1 : 0.97 },
    transition: { duration: 0.2 },
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  // Handle link buttons
  if (href && !disabled) {
    return (
      <Link href={href} legacyBehavior passHref aria-label={ariaLabel}>
        <motion.a className={classes} {...motionProps}>
          {content}
        </motion.a>
      </Link>
    );
  }

  // Handle regular buttons
  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}