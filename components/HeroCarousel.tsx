'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Shield, Phone, Sparkles } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Screen Protectors For All Digital Devices",
      subtitle: "Mobile, Tablets, Watches and More",
      description: "Hydrogel & Tempered Glass",
      bgColor: "bg-gradient-to-r from-blue-600 to-cyan-600",
      icon: <Shield className="w-8 h-8" />,
      cta: "See Us In-Store",
      enabled: true
    },
    {
      id: 2,
      title: "Get Your Phone Cases Now!",
      subtitle: "For All Android & iPhone Models",
      description: "Premium protection for every device",
      bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
      icon: <Phone className="w-8 h-8" />,
      cta: "Shop Cases",
      link: "/Categories/more",
      enabled: true
    },
    {
      id: 3,
      title: "Samsung Galaxy F05",
      subtitle: "Best Seller",
      description: "In Stock - Factory unlocked",
      bgColor: "bg-gradient-to-r from-orange-600 to-red-600",
      icon: <Sparkles className="w-8 h-8" />,
      cta: "Get New",
      link: "/Categories/phones",
      enabled: true
    }
  ];

  // NO AUTO-ROTATION - Removed useEffect for stability

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[150px] md:h-[240px] overflow-hidden rounded-xl mb-4">
      {/* Static display - no complex transitions */}
      <div className="relative h-full">
        <div className={`${slides[currentSlide].bgColor} h-full flex items-center justify-center text-white`}>
          <div className="text-center px-3 max-w-2xl mx-auto">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                {slides[currentSlide].icon}
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              {slides[currentSlide].title}
            </h2>
            <h3 className="text-sm md:text-base mb-1 opacity-90">
              {slides[currentSlide].subtitle}
            </h3>
            <p className="text-sm md:text-base mb-3 opacity-80">
              {slides[currentSlide].description}
            </p>
            {slides[currentSlide].enabled ? (
              <a
                href={slides[currentSlide].link}
                className="inline-block bg-white text-gray-900 px-8 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
              >
                {slides[currentSlide].cta} →
              </a>
            ) : (
              <button
                disabled
                className="inline-block bg-white/50 text-gray-300 px-8 py-2 rounded-full text-sm font-semibold cursor-not-allowed"
              >
                {slides[currentSlide].cta}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Manual navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/30"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;