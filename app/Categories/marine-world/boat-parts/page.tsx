'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Globe, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const CellyAssistant = dynamic(() => import('@/components/CellyAssistant'), { ssr: false });

export default function BoatPartsPage() {
  const [language, setLanguage] = useState('en');

  const heroImages = ['/images/marine-1.jpg', '/images/marine-2.jpg', '/images/marine-3.jpg'];
  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setBgIndex((p) => (p + 1) % heroImages.length), 3500);
    return () => clearInterval(id);
  }, []);

  const translations = {
    en: {
      backToMarine: "Back to Marine World",
      title: "Boat Parts St Vincent & Grenadines",
      subtitle: "Your Premier Marine Parts Supplier in SVG",
      // Categories
      engineParts: "Outboard Engine Parts",
      propellers: "Marine Propellers",
      fuelSystems: "Fuel Systems",
      electronics: "Marine Electronics",
      safety: "Safety Equipment",
      steering: "Steering & Controls",
      pumps: "Pumps & Plumbing",
      anchoring: "Anchoring & Docking",
      cooling: "Cooling Systems",
      electrical: "Electrical Systems",
      hull: "Hull & Deck",
      trailer: "Boat Trailer Parts",
      // CTAs
      cantFind: "Can't Find Your Boat Part? We Can Source It!",
      callUs: "Call: 1-784-451-2261",
      whatsapp: "WhatsApp: 1-784-431-0777",
      inStock: "In Stock",
      callAvail: "Call for Availability",
      // Service
      servingAll: "Serving All of St Vincent & The Grenadines"
    },
    fr: {
      backToMarine: "Retour au Monde Marin",
      title: "Pièces de Bateau St Vincent & Grenadines",
      subtitle: "Votre Premier Fournisseur de Pièces Marines à SVG",
      engineParts: "Pièces de Moteur Hors-bord",
      propellers: "Hélices Marines",
      fuelSystems: "Systèmes de Carburant",
      electronics: "Électronique Marine",
      safety: "Équipement de Sécurité",
      steering: "Direction et Contrôles",
      pumps: "Pompes et Plomberie",
      anchoring: "Ancrage et Amarrage",
      cooling: "Systèmes de Refroidissement",
      electrical: "Systèmes Électriques",
      hull: "Coque et Pont",
      trailer: "Pièces de Remorque",
      cantFind: "Vous ne trouvez pas votre pièce? Nous pouvons la sourcer!",
      callUs: "Appelez: 1-784-451-2261",
      whatsapp: "WhatsApp: 1-784-431-0777",
      inStock: "En Stock",
      callAvail: "Appelez pour Disponibilité",
      servingAll: "Desservant tout St Vincent et les Grenadines"
    },
    es: {
      backToMarine: "Volver al Mundo Marino",
      title: "Partes de Barco San Vicente y Granadinas",
      subtitle: "Su Principal Proveedor de Partes Marinas en SVG",
      engineParts: "Partes de Motor Fuera de Borda",
      propellers: "Hélices Marinas",
      fuelSystems: "Sistemas de Combustible",
      electronics: "Electrónica Marina",
      safety: "Equipo de Seguridad",
      steering: "Dirección y Controles",
      pumps: "Bombas y Plomería",
      anchoring: "Anclaje y Atraque",
      cooling: "Sistemas de Enfriamiento",
      electrical: "Sistemas Eléctricos",
      hull: "Casco y Cubierta",
      trailer: "Partes de Remolque",
      cantFind: "¿No encuentra su parte? ¡Podemos conseguirla!",
      callUs: "Llame: 1-784-451-2261",
      whatsapp: "WhatsApp: 1-784-431-0777",
      inStock: "En Stock",
      callAvail: "Llame para Disponibilidad",
      servingAll: "Sirviendo todo San Vicente y las Granadinas"
    }
  };

  const t = translations[language as keyof typeof translations];

  const categories = [
    {
      icon: "⚙️",
      title: t.engineParts,
      items: [
        "Yamaha Powerhead Gaskets",
        "Mercury Engine Mounts",
        "Johnson/Evinrude Parts",
        "Suzuki Outboard Components",
        "Honda Marine Engine Parts"
      ],
      status: "in-stock"
    },
    {
      icon: "🌀",
      title: t.propellers,
      items: [
        "Stainless Steel Props",
        "Aluminum Propellers",
        "4-Blade Performance Props",
        "Propeller Hubs & Bushings",
        "Prop Nuts & Hardware"
      ],
      status: "in-stock"
    },
    {
      icon: "⛽",
      title: t.fuelSystems,
      items: [
        "Marine Fuel Tanks",
        "Fuel Lines & Connectors",
        "Primer Bulbs",
        "Fuel Filters",
        "Tank Sending Units"
      ],
      status: "in-stock"
    },
    {
      icon: "📡",
      title: t.electronics,
      items: [
        "GPS/Chart Plotters",
        "Fish Finders & Sonar",
        "Marine Radios (VHF)",
        "Navigation Lights",
        "Switch Panels & Gauges"
      ],
      status: "in-stock"
    },
    {
      icon: "🦺",
      title: t.safety,
      items: [
        "Life Jackets & PFDs",
        "Flares & Signaling Devices",
        "Fire Extinguishers",
        "First Aid Kits",
        "Emergency Beacons (EPIRB)"
      ],
      status: "in-stock"
    },
    {
      icon: "🎯",
      title: t.steering,
      items: [
        "Steering Wheels",
        "Hydraulic Steering Systems",
        "Control Cables",
        "Throttle Controls",
        "Steering Cable Kits"
      ],
      status: "in-stock"
    },
    {
      icon: "💧",
      title: t.pumps,
      items: [
        "Bilge Pumps (Automatic)",
        "Fresh Water Pumps",
        "Raw Water Pumps",
        "Marine Toilets",
        "Through-Hull Fittings"
      ],
      status: "in-stock"
    },
    {
      icon: "⚓",
      title: t.anchoring,
      items: [
        "Marine Anchors",
        "Anchor Chain & Rope",
        "Dock Lines & Fenders",
        "Cleats & Hardware",
        "Windlass Systems"
      ],
      status: "in-stock"
    },
    {
      icon: "❄️",
      title: t.cooling,
      items: [
        "Water Pumps & Impellers",
        "Thermostats",
        "Heat Exchangers",
        "Cooling Hoses",
        "Antifreeze & Coolants"
      ],
      status: "in-stock"
    },
    {
      icon: "🔌",
      title: t.electrical,
      items: [
        "Marine Batteries",
        "Battery Switches",
        "Inverters & Chargers",
        "Wiring & Connectors",
        "Solar Panels"
      ],
      status: "in-stock"
    },
    {
      icon: "🚤",
      title: t.hull,
      items: [
        "Boat Covers",
        "Bimini Tops",
        "Rub Rails & Trim",
        "Hatches & Ports",
        "Non-Skid Products"
      ],
      status: "in-stock"
    },
    {
      icon: "🚛",
      title: t.trailer,
      items: [
        "Trailer Winches",
        "Bunks & Rollers",
        "Trailer Lights",
        "Wheel Bearings",
        "Coupler & Jacks"
      ],
      status: "in-stock"
    }
  ];

  const islands = [
    "St Vincent", "Bequia", "Mustique", "Canouan", 
    "Union Island", "Mayreau", "Petit St Vincent", 
    "Palm Island", "Tobago Cays"
  ];

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Cell World Marine Parts Division",
            "description": "Leading boat parts and marine equipment supplier in St Vincent and the Grenadines",
            "url": "https://cellworldstvin.com",
            "telephone": "+1-784-451-2261",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Kingstown",
              "addressLocality": "Kingstown",
              "addressRegion": "St Vincent",
              "addressCountry": "VC"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Saint Vincent and the Grenadines"
            }
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-teal-950">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/Categories/marine-world"
                  className="flex items-center space-x-2 text-teal-400 hover:text-yellow-400 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>{t.backToMarine}</span>
                </Link>
                
                <img 
  src="/images/marine-logo.png"
  alt="Marine World"
  className="h-12 md:h-16"
  style={{ 
    filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 25px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 35px rgba(255, 255, 255, 0.4))' 
  }}
