import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';
import { Link } from './Navigation';
import Logo from './Logo';
import Cart from './Cart';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';
import SearchBar from './SearchBar';
import { supabase, refreshSession } from '../lib/supabase';
import { checkAdminStatus } from '../lib/admin';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state } = useCart();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await refreshSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAdmin(false);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user || null);
      } else if (event === 'USER_DELETED') {
        setUser(null);
        setIsAdmin(false);
        toast.error('User account has been deleted');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const isAdminUser = await checkAdminStatus();
        setIsAdmin(isAdminUser);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };

    if (user) {
      checkAdmin();
    }
  }, [user]);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async (query: string) => {
    // Implement search logic here
    toast.success(`Searching for: ${query}`);
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear any auth-related local storage
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('supabase.auth.expires_at');
      
      setUser(null);
      setIsAdmin(false);
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-soft py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Logo />
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#home" className="nav-link">Home</Link>
              <Link href="#artist" className="nav-link">Artist</Link>
              <Link href="#artworks" className="nav-link">Artworks</Link>
              <Link href="#exhibitions" className="nav-link">Exhibitions</Link>
              <Link href="#contact" className="nav-link">Contact</Link>
              {isAdmin && (
                <a 
                  href="/admin"
                  className="text-gold-600 font-medium hover:text-gold-700 transition-colors duration-300"
                >
                  Admin Panel
                </a>
              )}
            </nav>
            
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-700 hover:text-gold-600 transition-colors duration-300"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-gold-600 transition-colors duration-300"
                >
                  Sign Out
                </button>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-gray-700 hover:text-gold-600 transition-colors duration-300"
                >
                  <User size={20} />
                </button>
              )}
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="text-gray-700 hover:text-gold-600 transition-colors duration-300 relative"
              >
                <ShoppingBag size={20} />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {state.items.length}
                  </span>
                )}
              </button>
            </div>
            
            <button 
              className="md:hidden text-gray-700 hover:text-gold-600 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {isSearchOpen && (
            <div className="mt-4">
              <SearchBar onSearch={handleSearch} />
            </div>
          )}
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full border-t border-gray-200 animate-fade-in">
            <div className="container-custom py-4">
              <nav className="flex flex-col space-y-4">
                <Link href="#home" className="text-lg py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link href="#artist" className="text-lg py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>
                  Artist
                </Link>
                <Link href="#artworks" className="text-lg py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>
                  Artworks
                </Link>
                <Link href="#exhibitions" className="text-lg py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>
                  Exhibitions
                </Link>
                <Link href="#contact" className="text-lg py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
                {isAdmin && (
                  <a 
                    href="/admin"
                    className="text-lg py-2 border-b border-gray-100 text-gold-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </a>
                )}
              </nav>
              
              <div className="flex items-center space-x-6 mt-6 pt-4 border-t border-gray-100">
                <button className="text-gray-700 hover:text-gold-600 transition-colors duration-300 flex items-center">
                  <Search size={20} />
                  <span className="ml-2">Search</span>
                </button>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="text-gray-700 hover:text-gold-600 transition-colors duration-300 flex items-center"
                  >
                    <User size={20} />
                    <span className="ml-2">Sign Out</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="text-gray-700 hover:text-gold-600 transition-colors duration-300 flex items-center"
                  >
                    <User size={20} />
                    <span className="ml-2">Sign In</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="text-gray-700 hover:text-gold-600 transition-colors duration-300 flex items-center"
                >
                  <ShoppingBag size={20} />
                  <span className="ml-2">Cart ({state.items.length})</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;