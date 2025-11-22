'use client';
import NavigationMenu from '@/components/NavigationMenu';
import dynamic from 'next/dynamic';
const CellyAssistant = dynamic(() => 
import('@/components/CellyAssistant'), { ssr: 
false });

import { useState, useEffect } from 'react';
import { ChevronDown, Globe, Phone, Menu, ArrowRight, X, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  
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


// Show banner after 1 second
useEffect(() => {
  const timer = setTimeout(() => {
    setShowBanner(true);
  }, 3000);
  
  return () => clearTimeout(timer);
}, []);

// Show iPhone promo after 1 second
useEffect(() => {
  const timer = setTimeout(() => {
    setShowPromo(true);
  }, 1000);
  
  return () => clearTimeout(timer);
}, []);
  
  // IMPROVED: Faster loading with timeout fallback
  useEffect(() => {
    const criticalImages = [
      '/images/cell-world-logo.png',
      '/images/phones.jpg',
      '/images/fishing.jpg',
      '/images/more.jpg'
    ];
    
    // Set a maximum loading time of 2 seconds
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    Promise.all(
      criticalImages.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        });
      })
    ).then(() => {
      clearTimeout(loadingTimeout);
      setIsLoading(false);
    });
    
    return () => clearTimeout(loadingTimeout);
  }, []);
  
  const translations = {
    en: {
      welcome: "Welcome to Cell World St. Vincent",
      tagline: "Bringing the Store to Your Fingertips",
      delivery: "Quality Products • Expert Service • Best Prices",
      contactNow: "Contact Us",
      readyToShop: "Ready to Shop?",
      shopSubtext: "Click below to explore our premium products",
      phones: "Mobile Phones",
      fishing: "Marine World",
      moreProducts: "More Products",
      phoneDesc: "Latest smartphones & accessories",
      fishingDesc: "Marine equipment, fishing lures & acessories",
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
      clickToView: "Click to View",
      repairService: "Repair Service"
    },
    fr: {
      welcome: "Bienvenue chez Cell World St. Vincent",
      tagline: "La Boutique au Bout de Vos Doigts",
      delivery: "Produits de Qualité • Service Expert • Meilleurs Prix",
      contactNow: "Contactez-nous",
      readyToShop: "Prêt à Magasiner?",
      shopSubtext: "Cliquez ci-dessous pour explorer nos produits premium",
      phones: "Téléphones Mobiles",
      fishing: "Monde Marin",
      moreProducts: "Plus de Produits",
      phoneDesc: "Derniers smartphones et accessoires",
      fishingDesc: "Équipement marin et accessoires de pêche",
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
      clickToView: "Cliquez pour Voir",
      repairService: "Service de Réparation"
    },
    es: {
      welcome: "Bienvenido a Cell World St. Vincent",
      tagline: "Llevando la Tienda a Tus Dedos",
      delivery: "Productos de Calidad • Servicio Experto • Mejores Precios",
      contactNow: "Contáctanos",
      readyToShop: "¿Listo para Comprar?",
      shopSubtext: "Haz clic abajo para explorar nuestros productos premium",
      phones: "Teléfonos Móviles",
      fishing: "Mundo Marino",
      moreProducts: "Más Productos",
      phoneDesc: "Últimos smartphones y accesorios",
      fishingDesc: "Equipos marinos y accesorios de pesca",
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
      clickToView: "Haz Clic para Ver",
      repairService: "Servicio de Reparación"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* IMPROVED: Better loading screen with logo */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900/90 via-black to-blue-900/90 flex items-center justify-center">
          <div className="text-center">
            <img 
              src="/images/cell-world-logo.png"
              alt="Cell World"
              className="h-32 w-auto mb-6 mx-auto animate-pulse"
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.6))'
              }}
            />
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-400 mb-4 mx-auto"></div>
            <p className="text-yellow-400 text-xl font-semibold">Loading Cell World...</p>
          </div>
        </div>
      )}
         
      {/* Video Background with Rotation */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {/* <div className="absolute inset-0 z-10" style={{ background: 'rgba(0,0,0,0.1)' }} /> */}
        
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
        
       {/* Fallback gradient if video hasn't loaded */}
{!isVideoLoaded && (
  <div className="absolute inset-0 bg-black" style={{
    background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0.9) 100%)'
  }} />
)}
      </div>

      {/* Navigation */}
      <nav className="relative z-20 p-6">
        <div className="flex items-center justify-between">
          {/* Left side - Menu (Using normal flow, not fixed) */}
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        
          {/* Right side - Controls */}
          <div className="flex items-center space-x-4">
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

      {/* Menu Panel - Outside of nav, controlled by state */}
      {isMenuOpen && (
        <div 
          className="fixed top-0 left-0 w-64 h-full bg-white shadow-2xl"
          style={{ zIndex: 9999999999 }}
        >
          <div className="p-6 pt-20">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
            
            <div className="space-y-2">
              <a href="/" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                🏠 Home
              </a>
              <a href="/Categories/phones" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                📱 Phones
              </a>
              <a href="/Categories/marine-world" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                🚤 Marine World
              </a>
              <a href="/Categories/more" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                📦 More Products
              </a>
              <a href="/reviews" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                ⭐ Reviews
              </a>
              <a href="/contact" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                📞 Contact
              </a>
              <a href="/order" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                🛒 Order
              </a>
            </div>
          </div>
        </div>
      )}
      
