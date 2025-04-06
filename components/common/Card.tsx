// components/common/Card.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  href?: string;
  cta?: string;
  tags?: string[];
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'feature' | 'caseStudy' | 'blog';
  hoverEffect?: boolean;
  metadata?: {
    [key: string]: string | number | React.ReactNode;
  };
}

export default function Card({
  title,
  description,
  image,
  href,
  cta = 'Learn More',
  tags,
  icon,
  className = '',
  variant = 'default',
  hoverEffect = true,
  metadata,
}: CardProps) {
  // Base card styles
  const baseClasses = 'overflow-hidden flex flex-col card-panel';
  
  // Variant-specific styles
  const variantClasses = {
    default: 'p-6',
    feature: 'p-8',
    caseStudy: 'relative',
    blog: 'relative'
  };
  
  // Combine classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  // Motion variants
  const cardMotion = hoverEffect ? {
    whileHover: { 
      y: -5,
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.08), 0 0 15px rgba(11, 166, 170, 0.2)',
      transition: { duration: 0.3 }
    },
    transition: { duration: 0.3 }
  } : {};

  const imageMotion = hoverEffect ? {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.5 }
  } : {};

  // Card content based on variant
  const renderCardContent = () => {
    switch (variant) {
      case 'feature':
        return (
          <>
            {icon && (
              <div className="mb-6 text-accent-teal">
                {icon}
              </div>
            )}
            <h3 className="text-xl font-bold mb-3 text-ink-dark">{title}</h3>
            {description && <p className="text-ink-light mb-6">{description}</p>}
            {href && (
              <Link href={href} className="mt-auto text-accent-teal font-medium flex items-center group">
                {cta}
                <svg 
                  className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            )}
          </>
        );
      
      case 'caseStudy':
        return (
          <>
            {image && (
              <div className="aspect-w-16 aspect-h-9 w-full relative">
                <motion.div className="w-full h-full" {...imageMotion}>
                  <Image 
                    src={image.src} 
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                  />
                </motion.div>
              </div>
            )}
            <div className="p-6">
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 rounded-full bg-sky-light text-accent-teal">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="text-xl font-bold mb-2 text-ink-dark">{title}</h3>
              {description && <p className="text-ink-light mb-4">{description}</p>}
              {metadata && (
                <div className="flex justify-between text-sm text-ink-lightest mb-4">
                  {Object.entries(metadata).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      {value}
                    </div>
                  ))}
                </div>
              )}
              {href && (
                <Link href={href} className="mt-4 accent-button inline-block text-center">
                  {cta}
                </Link>
              )}
            </div>
          </>
        );
      
      case 'blog':
        return (
          <>
            {image && (
              <div className="aspect-w-16 aspect-h-9 w-full relative">
                <motion.div className="w-full h-full" {...imageMotion}>
                  <Image 
                    src={image.src} 
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                  />
                </motion.div>
                {tags && tags.length > 0 && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span key={index} className="text-xs px-2 py-1 rounded-full bg-accent-teal/90 text-white font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-ink-dark">{title}</h3>
              {description && <p className="text-ink-light mb-4 line-clamp-2">{description}</p>}
              {metadata && (
                <div className="flex justify-between text-sm text-ink-lightest mt-4">
                  {Object.entries(metadata).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      {value}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );
      
      default: // 'default'
        return (
          <>
            {image && (
              <div className="aspect-w-16 aspect-h-9 w-full relative mb-4">
                <Image 
                  src={image.src} 
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            )}
            <h3 className="text-xl font-bold mb-3 text-ink-dark">{title}</h3>
            {description && <p className="text-ink-light mb-4">{description}</p>}
            {href && (
              <Link href={href} className="mt-auto text-accent-teal hover:text-accent-teal/80 transition-colors duration-300">
                {cta}
              </Link>
            )}
          </>
        );
    }
  };

  // Wrap with a link if href is provided
  const cardContent = renderCardContent();
  
  if (href && hoverEffect) {
    return (
      <motion.div className={classes} {...cardMotion}>
        <Link href={href} className="flex flex-col flex-grow h-full">
          {cardContent}
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.div className={classes} {...cardMotion}>
      {cardContent}
    </motion.div>
  );
}