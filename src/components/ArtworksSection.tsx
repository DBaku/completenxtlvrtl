import React, { useState } from 'react';
import ArtworkCard from './ArtworkCard';
import { Filter } from 'lucide-react';

// Sample artwork data
const artworks = [
  {
    id: '1',
    title: 'Celestial Serenity',
    imageUrl: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    artist: 'NXT LVL Artist',
    price: 3800,
    category: 'Abstract',
    size: '80x120 cm',
    year: 2023,
  },
  {
    id: '2',
    title: 'Urban Reflections',
    imageUrl: 'https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    artist: 'NXT LVL Artist',
    price: 2400,
    category: 'Contemporary',
    size: '60x90 cm',
    year: 2022,
  },
  {
    id: '3',
    title: 'Golden Horizons',
    imageUrl: 'https://images.pexels.com/photos/2860807/pexels-photo-2860807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    artist: 'NXT LVL Artist',
    price: 4200,
    category: 'Landscape',
    size: '100x80 cm',
    year: 2023,
  },
  {
    id: '4',
    title: 'Chromatic Fusion',
    imageUrl: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    artist: 'NXT LVL Artist',
    price: 3100,
    category: 'Abstract',
    size: '70x70 cm',
    year: 2022,
  },
  {
    id: '5',
    title: 'Ethereal Whispers',
    imageUrl: 'https://images.pexels.com/photos/1639533/pexels-photo-1639533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    artist: 'NXT LVL Artist',
    price: 5600,
    category: 'Contemporary',
    size: '120x150 cm',
    year: 2023,
  },
  {
    id: '6',
    title: 'Midnight Symphony',
    imageUrl: 'https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    artist: 'NXT LVL Artist',
    price: 2900,
    category: 'Abstract',
    size: '60x80 cm',
    year: 2022,
  },
];

// Categories for filtering
const categories = ['All', 'Abstract', 'Contemporary', 'Landscape'];

const ArtworksSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter artworks based on selected category
  const filteredArtworks = activeCategory === 'All' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === activeCategory);
  
  return (
    <section id="artworks" className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Discover Our Collection</h2>
          <p className="section-subtitle mx-auto">
            Explore our curated selection of original artworks, each piece telling its own unique story.
          </p>
        </div>
        
        {/* Filter categories */}
        <div className="mb-10 flex flex-wrap items-center justify-between">
          <div className="hidden md:flex space-x-6 mx-auto">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 font-medium transition-colors duration-300 ${
                  activeCategory === category
                    ? 'text-gold-600 border-b-2 border-gold-600'
                    : 'text-gray-600 hover:text-gold-600'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Mobile filter */}
          <div className="md:hidden w-full">
            <button
              className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="flex items-center">
                <Filter size={16} className="mr-2" />
                <span>Filter: {activeCategory}</span>
              </span>
              <span className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {isFilterOpen && (
              <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-md animate-fade-in">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`block w-full text-left px-4 py-2 ${
                      activeCategory === category
                        ? 'bg-gold-50 text-gold-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setActiveCategory(category);
                      setIsFilterOpen(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Artwork grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map(artwork => (
            <ArtworkCard key={artwork.id} {...artwork} />
          ))}
        </div>
        
        {/* View more button */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All Artworks
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArtworksSection;