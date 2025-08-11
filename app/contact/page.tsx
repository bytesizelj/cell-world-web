'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, MessageCircle, Mail, MapPin, Clock, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPageNew() {
  const [language, setLanguage] = useState('en');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Store photos array
  const storePhotos = [
    { src: '/images/store/store-exterior-1.jpg', alt: 'Cell World Exterior' },
    { src: '/images/store/store-interior-1.jpg', alt: 'Cell World Interior 1' },
    { src: '/images/store/store-interior-2.jpg', alt: 'Cell World Interior 2' },
    { src: '/images/store/store-interior-3.jpg', alt: 'Cell World Interior 3' }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % storePhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [storePhotos.length]);

  const translations = {
    en: {
      title: "Visit Cell World",
      subtitle: "Experience Premium Service",
      hours: "Store Hours",
      contact: "Contact",
      location: "Location",
      monFri: "Monday - Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      closed: "Closed",
      office: "Office",
      mobile: "Mobile/WhatsApp",
      email: "Email",
      address: "Kingstown, St. Vincent & The Grenadines",
      getDirections: "Get Directions",
      ourStore: "Our Store Gallery",
      back: "Back to Home"
    },
    fr: {
      title: "Visitez Cell World",
      subtitle: "Service Premium",
      hours: "Heures d'Ouverture",
      contact: "Contact",
      location: "Emplacement",
      monFri: "Lundi - Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
      closed: "Fermé",
      office: "Bureau",
      mobile: "Mobile/WhatsApp",
      email: "Email",
      address: "Kingstown, St. Vincent & The Grenadines",
      getDirections: "Obtenir l'itinéraire",
      ourStore: "Galerie du Magasin",
      back: "Retour"
    },
    es: {
      title: "Visita Cell World",
      subtitle: "Servicio Premium",
      hours: "Horario",
      contact: "Contacto",
      location: "Ubicación",
      monFri: "Lunes - Viernes",
      saturday: "Sábado",
      sunday: "Domingo",
      closed: "Cerrado",
      office: "Oficina",
      mobile: "Móvil/WhatsApp",
      email: "Correo",
      address: "Kingstown, St. Vincent & The Grenadines",
      getDirections: "Obtener direcciones",
      ourStore: "Galería de la Tienda",
      back: "Volver"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image - Full Page */}
      <div className="fixed inset-0">
        <img 
          src="/images/store/contact-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient if image doesn't exist
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Multiple Dark overlays for maximum text readability */}
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
      </div>
      
      {/* Dark Background with Effects - Layered on top of image */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-purple-900/30 to-black/30 opacity-80"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-20 bg-black/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-white hover:text-yellow-400 transition">
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t.back}
            </Link>
            
            <button 
              onClick={() => {
                const langs = ['en', 'fr', 'es'];
                const current = langs.indexOf(language);
                setLanguage(langs[(current + 1) % langs.length]);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-md rounded-full hover:from-yellow-600/30 hover:to-orange-600/30 border border-yellow-500/30 transition"
            >
              <Globe className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm">{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - Centered Layout */}
      <div className="relative z-10 min-h-[calc(100vh-80px)] flex flex-col items-center px-6 py-12">
        
        {/* Store Gallery - Moved to Top */}
        <div className="w-full max-w-xl mb-12">
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl shadow-white/20 hover:shadow-white/30 transition-shadow duration-300" style={{ height: '500px' }}>
            {/* Images */}
            {storePhotos.map((photo, index) => (
              <img
                key={index}
                src={photo.src}
                alt={photo.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {storePhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index 
                      ? 'w-8 bg-yellow-400' 
                      : 'w-2 bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ 
            color: '#FFD700',
            textShadow: `
              0 0 60px rgba(255, 215, 0, 0.8),
              0 0 40px rgba(255, 215, 0, 0.6),
              0 0 20px rgba(0, 0, 0, 1),
              0 4px 8px rgba(0, 0, 0, 1),
              2px 2px 4px rgba(0, 0, 0, 1)
            `,
            letterSpacing: '1px'
          }}>
            {t.title}
          </h1>
          <p className="text-xl font-bold" style={{
            color: '#FFFFFF',
            textShadow: `
              0 0 20px rgba(255, 255, 255, 0.5),
              0 0 10px rgba(0, 0, 0, 1),
              0 2px 4px rgba(0, 0, 0, 1),
              1px 1px 2px rgba(0, 0, 0, 1)
            `
          }}>
            {t.subtitle}
          </p>
        </div>

        {/* Three Contact Cards - Dark Background */}
        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Call Button */}
          <a
            href="tel:+17844512261"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/90 to-blue-700/90 p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
          >
            <Phone className="w-12 h-12 text-white mx-auto mb-3" />
            <p className="text-white/90 text-sm mb-2">Call Now</p>
            <p className="text-2xl font-bold" style={{ 
              color: '#FFD700',
              textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
            }}>
              451-2261
            </p>
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/17844310777"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600/90 to-emerald-600/90 p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50"
          >
            <MessageCircle className="w-12 h-12 text-white mx-auto mb-3" />
            <p className="text-white/90 text-sm mb-2">WhatsApp</p>
            <p className="text-2xl font-bold" style={{ 
              color: '#FFD700',
              textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
            }}>
              431-0777
            </p>
          </a>

          {/* Email Button */}
          <a
            href="mailto:musicworld@vincysurf.com"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/90 to-pink-600/90 p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <Mail className="w-12 h-12 text-white mx-auto mb-3" />
            <p className="text-white/90 text-sm mb-2">Email</p>
            <p className="text-lg font-bold" style={{ 
              color: '#FFD700',
              textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
            }}>
              Email
            </p>
          </a>
        </div>

        {/* Store Hours Card - Dark Background */}
        <div className="w-full max-w-lg bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-yellow-500/20 shadow-2xl mb-12">
          <div className="text-center mb-6">
            <Clock className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white">{t.hours}</h3>
          </div>
          
          <div className="space-y-4 text-center">
            <div>
              <p className="text-gray-400">{t.monFri}</p>
              <p className="text-2xl font-bold text-yellow-400">8:00 AM - 5:00 PM</p>
            </div>
            <div className="w-20 h-px bg-gray-700 mx-auto"></div>
            <div>
              <p className="text-gray-400">{t.saturday}</p>
              <p className="text-2xl font-bold text-yellow-400">8:00 AM - 2:00 PM</p>
            </div>
            <div className="w-20 h-px bg-gray-700 mx-auto"></div>
            <div>
              <p className="text-gray-400">{t.sunday}</p>
              <p className="text-xl font-bold text-gray-500">{t.closed}</p>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="w-full max-w-2xl text-center mb-12">
          <div className="mb-6">
            <MapPin className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-2">{t.location}</h3>
            <p className="text-lg text-gray-300">
              Kingstown, St. Vincent & The Grenadines
            </p>
          </div>
          
          {/* Map */}
          <div className="relative rounded-3xl overflow-hidden h-[300px] shadow-2xl border border-yellow-500/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.0!2d-61.2225!3d13.1584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKingstown%2C%20St.%20Vincent!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <a
                href="https://www.google.com/maps/search/Cell+World+Kingstown+St+Vincent"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                <MapPin className="w-5 h-5 mr-2" />
                {t.getDirections}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}