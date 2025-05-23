import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ArtistSection from './components/ArtistSection';
import ArtworksSection from './components/ArtworksSection';
import ExhibitionsSection from './components/ExhibitionsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import AdminPanel from './pages/AdminPanel';
import AdminRoute from './components/AdminRoute';

function App() {
  // Check if we're on the admin route
  const isAdminRoute = window.location.pathname === '/admin';

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        {isAdminRoute ? (
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        ) : (
          <>
            <Header />
            <main>
              <HeroSection />
              <ArtistSection />
              <ArtworksSection />
              <ExhibitionsSection />
              <ContactSection />
            </main>
            <Footer />
          </>
        )}
      </div>
    </CartProvider>
  );
}

export default App;