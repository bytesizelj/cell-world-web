// HeroBanner.tsx - Static, reliable, no JavaScript animations
'use client';

import { Shield } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      {/* Static Banner - No animations, no state */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 md:p-8 text-white">
        <div className="flex items-center justify-center mb-3">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <Shield className="w-10 h-10" />
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Now Available! - Screen Protectors For ALL Devices!
          </h2>
          <p className="text-lg md:text-xl mb-2 opacity-95">
            All Mobile Devices, Tablets, Watches & More
          </p>
          <p className="text-base md:text-lg mb-4 opacity-90">
            Hydrogel & Tempered Glass
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="/Categories/more"
              className="bg-white text-blue-600 px-8 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Phone Cases For ALL Samsung and iPhone Devices! →
            </a>
            <a
              href="/Categories/phones"
              className="bg-white/20 text-white px-8 py-2.5 rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/40"
            >
              Get Best Seller Now! Samsung F05
            </a>
          </div>
        </div>
      </div> 
      
      {/* Simple text notice below */}
      <div className="text-center mt-3 text-sm text-white-600">
        📍 Visit us in-store for immediate service • 📞 Call: 784-451-2261
      </div>
    </div>
  );
};

export default HeroBanner;