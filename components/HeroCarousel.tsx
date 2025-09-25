'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shield, Phone, Sparkles } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Phone Cases Now Available!",
      subtitle: "For All Android & iPhone Models",
      description: "Premium protection for every device",
      bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
      icon: <Phone className="w-10 h-10" />,
      cta: "Shop Cases",
      link: "/Categories/more",
      enabled: true
    },
    {
      id: 2,
      title: "Screen Protectors In Stock",
      subtitle: "For All Digital Devices",
      description: "Hydrogel & Tempered Glass - FREE Installation!",
      bgColor: "bg-gradient-to-r from-blue-600 to-cyan-600",
      icon: <Shield className="w-10 h-10" />,
      cta: "Protect Now",
      link: "#",
      enabled: false
    },
    {
      id: 3,
      title: "New Samsung Galaxy S24 Series",
      subtitle: "Latest Flagship Phones",
      description: "Now in stock - Factory unlocked",
      bgColor: "bg-gradient-to-r from-orange-600 to-red-600",
      icon: <Sparkles className="w-10 h-10" />,
      cta: "View New",
      link: "/Categories/phones",
      enabled: true
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[200px] md:h-[280px] overflow-hidden rounded-xl mb-6">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className={`${slide.bgColor} h-full flex items-center justify-center text-white`}>
            <div className="text-center px-4 max-w-3xl mx-auto">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  {slide.icon}
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {slide.title}
              </h2>
              <h3 className="text-lg md:text-xl mb-1 opacity-90">
                {slide.subtitle}
              </h3>
              <p className="text-base md:text-lg mb-4 opacity-80">
                {slide.description}
              </p>
              {slide.enabled ? (
                <a
                  href={slide.link}
                  className="inline-block bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
                >
                  {slide.cta} →
                </a>
              ) : (
                <button
                  disabled
                  className="inline-block bg-white/50 text-gray-300 px-6 py-2 rounded-full font-semibold cursor-not-allowed"
                >
                  {slide.cta}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/30"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/30"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;