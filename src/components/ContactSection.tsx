import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message. We will get back to you soon!');
  };
  
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact information */}
          <div>
            <h2 className="section-title">Get In Touch</h2>
            <p className="text-lg text-gray-700 mb-8">
              Interested in a particular artwork or have questions about our gallery? 
              Feel free to reach out to us for inquiries, appointments, or custom commissions.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-gold-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium mb-1">Visit Us</h3>
                  <p className="text-gray-600">123 Art Gallery Avenue, New York, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gold-100 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium mb-1">Email Us</h3>
                  <p className="text-gray-600">info@nxtlvlart.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gold-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium mb-1">Call Us</h3>
                  <p className="text-gray-600">+1 (212) 555-1234</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="font-serif text-xl font-medium mb-4">Gallery Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">11:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="bg-charcoal-900 p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-bold mb-6 text-white">Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gold-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gold-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gold-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder="Artwork Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gold-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder="I'm interested in..."
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="w-full btn-primary bg-gold-600 flex items-center justify-center">
                  <Send size={18} className="mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;