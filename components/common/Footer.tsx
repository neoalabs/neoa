import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { useEffect, useState } from 'react';
const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    const footerNavigation = {
      main: [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
      ],
      services: [
        { name: 'Web Development', href: '/services#web-development' },
        { name: 'Mobile Apps', href: '/services#mobile-apps' },
        { name: 'UX/UI Design', href: '/services#uxui-design' },
        { name: 'Digital Marketing', href: '/services#digital-marketing' },
      ],
      company: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ],
    };
  
    return (
      <footer className="bg-gray-900 relative overflow-hidden border-t border-gray-800">
        {/* Gradient background effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-teal/10 rounded-full blur-3xl opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-accent-teal to-accent-purple flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="text-white font-bold text-xl">Futura</span>
              </div>
              <p className="text-gray-400 mb-8 max-w-md">
                We build cutting-edge digital experiences that push the boundaries of what's possible online. Our mission is to create technology that feels like it's from tomorrow.
              </p>
              <div className="flex space-x-4">
  <motion.a
    href="#"
    className="text-gray-400 hover:text-accent-teal transition-colors duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="sr-only">Twitter</span>
    <Twitter className="w-6 h-6" />
  </motion.a>
  <motion.a
    href="#"
    className="text-gray-400 hover:text-accent-teal transition-colors duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="sr-only">LinkedIn</span>
    <Linkedin className="w-6 h-6" />
  </motion.a>
  <motion.a
    href="#"
    className="text-gray-400 hover:text-accent-teal transition-colors duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="sr-only">GitHub</span>
    <Github className="w-6 h-6" />
  </motion.a>
</div>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-medium mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {footerNavigation.main.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-accent-teal transition-colors duration-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-medium mb-6">Services</h3>
              <ul className="space-y-4">
                {footerNavigation.services.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-accent-teal transition-colors duration-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-medium mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-accent-teal mr-2 mt-0.5" />
                  <span className="text-gray-400">hello@futura.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-accent-teal mr-2 mt-0.5" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-accent-teal mr-2 mt-0.5" />
                  <span className="text-gray-400">123 Tech Avenue, San Francisco, CA 94107</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} Futura. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <Link href="/privacy" className="text-gray-400 hover:text-accent-teal text-sm transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-accent-teal text-sm transition-colors duration-300">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };