import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-serif font-bold">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close cart"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Cart items */}
          {state.items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center">
              <ShoppingBag size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {state.items.map(item => (
                <div key={item.id} className="flex items-center py-4 border-b border-gray-200">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-20 w-20 object-cover"
                  />
                  
                  <div className="ml-4 flex-1">
                    <h3 className="font-serif text-sm font-medium">{item.title}</h3>
                    <p className="text-gold-600">${item.price.toLocaleString()}</p>
                    
                    <div className="mt-2 flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-3 min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-gray-400 hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-serif">Total</span>
              <span className="text-xl font-serif font-bold text-gold-600">
                ${state.total.toLocaleString()}
              </span>
            </div>
            
            <button
              className="w-full btn-primary bg-gold-600"
              disabled={state.items.length === 0}
              onClick={() => alert('Checkout functionality coming soon!')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart