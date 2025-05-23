import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-wide">
          <span className="block animate-slide-up" style={{ animationDelay: '0.3s' }}>Experience Art</span>
          <span className="block animate-slide-up" style={{ animationDelay: '0.6s' }}>at the Next Level</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.9s' }}>
          Discover unique, contemporary artworks from the most influential artists of our time.
        </p>
        <div className="flex justify-center space-x-4 animate-slide-up" style={{ animationDelay: '1.2s' }}>
          <a href="#artworks" className="btn-primary">
            Explore Collection
          </a>
          <a href="#artist" className="btn-secondary text-white border-white hover:bg-white/10">
            About the Artist
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a 
          href="#artist" 
          className="text-white/80 hover:text-white transition-colors duration-300"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('artist')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronDown size={36} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;