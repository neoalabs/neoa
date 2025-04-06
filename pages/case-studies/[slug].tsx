// pages/case-studies/[slug].tsx
import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { ChevronLeft, ExternalLink, ArrowRight } from 'lucide-react';

// Case study data type
interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  client: {
    name: string;
    industry: string;
    size: string;
    location: string;
  };
  year: string;
  duration: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: string[];
  results: {
    metric: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  testimonial?: {
    content: string;
    author: string;
    title: string;
  };
  images: {
    hero: {
      src: string;
      alt: string;
    };
    gallery: {
      src: string;
      alt: string;
    }[];
  };
  nextProject?: {
    slug: string;
    title: string;
  };
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

// Counter animation component
const AnimatedCounter = ({ value, label, duration = 2 }: { value: string; label: string; duration?: number }) => {
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
      className="text-center"
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold text-neon-cyan mb-2"
        initial="hidden"
        animate={controls}
        variants={{
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 } 
          },
          hidden: { 
            opacity: 0, 
            y: 20 
          }
        }}
      >
        {value}
      </motion.div>
      <div className="text-gray-300">{label}</div>
    </motion.div>
  );
};

// Related case studies
const relatedCaseStudies = [
  {
    slug: 'echo-social',
    title: 'Echo Social Platform',
    description: 'Next-generation social platform designed for creators with integrated monetization tools.',
    category: 'Mobile Application',
    tags: ['Social Media', 'Creator Economy', 'Mobile'],
    image: {
      src: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Echo Social Platform',
    },
    client: 'Echo Inc.',
    year: '2023',
  },
  {
    slug: 'quantum-analytics',
    title: 'Quantum Analytics Platform',
    description: 'Advanced analytics platform providing businesses with actionable insights from complex data.',
    category: 'Web Application',
    tags: ['Analytics', 'AI', 'Enterprise'],
    image: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Quantum Analytics Platform',
    },
    client: 'Quantum Data',
    year: '2022',
  },
  {
    slug: 'vortex-crm',
    title: 'Vortex CRM',
    description: 'Customer relationship management system with AI-powered insights and automation.',
    category: 'Web Application',
    tags: ['CRM', 'Enterprise', 'AI'],
    image: {
      src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Vortex CRM',
    },
    client: 'Vortex Solutions',
    year: '2021',
  },
];

// Mock case study data
const caseStudyData: CaseStudy = {
  slug: 'nova-finance',
  title: 'Nova Finance Dashboard',
  description: 'A cutting-edge financial platform with real-time data visualization and AI-powered insights.',
  category: 'Web Application',
  tags: ['Finance', 'Dashboard', 'Data Visualization'],
  client: {
    name: 'FinTech Solutions',
    industry: 'Financial Technology',
    size: '50-100 employees',
    location: 'New York, USA',
  },
  year: '2023',
  duration: '4 months',
  challenge: 'FinTech Solutions needed a sophisticated financial dashboard that could process and visualize large volumes of real-time market data. Their existing solution suffered from performance issues, lacked intuitive visualization tools, and couldn\'t scale to meet growing demands. They required a modern, responsive interface that would allow their clients to make informed investment decisions quickly.',
  solution: 'We developed the Nova Finance Dashboard, a high-performance web application that transforms complex financial data into actionable insights. The platform features real-time data processing, interactive visualization tools, and AI-powered analytics that identify trends and investment opportunities. The responsive design ensures a seamless experience across devices, while the modular architecture allows for easy scaling and feature additions.',
  features: [
    'Real-time market data integration',
    'Interactive chart and graph visualization',
    'AI-powered trend analysis and predictions',
    'Customizable dashboard layouts',
    'Portfolio performance tracking',
    'Risk assessment tools',
    'Notification and alert system',
    'Comprehensive reporting',
  ],
  technologies: [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'D3.js', 'TensorFlow.js', 'WebSockets', 'AWS', 'Docker'
  ],
  results: [
    {
      metric: 'Increased User Engagement',
      value: '87%',
    },
    {
      metric: 'Reduced Data Processing Time',
      value: '95%',
    },
    {
      metric: 'Improved Decision Making Speed',
      value: '65%',
    },
    {
      metric: 'Return on Investment',
      value: '320%',
    },
  ],
  testimonial: {
    content: "The Nova Finance Dashboard has transformed how our clients interact with financial data. The intuitive interface and powerful analytics have significantly improved decision-making processes and client satisfaction. Futura delivered beyond our expectations.",
    author: "Michael Chen",
    title: "CTO, FinTech Solutions",
  },
  images: {
    hero: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      alt: 'Nova Finance Dashboard',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        alt: 'Dashboard Overview',
      },
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        alt: 'Data Visualization',
      },
      {
        src: 'https://images.unsplash.com/photo-1579170053380-58064b2dee67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        alt: 'Mobile View',
      },
      {
        src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        alt: 'Client Implementation',
      },
    ],
  },
  nextProject: {
    slug: 'echo-social',
    title: 'Echo Social Platform',
  },
};

