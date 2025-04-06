// pages/blog/[slug].tsx
import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { ChevronLeft, Calendar, Clock, Share2, Twitter, Linkedin, Facebook, MessageCircle, ArrowRight } from 'lucide-react';

// Blog post data interface
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  image: {
    src: string;
    alt: string;
  };
  author: {
    name: string;
    role: string;
    image: string;
    bio: string;
  };
  date: string;
  readTime: string;
  tableOfContents: { id: string; title: string; level: number }[];
}

// Related post interface
interface RelatedPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: {
    src: string;
    alt: string;
  };
  date: string;
  readTime: string;
}

// Animation for elements when they come into view
const FadeInWhenVisible = ({ children, delay = 0, threshold = 0.3 }: { children: React.ReactNode; delay?: number; threshold?: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
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

// Related posts
const relatedPosts: RelatedPost[] = [
  {
    slug: 'performance-first-applications',
    title: 'Building Performance-First Web Applications',
    description: 'Performance optimization strategies that boost user experience and conversion rates.',
    category: 'Development',
    tags: ['Performance', 'Web Development', 'Optimization'],
    image: {
      src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Web Performance',
    },
    date: 'March 10, 2025',
    readTime: '8 min read',
  },
  {
    slug: 'ethical-ai-digital-products',
    title: 'Ethical AI in Digital Products',
    description: 'How to implement AI in your digital products while maintaining ethical standards and user trust.',
    category: 'AI',
    tags: ['AI', 'Ethics', 'Product Design'],
    image: {
      src: 'https://images.unsplash.com/photo-1502101872923-d48509bff386?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Ethical AI',
    },
    date: 'February 28, 2025',
    readTime: '5 min read',
  },
  {
    slug: 'mastering-react-architecture',
    title: 'Mastering React Architecture for Enterprise Applications',
    description: 'Best practices for structuring large-scale React applications for maintainability and scalability.',
    category: 'Development',
    tags: ['React', 'Architecture', 'Enterprise'],
    image: {
      src: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'React Architecture',
    },
    date: 'February 15, 2025',
    readTime: '10 min read',
  },
];

// Mock blog post data
const blogPostData: BlogPost = {
  slug: 'future-web-design-trends',
  title: 'The Future of Web Design: Trends to Watch in 2025',
  description: 'Explore the emerging design patterns and technologies shaping the future of digital experiences.',
  content: `
## Introduction

As we move deeper into 2025, the web design landscape continues to evolve at a rapid pace. New technologies, shifting user expectations, and innovative approaches are reshaping how we create digital experiences. In this article, we'll explore the most important emerging trends that are defining the future of web design.

## Immersive Experiences with 3D and WebGL

Three-dimensional elements are no longer just flashy gimmicks—they've become powerful tools for creating immersive experiences. With WebGL and libraries like Three.js becoming more accessible, designers are incorporating 3D elements that respond to user interaction in meaningful ways.

> "The integration of 3D elements isn't just about visual appeal—it's about creating spatial interfaces that mirror how we interact with the physical world." 

These technologies allow for the creation of virtual showrooms, interactive product visualizations, and spatial interfaces that were previously impossible on the web. As processing power continues to improve on both desktop and mobile devices, expect to see more sophisticated 3D implementations that blur the line between digital and physical experiences.

## AI-Driven Personalization

Artificial intelligence is revolutionizing how we personalize web experiences. Beyond basic content recommendations, AI is now being used to dynamically adjust entire interfaces based on user behavior, preferences, and needs.

Advanced systems can now:

- Reorganize navigation paths based on user behavior
- Automatically adjust content complexity to match user expertise
- Customize visual elements like color schemes and typography based on accessibility needs
- Generate personalized illustrations and graphics on the fly

These capabilities create experiences that feel custom-tailored to each user, significantly enhancing engagement and conversion rates.

## Micro-Interactions with Purpose

Subtle animations and interactions have evolved from simple decorative elements to crucial components of user experience. These micro-interactions now serve multiple purposes:

1. Providing immediate feedback on user actions
2. Creating emotional connections through playful elements
3. Guiding attention to important elements
4. Enhancing the perceived performance of applications

When thoughtfully implemented, these small details can dramatically improve usability and create memorable experiences that keep users coming back.

## Ethical and Sustainable Design

As digital products become increasingly integrated into our daily lives, ethical considerations in design have moved to the forefront. This includes:

### Accessibility as a Priority

Accessibility is no longer an afterthought but a fundamental design principle. Designers are embracing inclusive practices from the start, ensuring that digital experiences are usable by people with a wide range of abilities and disabilities.

### Privacy-Centered Interfaces

With growing awareness of data privacy issues, transparent and user-controlled privacy options are becoming standard. Designers are finding innovative ways to communicate complex privacy concepts and give users meaningful control over their data.

### Environmental Considerations

The environmental impact of digital products is gaining attention. From optimizing energy consumption through efficient code to designing interfaces that encourage sustainable behaviors, eco-conscious design practices are on the rise.

## Neomorphic Design Evolution

Neomorphism—a style that combines flat design with subtle, realistic shadows to create semi-3D effects—has matured beyond its initial limitations. The updated approach maintains the tactile, physical feel while addressing earlier concerns about accessibility and usability.

Modern neomorphic interfaces feature:

- Improved contrast ratios for better accessibility
- Strategic implementation for interactive elements rather than entire interfaces
- Combination with other design styles for more versatile applications

This evolution demonstrates how design trends can adapt and improve in response to practical feedback while maintaining their distinctive aesthetic appeal.

## Conclusion

The future of web design lies in creating experiences that are not just visually striking but also deeply human-centered, accessible, and ethically sound. By embracing these emerging trends while maintaining a focus on user needs, designers can create digital products that are both cutting-edge and genuinely valuable to the people who use them.

As technology continues to advance, the most successful designs will be those that use innovation to solve real problems and create meaningful connections—not just to showcase the latest capabilities. The exciting challenge for designers in 2025 and beyond will be finding that perfect balance between pushing boundaries and serving human needs.
  `,
  category: 'Design',
  tags: ['Design', 'Trends', 'Web Development'],
  image: {
    src: 'https://images.unsplash.com/photo-1545239351-cefa43af60f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    alt: 'Web Design Trends',
  },
  author: {
    name: 'Sarah Johnson',
    role: 'Design Lead',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    bio: 'Sarah has over a decade of experience in digital design and leads the design team at Futura. She specializes in creating intuitive, user-centered interfaces and has worked with clients across various industries.',
  },
  date: 'March 25, 2025',
  readTime: '6 min read',
  tableOfContents: [
    { id: 'introduction', title: 'Introduction', level: 2 },
    { id: 'immersive-experiences-with-3d-and-webgl', title: 'Immersive Experiences with 3D and WebGL', level: 2 },
    { id: 'ai-driven-personalization', title: 'AI-Driven Personalization', level: 2 },
    { id: 'micro-interactions-with-purpose', title: 'Micro-Interactions with Purpose', level: 2 },
    { id: 'ethical-and-sustainable-design', title: 'Ethical and Sustainable Design', level: 2 },
    { id: 'accessibility-as-a-priority', title: 'Accessibility as a Priority', level: 3 },
    { id: 'privacy-centered-interfaces', title: 'Privacy-Centered Interfaces', level: 3 },
    { id: 'environmental-considerations', title: 'Environmental Considerations', level: 3 },
    { id: 'neomorphic-design-evolution', title: 'Neomorphic Design Evolution', level: 2 },
    { id: 'conclusion', title: 'Conclusion', level: 2 },
  ],
};

// GetStaticPaths - define the dynamic routes
export const getStaticPaths: GetStaticPaths = async () => {
  // In a real application, you would fetch the slugs from an API or CMS
  const paths = [
    { params: { slug: 'future-web-design-trends' } },
    { params: { slug: 'performance-first-applications' } },
    { params: { slug: 'ethical-ai-digital-products' } },
  ];
  
  return {
    paths,
    fallback: 'blocking', // or 'blocking' if you want to render the page on the server
  };
};

// GetStaticProps - fetch the data for the page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // In a real application, you would fetch the data based on the slug
  // For now, we'll just return our mock data
  return {
    props: {
      blogPost: blogPostData,
    },
    revalidate: 60, // Regenerate the page every 60 seconds if there are updates
  };
};

interface BlogPostDetailProps {
  blogPost: BlogPost;
}

export default function BlogPostDetail({ blogPost }: BlogPostDetailProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('');
  
  // Handle loading and fallback state
  if (router.isFallback) {
    return (
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold">Loading...</h2>
          </div>
        </div>
      </DefaultLayout>
    );
  }
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const headings = Array.from(document.querySelectorAll('h2[id], h3[id]'));
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i] as HTMLElement;
        if (heading.getBoundingClientRect().top <= 100) {
          setActiveSection(heading.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Process Markdown content to HTML
  const processContent = (content: string) => {
    return content;
  };
  
  return (
    <DefaultLayout 
      title={`${blogPost.title} | Blog | Futura`}
      description={blogPost.description}
      openGraph={{
        title: `${blogPost.title} | Blog | Futura`,
        description: blogPost.description,
        image: blogPost.image.src,
        type: 'article',
      }}
    >
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-8 md:pb-16">
        {/* Hero Image */}
        <div className="absolute inset-0 z-0 h-[50vh]">
          <div className="relative w-full h-full">
            <Image 
              src={blogPost.image.src}
              alt={blogPost.image.alt}
              layout="fill"
              objectFit="cover"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-space-darkest/70 via-space-darkest/60 to-space" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Link href="/blog" className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 mb-8">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Blog
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {blogPost.tags.map((tag, index) => (
                <Link 
                  key={index} 
                  href={`/blog?tag=${tag}`}
                  className="inline-block px-3 py-1 rounded-full text-sm bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 transition-colors duration-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {blogPost.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl">
              {blogPost.description}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-6 border-y border-white/10">
              <div className="flex items-center">
                <Image 
                  src={blogPost.author.image} 
                  alt={blogPost.author.name}
                  width={48}
                  height={48}
                  className="rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{blogPost.author.name}</p>
                  <p className="text-sm text-gray-400">{blogPost.author.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {blogPost.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {blogPost.readTime}
                </div>
              </div>
              
              <div className="sm:ml-auto flex items-center gap-2">
                <span className="text-sm text-gray-400 mr-1">Share:</span>
                <button className="w-8 h-8 rounded-full bg-space-light/20 text-white hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors duration-300 flex items-center justify-center">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-space-light/20 text-white hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors duration-300 flex items-center justify-center">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-space-light/20 text-white hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors duration-300 flex items-center justify-center">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-space-light/20 text-white hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors duration-300 flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Article Content */}
            <div className="lg:w-2/3">
              <FadeInWhenVisible>
                <article className="prose prose-lg prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: processContent(blogPost.content) }} />
                </article>
              </FadeInWhenVisible>
              
              {/* Tags and Share */}
              <FadeInWhenVisible>
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag, index) => (
                        <Link 
                          key={index} 
                          href={`/blog?tag=${tag}`}
                          className="inline-block px-3 py-1 rounded-full text-sm bg-space-light/20 text-white hover:bg-space-light/30 transition-colors duration-300"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Share this article:</p>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-full bg-space-light/20 text-white hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors duration-300 flex items-center justify-center">
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-space-light/20 text-white hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors duration-300 flex items-center justify-center">
                        <Facebook className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-space-light/20 text-white hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors duration-300 flex items-center justify-center">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-space-light/20 text-white hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors duration-300 flex items-center justify-center">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
              
              {/* Author Bio */}
              <FadeInWhenVisible>
                <div className="mt-12 glass-panel p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="w-24 h-24 shrink-0">
                      <Image 
                        src={blogPost.author.image} 
                        alt={blogPost.author.name}
                        width={96}
                        height={96}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{blogPost.author.name}</h3>
                      <p className="text-sm text-neon-cyan mb-4">{blogPost.author.role}</p>
                      <p className="text-gray-300">{blogPost.author.bio}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <button className="w-8 h-8 rounded-full bg-space-light/20 text-white hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors duration-300 flex items-center justify-center">
                          <Twitter className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-space-light/20 text-white hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors duration-300 flex items-center justify-center">
                          <Linkedin className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
              
              {/* Comments Section */}
              <FadeInWhenVisible>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <MessageCircle className="w-6 h-6 mr-2" />
                    Comments (5)
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Comment form - placeholder */}
                    <div className="glass-panel p-6">
                      <h4 className="text-lg font-bold mb-4">Leave a comment</h4>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                            <input 
                              type="text" 
                              id="name" 
                              className="w-full px-4 py-2 bg-space-dark/60 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 text-white"
                              placeholder="Your name"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input 
                              type="email" 
                              id="email" 
                              className="w-full px-4 py-2 bg-space-dark/60 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 text-white"
                              placeholder="Your email"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">Comment</label>
                          <textarea 
                            id="comment" 
                            rows={4}
                            className="w-full px-4 py-2 bg-space-dark/60 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 text-white"
                            placeholder="Your comment"
                            required
                          ></textarea>
                        </div>
                        <div>
                          <Button type="submit">
                            Post Comment
                          </Button>
                        </div>
                      </form>
                    </div>
                    
                    {/* This would be populated with actual comments in a real application */}
                    <p className="text-center text-gray-400">Comments functionality is not implemented in this demo.</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="lg:sticky lg:top-32">
                {/* Table of Contents */}
                <FadeInWhenVisible>
                  <div className="glass-panel p-6">
                    <h3 className="text-xl font-bold mb-4">Table of Contents</h3>
                    <nav className="space-y-1">
                      {blogPost.tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block py-1 text-sm ${
                            item.level === 3 ? 'ml-4' : ''
                          } ${
                            activeSection === item.id
                              ? 'text-neon-cyan'
                              : 'text-gray-300 hover:text-white'
                          } transition-colors duration-300`}
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById(item.id);
                            if (element) {
                              window.scrollTo({
                                top: element.offsetTop - 100,
                                behavior: 'smooth',
                              });
                              setActiveSection(item.id);
                            }
                          }}
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </FadeInWhenVisible>
                
                {/* Related Articles */}
                <FadeInWhenVisible delay={0.2}>
                  <div className="mt-8 glass-panel p-6">
                    <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((post, index) => (
                        <Link key={index} href={`/blog/${post.slug}`} className="block group">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 shrink-0 relative rounded-lg overflow-hidden">
                              <Image 
                                src={post.image.src} 
                                alt={post.image.alt}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-white group-hover:text-neon-cyan transition-colors duration-300 line-clamp-2">{post.title}</h4>
                              <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                <span>{post.date}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                                <span>{post.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <Link href="/blog" className="text-neon-cyan hover:text-white transition-colors duration-300 flex items-center">
                        View All Articles
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </FadeInWhenVisible>
                
                {/* Newsletter Signup */}
                <FadeInWhenVisible delay={0.3}>
                  <div className="mt-8 glass-panel p-6">
                    <h3 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h3>
                    <p className="text-gray-300 mb-4">Stay updated with our latest insights and industry news.</p>
                    <form className="space-y-4">
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 bg-space-dark/60 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 text-white"
                        placeholder="Your email address"
                        required
                      />
                      <Button type="submit" className="w-full">
                        Subscribe
                      </Button>
                    </form>
                    <p className="text-xs text-gray-400 mt-4">
                      By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                    </p>
                  </div>
                </FadeInWhenVisible>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* More Articles Section */}
      <section className="py-16 md:py-24 bg-space-darkest">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <FadeInWhenVisible>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">More Articles</h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <Link href="/blog" className="text-neon-cyan hover:text-white transition-colors duration-300 flex items-center">
                View All Articles
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </FadeInWhenVisible>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post, index) => (
              <FadeInWhenVisible key={index} delay={0.1 * index}>
                <Card
                  title={post.title}
                  description={post.description}
                  image={post.image}
                  tags={[post.category]}
                  href={`/blog/${post.slug}`}
                  metadata={{
                    date: (
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                    ),
                    readTime: (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
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
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-space">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInWhenVisible>
            <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Ready to start your project?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss how we can help you achieve your digital goals.
              </p>
              <Button href="/contact" size="lg">
                Get in Touch
              </Button>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </DefaultLayout>
  );
}