import React from 'react';
import { Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ArtworkCardProps {
  id: string;
  title: string;
  imageUrl: string;
  artist: string;
  price: number;
  category: string;
  size: string;
  year: number;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  id,
  title,
  imageUrl,
  artist,
  price,
  category,
  size,
  year,
}) => {
  const { dispatch } = useCart();
  
  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id,
        title,
        imageUrl,
        price,
      },
    });
  };
  
  return (
    <div className="art-card group">
      {/* Image */}
      <div className="overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="art-card-image"
        />
        <div className="art-card-overlay">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex space-x-2">
              <button 
                className="bg-white/90 hover:bg-white text-charcoal-900 p-2 rounded-full transition-colors duration-300"
                aria-label="View details"
              >
                <Eye size={18} />
              </button>
              <button 
                className="bg-gold-600/90 hover:bg-gold-600 text-white p-2 rounded-full transition-colors duration-300"
                aria-label="Add to cart"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Details */}
      <div className="p-4">
        <h3 className="font-serif font-medium text-xl mb-1 text-charcoal-900 group-hover:text-gold-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-2">{category} • {year}</p>
        <p className="text-gold-600 font-medium">${price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ArtworkCard;