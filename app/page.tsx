'use client';
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCelly, setShowCelly] = useState(false);
  const [cellyMounted, setCellyMounted] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [videoSlide, setVideoSlide] = useState(0);
  
  // Array of video paths - add your video files here
  const videos = [
    '/videos/cell-world-bg.mp4',
    '/videos/cell-world-bg2.mp4',  // Add second video when available
    '/videos/cell-world-bg3.mp4'   // Add third video when available
  ];
  
 // Show banner after 1 second, stays for 3 seconds minimum
useEffect(() => {
  const showTimer = setTimeout(() => {
    // setShowBanner(true); // popup disabled - reuse later
  }, 3000);
  
  return () => clearTimeout(showTimer);
}, []);

// Prevent closing banner for first 8 seconds
const [canCloseBanner, setCanCloseBanner] = useState(false);
useEffect(() => {
  if (showBanner) {
    const closeTimer = setTimeout(() => {
      setCanCloseBanner(true);
    }, 8000); // 8 seconds after banner shows
    
    return () => clearTimeout(closeTimer);
  }
}, [showBanner]);

  // Show iPhone promo after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromo(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate hero background videos every 8 seconds
  useEffect(() => {
    const videoInterval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 8000);

    return () => clearInterval(videoInterval);
  }, []);
  // Video promo pop-up: show after 3s, then rotate the 2 promo videos
  useEffect(() => {
    const showTimer = setTimeout(() => setShowVideoPopup(true), 3000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showVideoPopup) return;
    const rot = setInterval(() => setVideoSlide((p) => (p + 1) % 2), 6000);
    return () => clearInterval(rot);
  }, [showVideoPopup]);

  // Auto-rotate hot deals banner every 5 seconds
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % 2); // PS5 + Samsung = 2 slides
  }, 5000);
  
  return () => clearInterval(interval);
}, []);

// Show Celly 3 seconds after banner is closed
useEffect(() => {
  if (!showBanner) {
    const timer = setTimeout(() => {
      setShowCelly(true);
      // Trigger animation after mounting
      setTimeout(() => setCellyMounted(true), 50);
    }, 3000);
    
    return () => clearTimeout(timer);
  }
}, [showBanner]);

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
              filter: 'brightness(1.3) saturate(1.2) contrast(1.05)',
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
  <a href="/Categories/tech-audio" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
    🎵 Tech & Audio
  </a>
  <a href="/Categories/accessories-power" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
    🔌 Accessories & Power
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

{/* COMMENTED OUT - HOT DEALS POPUP (Keep for later use)
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
      <div className="absolute inset-0 animate-rotate-gradient" style={{
        background: 'conic-gradient(from 0deg at 50% 50%, rgba(236, 72, 153, 0.4) 0deg, transparent 60deg, rgba(251, 191, 36, 0.4) 120deg, transparent 180deg, rgba(236, 72, 153, 0.4) 240deg, transparent 300deg, rgba(251, 191, 36, 0.4) 360deg)',
      }}></div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
        <div className="absolute top-10 left-10 w-40 h-40 bg-pink-400 rounded-full animate-pulse-scale"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-yellow-400 rounded-full animate-pulse-scale-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-cyan-400 rounded-full animate-pulse-scale" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      <button
        onClick={() => setShowPromo(false)}
        className="absolute top-4 right-4 bg-white hover:bg-gray-100 p-3 rounded-full transition-all z-20 shadow-xl hover:scale-110 animate-bounce-slow"
      >
        <X className="w-6 h-6 text-gray-700" />
      </button>

      <div className="relative z-10 text-center text-white">
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
        
        <h2 className="text-5xl md:text-6xl font-black mb-4 animate-glow-pulse" style={{
          textShadow: '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,215,0,0.8), 0 0 60px rgba(255,165,0,0.6), 0 4px 20px rgba(0,0,0,0.5)'
        }}>
          🔥 HOT DEALS! 🔥
        </h2>
        
        <p className="text-3xl md:text-4xl font-bold mb-4 animate-slide-in-left">
          Best Priced Samsung Phones Available!
        </p>
        
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 blur-2xl animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 text-black px-8 py-4 rounded-full font-black text-xl shadow-2xl animate-shine overflow-hidden">
            <span className="relative z-10">Samsung A05 • Samsung A06 • Samsung F05</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        <p className="text-2xl font-bold mb-6 animate-flash">
          ⚠️ GOING FAST - GET YOURS NOW! ⚠️
        </p>
        
        <a 
          href="/Categories/phones"
          className="group relative inline-block bg-white text-purple-600 px-12 py-5 rounded-full font-black text-xl overflow-hidden shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 animate-bounce-gentle"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="relative flex items-center justify-center">
            SHOP SAMSUNG PHONES NOW
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </span>
        </a>
      </div>
    </div>
  </div>
)}
END COMMENT */}

