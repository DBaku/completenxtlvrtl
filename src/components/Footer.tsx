import React from 'react';
import Logo from './Logo';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and about */}
          <div>
            <Logo />
            <p className="mt-4 text-gray-400">
              NXT LVL ART represents the pinnacle of contemporary artistic expression, 
              bringing unique perspectives and exceptional talent to collectors worldwide.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="bg-charcoal-800 hover:bg-gold-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="bg-charcoal-800 hover:bg-gold-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="bg-charcoal-800 hover:bg-gold-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-gold-400">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="#artist" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">About the Artist</a>
              </li>
              <li>
                <a href="#artworks" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">Artworks</a>
              </li>
              <li>
                <a href="#exhibitions" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">Exhibitions</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Customer service */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-gold-400">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">Shipping & Returns</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">Payment Options</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">Privacy Policy</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-gold-400">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates on new artworks, exhibitions, and exclusive events.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow p-3 bg-charcoal-800 border border-charcoal-700 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <button 
                type="submit" 
                className="bg-gold-600 hover:bg-gold-700 px-4 py-3 text-white transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-charcoal-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} NXT LVL ART. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;