/>
              </div>
              
              
              <button 
                className="flex items-center space-x-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-md px-3 py-2 rounded-full hover:from-yellow-600/30 hover:to-orange-600/30 border border-yellow-500/30 transition-all"
                onClick={() => {
                  const langs = ['en', 'fr', 'es'];
                  const currentIndex = langs.indexOf(language);
                  setLanguage(langs[(currentIndex + 1) % langs.length]);
                }}
              >
                <Globe className="w-4 h-4 text-yellow-400" />
                <span className="text-xs uppercase font-bold text-yellow-400">{language}</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section 
          className="relative pt-24 md:pt-28 pb-12 md:pb-20 px-4 overflow-hidden"
          style={{ minHeight: '100vh' }}
        >
          {heroImages.map((src, i) => {
            const isActive = bgIndex === i;
            const isPrev = i === (bgIndex - 1 + heroImages.length) % heroImages.length;
            return (
              <div
                key={src}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${src}')`,
                  opacity: isActive || isPrev ? 1 : 0,
                  zIndex: isActive ? 3 : isPrev ? 2 : 1,
                  animation: isActive ? 'dramaticReveal 1.3s ease-out forwards' : 'none',
                }}
              />
            );
          })}
          <div
            className="absolute inset-0"
            style={{ zIndex: 3, background: 'linear-gradient(rgba(3,18,30,0.55), rgba(3,18,30,0.7))' }}
          />

          
          <div className="max-w-6xl mx-auto text-center relative z-10">
            
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-yellow-400 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl font-bold text-yellow-400 mb-6" 
   style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.4)' }}>
              {t.subtitle}
            </p>
                        
            {/* Explore Full Range CTA */}
            <div className="mt-2 mb-4 flex justify-center">
              <Link
                href="/Categories/marine-world"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-yellow-400 text-black font-bold text-sm md:text-base px-6 py-2.5 rounded-full"
                style={{ animation: 'exploreThrob 1.3s ease-in-out infinite' }}
              >
                Explore Our Full Marine Range
                <span className="inline-block text-lg" style={{ animation: 'exploreArrow 1.3s ease-in-out infinite' }}>→</span>
              </Link>
            </div>

            <style jsx global>{`
              @keyframes exploreThrob {
                0%, 100% { transform: scale(1); box-shadow: 0 0 22px rgba(45,212,191,0.6); }
                50% { transform: scale(1.09); box-shadow: 0 0 50px rgba(250,204,21,0.95), 0 0 80px rgba(45,212,191,0.6); }
              }
              @keyframes exploreArrow {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(8px); }
              }
              @keyframes dramaticReveal {
                0% { opacity: 0; transform: scale(1.35); }
                60% { opacity: 1; }
                100% { opacity: 1; transform: scale(1); }
              }
            `}</style>

            
