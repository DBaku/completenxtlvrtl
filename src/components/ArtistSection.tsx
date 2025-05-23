import React from 'react';

const ArtistSection: React.FC = () => {
  return (
    <section id="artist" className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="bg-gold-500 absolute -top-4 -left-4 w-full h-full z-0"></div>
              <img 
                src="https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Artist in studio" 
                className="relative z-10 w-full h-auto object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-4 -right-4 bg-charcoal-900 text-white p-6 max-w-xs z-20">
                <p className="font-serif italic text-gold-400">
                  "Art is not what you see, but what you make others see."
                </p>
                <p className="text-right mt-2 text-sm">— Edgar Degas</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="section-title">The Artist</h2>
            <p className="text-lg mb-6 text-gray-700">
              With over 15 years of experience in contemporary art, our visionary creator brings a unique perspective to each piece. Blending traditional techniques with modern innovation, the artwork speaks to both the past and future.
            </p>
            <p className="text-lg mb-8 text-gray-700">
              Each creation is a journey through emotion, color, and form—telling stories that resonate with collectors worldwide. The distinctive style has been featured in galleries across Europe and North America, earning critical acclaim for its depth and originality.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border-l-4 border-gold-500 pl-4">
                <p className="text-3xl font-serif font-bold text-charcoal-900">15+</p>
                <p className="text-sm text-gray-600">Years of Experience</p>
              </div>
              <div className="border-l-4 border-gold-500 pl-4">
                <p className="text-3xl font-serif font-bold text-charcoal-900">120+</p>
                <p className="text-sm text-gray-600">Artworks Created</p>
              </div>
              <div className="border-l-4 border-gold-500 pl-4">
                <p className="text-3xl font-serif font-bold text-charcoal-900">24</p>
                <p className="text-sm text-gray-600">Exhibition Features</p>
              </div>
            </div>
            
            <a href="#artworks" className="btn-primary">
              View Artwork Collection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;