// GetStaticPaths - define the dynamic routes
export const getStaticPaths: GetStaticPaths = async () => {
  // In a real application, you would fetch the slugs from an API or CMS
  const paths = [
    { params: { slug: 'nova-finance' } },
    { params: { slug: 'echo-social' } },
    { params: { slug: 'pulse-health' } },
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
      caseStudy: caseStudyData,
    },
    revalidate: 60, // Regenerate the page every 60 seconds if there are updates
  };
};

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
  const router = useRouter();
  
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
  
  return (
    <DefaultLayout 
      title={`${caseStudy.title} | Case Study | Futura`}
      description={caseStudy.description}
      openGraph={{
        title: `${caseStudy.title} | Case Study | Futura`,
        description: caseStudy.description,
        image: caseStudy.images.hero.src,
        type: 'article',
      }}
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        {/* Hero Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image 
              src={caseStudy.images.hero.src}
              alt={caseStudy.images.hero.alt}
              layout="fill"
              objectFit="cover"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-space-darkest/70 via-space-darkest/40 to-space" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <Link href="/case-studies" className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 mb-8">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Case Studies
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {caseStudy.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-block px-3 py-1 rounded-full text-sm bg-neon-cyan/20 text-neon-cyan"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {caseStudy.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">
              {caseStudy.description}
            </p>
            
            <div className="flex flex-wrap gap-6 text-gray-300">
              <div>
                <p className="text-sm uppercase">Client</p>
                <p className="font-medium">{caseStudy.client.name}</p>
              </div>
              <div>
                <p className="text-sm uppercase">Industry</p>
                <p className="font-medium">{caseStudy.client.industry}</p>
              </div>
              <div>
                <p className="text-sm uppercase">Year</p>
                <p className="font-medium">{caseStudy.year}</p>
              </div>
              <div>
                <p className="text-sm uppercase">Duration</p>
                <p className="font-medium">{caseStudy.duration}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section className="py-16 md:py-24 bg-space">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeInWhenVisible>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">The Challenge</h2>
                <div className="prose prose-lg prose-invert">
                  <p>{caseStudy.challenge}</p>
                </div>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.2}>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">The Solution</h2>
                <div className="prose prose-lg prose-invert">
                  <p>{caseStudy.solution}</p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
      
      {/* Image Gallery Section */}
      <section className="py-16 md:py-24 bg-space-darkest">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInWhenVisible>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Project Gallery</h2>
          </FadeInWhenVisible>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudy.images.gallery.map((image, index) => (
              <FadeInWhenVisible key={index} delay={0.1 * index}>
                <div className="glass-panel p-0 overflow-hidden">
                  <div className="aspect-w-16 aspect-h-10 w-full relative">
                    <Image 
                      src={image.src} 
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-gray-300">{image.alt}</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features and Technologies Section */}
      <section className="py-16 md:py-24 bg-space">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeInWhenVisible>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Key Features</h2>
                <ul className="space-y-4">
                  {caseStudy.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-neon-cyan/20 text-neon-cyan flex items-center justify-center flex-shrink-0">
                        <span className="block w-2 h-2 rounded-full bg-current" />
                      </div>
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.2}>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {caseStudy.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-4 py-2 rounded-lg text-sm bg-space-light/20 text-white border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="py-16 md:py-24 bg-space-darkest">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInWhenVisible>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Project Results</h2>
          </FadeInWhenVisible>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {caseStudy.results.map((result, index) => (
              <FadeInWhenVisible key={index} delay={0.1 * index}>
                <div className="glass-panel p-6 text-center">
                  <AnimatedCounter value={result.value} label={result.metric} />
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      {caseStudy.testimonial && (
        <section className="py-16 md:py-24 bg-space">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeInWhenVisible>
              <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12">
                <blockquote className="text-xl md:text-2xl font-medium text-center text-white mb-8">
                  "{caseStudy.testimonial.content}"
                </blockquote>
                <div className="flex flex-col items-center">
                  <p className="font-bold text-white">{caseStudy.testimonial.author}</p>
                  <p className="text-gray-400">{caseStudy.testimonial.title}</p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      )}
      
      {/* Related Projects Section */}
      <section className="py-16 md:py-24 bg-space-darkest">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <FadeInWhenVisible>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Related Projects</h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <Link href="/case-studies" className="text-neon-cyan hover:text-white transition-colors duration-300 flex items-center">
                View All Case Studies
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </FadeInWhenVisible>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedCaseStudies.map((study, index) => (
              <FadeInWhenVisible key={index} delay={0.1 * index}>
                <Card
                  title={study.title}
                  description={study.description}
                  image={study.image}
                  tags={study.tags}
                  href={`/case-studies/${study.slug}`}
                  metadata={{
                    client: study.client,
                    year: study.year,
                  }}
                  variant="caseStudy"
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
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button href="/contact" size="lg">
                  Get in Touch
                </Button>
                {caseStudy.nextProject && (
                  <Button href={`/case-studies/${caseStudy.nextProject.slug}`} variant="outline" size="lg">
                    Next Project: {caseStudy.nextProject.title}
                  </Button>
                )}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </DefaultLayout>
  );
}