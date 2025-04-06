// components/sections/BlogPreview.tsx
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Card from '../common/Card';
import Button from '../common/Button';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

// Animation for elements when they come into view
const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
        hidden: { opacity: 0, y: 30 }
      }}
    >
      {children}
    </motion.div>
  );
};

interface BlogPreviewProps {
  limit?: number;
}

export default function BlogPreview({ limit = 3 }: BlogPreviewProps) {
  // Sample blog posts data
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

  // Limit the number of posts to display
  const displayedPosts = blogPosts.slice(0, limit);

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="max-w-2xl mb-8 md:mb-0">
            <FadeInWhenVisible>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Latest <span className="gradient-text">Insights</span>
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-gray-300">
                Stay updated with our latest thoughts on technology, design, and digital transformation.
              </p>
            </FadeInWhenVisible>
          </div>
          <FadeInWhenVisible delay={0.3}>
            <Button href="/blog" variant="outline">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </FadeInWhenVisible>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <FadeInWhenVisible key={index} delay={0.1 * index}>
              <Card
                title={post.title}
                description={post.description}
                image={post.image}
                tags={post.tags}
                href={post.href}
                metadata={{
                  date: (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.metadata.date}
                    </div>
                  ),
                  readTime: (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.metadata.readTime}
                    </div>
                  ),
                }}
                variant="blog"
              />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}