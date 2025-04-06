// pages/contact.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import DefaultLayout from '../components/layouts/DefaultLayout';
import Button from '../components/common/Button';
import { Mail, Phone, MapPin, Clock, ArrowRight, Check, AlertCircle } from 'lucide-react';

// Form field animation variants
const inputVariants = {
  focus: {
    borderColor: 'rgba(10, 236, 240, 0.8)',
    boxShadow: '0 0 0 2px rgba(10, 236, 240, 0.2)',
    y: -4,
  },
  blur: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: 'none',
    y: 0,
  },
};

// FAQ data
const faqs = [
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

// Form data type
interface FormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
}

export default function ContactPage() {
  // Form state
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormData>();
  const [activeField, setActiveField] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // FAQ state
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would send the data to your API here
      console.log('Form submitted successfully', data);
      
      // Reset form error state
      setSubmitError(null);
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.');
      console.error('Form submission error', error);
    }
  };
  
  // Contact info items
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-neon-cyan" />,
      title: 'Email Us',
      details: 'hello@futura.com',
      action: 'mailto:hello@futura.com',
    },
    {
      icon: <Phone className="w-6 h-6 text-neon-cyan" />,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
    },
    {
      icon: <MapPin className="w-6 h-6 text-neon-cyan" />,
      title: 'Visit Us',
      details: '123 Innovation Ave, San Francisco, CA',
      action: 'https://maps.google.com',
    },
    {
      icon: <Clock className="w-6 h-6 text-neon-cyan" />,
      title: 'Working Hours',
      details: 'Monday - Friday: 9am - 6pm',
    },
  ];
  
  return (
    <DefaultLayout 
      title="Contact Us | Futura"
      description="Get in touch with our team to discuss your next digital project. We're ready to help bring your vision to life."
    >
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-64 -right-64 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-64 -left-64 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl text-gray-300">
              Have a project in mind? Get in touch with our team to see how we can help bring your vision to life.
            </p>
          </div>
          
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="glass-panel p-6 flex flex-col items-center text-center"
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full bg-space-light/30 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.details}</p>
                {item.action && (
                  <a 
                    href={item.action}
                    className="text-neon-cyan hover:text-white transition-colors duration-300 flex items-center"
                    target={item.action.startsWith('http') ? '_blank' : undefined}
                    rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    Connect
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div
              className="glass-panel p-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Send us a message</h2>
              
              {isSubmitSuccessful ? (
                <motion.div 
                  className="py-10 flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 rounded-full bg-neon-cyan/20 flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-neon-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent Successfully</h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for reaching out! Our team will get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                      Full Name <span className="text-neon-magenta">*</span>
                    </label>
                    <motion.div
                      variants={inputVariants}
                      animate={activeField === 'name' ? 'focus' : 'blur'}
                      className="relative"
                    >
                      <input
                        id="name"
                        type="text"
                        className={`w-full px-4 py-3 bg-space-dark/60 border ${
                          errors.name ? 'border-red-500' : 'border-white/10'
                        } rounded-lg focus:outline-none text-white`}
                        placeholder="John Doe"
                        {...register('name', { required: 'Name is required' })}
                        onFocus={() => setActiveField('name')}
                        onBlur={() => setActiveField(null)}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.name.message}
                        </p>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                      Email Address <span className="text-neon-magenta">*</span>
                    </label>
                    <motion.div
                      variants={inputVariants}
                      animate={activeField === 'email' ? 'focus' : 'blur'}
                      className="relative"
                    >
                      <input
                        id="email"
                        type="email"
                        className={`w-full px-4 py-3 bg-space-dark/60 border ${
                          errors.email ? 'border-red-500' : 'border-white/10'
                        } rounded-lg focus:outline-none text-white`}
                        placeholder="john@example.com"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          }
                        })}
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.email.message}
                        </p>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Phone field (optional) */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-200">
                      Phone Number <span className="text-gray-400">(Optional)</span>
                    </label>
                    <motion.div
                      variants={inputVariants}
                      animate={activeField === 'phone' ? 'focus' : 'blur'}
                      className="relative"
                    >
                      <input
                        id="phone"
                        type="tel"
                        className="w-full px-4 py-3 bg-space-dark/60 border border-white/10 rounded-lg focus:outline-none text-white"
                        placeholder="+1 (555) 123-4567"
                        {...register('phone')}
                        onFocus={() => setActiveField('phone')}
                        onBlur={() => setActiveField(null)}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Company field (optional) */}
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-200">
                      Company <span className="text-gray-400">(Optional)</span>
                    </label>
                    <motion.div
                      variants={inputVariants}
                      animate={activeField === 'company' ? 'focus' : 'blur'}
                      className="relative"
                    >
                      <input
                        id="company"
                        type="text"
                        className="w-full px-4 py-3 bg-space-dark/60 border border-white/10 rounded-lg focus:outline-none text-white"
                        placeholder="Company name"
                        {...register('company')}
                        onFocus={() => setActiveField('company')}
                        onBlur={() => setActiveField(null)}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Service field */}
                  <div className="space-y-2">
                    <label htmlFor="service" className="block text-sm font-medium text-gray-200">
                      Service Interested In <span className="text-neon-magenta">*</span>
                    </label>
                    <motion.div
                      variants={inputVariants}
                      animate={activeField === 'service' ? 'focus' : 'blur'}
                      className="relative"
                    >
                      <select
                        id="service"
                        className={`w-full px-4 py-3 bg-space-dark/60 border ${
                          errors.service ? 'border-red-500' : 'border-white/10'
                        } rounded-lg focus:outline-none text-white appearance-none`}
                        {...register('service', { required: 'Please select a service' })}
                        onFocus={() => setActiveField('service')}
                        onBlur={() => setActiveField(null)}
                      >
                        <option value="" disabled selected>Select a service</option>
                        <option value="web-development">Web Development</option>
                        <option value="mobile-app">Mobile App Development</option>
                        <option value="ui-ux">UI/UX Design</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {errors.service && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.service.message}
                        </p>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Budget field */}
                  <div className="space-y-2">
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-200">
                      Budget Range <span className="text-neon-magenta">*</span>
                    </label>
                    <motion.div
                      variants={inputVariants}
                      animate={activeField === 'budget' ? 'focus' : 'blur'}
                      className="relative"
                    >
                      <select
                        id="budget"
                        className={`w-full px-4 py-3 bg-space-dark/60 border ${
                          errors.budget ? 'border-red-500' : 'border-white/10'
                        } rounded-lg focus:outline-none text-white appearance-none`}
                        {...register('budget', { required: 'Please select a budget range' })}
                        onFocus={() => setActiveField('budget')}
                        onBlur={() => setActiveField(null)}
                      >
                        <option value="" disabled selected>Select budget range</option>
                        <option value="less-than-10k">Less than $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="more-than-100k">More than $100,000</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {errors.budget && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.budget.message}
                        </p>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Message field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                      Project Details <span className="text-neon-magenta">*</span>
                    </label>
                    <motion.div
                      variants={inputVariants}
                      animate={activeField === 'message' ? 'focus' : 'blur'}
                      className="relative"
                    >
                      <textarea
                        id="message"
                        rows={5}
                        className={`w-full px-4 py-3 bg-space-dark/60 border ${
                          errors.message ? 'border-red-500' : 'border-white/10'
                        } rounded-lg focus:outline-none text-white`}
                        placeholder="Tell us about your project..."
                        {...register('message', { 
                          required: 'Project details are required',
                          minLength: {
                            value: 20,
                            message: 'Please provide more details (at least 20 characters)'
                          }
                        })}
                        onFocus={() => setActiveField('message')}
                        onBlur={() => setActiveField(null)}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.message.message}
                        </p>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Submit error message */}
                  {submitError && (
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-100">
                      <p className="flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {submitError}
                      </p>
                    </div>
                  )}
                  
                  {/* Submit button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
            
            {/* Map and Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="glass-panel p-0 overflow-hidden mb-8">
                <div className="aspect-w-16 aspect-h-10 w-full">
                  {/* Placeholder for a real map integration */}
                  <div className="w-full h-full bg-space-dark/80 flex items-center justify-center">
                    <div className="text-center p-8">
                      <MapPin className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
                      <h3 className="text-xl font-bold">Interactive Map</h3>
                      <p className="text-gray-400">A Google Maps or Mapbox integration would appear here</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* FAQ Accordion */}
              <div className="glass-panel p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      className={`border-b border-white/10 pb-4 ${index === faqs.length - 1 ? 'border-b-0' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index + 0.5, duration: 0.4 }}
                    >
                      <button
                        className="w-full flex justify-between items-center py-2 text-left focus:outline-none"
                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                      >
                        <span className="text-lg font-medium">{faq.question}</span>
                        <motion.div
                          animate={{ rotate: activeIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{
                          height: activeIndex === index ? 'auto' : 0,
                          opacity: activeIndex === index ? 1 : 0,
                          marginTop: activeIndex === index ? 12 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-300">{faq.answer}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}