{/* Hero Content */}
<div className="relative z-20 flex flex-col items-start justify-start min-h-screen px-3 pt-4">
  {/* Logo - top left */}
  <div className="mb-4 opacity-0 animate-fade-up">
    <img 
      src="/images/cell-world-logo.png"
      alt="Cell World"
      style={{ 
        height: '150px',
        maxHeight: '150px', 
        width: 'auto', 
        objectFit: 'contain',
        filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9)) drop-shadow(0 0 8px rgba(255,215,0,0.6)) drop-shadow(0 0 12px rgba(255,165,0,0.4))'
      }}
    />
  </div>
  
  {/* Shop Now CTA Button */}
<button 
  onClick={() => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  }}
  className="ml-8 opacity-0 animate-fade-up animation-delay-300 inline-flex items-center px-12 py-4 text-xl font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg animate-pulse"
>
  Shop Now 
  <span className="ml-2">→</span>
</button>
</div>
{/* iPhone Promo Popup - ATTENTION GRABBING */}
{showPromo && (
  <div 
    className="fixed inset-0 z-[60] flex items-center justify-center animate-fade-in"
    onClick={() => setShowPromo(false)}
    style={{
      background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.95), rgba(0, 0, 0, 0.98))',
      backdropFilter: 'blur(10px)'
    }}
  >
    <div 
      className="relative rounded-3xl p-8 max-w-4xl w-full mx-4 shadow-2xl animate-zoom-bounce overflow-hidden"
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
        boxShadow: '0 0 80px rgba(139, 92, 246, 0.8), 0 0 120px rgba(59, 130, 246, 0.6)'
      }}
    >
      {/* Animated Rotating Gradient Background */}
      <div className="absolute inset-0 animate-rotate-gradient" style={{
        background: 'conic-gradient(from 0deg at 50% 50%, rgba(236, 72, 153, 0.4) 0deg, transparent 60deg, rgba(251, 191, 36, 0.4) 120deg, transparent 180deg, rgba(236, 72, 153, 0.4) 240deg, transparent 300deg, rgba(251, 191, 36, 0.4) 360deg)',
      }}></div>
      
      {/* Pulsing Circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
        <div className="absolute top-10 left-10 w-40 h-40 bg-pink-400 rounded-full animate-pulse-scale"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-yellow-400 rounded-full animate-pulse-scale-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-cyan-400 rounded-full animate-pulse-scale" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      {/* Close Button */}
      <button
        onClick={() => setShowPromo(false)}
        className="absolute top-4 right-4 bg-white hover:bg-gray-100 p-3 rounded-full transition-all z-20 shadow-xl hover:scale-110 animate-bounce-slow"
      >
        <X className="w-6 h-6 text-gray-700" />
      </button>

      <div className="relative z-10 text-center text-white">
        {/* Animated Icon Row */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="p-4 bg-white/30 rounded-2xl backdrop-blur-md animate-wiggle shadow-lg">
            <span className="text-5xl">📱</span>
          </div>
          <div className="p-4 bg-white/30 rounded-2xl backdrop-blur-md animate-wiggle-delayed shadow-lg">
            <span className="text-5xl">✨</span>
          </div>
          <div className="p-4 bg-white/30 rounded-2xl backdrop-blur-md animate-wiggle" style={{animationDelay: '0.4s'}}>
            <span className="text-5xl">🔥</span>
          </div>
        </div>
        
        {/* Main Heading with Glow */}
        <h2 className="text-5xl md:text-6xl font-black mb-4 animate-glow-pulse" style={{
          textShadow: '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,215,0,0.8), 0 0 60px rgba(255,165,0,0.6), 0 4px 20px rgba(0,0,0,0.5)'
        }}>
          🔥 HOT DEALS! 🔥
        </h2>
        
        {/* Subheading */}
        <p className="text-3xl md:text-4xl font-bold mb-4 animate-slide-in-left">
          Latest iPhones Available!
        </p>
        
        {/* iPhone Models Badge with Shine */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 blur-2xl animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 text-black px-8 py-4 rounded-full font-black text-xl shadow-2xl animate-shine overflow-hidden">
            <span className="relative z-10">iPhone 12 • iPhone 13 Pro Max • iPhone 14</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        {/* Urgency Text */}
        <p className="text-2xl font-bold mb-6 animate-flash">
          ⚠️ LIMITED STOCK - ACT NOW! ⚠️
        </p>
        
        {/* CTA Button with Hover Effect */}
        <a 
          href="/Categories/phones"
          className="group relative inline-block bg-white text-purple-600 px-12 py-5 rounded-full font-black text-xl overflow-hidden shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 animate-bounce-gentle"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="relative flex items-center justify-center">
            SHOP IPHONES NOW
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </span>
        </a>
      </div>
    </div>
  </div>
)}
  
 {/* CSS for animations */}