{/* COMMENTED OUT - Slide 1: Happy New Year Video 
<div 
  className={`absolute inset-0 transition-all duration-1000 ${
    currentSlide === 0 
      ? 'opacity-100 translate-x-0' 
      : 'opacity-0 -translate-x-full'
  }`}
  style={{
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  }}
>
  <div className="relative h-full w-full flex items-center justify-center overflow-hidden p-2 md:p-8">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="rounded-xl md:rounded-2xl shadow-2xl cursor-pointer"
      style={{
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
        maxHeight: '95%',
        objectFit: 'contain',
        filter: 'brightness(1.1) drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))'
      }}
      onClick={(e) => {
        const video = e.currentTarget;
        if (video.muted) {
          video.muted = false;
          video.play();
        } else {
          video.muted = true;
        }
      }}
    >
      <source src="/videos/cell-world-new-year.mp4" type="video/mp4" />
    </video>
    
    <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 md:px-4 md:py-2 rounded-full shadow-lg animate-pulse">
      <p className="text-xs font-bold text-gray-800">🔇 Tap</p>
    </div>
    
    <div className="absolute bottom-2 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <img 
        src="/images/cell-world-logo.png"
        alt="Cell World"
        className="h-10 md:h-16 lg:h-24 object-contain drop-shadow-2xl"
        style={{
          filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))'
        }}
      />
    </div>
  </div>
</div>
END COMMENT */}

        {/* ===== VIDEO PROMO POP-UP (earbuds + keyboard) ===== */}
        {showVideoPopup && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center animate-fade-in"
            onClick={() => setShowVideoPopup(false)}
            style={{
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.85), rgba(0,0,0,0.95))',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-black">
                <button
                  onClick={() => setShowVideoPopup(false)}
                  className="absolute top-4 right-4 bg-white hover:bg-gray-100 p-3 rounded-full transition-all z-30 shadow-xl hover:scale-110"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>

                {videoSlide === 0 && (
                  <div className="relative">
                    <video autoPlay loop muted playsInline className="w-full h-auto block rounded-3xl" style={{ maxHeight: '75vh' }}>
                      <source src="/videos/ear-buds-promo.mp4" type="video/mp4" />
                    </video>
                    <a
                      href="/Categories/tech-audio"
                      onClick={() => setShowVideoPopup(false)}
                      className="absolute bottom-8 md:bottom-14 left-1/2 -translate-x-1/2 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1.5 text-xs md:px-8 md:py-3 md:text-lg rounded-full font-black shadow-2xl hover:scale-110 transition-all animate-pulse z-20"
                    >
                      SHOP NOW
                    </a>
                  </div>
                )}

                {videoSlide === 1 && (
                  <div className="relative">
                    <video autoPlay loop muted playsInline className="w-full h-auto block rounded-3xl" style={{ maxHeight: '75vh' }}>
                      <source src="/videos/gaming-kit.mp4" type="video/mp4" />
                    </video>
                    <a
                      href="/Categories/tech-audio"
                      onClick={() => setShowVideoPopup(false)}
                      className="absolute bottom-8 md:bottom-14 left-1/2 -translate-x-1/2 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1.5 text-xs md:px-8 md:py-3 md:text-lg rounded-full font-black shadow-2xl hover:scale-110 transition-all animate-pulse z-20"
                    >
                      SHOP NOW
                    </a>
                  </div>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  <button
                    onClick={() => setVideoSlide(0)}
                    className={videoSlide === 0 ? 'h-3 w-8 rounded-full bg-yellow-400 transition-all' : 'h-3 w-3 rounded-full bg-white/70 transition-all'}
                  />
                  <button
                    onClick={() => setVideoSlide(1)}
                    className={videoSlide === 1 ? 'h-3 w-8 rounded-full bg-yellow-400 transition-all' : 'h-3 w-3 rounded-full bg-white/70 transition-all'}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

{/* AUTO-ROTATING HOT DEALS BANNER - 3 SLIDES */}
{showBanner && (
  <div 
    className="fixed inset-0 z-[60] flex items-center justify-center animate-fade-in"
    onClick={() => canCloseBanner && setShowBanner(false)}
    style={{
      background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.95))',
      backdropFilter: 'blur(10px)'
    }}
  >
    <div className="max-w-6xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
      <div className="relative overflow-hidden rounded-3xl shadow-2xl" style={{ height: 'auto', minHeight: '650px' }}>
        <button
          onClick={() => setShowBanner(false)}
          className="absolute top-4 right-4 bg-white hover:bg-gray-100 p-3 rounded-full transition-all z-30 shadow-xl hover:scale-110"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* SLIDE 2: Samsung Phones */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ${
            currentSlide === 0 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-full'
          }`}
          style={{
            background: 'linear-gradient(135deg, #0a192f 0%, #112240 50%, #1e3a5f 100%)',
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 text-cyan-300 text-6xl animate-float opacity-70">📱</div>
            <div className="absolute top-20 right-20 text-yellow-300 text-5xl animate-float opacity-60" style={{animationDelay: '0.5s'}}>✨</div>
            <div className="absolute bottom-20 left-1/4 text-blue-300 text-7xl animate-float opacity-50" style={{animationDelay: '1s'}}>⭐</div>
            <div className="absolute top-1/3 right-1/3 text-cyan-400 text-4xl animate-float opacity-70" style={{animationDelay: '1.5s'}}>💫</div>
            <div className="absolute bottom-10 right-10 text-yellow-400 text-5xl animate-float opacity-60" style={{animationDelay: '2s'}}>🌟</div>
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full animate-ping-slow" style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4), transparent)'
            }}></div>
            <div className="absolute top-20 right-20 w-40 h-40 rounded-full animate-ping-slower" style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4), transparent)',
              animationDelay: '0.5s'
            }}></div>
          </div>

          <div className="relative h-full w-full flex items-center justify-center p-8">
            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-12 border border-cyan-500/30" style={{ maxWidth: '85%', maxHeight: '85%' }}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                <div className="w-full md:w-1/2 flex justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-cyan-400/20 animate-ping-slow"></div>
                    <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-blue-500/30 animate-ping-slower"></div>
                  </div>
                  
                  <img 
                    src="/images/Products/phones/samsung-galaxy-a11.png"
                    alt="Samsung A11"
                    className="relative z-10 h-48 md:h-72 object-contain"
                    style={{
                      filter: 'drop-shadow(0 0 40px rgba(6, 182, 212, 1)) drop-shadow(0 0 80px rgba(59, 130, 246, 0.8))',
                      animation: 'phone-dramatic 3s ease-in-out infinite, float-phone 4s ease-in-out infinite'
                    }}
                  />
                  
                  <div className="absolute top-10 right-10 text-4xl animate-sparkle">✨</div>
                  <div className="absolute bottom-10 left-10 text-3xl animate-sparkle-delayed">⭐</div>
                </div>
                
                <div className="w-full md:w-1/2 text-white text-center md:text-left">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full inline-block mb-2 md:mb-3 font-black text-sm md:text-base animate-pulse shadow-xl">
                    🔥 HOT DEALS!
                  </div>
                  <h2 className="text-xl md:text-3xl lg:text-5xl font-black mb-2" style={{
                    color: '#FFFFFF',
                    textShadow: '0 0 30px rgba(6, 182, 212, 1), 0 0 50px rgba(59, 130, 246, 0.8), 0 4px 20px rgba(0,0,0,0.8)'
                  }}>
                    Samsung A11 • A06 • A05
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg mb-2 md:mb-3 font-bold" style={{
                    color: '#FFD700',
                    textShadow: '0 2px 10px rgba(0,0,0,0.9)'
                  }}>
                    Does your phone need CPR every morning? 😵‍💫 shaking, tapping, praying over it 🙏 That phone retired! Upgrade Today!
                  </p>
                  <div className="text-3xl md:text-5xl lg:text-6xl font-black mb-2 md:mb-3 animate-bounce-gentle" style={{
                    color: '#FFD700',
                    textShadow: '0 0 40px rgba(251, 191, 36, 1), 0 4px 30px rgba(251, 191, 36, 0.8)'
                  }}>
                    From $420
                  </div>
                  <a 
                    href="/Categories/phones"
                    className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 text-white px-4 py-2 md:px-8 md:py-4 rounded-full font-black text-xs md:text-base lg:text-xl hover:from-cyan-300 hover:via-blue-400 hover:to-cyan-300 transition-all shadow-2xl hover:scale-110 animate-pulse"
                    onClick={() => setShowBanner(false)}
                  >
                    📱 SHOP NOW →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 3: Wireless Earbuds */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ${
            currentSlide === 1 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-full'
          }`}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 text-purple-300 text-6xl animate-float opacity-70">✨</div>
            <div className="absolute top-20 right-20 text-pink-300 text-5xl animate-float opacity-60" style={{animationDelay: '0.5s'}}>🎵</div>
            <div className="absolute bottom-20 left-1/4 text-cyan-300 text-7xl animate-float opacity-50" style={{animationDelay: '1s'}}>⭐</div>
            <div className="absolute top-1/3 right-1/3 text-purple-400 text-4xl animate-float opacity-70" style={{animationDelay: '1.5s'}}>💫</div>
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full animate-ping-slow" style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent)'
            }}></div>
            <div className="absolute top-20 right-20 w-40 h-40 rounded-full animate-ping-slower" style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent)'
            }}></div>
          </div>

          <div className="relative h-full w-full flex items-center justify-center p-4 md:p-8 z-10">
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-3xl shadow-2xl p-4 md:p-12 w-full border border-purple-500/30" style={{ maxWidth: '85%', maxHeight: '85%' }}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                
                <div className="w-full md:w-1/2 flex justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-purple-400/20 animate-ping-slow"></div>
                    <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-pink-500/30 animate-ping-slower"></div>
                  </div>
                  
                  <img 
                    src="/images/Products/tech-audio/earbuds2-anc-white.png"
                    alt="Wireless Earbuds"
                    className="relative z-10 h-48 md:h-80 lg:h-96 object-contain"
                    style={{
                      filter: 'drop-shadow(0 0 60px rgba(147, 51, 234, 1)) drop-shadow(0 0 100px rgba(236, 72, 153, 0.8))',
                      animation: 'phone-dramatic 3s ease-in-out infinite, float-phone 4s ease-in-out infinite'
                    }}
                  />
                  
                  <div className="absolute top-10 right-10 text-5xl animate-sparkle">✨</div>
                  <div className="absolute bottom-10 left-10 text-4xl animate-sparkle-delayed">⭐</div>
                </div>
                
                <div className="w-full md:w-1/2 text-white text-center md:text-left">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 md:px-6 md:py-3 rounded-full inline-block mb-2 font-black text-xs md:text-base shadow-xl animate-bounce-gentle">
                    🎵 FEEL THE VIBES!
                  </div>
                  <h2 className="text-xl md:text-3xl lg:text-5xl font-black mb-2" style={{
                    color: '#FFFFFF',
                    textShadow: '0 0 30px rgba(255,255,255,1), 0 0 50px rgba(255,215,0,1), 0 4px 20px rgba(0,0,0,0.8)'
                  }}>
                    Wireless Earbuds with ANC
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg mb-2 md:mb-3 font-bold" style={{
                    color: '#FFD700',
                    textShadow: '0 2px 10px rgba(0,0,0,0.9)'
                  }}>
                    🎧 Active Noise Cancelling • High Quality Sound • 24hrs Battery
                  </p>
                  <div className="text-3xl md:text-5xl lg:text-6xl font-black mb-2 md:mb-3 animate-bounce-gentle" style={{
                    color: '#FFD700',
                    textShadow: '0 0 40px rgba(255,215,0,1), 0 4px 30px rgba(255,165,0,0.8)'
                  }}>
                    $89
                  </div>
                  <a 
                    href="/Categories/tech-audio"
                    className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-black px-4 py-2 md:px-8 md:py-4 rounded-full font-black text-xs md:text-base lg:text-xl hover:from-yellow-300 hover:via-orange-400 hover:to-yellow-300 transition-all shadow-2xl hover:scale-110 animate-pulse"
                    onClick={() => setShowBanner(false)}
                  >
                    🎵 SHOP NOW →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators - 3 dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          <button 
            onClick={() => setCurrentSlide(0)}
            className={`h-4 rounded-full transition-all ${
              currentSlide === 0 
                ? 'bg-cyan-400 w-10 shadow-lg shadow-cyan-500/50' 
                : 'bg-white/70 w-4 hover:bg-white'
            }`}
          />
          <button 
            onClick={() => setCurrentSlide(1)}
            className={`h-4 rounded-full transition-all ${
              currentSlide === 1 
                ? 'bg-purple-500 w-10 shadow-lg shadow-purple-500/50' 
                : 'bg-white/70 w-4 hover:bg-white'
            }`}
          />
        </div>

      </div>
    </div>
  </div>
)}
        
 {/* CSS for animations */}
