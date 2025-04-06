// pages/blog/index.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import Card from '../../components/common/Card';
import { Search, Filter, ArrowRight, Calendar, Clock } from 'lucide-react';

// Blog post data type
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
  };
  date: string;
  readTime: string;
  featured: boolean;
}

// Blog posts data
const blogPosts: BlogPost[] = [
  {
    slug: 'future-web-design-trends',
    title: 'The Future of Web Design: Trends to Watch in 2025',
    description: 'Explore the emerging design patterns and technologies shaping the future of digital experiences.',
    content: '',
    category: 'Design',
    tags: ['Design', 'Trends', 'Web Development'],
    image: {
      src: 'https://images.unsplash.com/photo-1545239351-cefa43af60f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Web Design Trends',
    },
    author: {
      name: 'Sarah Johnson',
      role: 'Design Lead',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    date: 'March 25, 2025',
    readTime: '6 min read',
    featured: true,
  },
  {
    slug: 'performance-first-applications',
    title: 'Building Performance-First Web Applications',
    description: 'Performance optimization strategies that boost user experience and conversion rates.',
    content: '',
    category: 'Development',
    tags: ['Performance', 'Web Development', 'Optimization'],
    image: {
      src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Web Performance',
    },
    author: {
      name: 'Michael Chang',
      role: 'Tech Lead',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    date: 'March 10, 2025',
    readTime: '8 min read',
    featured: true,
  },
  {
    slug: 'ethical-ai-digital-products',
    title: 'Ethical AI in Digital Products',
    description: 'How to implement AI in your digital products while maintaining ethical standards and user trust.',
    content: '',
    category: 'AI',
    tags: ['AI', 'Ethics', 'Product Design'],
    image: {
      src: 'https://images.unsplash.com/photo-1502101872923-d48509bff386?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Ethical AI',
    },
    author: {
      name: 'Elena Rodriguez',
      role: 'AI Specialist',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    date: 'February 28, 2025',
    readTime: '5 min read',
    featured: false,
  },
  {
    slug: 'mastering-react-architecture',
    title: 'Mastering React Architecture for Enterprise Applications',
    description: 'Best practices for structuring large-scale React applications for maintainability and scalability.',
    content: '',
    category: 'Development',
    tags: ['React', 'Architecture', 'Enterprise'],
    image: {
      src: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'React Architecture',
    },
    author: {
      name: 'David Chen',
      role: 'Frontend Architect',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    date: 'February 15, 2025',
    readTime: '10 min read',
    featured: false,
  },
  {
    slug: 'ux-research-methods',
    title: 'UX Research Methods That Drive Results',
    description: 'Effective user research techniques that lead to actionable insights and improved product experiences.',
    content: '',
    category: 'Design',
    tags: ['UX', 'Research', 'User Testing'],
    image: {
      src: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'UX Research',
    },
    author: {
      name: 'Olivia Kim',
      role: 'UX Researcher',
      image: 'https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    date: 'February 3, 2025',
    readTime: '7 min read',
    featured: false,
  },
  {
    slug: 'scaling-microservices',
    title: 'Scaling Microservices: Lessons from the Trenches',
    description: 'Real-world experiences and strategies for effectively scaling microservice architectures.',
    content: '',
    category: 'Development',
    tags: ['Microservices', 'Scaling', 'Architecture'],
    image: {
      src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Microservices',
    },
    author: {
      name: 'Robert Nguyen',
      role: 'Backend Engineer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    date: 'January 20, 2025',
    readTime: '9 min read',
    featured: false,
  },
  {
    slug: 'design-systems-scale',
    title: 'Building Design Systems That Scale',
    description: 'How to create and maintain design systems that grow with your organization and product portfolio.',
    content: '',
    category: 'Design',
    tags: ['Design Systems', 'UI', 'Consistency'],
    image: {
      src: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Design Systems',
    },
    author: {
      name: 'Sarah Johnson',
      role: 'Design Lead',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    date: 'January 12, 2025',
    readTime: '6 min read',
    featured: false,
  },
  {
    slug: 'future-mobile-development',
    title: 'The Future of Mobile Development: Beyond Native and Cross-Platform',
    description: 'Exploring emerging approaches and technologies shaping the next generation of mobile applications.',
    content: '',
    category: 'Mobile',
    tags: ['Mobile', 'Development', 'Future'],
    image: {
      src: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Mobile Development',
    },
    author: {
      name: 'James Wilson',
      role: 'Mobile Developer',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    date: 'December 28, 2024',
    readTime: '7 min read',
    featured: false,
  },
  {
    slug: 'next-generation-css',
    title: 'Next-Generation CSS: Features That Will Change How You Style',
    description: 'New and upcoming CSS features that are revolutionizing web design and development.',
    content: '',
    category: 'Development',
    tags: ['CSS', 'Web Development', 'Styling'],
    image: {
      src: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'CSS Features',
    },
    author: {
      name: 'Lisa Chen',
      role: 'Frontend Developer',
      image: 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    date: 'December 15, 2024',
    readTime: '5 min read',
    featured: false,
  },
  {
    slug: 'psychology-of-animations',
    title: 'The Psychology of UI Animations: How Motion Affects User Experience',
    description: 'Understanding the psychological impact of motion design and how to use animations effectively.',
    content: '',
    category: 'Design',
    tags: ['Animation', 'UX', 'Psychology'],
    image: {
      src: 'https://images.unsplash.com/photo-1550645612-83f5d594b671?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'UI Animations',
    },
    author: {
      name: 'Olivia Kim',
      role: 'UX Researcher',
      image: 'https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    date: 'December 5, 2024',
    readTime: '6 min read',
    featured: false,
  },
];

// Category data
const categories = [
  'All',
  'Design',
  'Development',
  'AI',
  'Mobile',
];

export default function BlogIndex() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter blog posts by search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  return (
    <DefaultLayout 
      title="Blog | Futura"
      description="Insights and perspectives on design, development, and digital innovation from the Futura team."
    >
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-64 -right-64 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-64 -left-64 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our <span className="gradient-text">Blog</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Insights and perspectives on design, development, and digital innovation from our team.
            </motion.p>
          </div>
          
          {/* Search and Filters */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="glass-panel p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 bg-space-dark/60 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 text-white"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <button
                  className="md:hidden flex items-center justify-center px-4 py-3 bg-space-dark/60 border border-white/10 rounded-lg text-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-5 w-5 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                
                <div className="hidden md:flex items-center space-x-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                        activeCategory === category
                          ? 'bg-neon-cyan text-space-darkest'
                          : 'bg-space-light/20 text-gray-300 hover:bg-space-light/30'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Mobile Category Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    className="md:hidden mt-4"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                            activeCategory === category
                              ? 'bg-neon-cyan text-space-darkest'
                              : 'bg-space-light/20 text-gray-300'
                          }`}
                          onClick={() => setActiveCategory(category)}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Featured Articles */}
          {searchQuery === '' && activeCategory === 'All' && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <div className="glass-panel overflow-hidden h-full">
                        <div className="aspect-w-16 aspect-h-9 w-full relative">
                          <motion.div 
                            className="w-full h-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                          >
                            <img 
                              src={post.image.src} 
                              alt={post.image.alt} 
                              className="w-full h-full object-cover rounded-t-2xl"
                            />
                          </motion.div>
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-neon-cyan/80 text-space-darkest font-medium">
                              {post.category}
                            </span>
                            {post.featured && (
                              <span className="text-xs px-2 py-1 rounded-full bg-neon-magenta/80 text-white font-medium">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold mb-3 text-white">{post.title}</h3>
                          <p className="text-gray-300 mb-6">{post.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img 
                                src={post.author.image} 
                                alt={post.author.name}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <p className="font-medium">{post.author.name}</p>
                                <p className="text-sm text-gray-400">{post.author.role}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end text-sm text-gray-400">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {post.date}
                              </div>
                              <div className="flex items-center mt-1">
                                <Clock className="w-4 h-4 mr-1" />
                                {post.readTime}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* All Articles */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                {searchQuery || activeCategory !== 'All' ? 'Search Results' : 'All Articles'}
                {(searchQuery || activeCategory !== 'All') && (
                  <span className="ml-2 text-gray-400">({filteredPosts.length})</span>
                )}
              </h2>
              {searchQuery || activeCategory !== 'All' ? (
                <button
                  className="text-neon-cyan hover:text-white transition-colors duration-300"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                >
                  Clear Filters
                </button>
              ) : null}
            </div>
            
            {filteredPosts.length === 0 ? (
              <div className="glass-panel p-8 text-center">
                <h3 className="text-xl font-bold mb-2">No articles found</h3>
                <p className="text-gray-300 mb-4">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button
                  className="text-neon-cyan hover:text-white transition-colors duration-300"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filteredPosts
                    .filter(post => searchQuery || activeCategory !== 'All' || !post.featured)
                    .map((post, index) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: 0.05 * index, duration: 0.5 }}
                        layout
                      >
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
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 md:py-32 bg-space-darkest relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-80 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-3xl blur-3xl opacity-40" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Stay updated with our latest insights
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Subscribe to our newsletter to receive the latest articles, tutorials, and industry insights.
            </motion.p>
            <motion.form 
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 bg-space-dark/60 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 text-white"
                required
              />
              <button
                type="submit"
                className="neon-button flex items-center justify-center"
              >
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </motion.form>
            <motion.p 
              className="text-sm text-gray-400 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </motion.p>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}