<style jsx>{`
  .ticker-content {
    display: inline-block;
    animation: scroll-left 30s linear infinite;
  }
  @keyframes scroll-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes slide-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes zoom-bounce {
    0% { 
      opacity: 0;
      transform: scale(0.3) rotate(-5deg);
    }
    50% {
      transform: scale(1.05) rotate(2deg);
    }
    100% { 
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
  @keyframes rotate-gradient {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes pulse-scale {
    0%, 100% { 
      transform: scale(1);
      opacity: 0.3;
    }
    50% { 
      transform: scale(1.5);
      opacity: 0.1;
    }
  }
  @keyframes pulse-scale-delayed {
    0%, 100% { 
      transform: scale(1);
      opacity: 0.3;
    }
    50% { 
      transform: scale(1.3);
      opacity: 0.1;
    }
  }
  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }
  @keyframes wiggle-delayed {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(10deg); }
    75% { transform: rotate(-10deg); }
  }
  @keyframes glow-pulse {
    0%, 100% {
      text-shadow: 0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,215,0,0.8), 0 0 60px rgba(255,165,0,0.6);
    }
    50% {
      text-shadow: 0 0 30px rgba(255,255,255,1), 0 0 60px rgba(255,215,0,1), 0 0 90px rgba(255,165,0,0.8);
    }
  }
  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  @keyframes flash {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes bounce-gentle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  @keyframes bounce-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  .animate-slide-up {
    animation: slide-up 1s ease-out forwards;
  }
  .animate-fade-in {
    animation: fade-in 0.4s ease-out;
  }
  .animate-zoom-bounce {
    animation: zoom-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .animate-rotate-gradient {
    animation: rotate-gradient 8s linear infinite;
  }
  .animate-pulse-scale {
    animation: pulse-scale 3s ease-in-out infinite;
  }
  .animate-pulse-scale-delayed {
    animation: pulse-scale-delayed 3s ease-in-out infinite 1s;
  }
  .animate-wiggle {
    animation: wiggle 1s ease-in-out infinite;
  }
  .animate-wiggle-delayed {
    animation: wiggle-delayed 1s ease-in-out infinite 0.2s;
  }
  .animate-glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
  }
  .animate-slide-in-left {
    animation: slide-in-left 0.6s ease-out 0.2s both;
  }
  .animate-shimmer {
    animation: shimmer 2s ease-in-out infinite;
  }
  .animate-flash {
    animation: flash 1.5s ease-in-out infinite;
  }
  .animate-bounce-gentle {
    animation: bounce-gentle 2s ease-in-out infinite;
  }
  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }
`}</style>
        
