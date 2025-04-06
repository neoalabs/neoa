// components/sections/ContactForm.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import { ArrowRight, AlertCircle } from 'lucide-react';

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

// Form data type
interface FormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
}

export default function ContactForm() {
  // Form state
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormData>();
  const [activeField, setActiveField] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
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

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-300">
              Ready to start your next project? Fill out the form below and our team will be in touch.
            </p>
          </div>
          
          <motion.div
            className="glass-panel p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isSubmitSuccessful ? (
              <motion.div 
                className="py-10 flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-16 h-16 rounded-full bg-neon-cyan/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
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
                
                {/* Message field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                    Message <span className="text-neon-magenta">*</span>
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
                        required: 'Message is required',
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
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}