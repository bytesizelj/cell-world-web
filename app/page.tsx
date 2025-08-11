'use client';
import dynamic from 'next/dynamic';
const CellyAssistant = dynamic(() => 
import('@/components/CellyAssistant'), { ssr: 
false });

import { useState, useEffect } from 'react';
import { ChevronDown, Globe, Phone, Menu, ArrowRight, X, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  // Array of video paths - add your video files here
  const videos = [
    '/videos/cell-world-bg.mp4',
    '/videos/cell-world-bg2.mp4',  // Add second video when available
    '/videos/cell-world-bg3.mp4'   // Add third video when available
  ];
  
  // Rotate videos every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [videos.length]);
  
  const translations = {
    en: {
      welcome: "Welcome to Cell World St. Vincent",
      tagline: "Bringing the store to your fingertips",
      delivery: "Quality Products • Expert Service • Best Prices",
      contactNow: "Contact Us",
      readyToShop: "Ready to Shop?",
      shopSubtext: "Click below to explore our premium products",
      phones: "Mobile Phones",
      fishing: "Fishing Gear",
      moreProducts: "More Products",
      phoneDesc: "Latest smartphones & accessories",
      fishingDesc: "Professional fishing equipment",
      moreDesc: "Gaming, security, solar & more",
      viewProducts: "View Products",
      callUs: "Call",
      whatsapp: "WhatsApp",
      visitStore: "Visit Store",
      getInTouch: "Get In Touch With Us",
      contactSubtext: "We're here to help you find exactly what you need",
      chooseContactMethod: "Choose How to Reach Us",
      office: "Office",
      mobile: "Mobile",
      email: "Email",
      clickToView: "Click to View"
    },
    fr: {
      welcome: "Bienvenue chez Cell World St. Vincent",
      tagline: "La boutique au bout de vos doigts",
      delivery: "Produits de Qualité • Service Expert • Meilleurs Prix",
      contactNow: "Contactez-nous",
      readyToShop: "Prêt à Magasiner?",
      shopSubtext: "Cliquez ci-dessous pour explorer nos produits premium",
      phones: "Téléphones Mobiles",
      fishing: "Matériel de Pêche",
      moreProducts: "Plus de Produits",
      phoneDesc: "Derniers smartphones et accessoires",
      fishingDesc: "Équipement de pêche professionnel",
      moreDesc: "Jeux, sécurité, solaire et plus",
      viewProducts: "Voir les Produits",
      callUs: "Appeler",
      whatsapp: "WhatsApp",
      visitStore: "Visitez le Magasin",
      getInTouch: "Contactez-Nous",
      contactSubtext: "Nous sommes là pour vous aider à trouver exactement ce dont vous avez besoin",
      chooseContactMethod: "Choisissez Comment Nous Joindre",
      office: "Bureau",
      mobile: "Mobile",
      email: "Courriel",
      clickToView: "Cliquez pour Voir"
    },
    es: {
      welcome: "Bienvenido a Cell World St. Vincent",
      tagline: "Llevando la tienda a tus dedos",
      delivery: "Productos de Calidad • Servicio Experto • Mejores Precios",
      contactNow: "Contáctanos",
      readyToShop: "¿Listo para Comprar?",
      shopSubtext: "Haz clic abajo para explorar nuestros productos premium",
      phones: "Teléfonos Móviles",
      fishing: "Equipo de Pesca",
      moreProducts: "Más Productos",
      phoneDesc: "Últimos smartphones y accesorios",
      fishingDesc: "Equipo de pesca profesional",
      moreDesc: "Juegos, seguridad, solar y más",
      viewProducts: "Ver Productos",
      callUs: "Llamar",
      whatsapp: "WhatsApp",
      visitStore: "Visita la Tienda",
      getInTouch: "Ponte En Contacto",
      contactSubtext: "Estamos aquí para ayudarte a encontrar exactamente lo que necesitas",
      chooseContactMethod: "Elige Cómo Contactarnos",
      office: "Oficina",
      mobile: "Móvil",
      email: "Correo",
      clickToView: "Haz Clic para Ver"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background with Rotation */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0.8))' }} />
        
        {/* Multiple Videos */}
        {videos.map((video, index) => (
          <video
            key={video}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: currentVideoIndex === index ? 1 : 0,
              transition: 'opacity 2s ease-in-out'
            }}
            onLoadedData={() => index === 0 && setIsVideoLoaded(true)}
          >
            <source src={video} type="video/mp4" />
          </video>
        ))}
        
        {/* Loading state */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
            <div className="absolute inset-0 opacity-30">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="relative z-20 p-6">
        <div className="flex flex-col items-start space-y-4">
          {/* Left side controls */}
          <div className="flex items-center space-x-4">
            <Menu className="text-white w-6 h-6 cursor-pointer" />
            
            {/* Language Selector */}
            <button 
              className="group flex items-center space-x-2 text-white bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-md px-3 py-2 rounded-full hover:from-yellow-600/30 hover:to-orange-600/30 border border-yellow-500/30 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
              onClick={() => {
                const langs = ['en', 'fr', 'es'];
                const currentIndex = langs.indexOf(language);
                setLanguage(langs[(currentIndex + 1) % langs.length]);
              }}
              title="Change Language"
            >
              <div className="relative">
                <Globe className="w-4 h-4 text-yellow-400" />
                <div className="absolute -inset-1 bg-yellow-400 opacity-30 blur-sm rounded-full group-hover:opacity-50 transition-opacity"></div>
              </div>
              <span className="text-xs uppercase font-bold text-yellow-400">{language}</span>
            </button>
            
            {/* Quick Contact Button */}
            <a 
              href="tel:+17844512261"
              className="text-white bg-white/10 p-2 rounded-lg backdrop-blur-md hover:bg-white/20 transition-all duration-300"
              title="Call Us"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[60vh] text-center px-6" style={{ marginTop: '-60px' }}>
        {/* Centered Logo */}
        <div className="mb-8 opacity-0 animate-fade-up">
          <img 
            src="/images/cell-world-logo.png"
            alt="Cell World"
            style={{ 
              height: '140px',
              maxHeight: '140px', 
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9)) drop-shadow(0 0 8px rgba(255,215,0,0.6)) drop-shadow(0 0 12px rgba(255,165,0,0.4))',
              margin: '0 auto'
            }}
          />
        </div>
        
        {/* Text Content Box */}
        <div style={{ 
          backgroundColor: 'rgba(20, 20, 20, 0.4)', 
          backdropFilter: 'blur(6px)', 
          borderRadius: '1rem', 
          padding: '1.5rem 2rem', 
          maxWidth: '48rem', 
          margin: '0 auto'
        }}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl mb-6 opacity-0 animate-fade-up animation-delay-200 leading-tight"
              style={{ 
                color: '#FFFFFF',
                fontFamily: "'Great Vibes', cursive",
                fontWeight: '400',
                textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                fontSize: '3.5rem'
              }}>
            {t.welcome}
          </h2>
          <p className="text-xl md:text-2xl mb-1 opacity-0 animate-fade-up animation-delay-300"
             style={{ color: '#FFD700', fontWeight: '600', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            {t.tagline}
          </p>
          <p className="text-lg md:text-xl mb-6 opacity-0 animate-fade-up animation-delay-400"
             style={{ color: '#FFC107', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            {t.delivery}
          </p>
          <Link 
            href="/contact"
            className="group relative inline-block opacity-0 animate-fade-up animation-delay-500"
            style={{
              padding: '16px 40px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#000',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4), 0 8px 30px rgba(255, 165, 0, 0.3)',
              filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.7))';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.5), 0 12px 40px rgba(255, 165, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.4), 0 8px 30px rgba(255, 165, 0, 0.3)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>{t.contactNow}</span>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transition: 'left 0.5s',
              animation: 'shimmer 3s infinite'
            }} />
          </Link>
        </div>
      </div>

      {/* Ready to Shop Section - Enhanced */}
      <section className="relative z-20 py-16 text-center bg-transparent">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3"
                style={{ 
                  textShadow: '0 4px 20px rgba(0,0,0,0.9)',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
              {t.readyToShop}
            </h2>
            <p className="text-lg text-gray-200 mb-4"
               style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              {t.shopSubtext}
            </p>
            
            {/* Animated arrows pointing down */}
            <div className="flex justify-center space-x-8 mt-6">
              <div style={{ animation: 'bounce 2s infinite' }}>
                <ChevronDown className="w-8 h-8 text-yellow-400" />
              </div>
              <div style={{ animation: 'bounce 2s infinite', animationDelay: '0.2s' }}>
                <ChevronDown className="w-8 h-8 text-orange-400" />
              </div>
              <div style={{ animation: 'bounce 2s infinite', animationDelay: '0.4s' }}>
                <ChevronDown className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section with CTA Buttons */}
      <section className="relative z-20 bg-black/90 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Mobile Phones Category */}
            <Link 
              href="/Categories/phones"
              className="group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer block"
            >
              <div className="aspect-[4/3] relative">
                <img 
                  src="/images/phones.jpg" 
                  alt="Mobile Phones"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Center Call to Action - Enhanced */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-white text-3xl font-bold mb-4 drop-shadow-2xl">
                    {t.phones}
                  </h3>
                  <div 
                    className="bg-blue-600/90 backdrop-blur-sm px-8 py-4 rounded-full transform group-hover:scale-110 transition-all duration-300 shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.5), 0 8px 30px rgba(29, 78, 216, 0.3)',
                      animation: 'pulse 2s infinite'
                    }}
                  >
                    <span className="text-white text-xl font-bold uppercase tracking-wide flex items-center">
                      {t.clickToView} <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Fishing Gear Category */}
            <Link 
              href="/Categories/fishing"
              className="group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer block"
            >
              <div className="aspect-[4/3] relative">
                <img 
                  src="/images/fishing.jpg" 
                  alt="Fishing Gear"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Center Call to Action - Enhanced */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-white text-3xl font-bold mb-4 drop-shadow-2xl">
                    {t.fishing}
                  </h3>
                  <div 
                    className="bg-teal-600/90 backdrop-blur-sm px-8 py-4 rounded-full transform group-hover:scale-110 transition-all duration-300 shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                      boxShadow: '0 4px 15px rgba(20, 184, 166, 0.5), 0 8px 30px rgba(13, 148, 136, 0.3)',
                      animation: 'pulse 2s infinite'
                    }}
                  >
                    <span className="text-white text-xl font-bold uppercase tracking-wide flex items-center">
                      {t.clickToView} <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* More Products Category */}
            <Link 
              href="/Categories/more"
              className="group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer block"
            >
              <div className="aspect-[4/3] relative">
                <img 
                  src="/images/more.jpg" 
                  alt="More Products"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Center Call to Action - Enhanced */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-white text-3xl font-bold mb-4 drop-shadow-2xl">
                    {t.moreProducts}
                  </h3>
                  <div 
                    className="bg-purple-600/90 backdrop-blur-sm px-8 py-4 rounded-full transform group-hover:scale-110 transition-all duration-300 shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #9333ea, #7c3aed)',
                      boxShadow: '0 4px 15px rgba(147, 51, 234, 0.5), 0 8px 30px rgba(124, 58, 237, 0.3)',
                      animation: 'pulse 2s infinite'
                    }}
                  >
                    <span className="text-white text-xl font-bold uppercase tracking-wide flex items-center">
                      {t.clickToView} <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="relative z-20 py-24 bg-black/80">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4"
                style={{ 
                  color: '#FFD700',
                  textShadow: '0 6px 30px rgba(255, 215, 0, 0.4), 0 2px 8px rgba(0,0,0,0.9)' 
                }}>
              {t.getInTouch}
            </h2>
            <p className="text-xl" style={{ 
              color: '#FFC107',
              textShadow: '0 3px 15px rgba(255, 193, 7, 0.3), 0 2px 6px rgba(0,0,0,0.8)'
            }}>
              {t.contactSubtext}
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mt-6"></div>
          </div>
          
          {/* Contact Buttons - Simple Layout with Shadows */}
          <div className="flex flex-col items-center space-y-6">
            {/* Phone and WhatsApp Row */}
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              {/* Phone Button */}
              <a 
                href="tel:+17844512261"
                className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  filter: 'drop-shadow(0 8px 20px rgba(255, 215, 0, 0.25)) drop-shadow(0 4px 10px rgba(0,0,0,0.8))'
                }}
              >
                <Phone className="w-8 h-8" style={{ 
                  color: '#FFD700',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))'
                }} />
                <div className="text-left">
                  <div className="text-sm" style={{ 
                    color: '#FFC107',
                    textShadow: '0 2px 8px rgba(255, 193, 7, 0.4), 0 1px 3px rgba(0,0,0,0.8)'
                  }}>
                    {t.callUs}
                  </div>
                  <div className="text-2xl font-bold" style={{ 
                    color: '#FFD700',
                    textShadow: '0 4px 15px rgba(255, 215, 0, 0.5), 0 2px 6px rgba(0,0,0,0.9)'
                  }}>
                    1-784-451-2261
                  </div>
                </div>
              </a>
              
              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/17844310777"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 md:ml-12"
                style={{
                  filter: 'drop-shadow(0 8px 20px rgba(255, 215, 0, 0.25)) drop-shadow(0 4px 10px rgba(0,0,0,0.8))'
                }}
              >
                <span className="text-4xl" style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))'
                }}>💬</span>
                <div className="text-left">
                  <div className="text-sm" style={{ 
                    color: '#FFC107',
                    textShadow: '0 2px 8px rgba(255, 193, 7, 0.4), 0 1px 3px rgba(0,0,0,0.8)'
                  }}>
                    {t.whatsapp}
                  </div>
                  <div className="text-2xl font-bold" style={{ 
                    color: '#FFD700',
                    textShadow: '0 4px 15px rgba(255, 215, 0, 0.5), 0 2px 6px rgba(0,0,0,0.9)'
                  }}>
                    1-784-431-0777
                  </div>
                </div>
              </a>
            </div>
            
            {/* Visit Store Button */}
            <button className="group hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 mt-6"
              style={{
                filter: 'drop-shadow(0 8px 20px rgba(255, 215, 0, 0.3)) drop-shadow(0 4px 10px rgba(0,0,0,0.8))'
              }}
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-3xl" style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))'
                }}>📍</span>
                <span className="text-2xl font-bold" style={{ 
                  color: '#FFD700',
                  textShadow: '0 4px 15px rgba(255, 215, 0, 0.5), 0 2px 6px rgba(0,0,0,0.9)'
                }}>{t.visitStore}</span>
              </div>
            </button>
          </div>
        </div>
      </section>
      
      <CellyAssistant />
      
      {/* Add pulse animation for CTA buttons */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
    </div>
  );
}