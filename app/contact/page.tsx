'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageCircle, Navigation, Store } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const Celly = dynamic(() => import('@/components/CellyAssistant'), { ssr: false });

export default function ContactPage() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  // Background images array - check if images are .jpg or .png
  const backgroundImages = [
    '/images/store/contact-bg1.jpg',  // Changed to .jpg - update if yours are .png
    '/images/store/contact-bg2.jpg',
    '/images/store/contact-bg3.jpg',
    '/images/store/contact-bg4.jpg'
  ];

  // Rotate background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const contactInfo = {
    phone: '+1-784-451-2261',
    whatsapp: '+1-784-431-0777',
    email: 'musicworld@vincysurf.com',
    hours: {
      weekday: 'Monday - Friday: 8:00 AM - 6:00 PM',
      saturday: 'Saturday: 9:00 AM - 5:00 PM',
      sunday: 'Sunday: CLOSED'
    },
    location: 'St. Vincent and the Grenadines',
    // Add more specific location details for the map
    address: 'Kingstown, St. Vincent and the Grenadines',
    mapNote: 'Located in the heart of Kingstown - Look for Cell World signage'
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Animated Carousel Background */}
      <div className="fixed inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: currentBgIndex === index ? 1 : 0,
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/85" />
          </div>
        ))}
        
        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/50 to-orange-900/20" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 bg-black/30 backdrop-blur-sm">
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4"
              style={{ 
                color: '#FFD700',
                textShadow: '0 4px 20px rgba(255, 215, 0, 0.4), 0 2px 8px rgba(0,0,0,0.9)' 
              }}>
            Contact Cell World
          </h1>
          <p className="text-lg text-gray-300">
            Get in touch with St. Vincent's premier mobile store
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Phone Card */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white ml-4">Call Us</h3>
            </div>
            <a href={`tel:${contactInfo.phone}`} className="text-green-400 hover:text-green-300 text-lg font-semibold">
              {contactInfo.phone}
            </a>
            <p className="text-gray-400 mt-2">Direct line for immediate assistance</p>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white ml-4">WhatsApp</h3>
            </div>
            <a 
              href={`https://wa.me/17844310777`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 text-lg font-semibold"
            >
              {contactInfo.whatsapp}
            </a>
            <p className="text-gray-400 mt-2">Message us for quick responses</p>
          </div>

          {/* Email Card */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white ml-4">Email</h3>
            </div>
            <a 
              href={`mailto:${contactInfo.email}`}
              className="text-blue-400 hover:text-blue-300 text-lg font-semibold break-all"
            >
              {contactInfo.email}
            </a>
            <p className="text-gray-400 mt-2">For inquiries and support</p>
          </div>
        </div>

        {/* Store Hours */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm p-8 rounded-xl mb-12">
          <div className="flex items-center mb-6">
            <Clock className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Store Hours</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <p className="text-yellow-400 font-semibold mb-2">Weekdays</p>
              <p className="text-white">{contactInfo.hours.weekday}</p>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <p className="text-yellow-400 font-semibold mb-2">Saturday</p>
              <p className="text-white">{contactInfo.hours.saturday}</p>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <p className="text-red-400 font-semibold mb-2">Sunday</p>
              <p className="text-white">{contactInfo.hours.sunday}</p>
            </div>
          </div>
        </div>

        {/* Visit Our Store Section with Map */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm p-8 rounded-xl">
          <div className="flex items-center mb-6">
            <Store className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Visit Our Store</h2>
          </div>
          
          <div className="mb-6">
            <div className="flex items-start mb-4">
              <MapPin className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white text-lg font-semibold">{contactInfo.location}</p>
                <p className="text-gray-400">{contactInfo.address}</p>
                <p className="text-yellow-400 text-sm mt-2 italic">{contactInfo.mapNote}</p>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15880.251854346967!2d-61.22789!3d13.15536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c0e7505c5b5b5b5%3A0x0!2sKingstown%2C%20St.%20Vincent!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="Cell World Location Map"
            ></iframe>
          </div>

          {/* Directions Button */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=13.15536,-61.22789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-300"
            >
              <Navigation className="w-5 h-5 mr-2" />
              Get Directions
            </a>
            <button
              onClick={() => window.open(`https://www.google.com/maps/search/cell+phone+store+kingstown+st+vincent`, '_blank')}
              className="flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Find Nearby Landmarks
            </button>
          </div>

          {/* Additional Instructions */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 text-sm">
              <strong>Note:</strong> While we set up our Google Business listing, use the map above to navigate to central Kingstown. 
              Look for Cell World signage or call us for precise directions!
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Connect?</h3>
          <p className="text-gray-400 mb-8">Choose your preferred method to reach out</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${contactInfo.phone}`}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-8 rounded-full hover:from-green-400 hover:to-green-500 transition-all duration-300 flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
            <a
              href={`https://wa.me/17844310777`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:from-purple-400 hover:to-pink-400 transition-all duration-300 flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Background Image Indicators */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {backgroundImages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentBgIndex === index 
                ? 'bg-yellow-400 w-8' 
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Celly Assistant */}
      <Celly />
    </div>
  );
}