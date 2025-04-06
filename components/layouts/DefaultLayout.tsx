// components/layouts/DefaultLayout.tsx
import { ReactNode } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';

interface DefaultLayoutProps {
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
}

export default function DefaultLayout({
  children,
  title = 'Futura - Cutting-Edge Digital Experiences',
  description = 'We build futuristic digital experiences that push the boundaries of whats possible online.',
  canonicalUrl,
  openGraph,
}: DefaultLayoutProps) {
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
        <meta property="og:type" content={openGraph?.type || 'website'} />
        {openGraph?.url && <meta property="og:url" content={openGraph.url} />}
        {openGraph?.image && <meta property="og:image" content={openGraph.image} />}
        
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={openGraph?.title || title} />
        <meta name="twitter:description" content={openGraph?.description || description} />
        {openGraph?.image && <meta name="twitter:image" content={openGraph.image} />}
      </Head>
      
      <div className="flex flex-col min-h-screen bg-gradient-light">
        <Navigation />
        
        <AnimatePresence mode="wait">
          <motion.main 
            className="flex-grow pt-24 md:pt-32"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        
        <Footer />
      </div>
    </>
  );
}