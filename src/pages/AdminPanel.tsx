import React, { useState } from 'react';
import { Upload, X, Plus, Save, Edit, Trash2, Eye, ShoppingBag, Calendar } from 'lucide-react';

// Types
interface ArtworkFormState {
  title: string;
  category: string;
  price: string;
  size: string;
  year: string;
  description: string;
  imageFile: File | null;
  imagePreview: string | null;
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  artworkTitle: string;
  price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

interface Exhibition {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const initialFormState: ArtworkFormState = {
  title: '',
  category: '',
  price: '',
  size: '',
  year: '',
  description: '',
  imageFile: null,
  imagePreview: null,
};

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'manage' | 'orders' | 'exhibitions'>('upload');
  const [form, setForm] = useState<ArtworkFormState>(initialFormState);
  const [isUploading, setIsUploading] = useState(false);
  const [artworks, setArtworks] = useState<any[]>([]);
  
  // Sample data for orders and exhibitions
  const [orders] = useState<Order[]>([
    {
      id: 'order-1',
      customerName: 'John Doe',
      email: 'john@example.com',
      artworkTitle: 'Celestial Serenity',
      price: 3800,
      status: 'pending',
      date: '2025-03-15',
    },
    {
      id: 'order-2',
      customerName: 'Jane Smith',
      email: 'jane@example.com',
      artworkTitle: 'Urban Reflections',
      price: 2400,
      status: 'shipped',
      date: '2025-03-14',
    },
  ]);

  const [exhibitions] = useState<Exhibition[]>([
    {
      id: 'exhibition-1',
      title: 'Contemporary Visions',
      date: 'June 15 - July 30, 2025',
      location: 'Modern Art Gallery, New York',
      description: 'An exploration of modern artistic expressions.',
      status: 'upcoming',
    },
    {
      id: 'exhibition-2',
      title: 'Textures & Emotions',
      date: 'August 10 - September 25, 2025',
      location: 'The Art Space, London',
      description: 'A deep dive into textural elements.',
      status: 'upcoming',
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setForm(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result as string,
        }));
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const clearImage = () => {
    setForm(prev => ({
      ...prev,
      imageFile: null,
      imagePreview: null,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    setTimeout(() => {
      const newArtwork = {
        id: `artwork-${Date.now()}`,
        title: form.title,
        category: form.category,
        price: parseFloat(form.price),
        size: form.size,
        year: parseInt(form.year),
        description: form.description,
        imageUrl: form.imagePreview,
        createdAt: new Date().toISOString(),
      };
      
      setArtworks(prev => [newArtwork, ...prev]);
      setForm(initialFormState);
      setIsUploading(false);
      alert('Artwork uploaded successfully!');
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-charcoal-900 text-white py-4">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-serif font-bold">NXT LVL ART | Admin Panel</h1>
            <a href="/" className="btn-primary bg-gold-600 py-2">Back to Website</a>
          </div>
        </div>
      </header>
      
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white shadow-md p-6">
              <h2 className="font-serif text-xl font-bold mb-4">Dashboard</h2>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('upload')}
                      className={`block w-full px-4 py-2 text-left ${
                        activeTab === 'upload'
                          ? 'bg-gold-50 text-gold-700 border-l-4 border-gold-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Upload size={18} className="inline-block mr-2" />
                      Upload Artwork
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('manage')}
                      className={`block w-full px-4 py-2 text-left ${
                        activeTab === 'manage'
                          ? 'bg-gold-50 text-gold-700 border-l-4 border-gold-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Edit size={18} className="inline-block mr-2" />
                      Manage Artworks
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`block w-full px-4 py-2 text-left ${
                        activeTab === 'orders'
                          ? 'bg-gold-50 text-gold-700 border-l-4 border-gold-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ShoppingBag size={18} className="inline-block mr-2" />
                      Orders
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('exhibitions')}
                      className={`block w-full px-4 py-2 text-left ${
                        activeTab === 'exhibitions'
                          ? 'bg-gold-50 text-gold-700 border-l-4 border-gold-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Calendar size={18} className="inline-block mr-2" />
                      Exhibitions
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="lg:col-span-2">
            {activeTab === 'upload' && (
              <div className="bg-white shadow-md p-6">
                <h2 className="font-serif text-2xl font-bold mb-6">Upload New Artwork</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Artwork Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Abstract">Abstract</option>
                        <option value="Contemporary">Contemporary</option>
                        <option value="Landscape">Landscape</option>
                        <option value="Portrait">Portrait</option>
                        <option value="Sculpture">Sculpture</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={form.price}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                        Size (cm) *
                      </label>
                      <input
                        type="text"
                        id="size"
                        name="size"
                        value={form.size}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="e.g., 60x80"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                        Year *
                      </label>
                      <input
                        type="number"
                        id="year"
                        name="year"
                        value={form.year}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* Image upload */}
                  <div className="mb-8">
                    <p className="block text-sm font-medium text-gray-700 mb-2">
                      Artwork Image *
                    </p>
                    
                    {!form.imagePreview ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                        <Upload className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-gray-600 mb-2">Drag and drop an image or click to browse</p>
                        <p className="text-gray-500 text-sm mb-4">JPEG, PNG or WebP up to 10MB</p>
                        <input
                          type="file"
                          id="imageFile"
                          name="imageFile"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <label htmlFor="imageFile" className="btn-primary bg-gold-600 cursor-pointer">
                          Select Image
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <img 
                          src={form.imagePreview} 
                          alt="Artwork preview" 
                          className="max-h-96 object-contain mx-auto border border-gray-200"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-300"
                          onClick={clearImage}
                          aria-label="Remove image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Submit button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn-primary bg-gold-600 flex items-center"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2" size={18} />
                          Save Artwork
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'manage' && (
              <div className="bg-white shadow-md p-6">
                <h2 className="font-serif text-2xl font-bold mb-6">Manage Artworks</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {artworks.map((artwork) => (
                        <tr key={artwork.id}>
                          <td className="px-6 py-4">
                            <img src={artwork.imageUrl} alt={artwork.title} className="h-16 w-16 object-cover" />
                          </td>
                          <td className="px-6 py-4">{artwork.title}</td>
                          <td className="px-6 py-4">{artwork.category}</td>
                          <td className="px-6 py-4">${artwork.price.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Eye size={18} />
                              </button>
                              <button className="text-gold-600 hover:text-gold-800">
                                <Edit size={18} />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white shadow-md p-6">
                <h2 className="font-serif text-2xl font-bold mb-6">Manage Orders</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Artwork</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 text-sm">{order.id}</td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                            <div className="text-sm text-gray-500">{order.email}</div>
                          </td>
                          <td className="px-6 py-4">{order.artworkTitle}</td>
                          <td className="px-6 py-4">${order.price.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'exhibitions' && (
              <div className="bg-white shadow-md p-6">
                <h2 className="font-serif text-2xl font-bold mb-6">Manage Exhibitions</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {exhibitions.map((exhibition) => (
                        <tr key={exhibition.id}>
                          <td className="px-6 py-4">{exhibition.title}</td>
                          <td className="px-6 py-4">{exhibition.date}</td>
                          <td className="px-6 py-4">{exhibition.location}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(exhibition.status)}`}>
                              {exhibition.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Eye size={18} />
                              </button>
                              <button className="text-gold-600 hover:text-gold-800">
                                <Edit size={18} />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;