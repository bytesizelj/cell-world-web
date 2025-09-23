'use client';

import { useState } from 'react';
import { ArrowLeft, Globe, Phone, MessageCircle, X, Check, Waves, Fish, Anchor, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const Celly = dynamic(() => import('@/components/CellyAssistant'), { ssr: false });

export default function MarineWorldPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [language, setLanguage] = useState('en');
  const [filterCategory, setFilterCategory] = useState('all');

  // Complete marine products array with YOUR NEW FUEL PRODUCTS ADDED
  const products = [
    // BOAT ACCESSORIES PRODUCTS (KEEPING YOUR EXISTING)
    {
      id: 'switch-panel',
      name: 'Switch Panel',
      image: '/images/Products/marine/switch-panel.png',
      price: 350.00,
      priceRange: 'from $350 up',
      category: 'boat-accessories',
      availability: 'In Stock',
      specs: {
        type: 'Boat Control Panel',
        material: 'Marine Grade',
        installation: 'Dashboard Mount'
      }
    },
    {
      id: 'battery-selector-switch',
      name: 'Battery Selector Switch',
      image: '/images/Products/marine/battery-selector-switch.png',
      price: 250.00,
      category: 'boat-accessories',
      availability: 'In Stock',
      specs: {
        type: 'Electrical Switch',
        positions: 'Multiple Position',
        rating: 'Marine Rated'
      }
    },
    {
      id: 'landhoow-bilge-pump',
      name: 'Landhoow Boat Bilge Water Pump',
      image: '/images/Products/marine/landhoow-boat-bilge-water-pump.png',
      price: 150.00,
      priceRange: '$150 up',
      category: 'boat-accessories',
      availability: 'In Stock',
      specs: {
        type: 'Bilge Pump',
        capacity: 'High Volume',
        power: '12V DC'
      }
    },
    {
      id: 'boat-fender-holders',
      name: 'Boat Fender Holders Wewean',
      image: '/images/Products/marine/boat-fender-holders-wewean.png',
      price: 150.00,
      priceRange: '$150 up',
      category: 'boat-accessories',
      availability: 'In Stock',
      specs: {
        type: 'Fender Holders',
        material: 'Stainless Steel',
        mounting: 'Rail Mount'
      }
    },
    {
      id: 'boat-navigation-lights',
      name: 'Boat Navigation Lights',
      image: '/images/Products/marine/boat-navigation-lights.png',
      price: 100.00,
      priceRange: '$100 up',
      category: 'boat-accessories',
      availability: 'In Stock',
      specs: {
        type: 'Navigation Lights',
        compliance: 'USCG Approved',
        visibility: '2 Mile Range'
      }
    },
    {
      id: 'shop-boat-anchors',
      name: 'Boat-Anchor',
      image: '/images/Products/marine/shop-boat-anchors.png',
      price: 120.00,
      priceRange: '$120 up',
      category: 'anchoring',
      availability: 'In Stock',
      specs: {
        type: 'Marine Anchor',
        material: 'Galvanized Steel',
        weight: 'Various Sizes Available'
      }
    },  

    // FISHING GEAR PRODUCTS (KEEPING YOUR EXISTING)
    {
      id: 5,
      name: "Jig Assist Hooks - 5X Strong",
      price: 25.00,
      image: "/images/Products/fishing/jig-assist-hooks.png",
      description: "Heavy-duty 5X strong assist hooks with durable braided cord",
      priceRange: '$6 up',
      category: "fishing-gear",
      specs: {
        strength: "5X Strong",
        material: "High-Carbon Steel",
        coating: "Corrosion Resistant",
        quantity: "Pack of 4"
      }
    },
    {
      id: 6,
      name: "Mustad UltraPoint Big Gun Hooks",
      price: 10.00,
      image: "/images/Products/fishing/mustad-big-gun-hooks.png",
      description: "Premium Mustad hooks with UltraPoint technology",
      priceRange: '$6 up',
      category: "fishing-gear",
      specs: {
        size: "8/0",
        technology: "UltraPoint MicroSharp 4.3",
        quantity: "Pack of 3",
        type: "Circle Hooks"
      }
    },

    // BOAT PARTS PRODUCTS (KEEPING YOUR EXISTING)
    {
      id: 'engine-mount',
      name: 'Engine Mount',
      image: '/images/Products/marine/engine-mount.png',
      price: 100.00,
      priceRange: '$100.00 up',
      category: 'boat-parts',
      availability: 'In Stock',
      description: 'Heavy-duty rubber engine mount damper designed to reduce vibration and noise from outboard motors.',
      specs: {
        type: 'Engine Mount',
        material: 'Marine-grade rubber compound',
        function: 'Vibration dampening & shock absorption',
        compatibility: 'Universal fit for most outboard motors',
        benefits: 'Reduces engine noise and hull stress'
      }
    },
    {
      id: 'outboard-head-gasket',
      name: 'Outboard Head Gasket',
      image: '/images/Products/marine/outboard-head-gasket.png',
      price: 65.00, 
      priceRange: '$65.00 up', 
      category: 'boat-parts',
      availability: 'In Stock',
      description: 'Precision-cut outboard head gasket for marine engines.',
      specs: {
        type: 'Outboard Head Gasket',
        material: 'Multi-layer steel or composite',
        function: 'Seals combustion chamber',
        application: 'Marine engine rebuild/repair',
        importance: 'Prevents coolant/oil mixing'
      }
    },
    {
      id: 'outboard-gasket-base',
      name: 'Outboard Base Gasket',
      image: '/images/Products/marine/outboard-gasket-base.png',
      price: 25.00, 
      priceRange: '$25.00 up',
      category: 'boat-parts',
      availability: 'In Stock',
      description: 'Outboard Base Gasket for outboard motor powerhead.',
      specs: {
        type: 'Outboard Base Gasket',
        material: 'High-temperature resistant material',
        function: 'Seals powerhead to exhaust housing',
        compatibility: 'Engine-specific sizing required',
        critical: 'Prevents exhaust leaks'
      }
    },
    {
      id: 'yamaha-power-head-gasket',
      name: 'Yamaha Power Head Gasket Kit',
      image: '/images/Products/marine/yamaha-power-head-gasket.png',
      price: 450.00,
      category: 'boat-parts',
      availability: 'In Stock',
      description: 'Premium quality replacement power head gasket for Yamaha outboard motors.',
      specs: {
        type: 'Power Head Gasket Set',
        compatibility: 'Yamaha Outboard Motors',
        material: 'Marine-grade composite material',
        includes: 'Complete gasket set with seals',
        application: 'Cylinder head to engine block seal'
      }
    },

    // *** YOUR NEW PRODUCTS ADDED HERE ***
   {
  id: 'boat-anchor',
  name: 'Boat Anchor',
  price: 150.00,
  image: '/images/Products/marine/boat-anchor.png',
  description: 'Heavy-duty galvanized steel anchor for secure mooring. Designed for reliable holding power in various seabed conditions.',
  priceRange: '$150 up',
  category: 'anchoring',
  availability: 'In Stock',
  specs: {
    material: 'Galvanized steel construction',
    type: 'Fluke-style design',
    feature: 'Corrosion resistant coating',
    use: 'Suitable for sand, mud, and rocky bottoms'
  }
},
{
  id: 'boat-switch',
  name: 'Boat Switch',
  price: 50.00,
  image: '/images/Products/marine/boat-switch.png',
  description: 'Waterproof switch panel for boat electrical systems. Multiple circuit control with LED indicators for easy operation.',
  priceRange: '$50 up',
  category: 'electrical',
  availability: 'In Stock',
  specs: {
    type: 'Multi-circuit switch panel',
    features: 'Waterproof construction with LED indicators',
    protection: 'Circuit breaker protection',
    mounting: 'Surface mount design'
  }
},
    
    {
      id: 'fuel-primer-bulb',
      name: 'Fuel Primer Bulb Pump',
      image: '/images/Products/marine/fuel-primer-bulb.png?v=2',
      price: 75.00,
      priceRange: '$75.00',
      category: 'boat-parts',
      availability: 'In Stock',
      description: 'Premium quality fuel primer bulb pump assembly. Essential for maintaining proper fuel flow and easy engine starting. Durable construction ensures long-lasting performance in marine environments.',
      specs: {
        type: 'Fuel Primer Bulb Pump Assembly',
        compatibility: 'Outboard Motors',
        material: 'Marine-grade rubber/polymer'
      }
    },
    {
      id: 'fuel-clip',
      name: 'Fuel Clip',
      image: '/images/Products/marine/fuel-clip.png?v=2',
      price: 60.00,
      priceRange: '$60.00',
      category: 'boat-parts',
      availability: 'In Stock',
      description: 'Genuine fuel line connector clip for secure and leak-free fuel line connections. Manufactured to exact specifications for perfect fit and reliability.',
      specs: {
        type: 'Fuel Line Connector Clip',
        material: 'Marine-grade materials'
      }
    },
    {
      id: 'fuel-line-kit',
      name: 'Fuel Line Kit',
      image: '/images/Products/marine/fuel-line-kit.png?v=2',
      price: 250.00,
      priceRange: '$250.00',
      category: 'boat-parts',
      availability: 'In Stock',
      description: 'Complete fuel line kit with all necessary connectors included. Professional-grade marine fuel line assembly ensures optimal fuel delivery and engine performance. Resistant to ethanol and marine conditions.',
      specs: {
        type: 'Complete Fuel Line Kit',
        includes: 'Fuel line',
        features: 'Ethanol-resistant, UV-resistant'
      }
    },
    
    // FISHING LURES PRODUCTS (KEEPING YOUR EXISTING)
    {
      id: 8,
      name: "Fishing Reels YoYo",
      price: 6.00,
      image: "/images/Products/marine/fishing-reels-yoyo.png",
      description: "Durable fishing reels yoyo. Multiple colors and sizes available.",
      priceRange: '$6 up',
      category: "fishing-lures",  
      specs: {
        type: "Fishing Reels YoYo",
        colors: "Blue, Yellow, Red available",
        material: "Marine-grade rubber/polymer",
        sizes: "Various diameters",
        application: "Fishing Reels Yoyo guide and support"
      }
    },
    {
      id: 16,
      name: "Fishing Reel Spinner",
      price: 65.00,
      image: "/images/Products/fishing/mustad-lures.png",
      description: "Proven mahi-mahi and dorado trolling lures",
      category: "fishing-lures",
      specs: {
        type: "Trolling Lures",
        target: "Mahi, Dorado, Tuna",
        colors: "Green, Blue, Yellow",
        quantity: "Set of 6"
      }
    },
  ];

  const translations = {
    en: {
      title: "Marine World",
      subtitle: "Professional Marine & Fishing Supplies",
      backToHome: "Back to Home",
      viewDetails: "View Details",
      specifications: "Specifications",
      availability: "Availability",
      callToOrder: "Call to Order",
      whatsappOrder: "WhatsApp Order",
      closeModal: "Close",
      inStock: "In Stock",
      all: "All Products",
      "boat-parts": "Boat Parts",
      "boat-accessories": "Boat Accessories",
      "fishing-lures": "Fishing Lures",
      "fishing-gear": "Fishing Gear",
      filterBy: "Filter by:",
      viewAllBoatParts: "View All Boat Parts",
      boatPartsHero: "Looking for more boat parts? Check out our complete inventory!",
      exploreBoatParts: "Explore Boat Parts Catalog",
      electrical: "Electrical",
      anchoring: "Anchoring"
    },
    fr: {
      title: "Monde Marin",
      subtitle: "Fournitures Marines et de Pêche Professionnelles",
      backToHome: "Retour à l'Accueil",
      viewDetails: "Voir Détails",
      specifications: "Spécifications",
      availability: "Disponibilité",
      callToOrder: "Appeler pour Commander",
      whatsappOrder: "Commander via WhatsApp",
      closeModal: "Fermer",
      inStock: "En Stock",
      all: "Tous les Produits",
      "boat-parts": "Pièces de Bateau",
      "boat-accessories": "Accessoires de Bateau",
      "fishing-lures": "Leurres de Pêche",
      "fishing-gear": "Matériel de Pêche",
      filterBy: "Filtrer par:",
      viewAllBoatParts: "Voir Toutes les Pièces",
      boatPartsHero: "Vous cherchez plus de pièces de bateau? Consultez notre inventaire complet!",
      exploreBoatParts: "Explorer le Catalogue de Pièces",
      electrical: "Électrique",
      anchoring: "Ancrage"

    },
    es: {
      title: "Mundo Marino",
      subtitle: "Suministros Marinos y de Pesca Profesionales",
      backToHome: "Volver al Inicio",
      viewDetails: "Ver Detalles",
      specifications: "Especificaciones",
      availability: "Disponibilidad",
      callToOrder: "Llamar para Ordenar",
      whatsappOrder: "Ordenar por WhatsApp",
      closeModal: "Cerrar",
      inStock: "En Stock",
      all: "Todos los Productos",
      "boat-parts": "Partes de Barco",
      "boat-accessories": "Accesorios de Barco",
      "fishing-lures": "Señuelos de Pesca",
      "fishing-gear": "Equipo de Pesca",
      filterBy: "Filtrar por:",
      viewAllBoatParts: "Ver Todas las Partes",
      boatPartsHero: "¿Buscas más partes de barco? ¡Consulta nuestro inventario completo!",
      exploreBoatParts: "Explorar Catálogo de Partes",
      electrical: "Eléctrico",
      anchoring: "Anclaje"

    }
  };

  const t = translations[language as keyof typeof translations];

  // Filter products based on selected category
  const filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Cell World Marine World",
            "description": "Marine equipment and fishing supplies in St Vincent and the Grenadines",
            "url": "https://cellworldstvin.com/Categories/marine-world",
            "telephone": "+1-784-451-2261",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kingstown",
              "addressRegion": "St Vincent",
              "addressCountry": "VC"
            }
          })
        }}
      />

      <div className="relative min-h-screen bg-black">
        {/* Ocean-themed gradient background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-teal-900/20 to-blue-900/30" />
          <div className="absolute inset-0 opacity-10">
            <div style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
              height: '100%'
            }} />
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative z-20 flex justify-between items-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t.backToHome}</span>
            </Link>
            
            <img 
              src="/images/marine-logo.png"
              alt="Marine World"
              style={{ 
                height: '80px',
                width: 'auto', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5)) drop-shadow(0 0 20px rgba(64, 224, 208, 0.4))'
              }}
            />
          </div>
          
          <button 
            className="group flex items-center space-x-2 text-white bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-md px-4 py-2.5 rounded-full hover:from-yellow-600/30 hover:to-orange-600/30 border border-yellow-500/30 transition-all duration-300"
            onClick={() => {
              const langs = ['en', 'fr', 'es'];
              const currentIndex = langs.indexOf(language);
              setLanguage(langs[(currentIndex + 1) % langs.length]);
            }}
          >
            <Globe className="w-5 h-5 text-yellow-400" />
            <span className="text-sm uppercase font-bold text-yellow-400">{language}</span>
          </button>
        </nav>

        {/* Header with marine theme */}
        <div className="relative z-10 text-center py-8 px-4">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Fish className="w-10 h-10 text-teal-400" />
            <h1 className="text-4xl md:text-5xl font-bold"
                style={{ 
                  color: '#40E0D0',
                  textShadow: '0 4px 20px rgba(64, 224, 208, 0.4), 0 2px 8px rgba(0,0,0,0.9)' 
                }}>
              {t.title}
            </h1>
            <Waves className="w-10 h-10 text-teal-400" />
          </div>
          <p className="text-lg text-teal-300/80" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            {t.subtitle}
          </p>
        </div>

        {/* NEW: Boat Parts Hero Banner */}
        <div className="relative z-10 mx-4 mb-8">
          <Link href="/Categories/marine-world/boat-parts">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-teal-500/20 to-yellow-500/20 border-2 border-teal-400 rounded-xl p-6 hover:from-teal-500/30 hover:to-yellow-500/30 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-yellow-400 mb-2 flex items-center">
                    <Anchor className="w-6 h-6 mr-2" />
                    {t.boatPartsHero}
                  </h2>
                  <p className="text-teal-300">
                    Engines • Propellers • Electronics • Safety Equipment • Fuel Systems • Cooling • Electrical • And More!
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="bg-teal-500 text-black font-bold px-6 py-3 rounded-full flex items-center hover:bg-teal-400 transition-colors">
                    {t.exploreBoatParts}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="relative z-10 flex justify-center mb-8 px-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 flex flex-wrap gap-2 justify-center">
            <span className="text-white px-3 py-2">{t.filterBy}</span>
            {['all', 'boat-parts', 'boat-accessories', 'fishing-lures', 'fishing-gear', 'electrical', 'anchoring'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  filterCategory === cat 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {t[cat as keyof typeof t]}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative z-10 container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="group relative bg-gradient-to-br from-gray-900/60 via-teal-900/20 to-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20"
              >
                {/* Product Image */}
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-4 overflow-hidden" style={{ height: '240px' }}>
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-700 hover:scale-125"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 bg-teal-500/80 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.category.toUpperCase()}
                  </div>
                </div>

                {/* Price Badge */}
                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-lg shadow-lg">
                  {product.priceRange || `$${product.price.toFixed(2)}`}
                </div>

                {/* Product Info */}
                <div className="p-4 bg-black/60">
                  <h3 className="text-lg font-bold text-white mb-2 text-center">{product.name}</h3>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold py-2 rounded-lg transition-all duration-300"
                  >
                    {t.viewDetails}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Boat Parts Button */}
          {filterCategory === 'boat-parts' && (
            <div className="text-center mt-8">
              <Link 
                href="/Categories/marine-world/boat-parts"
                className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
              >
                {t.viewAllBoatParts}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          )}
        </div>

        {/* Product Modal (same as before) */}
        {selectedProduct && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-black/95"
              onClick={() => setSelectedProduct(null)}
            />
            
            <div 
              className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6"
              style={{
                border: '3px solid #40E0D0',
                boxShadow: '0 0 50px rgba(64, 224, 208, 0.3)'
              }}
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition-colors p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Image */}
                <div>
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 mb-4">
                    <img 
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-contain"
                    />
                  </div>
                  
                  <div className="bg-green-50 border-2 border-green-500 text-green-700 text-center py-3 rounded-lg font-bold">
                    <Check className="inline w-5 h-5 mr-2" />
                    {t.inStock}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                  
                  <div className="text-4xl font-bold text-teal-600 mb-4">
                    ${selectedProduct.price.toFixed(2)}
                  </div>

                  <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-teal-400 pb-2">
                      {t.specifications}
                    </h3>
                    <div className="space-y-3">
                      {selectedProduct.specs && Object.entries(selectedProduct.specs).map(([key, value]) => (
                        <div key={key} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mt-1.5"></div>
                          <span className="text-gray-700">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a 
                      href="tel:+17844512261"
                      className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-lg text-center hover:from-blue-400 hover:to-blue-500 transition-all duration-300 shadow-lg"
                    >
                      <Phone className="inline w-5 h-5 mr-2" />
                      {t.callToOrder}: 1-784-451-2261
                    </a>
                    
                    <a 
                      href={`https://wa.me/17844310777?text=Hi, I'm interested in ${selectedProduct.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-lg text-center hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg"
                    >
                      <MessageCircle className="inline w-5 h-5 mr-2" />
                      {t.whatsappOrder}: 1-784-431-0777
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* Celly Assistant - KEEPING THIS! */}
        <Celly />
      </div>
    </>
  );
}