<style jsx>{`
  @keyframes ticker-scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .ticker-wrapper {
    overflow: hidden;
  }

  .ticker-content {
    display: inline-block;
    animation: ticker-scroll 20s linear infinite;
  }

  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fall {
    0% {
      top: -10%;
      opacity: 1;
      transform: rotate(0deg);
    }
    100% {
      top: 110%;
      opacity: 0.3;
      transform: rotate(360deg);
    }
  }

  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes shimmer-border {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  @keyframes glow-pulse {
    0%, 100% {
      text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6);
    }
    50% {
      text-shadow: 0 0 30px rgba(255,255,255,1), 0 0 60px rgba(255,255,255,0.8);
    }
  }

  .animate-fall {
    animation: fall 4s linear infinite;
  }

  .animate-gradient-shift {
    animation: gradient-shift 3s ease infinite;
  }

  .animate-shimmer-border {
    background-size: 200% 100%;
    animation: shimmer-border 2s linear infinite;
  }

  .animate-glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
  }

  @keyframes rotate-360 {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
  }

  @keyframes slide-in-from-right {
    0% {
      opacity: 0;
      transform: translateX(100px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-slide-in-from-right {
    animation: slide-in-from-right 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

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

  @keyframes float {
    0%, 100% { 
      transform: translateY(0) rotate(0deg);
      opacity: 0.7;
    }
    50% { 
      transform: translateY(-20px) rotate(10deg);
      opacity: 0.3;
    }
  }

  @keyframes zoom-in {
    0% { 
      transform: scale(0.5);
      opacity: 0;
    }
    100% { 
      transform: scale(1);
      opacity: 1;
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-zoom-in {
    animation: zoom-in 1s ease-out;
  }

  @keyframes dramatic-popup {
    0% { 
      opacity: 0;
      transform: scale(0.3) rotate(-15deg);
    }
    60% {
      opacity: 1;
      transform: scale(1.1) rotate(5deg);
    }
    80% {
      transform: scale(0.95) rotate(-2deg);
    }
    100% { 
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  .animate-dramatic-popup {
    animation: dramatic-popup 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  @keyframes ping-slow {
    0%, 100% { 
      transform: scale(1);
      opacity: 0.3;
    }
    50% { 
      transform: scale(1.3);
      opacity: 0;
    }
  }

  @keyframes ping-slower {
    0%, 100% { 
      transform: scale(1);
      opacity: 0.4;
    }
    50% { 
      transform: scale(1.5);
      opacity: 0;
    }
  }

  @keyframes ping-slowest {
    0%, 100% { 
      transform: scale(1);
      opacity: 0.5;
    }
    50% { 
      transform: scale(1.8);
      opacity: 0;
    }
  }

  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes phone-dramatic {
    0%, 100% { 
      transform: scale(1) rotateY(0deg);
    }
    25% {
      transform: scale(1.1) rotateY(5deg);
    }
    50% { 
      transform: scale(1.15) rotateY(0deg);
    }
    75% {
      transform: scale(1.1) rotateY(-5deg);
    }
  }

  @keyframes float-phone {
    0%, 100% { 
      transform: translateY(0px);
    }
    50% { 
      transform: translateY(-20px);
    }
  }

  @keyframes sparkle {
    0%, 100% { 
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
    50% { 
      opacity: 0.3;
      transform: scale(1.5) rotate(180deg);
    }
  }

  @keyframes sparkle-delayed {
    0%, 100% { 
      opacity: 0.8;
      transform: scale(1) rotate(0deg);
    }
    50% { 
      opacity: 0.2;
      transform: scale(1.3) rotate(-180deg);
    }
  }

  .animate-ping-slow {
    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  .animate-ping-slower {
    animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s;
  }

  .animate-ping-slowest {
    animation: ping-slowest 4s cubic-bezier(0, 0, 0.2, 1) infinite 1s;
  }

  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }

  .animate-sparkle {
    animation: sparkle 2s ease-in-out infinite;
  }

  .animate-sparkle-delayed {
    animation: sparkle-delayed 2.5s ease-in-out infinite 0.5s;
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
  
{/* Celly Assistant - Slide in from right with label above */}
{showCelly && (
  <div 
    className="fixed bottom-6 right-6 z-50"
    style={{
      animation: 'slide-in-from-right 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
    }}
  >
    <div className="flex flex-col items-end gap-2">
      {/* Text label */}
      <div className="bg-cyan-400 text-white px-4 py-2 rounded-full shadow-lg font-semibold animate-pulse whitespace-nowrap">
        Hi! I'm Celly - Ask Me Anything
      </div>
      
      {/* Celly icon */}
      <CellyAssistant />
    </div>
  </div>
)}
      
    0
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