{/* Category Section with HOVER ZOOM for images */}
<section className="relative z-20 bg-black/90 py-20" id="products-section">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      {/* Mobile Phones Category with HOVER ZOOM */}
      <Link 
        href="/Categories/phones"
        className="group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer block"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img 
            src="/images/phones.jpg" 
            alt="Mobile Phones"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
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

      {/* Fishing Gear Category with HOVER ZOOM */}
      <Link 
        href="/Categories/marine-world"
        className="group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer block"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img 
            src="/images/fishing.jpg" 
            alt="Fishing Gear"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
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

      {/* Tech & Audio Category */}
<Link 
  href="/Categories/tech-audio"
  className="group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer block"
>
  <div className="aspect-[4/3] relative overflow-hidden">
    <img 
      src="/images/tech-audio.jpg" 
      alt="Tech & Audio"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
    <div className="absolute inset-0 flex flex-col items-center justify-center">
  <h3 className="text-white text-3xl font-bold mb-2 drop-shadow-2xl">
    Tech & Audio
  </h3>
  <p className="text-gray-200 mb-4 drop-shadow-lg">Speakers, Gaming, Audio Equipment</p>
  <div 
  className="bg-yellow-600/90 backdrop-blur-sm px-8 py-4 rounded-full transform group-hover:scale-110 transition-all duration-300 shadow-2xl"
  style={{
    background: 'linear-gradient(135deg, #eab308, #ca8a04)',
    boxShadow: '0 4px 15px rgba(234, 179, 8, 0.5), 0 8px 30px rgba(202, 138, 4, 0.3)',
    animation: 'pulse 2s infinite'
  }}
>
    <span className="text-white text-xl font-bold uppercase tracking-wide flex items-center">
      CLICK TO VIEW <ArrowRight className="ml-2 w-5 h-5" />
    </span>
  </div>
</div>
  </div>
</Link>

{/* Accessories & Power Category */}
<Link 
  href="/Categories/accessories-power"
  className="group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer block"
>
  <div className="aspect-[4/3] relative overflow-hidden">
    <img 
      src="/images/accessories-power.jpg" 
      alt="Accessories & Power"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
    <div className="absolute inset-0 flex flex-col items-center justify-center">
  <h3 className="text-white text-3xl font-bold mb-2 drop-shadow-2xl">
    Accessories & Power
  </h3>
  <p className="text-gray-200 mb-4 drop-shadow-lg">Cases, Cables, Power Solutions</p>
  <div 
    className="bg-purple-600/90 backdrop-blur-sm px-8 py-4 rounded-full transform group-hover:scale-110 transition-all duration-300 shadow-2xl"
    style={{
      background: 'linear-gradient(135deg, #9333ea, #7e22ce)',
      boxShadow: '0 4px 15px rgba(147, 51, 234, 0.5), 0 8px 30px rgba(126, 34, 206, 0.3)',
      animation: 'pulse 2s infinite'
    }}
  >
    <span className="text-white text-xl font-bold uppercase tracking-wide flex items-center">
      CLICK TO VIEW <ArrowRight className="ml-2 w-5 h-5" />
    </span>
  </div>
</div>
  </div>
