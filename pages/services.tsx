// pages/services.tsx
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import DefaultLayout from '../components/layouts/DefaultLayout';
import Button from '../components/common/Button';
import { Code, Layout, Smartphone, LineChart, Database, Shield, Search, Zap, ArrowRight } from 'lucide-react';

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

// Process step animation
const ProcessStep = ({ number, title, description, delay = 0 }: { number: number; title: string; description: string; delay?: number }) => {
  return (
    <FadeInWhenVisible delay={delay}>
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center mb-6 relative">
          <span className="text-3xl font-bold text-neon-cyan">{number}</span>
          <motion.div
            className="absolute inset-0 rounded-full border border-neon-cyan/50"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.2, 0.5]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </FadeInWhenVisible>
  );
};

// Services data
const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'We build performant, scalable, and secure web applications that deliver exceptional user experiences.',
    icon: <Code size={32} />,
    color: 'neon-cyan',
    features: [
      'Custom web application development',
      'Progressive Web Apps (PWAs)',
      'E-commerce solutions',
      'Content management systems',
      'API development and integration',
      'Performance optimization',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'uxui-design',
    title: 'UX/UI Design',
    description: 'Our design team creates intuitive, engaging interfaces that delight users and achieve business goals.',
    icon: <Layout size={32} />,
    color: 'neon-magenta',
    features: [
      'User research and analysis',
      'Information architecture',
      'Wireframing and prototyping',
      'Visual design and branding',
      'Design systems',
      'Usability testing',
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Principle', 'Framer'],
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    description: 'We develop native and cross-platform mobile applications that provide seamless experiences across devices.',
    icon: <Smartphone size={32} />,
    color: 'neon-purple',
    features: [
      'iOS app development',
      'Android app development',
      'Cross-platform solutions',
      'Mobile UX/UI design',
      'App store optimization',
      'Maintenance and support',
    ],
    technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase', 'Expo'],
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization',
    description: 'Transform complex data into meaningful insights with interactive dashboards and visualizations.',
    icon: <LineChart size={32} />,
    color: 'neon-blue',
    features: [
      'Interactive dashboards',
      'Real-time data visualization',
      'Custom charts and graphs',
      'Data analysis',
      'Business intelligence solutions',
      'Reporting systems',
    ],
    technologies: ['D3.js', 'Three.js', 'Tableau', 'Power BI', 'Chart.js', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Scalable, secure, and cost-effective cloud infrastructure for your digital products.',
    icon: <Database size={32} />,
    color: 'neon-cyan',
    features: [
      'Cloud architecture design',
      'Migration to cloud',
      'Serverless applications',
      'DevOps implementation',
      'Infrastructure as Code',
      'Monitoring and optimization',
    ],
    technologies: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'security-services',
    title: 'Security Services',
    description: 'Protect your digital assets with comprehensive security solutions and best practices.',
    icon: <Shield size={32} />,
    color: 'neon-magenta',
    features: [
      'Security audits',
      'Penetration testing',
      'Vulnerability assessment',
      'Authentication systems',
      'Data encryption',
      'Compliance consulting',
    ],
    technologies: ['OAuth', 'JWT', 'OWASP', 'SSL/TLS', 'Two-factor authentication', 'Encryption'],
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Drive growth with data-driven digital marketing strategies tailored to your business goals.',
    icon: <Search size={32} />,
    color: 'neon-purple',
    features: [
      'SEO optimization',
      'Content marketing',
      'Social media management',
      'PPC campaigns',
      'Email marketing',
      'Analytics and reporting',
    ],
    technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Mailchimp', 'HubSpot', 'Meta Ads Manager'],
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a70d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    description: 'Enhance your digital products with artificial intelligence and machine learning capabilities.',
    icon: <Zap size={32} />,
    color: 'neon-blue',
    features: [
      'Chatbots and virtual assistants',
      'Recommendation systems',
      'Natural language processing',
      'Image recognition',
      'Predictive analytics',
      'AI strategy consulting',
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'IBM Watson', 'Google Cloud AI', 'Azure Cognitive Services'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
];

// Process steps
const processSteps = [
  {
    number: 1,
    title: 'Discovery',
    description: 'We begin by understanding your business, goals, target audience, and project requirements.',
  },
  {
    number: 2,
    title: 'Strategy',
    description: 'Our team develops a comprehensive strategy and project roadmap tailored to your needs.',
  },
  {
    number: 3,
    title: 'Design',
    description: 'We create intuitive, engaging designs that align with your brand and user expectations.',
  },
  {
    number: 4,
    title: 'Development',
    description: 'Our engineers build your solution using cutting-edge technologies and best practices.',
  },
  {
    number: 5,
    title: 'Testing',
    description: 'Rigorous testing ensures your product meets quality, performance, and security standards.',
  },
  {
    number: 6,
    title: 'Launch',
    description: 'We deploy your product and provide comprehensive launch support for a smooth release.',
  },
  {
    number: 7,
    title: 'Growth',
    description: 'Post-launch, we help optimize your product based on user feedback and analytics.',
  },
];

// Testimonials data
const testimonials = [
  {
    content: "Working with Futura was a game-changer for our business. Their team delivered a cutting-edge web application that exceeded our expectations and helped us increase user engagement by 200%.",
    author: "Sarah Johnson",
    title: "CEO, TechVision Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    content: "Futura's mobile development team built an app that our users love. Their attention to detail and focus on performance resulted in a 95% user satisfaction rate.",
    author: "Michael Chang",
    title: "Product Director, MobiConnect",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    content: "The data visualization dashboard Futura created transformed how we analyze and present information to our clients. It's both powerful and beautiful.",
    author: "Elena Rodriguez",
    title: "Analytics Lead, DataPulse",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
];

export default function ServicesPage() {
  return (
    <DefaultLayout 
      title="Our Services | Futura"
      description="Explore our comprehensive range of digital services including web development, mobile apps, UX/UI design, and more."
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
              Our <span className="gradient-text">Services</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              We offer a comprehensive suite of digital services to help businesses thrive in the digital landscape.
            </motion.p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.slice(0, 8).map((service, index) => (
              <FadeInWhenVisible key={index} delay={0.1 * index}>
                <a 
                  href={`#${service.id}`} 
                  className="glass-panel p-6 hover:bg-space-light/10 transition-colors duration-300 flex flex-col h-full"
                >
                  <div className={`w-12 h-12 rounded-full bg-${service.color}/20 text-${service.color} flex items-center justify-center mb-4`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 flex-grow">{service.description}</p>
                  <div className="flex items-center text-sm text-neon-cyan font-medium">
                    Learn more
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </a>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 md:py-32 bg-space-darkest relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeInWhenVisible>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Our <span className="gradient-text">Process</span>
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-gray-300">
                We follow a proven, iterative process to ensure successful outcomes for every project.
              </p>
            </FadeInWhenVisible>
          </div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan hidden lg:block" />
            
            {/* Process steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-10">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={index}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Details Section */}
      {services.map((service, index) => (
        <section 
          key={index} 
          id={service.id} 
          className={`py-20 md:py-32 ${index % 2 === 0 ? 'bg-space' : 'bg-space-darkest'} relative`}
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div 
              className={`absolute -top-64 -right-64 w-96 h-96 bg-${service.color}/20 rounded-full blur-3xl opacity-30`}
              animate={{ 
                x: [0, 30, 0],
                y: [0, 20, 0],
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <FadeInWhenVisible>
                  <div className={`w-16 h-16 rounded-full bg-${service.color}/20 text-${service.color} flex items-center justify-center mb-6`}>
                    {service.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">{service.title}</h2>
                  <p className="text-xl text-gray-300 mb-8">{service.description}</p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">What We Offer</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`mt-1 mr-3 w-4 h-4 rounded-full bg-${service.color}/20 text-${service.color} flex items-center justify-center`}>
                            <span className="block w-2 h-2 rounded-full bg-current" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Technologies We Use</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className={`inline-block px-3 py-1 rounded-full text-sm bg-${service.color}/10 text-${service.color} border border-${service.color}/30`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button href="/contact">
                    Discuss Your Project
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </FadeInWhenVisible>
              </div>
              
              <FadeInWhenVisible delay={0.3}>
                <div className="relative">
                  <div className={`absolute inset-0 bg-${service.color}/20 rounded-3xl blur-xl transform -rotate-3 scale-105`} />
                  <div className="glass-panel overflow-hidden rounded-3xl relative">
                    <div className="aspect-w-16 aspect-h-12">
                      <Image
                        src={service.image}
                        alt={service.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-3xl"
                      />
                    </div>
                    
                    {/* Overlay gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-tr from-space-darkest/70 to-transparent rounded-3xl`} />
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>
      ))}
      
      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-space relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeInWhenVisible>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Client <span className="gradient-text">Testimonials</span>
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-gray-300">
                Don't just take our word for it. Here's what our clients have to say about working with us.
              </p>
            </FadeInWhenVisible>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeInWhenVisible key={index} delay={0.1 * index}>
                <div className="glass-panel p-8 h-full flex flex-col">
                  <div className="mb-6">
                    {/* Stars */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-neon-cyan" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-lg font-medium mb-6">
                      "{testimonial.content}"
                    </blockquote>
                  </div>
                  
                  <div className="mt-auto flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-sm text-gray-400">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-space-darkest relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-80 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-3xl blur-3xl opacity-40" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to transform your digital presence?
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your project and discover how our services can help you achieve your business goals.
              </p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.3}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button href="/contact" size="lg">
                  Get in Touch
                </Button>
                <Button href="/case-studies" variant="outline" size="lg">
                  View Our Work
                </Button>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}