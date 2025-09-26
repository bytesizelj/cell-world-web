// HeroCarousel.tsx - Enhanced static banner with animated ticker
// Push this version instead
'use client';

import { Shield, Phone, Sparkles } from 'lucide-react';

const HeroCarousel = () => {
  return (
    <div className="w-full">
      {/* Animated Ticker Strip */}
      <div className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 py-2 overflow-hidden mb-4">
        <div className="animate-scroll-left whitespace-nowrap">
          <span className="inline-block text-black font-semibold px-8">
            📱 Screen Protectors Available For All Devices!
          </span>
          <span className="inline-block text-black font-semibold px-8">
            ✨ Phone Cases Available for All Samsung and iPhone Devices
          </span>
          <span className="inline-block text-black font-semibold px-8">
            🛡️ “Buy a Samsung Phone + Screen Protector, Get FREE Installation!”
          </span>
          {/* Duplicate for seamless loop */}
          <span className="inline-block text-black font-semibold px-8">
            📱 Screen Protectors Available For All Devices!
          </span>
          <span className="inline-block text-black font-semibold px-8">
            ✨ Phone Cases Available for All Samsung and iPhone Devices
          </span>
          <span className="inline-block text-black font-semibold px-8">
            🛡️ “Buy a Samsung Phone + Screen Protector, Get FREE Installation!”
          </span>
        </div>
      </div>

      {/* Main Banner - More Attractive Design */}
      <div className="max-w-5xl mx-auto mb-6 px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {/* Gradient Background with Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
            }}></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-8 md:p-12">
            <div className="text-center text-white">
              {/* Icons Row */}
              <div className="flex justify-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm animate-pulse" style={{animationDelay: '0.5s'}}>
                  <Phone className="w-8 h-8" />
                </div>
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm animate-pulse" style={{animationDelay: '1s'}}>
                  <Sparkles className="w-8 h-8" />
                </div>
              </div>
              
              {/* Main Heading with Glow Effect */}
              <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{
                textShadow: '0 0 30px rgba(255,255,255,0.5)'
              }}>
                Premium Protection & Phones
              </h1>
              
              {/* Subheading */}
              <p className="text-xl md:text-2xl mb-2 opacity-95">
                Screen Protectors • Phone Cases • Samsung Phones
              </p>
              
              {/* Special Offer Badge */}
              <div className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full font-bold mb-10 animate-bounce">
                🎉 FREE Installation when You Buy a Samsung Phone & Screen Protector.”
              </div>
              
              {/* Feature Points */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  ✓ All Device Models
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  ✓ Premium Quality
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  ✓ Expert Service
                </div>
              </div>
              
              {/* CTA Buttons with Hover Effects */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/Categories/more"
                  className="group bg-white text-purple-600 px-10 py-3 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center">
                    Browse Phone Cases 
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </a>
                <a
                  href="/Categories/phones"
                  className="group bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-10 py-3 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center">
                    Samsung F05 - Best Seller
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Strip */}
        <div className="text-center mt-4 bg-gray-100 rounded-full py-2 px-4">
          <span className="text-gray-700 font-medium">
            📍 Visit Us In-Store • 📞 784-451-2261 • 🕐 Mon-Fri 8AM-5PM, Sat 8AM-2PM
          </span>
        </div>
      </div>

      {/* CSS for ticker animation */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;