</Link>

      {/* NEW: Repair Service Category with HOVER ZOOM */}
      <Link 
        href="/Categories/repair-service"
        className="group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer block"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img 
            src="/images/repair-service.jpg" 
            alt="Repair Service"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          
          {/* Center Call to Action - Enhanced */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-white text-3xl font-bold mb-4 drop-shadow-2xl">
              {t.repairService}
            </h3>
            <div 
              className="bg-orange-600/90 backdrop-blur-sm px-8 py-4 rounded-full transform group-hover:scale-110 transition-all duration-300 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #ea580c, #dc2626)',
                boxShadow: '0 4px 15px rgba(234, 88, 12, 0.5), 0 8px 30px rgba(220, 38, 38, 0.3)',
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

      {/* Hero Text at Bottom */}
      <section className="relative z-20 py-20 bg-black/80">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Cell World St. Vincent - Scripted */}
          <h2 className="text-3xl md:text-4xl mb-4 opacity-0 animate-fade-up"
              style={{ 
                color: '#FFD700', 
                fontFamily: '"Brush Script MT", "Lucida Handwriting", "Lucida Calligraphy", cursive',
                fontWeight: '400',
                textShadow: '0 3px 15px rgba(255, 215, 0, 0.4), 0 2px 8px rgba(0,0,0,0.9)',
                letterSpacing: '1px'
              }}>
            Cell World St. Vincent
          </h2>
          
          {/* Tagline - smaller size */}
          <p className="text-lg md:text-xl mb-6 opacity-0 animate-fade-up animation-delay-300"
             style={{ 
               color: '#FFFFFF',
               fontFamily: '"Brush Script MT", "Dancing Script", cursive',
               fontWeight: '500', 
               textShadow: '0 2px 10px rgba(0,0,0,0.8)', 
               fontStyle: 'italic' 
             }}>
            {t.tagline}
          </p>
          
          {/* Delivery Promise */}
          <p className="text-md md:text-lg mb-6 opacity-0 animate-fade-up animation-delay-400"
             style={{ color: '#FFA500', fontWeight: '500', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
            {t.delivery}
          </p>
          
          {/* Celly Assistant Notice - WITH AVATAR */}
          <div className="flex items-center justify-center mb-8 opacity-0 animate-fade-up animation-delay-450">
            <img 
              src="/images/celly/celly-avatar-icon.png" 
              alt="Celly AI Assistant" 
              className="w-14 h-14 mr-3"
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(64, 224, 208, 0.5))'
              }}
            />
            <p className="text-md md:text-lg"
               style={{ 
                 color: '#40E0D0', 
                 fontWeight: '600',
                 textShadow: '0 0 20px rgba(64, 224, 208, 0.6), 0 0 35px rgba(64, 224, 208, 0.4), 0 2px 10px rgba(0,0,0,0.9)',
                 fontStyle: 'italic'
               }}>
              Need Help? Celly, Our AI Assistant, is Available 24/7
            </p>
          </div>
          
          {/* Contact Us Button */}
          <Link 
            href="/contact"
            className="group relative inline-block opacity-0 animate-fade-up animation-delay-500"
            style={{
              padding: '14px 40px',
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
      </section>  

      {/* Island Delivery Links */}
<section className="relative z-20 py-12 bg-black/80">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h3 
      className="text-2xl md:text-3xl mb-6"
      style={{ 
        color: '#FFFFFF',
        fontFamily: '"Brush Script MT", "Lucida Handwriting", "Dancing Script", cursive',
        fontWeight: '400',
        textShadow: '0 2px 8px rgba(255, 215, 0, 0.4), 0 4px 16px rgba(255, 215, 0, 0.2)'
      }}
    >
      We Deliver Throughout the Grenadines
    </h3>
    <div className="flex flex-wrap justify-center gap-4">
      <a href="/grenadines/bequia" className="text-teal-300 hover:text-yellow-400 px-3 py-2 border border-teal-400/30 rounded-full hover:border-yellow-400 transition-all">
        Bequia
      </a>
      <a href="/grenadines/mustique" className="text-teal-300 hover:text-yellow-400 px-3 py-2 border border-teal-400/30 rounded-full hover:border-yellow-400 transition-all">
        Mustique
      </a>
      <a href="/grenadines/canouan" className="text-teal-300 hover:text-yellow-400 px-3 py-2 border border-teal-400/30 rounded-full hover:border-yellow-400 transition-all">
        Canouan
      </a>
      <a href="/grenadines/union-island" className="text-teal-300 hover:text-yellow-400 px-3 py-2 border border-teal-400/30 rounded-full hover:border-yellow-400 transition-all">
        Union Island
      </a>
      <a href="/grenadines/mayreau" className="text-teal-300 hover:text-yellow-400 px-3 py-2 border border-teal-400/30 rounded-full hover:border-yellow-400 transition-all">
        Mayreau
      </a>
    </div>
  </div>
</section>
  
<CellyAssistant />

{/* Footer */}
<footer className="relative z-10 bg-black/80 backdrop-blur-sm border-t border-gray-800 py-8 mt-20">
  <div className="container mx-auto px-4 text-center">
    <p className="text-gray-400 text-sm mb-2">
      © 2025 Cell World SVG. All Rights Reserved.
    </p>
    <p className="text-gray-500 text-xs mb-1">
      Website by <span className="text-yellow-400 font-semibold">Designs by LJ</span>
    </p>
    <p className="text-gray-500 text-xs">
      Contact: <a href="tel:+17844977245" className="text-blue-400 hover:text-blue-300">+1 (784) 497-7245</a> | 
      <a href="mailto:bytesofknowledgelj@gmail.com" className="text-blue-400 hover:text-blue-300 ml-1">bytesofknowledgelj@gmail.com</a>
    </p>
  </div>
</footer>

</div>
);
}     
  
