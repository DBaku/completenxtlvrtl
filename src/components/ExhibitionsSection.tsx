import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const exhibitions = [
  {
    id: '1',
    title: 'Contemporary Visions',
    date: 'June 15 - July 30, 2025',
    location: 'Modern Art Gallery, New York',
    imageUrl: 'https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'An exploration of modern artistic expressions through a curated selection of abstract and contemporary pieces.',
  },
  {
    id: '2',
    title: 'Textures & Emotions',
    date: 'August 10 - September 25, 2025',
    location: 'The Art Space, London',
    imageUrl: 'https://images.pexels.com/photos/2425031/pexels-photo-2425031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A deep dive into the emotional impact of textural elements in contemporary art, featuring multimedia installations.',
  },
  {
    id: '3',
    title: 'Colors of Tomorrow',
    date: 'October 5 - November 20, 2025',
    location: 'International Art Center, Paris',
    imageUrl: 'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A forward-looking exhibition exploring new color theories and their application in modern artistic practices.',
  },
];

const ExhibitionsSection: React.FC = () => {
  return (
    <section id="exhibitions" className="py-20 bg-charcoal-900">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-white">Upcoming Exhibitions</h2>
          <p className="section-subtitle text-gray-300 mx-auto">
            Experience our artwork in person at these upcoming exhibitions and events.
          </p>
        </div>
        
        {/* Exhibition cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exhibitions.map(exhibition => (
            <div key={exhibition.id} className="bg-charcoal-800 group hover:bg-charcoal-700 transition-all duration-500">
              <div className="relative overflow-hidden">
                <img 
                  src={exhibition.imageUrl} 
                  alt={exhibition.title} 
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  {exhibition.title}
                </h3>
                
                <div className="flex items-center text-gray-400 mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>{exhibition.date}</span>
                </div>
                
                <div className="flex items-center text-gray-400 mb-4">
                  <MapPin size={16} className="mr-2" />
                  <span>{exhibition.location}</span>
                </div>
                
                <p className="text-gray-300 mb-6">
                  {exhibition.description}
                </p>
                
                <button className="bg-transparent border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-white px-4 py-2 transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExhibitionsSection;