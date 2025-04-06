// components/layouts/BlogLayout.tsx
import { ReactNode } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface BlogLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    image?: string;
  };
  author?: {
    name: string;
    image: string;
  };
  date?: string;
  readTime?: string;
}

export default function BlogLayout({
  children,
  title = 'Blog | Futura',
  description = 'Insights and perspectives on technology, design, and digital innovation.',
  canonicalUrl,
  openGraph,
  author,
  date,
  readTime,
}: BlogLayoutProps) {
  // Page transition variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={openGraph?.title || title} />
        <meta property="og:description" content={openGraph?.description || description} />
        <meta property="og:type" content={openGraph?.type || 'article'} />
        {openGraph?.url && <meta property="og:url" content={openGraph.url} />}
        {openGraph?.image && <meta property="og:image" content={openGraph.image} />}
        
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={openGraph?.title || title} />
        <meta name="twitter:description" content={openGraph?.description || description} />
        {openGraph?.image && <meta name="twitter:image" content={openGraph.image} />}
      </Head>
      
      <div className="flex flex-col min-h-screen bg-gradient-space">
        <Navigation />
        
        <motion.main 
          className="flex-grow pt-24 md:pt-32"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 mb-8">
            <Link href="/blog" className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 mb-8">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Blog
            </Link>
            
            {author && date && (
              <div className="flex items-center space-x-4 mb-8">
                {author.image && (
                  <img 
                    src={author.image} 
                    alt={author.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium">{author.name}</p>
                  <div className="flex text-sm text-gray-400">
                    <span>{date}</span>
                    {readTime && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{readTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {children}
        </motion.main>
        
        <Footer />
      </div>
    </>
  );
}