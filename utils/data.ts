// utils/data.ts

// Case studies data
export const caseStudies = [
    {
      slug: 'nova-finance',
      title: 'Nova Finance Dashboard',
      description: 'A cutting-edge financial platform with real-time data visualization and AI-powered insights.',
      category: 'Web Application',
      tags: ['Finance', 'Dashboard', 'Data Visualization'],
      image: {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        alt: 'Nova Finance Dashboard',
      },
      client: 'FinTech Solutions',
      year: '2023',
      featured: true,
    },
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
      featured: true,
    },
    {
      slug: 'pulse-health',
      title: 'Pulse Health Tracker',
      description: 'Health and fitness tracking platform with personalized insights and coaching.',
      category: 'Mobile Application',
      tags: ['Healthcare', 'IoT', 'Mobile'],
      image: {
        src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        alt: 'Pulse Health Tracker',
      },
      client: 'Pulse Health',
      year: '2023',
      featured: true,
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
      featured: false,
    },
    {
      slug: 'nebula-commerce',
      title: 'Nebula E-Commerce',
      description: 'Scalable e-commerce platform with personalized shopping experiences and advanced inventory management.',
      category: 'Web Application',
      tags: ['E-Commerce', 'Retail', 'Enterprise'],
      image: {
        src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        alt: 'Nebula E-Commerce',
      },
      client: 'Nebula Retail',
      year: '2022',
      featured: false,
    },
  ];
  
  // Blog posts data
  export const blogPosts = [
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
  ];
  
  // Services data
  export const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'We build performant, scalable, and secure web applications that deliver exceptional user experiences.',
      icon: 'Code',
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
      icon: 'Layout',
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
      icon: 'Smartphone',
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
      icon: 'LineChart',
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
  ];
  
  // Team members data
  export const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Design Lead',
      bio: 'With over 10 years of experience in digital design, Sarah leads our creative team in crafting beautiful, user-centered interfaces.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      social: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
    {
      name: 'Michael Chang',
      role: 'Tech Lead',
      bio: 'Michael specializes in building high-performance web applications with modern technologies and best practices.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      social: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
    {
      name: 'Elena Rodriguez',
      role: 'AI Specialist',
      bio: 'Elena brings expertise in artificial intelligence and machine learning to our projects, creating intelligent solutions.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      social: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
    {
      name: 'David Chen',
      role: 'Frontend Architect',
      bio: 'David focuses on creating scalable frontend architectures and component systems for enterprise applications.',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      social: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
    {
      name: 'Olivia Kim',
      role: 'UX Researcher',
      bio: 'Olivia combines user research methodologies with data analysis to inform our design decisions.',
      image: 'https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      social: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
    {
      name: 'Robert Nguyen',
      role: 'Backend Engineer',
      bio: 'Robert specializes in building robust APIs and microservices architecture for scalable applications.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      social: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
  ];
  
  // Client testimonials
  export const testimonials = [
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
  
  // FAQs
  export const faqs = [
    {
      question: 'What is your typical project process?',
      answer: 'Our process typically includes discovery, planning, design, development, testing, and deployment phases. We collaborate closely with clients throughout each stage to ensure the final product meets their needs and expectations.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity and scope. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months. We provide detailed timelines during the proposal phase.'
    },
    {
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes, we offer various maintenance and support packages to ensure your digital product remains secure, up-to-date, and performing optimally after launch.'
    },
    {
      question: 'What is your pricing structure?',
      answer: "We typically work on a project basis with clearly defined scopes and deliverables. For ongoing work, we offer retainer arrangements. We tailor our approach to each client's specific needs and budget."
    },
    {
      question: 'Can you work with our existing tech stack?',
      answer: "Absolutely. We're experienced in working with a wide range of technologies and can adapt to your existing infrastructure. We'll assess your current setup and recommend the best approach for your project."
    },
  ];