</div>  
        </section>

        {/* Categories Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-400 mb-12">
              Complete Boat Parts Inventory
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div 
  key={index}
  className="bg-white/5 backdrop-blur-sm border-2 border-teal-400 rounded-xl p-6 hover:bg-teal-400/10 hover:transform hover:-translate-y-1 transition-all duration-300"
>
  <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
    <span className="text-2xl mr-3 bg-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
      {category.icon}
    </span>
    {category.title}
  </h3>
                  <ul className="space-y-2 mb-4">
                    {category.items.map((item, i) => (
                      <li key={i} className="text-gray-300 text-sm pl-4 border-l-2 border-teal-400/30">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    category.status === 'in-stock' 
                      ? 'bg-green-500/20 text-green-400 border border-green-400'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400'
                  }`}>
                    {category.status === 'in-stock' ? `✓ ${t.inStock}` : `📞 ${t.callAvail}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-teal-400/10 to-yellow-400/10 border-2 border-teal-400 rounded-2xl p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
              {t.cantFind}
            </h3>
            <p className="text-gray-300 mb-8">
              Access to quality marine parts from leading manufacturers. 
              If we don't have it in stock, we'll work to source it for you.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a 
                href="tel:+17844512261"
                className="bg-gradient-to-r from-teal-400 to-teal-500 text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform inline-flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                {t.callUs}
              </a>
              <a 
                href="https://wa.me/17844310777?text=Hi, I need help finding boat parts"
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform inline-flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t.whatsapp}
              </a>
              <Link 
  href="/Categories/marine-world"
  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform inline-flex items-center justify-center"
>
  🛒 Order Now
</Link>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto bg-black/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-teal-400 text-center mb-6">
              🌊 {t.servingAll}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {islands.map((island, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-teal-400/20 border border-teal-400 rounded-full text-teal-400 text-sm"
                >
                  {island}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto flex justify-center flex-wrap gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-2xl mb-2 bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto">🚚</div>
              <div className="text-sm font-bold text-yellow-400">Island-wide<br/>Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2 bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto">✓</div>
              <div className="text-sm font-bold text-yellow-400">Genuine OEM<br/>Parts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2 bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto">📍</div>
              <div className="text-sm font-bold text-yellow-400">Kingstown<br/>Location</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2 bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto">🔧</div>
              <div className="text-sm font-bold text-yellow-400">Quality Marine<br/>Products</div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-teal-400 mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white/5 border-l-4 border-yellow-400 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Where can I buy boat parts in St Vincent?
                </h3>
                <p className="text-gray-300">
                  Cell World in Kingstown, St Vincent is your premier destination for boat parts. 
                  We stock a comprehensive range of marine parts and can source specialized 
                  components you need. Visit our store or call 1-784-451-2261.
                </p>
              </div>
              
              <div className="bg-white/5 border-l-4 border-yellow-400 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Do you deliver boat parts to the Grenadine islands?
                </h3>
                <p className="text-gray-300">
                  Yes! We provide delivery throughout St Vincent and all the Grenadine islands 
                  including Bequia, Mustique, Canouan, Union Island, and other cays. Contact us 
                  for delivery arrangements to your specific location.
                </p>
              </div>
              
              <div className="bg-white/5 border-l-4 border-yellow-400 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  Can you source specific Yamaha or Mercury outboard parts?
                </h3>
                <p className="text-gray-300">
                  Yes, we specialize in sourcing OEM parts for major outboard brands including 
                  Yamaha, Mercury, Johnson, Evinrude, Suzuki, and Honda. Contact us with your 
                  specific part number or engine model for availability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/90 border-t-2 border-teal-400 py-8 px-4 mt-12">
          <div className="text-center">
            <p className="text-white mb-2">
              © 2024 Cell World St Vincent - Leading Boat Parts Supplier in St Vincent & The Grenadines
            </p>
            <p className="text-teal-400 text-sm">
              Marine Parts SVG | Outboard Engines | Boat Electronics | Safety Equipment | Grenadines Delivery
            </p>
          </div>
        </footer>

        {/* Celly Assistant */}
        <CellyAssistant />
      </div>
    </>
  );
}