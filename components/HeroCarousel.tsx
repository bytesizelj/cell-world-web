// HeroCarousel.tsx - Ultra simple version for testing
'use client';

import { Shield } from 'lucide-react';

const HeroCarousel = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-6 px-4">
      {/* Simple static banner with no animations or special features */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12" />
          </div>
          
          {/* Main text */}
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Screen Protectors Now Available!
          </h2>
          <p className="text-lg mb-4">
            Phone Cases - FREE Installation - All Devices
          </p>
          
          {/* Simple buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/Categories/more" className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold">
              Browse Cases
            </a>
            <a href="/Categories/phones" className="bg-white/20 text-white px-6 py-2 rounded-full font-bold border border-white">
              View Phones
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;