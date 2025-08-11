'use client';

import dynamic from 'next/dynamic';
const CellyAssistant = dynamic(() => import('../../../components/CellyAssistant'), { 
  ssr: false 
});

import { useState } from 'react';
import { ArrowLeft, Globe, Phone, MessageCircle, X, Check } from 'lucide-react';
import Link from 'next/link';

export default function MoreCategory() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [language, setLanguage] = useState('en');

  // Your actual products
  const products = [
    // JBL SPEAKERS
    { 
      id: 'jbl-boombox3', 
      name: 'JBL Boombox 3',
      image: '/images/Products/more/jbl-boombox3.png',
      price: 1800.00,
      availability: '2 Available',
      color: '1 Black, 1 Camouflage',
      specs: {
        playtime: '24 Hours Playtime',
        waterproof: 'IP67 Waterproof & Dustproof',
        features: 'Power Bank Function',
        connectivity: 'JBL PartyBoost'
      }
    },
    { 
      id: 'jbl-charge5', 
      name: 'JBL Charge 5',
      image: '/images/Products/more/jbl-charge5.png',
      price: 599.00,
      availability: '6 Remaining',
      color: 'Red (2), Grey (1), Turquoise (2), Black (1)',
      specs: {
        playtime: '20 Hours Playtime',
        waterproof: 'IP67 Waterproof',
        features: 'Power Bank Function',
        connectivity: 'JBL PartyBoost'
      }
    },
    { 
      id: 'jbl-pulse4', 
      name: 'JBL Pulse 4',
      image: '/images/Products/more/jbl-pulse4.png',
      price: 599.00,
      availability: '1 Left',
      color: 'Available',
      specs: {
        playtime: '12 Hours Playtime',
        lightshow: '360° Lightshow & Sound',
        waterproof: 'IPX7 Waterproof',
        connectivity: 'JBL PartyBoost'
      }
    },
    { 
      id: 'jbl-flip6', 
      name: 'JBL Flip 6',
      image: '/images/Products/more/jbl-flip6.png',
      price: 499.00,
      availability: '11 Available',
      color: 'Red (6), Blue (3), Teal (1), Black (1)',
      specs: {
        playtime: '12 Hours Playtime',
        waterproof: 'IP67 Waterproof & Dustproof',
        connectivity: 'JBL PartyBoost',
        portable: 'Ultra Portable Design'
      }
    },
    { 
      id: 'jbl-extreme4', 
      name: 'JBL Extreme 4',
      image: '/images/Products/more/jbl-extreme4.png',
      price: 1250.00,
      availability: '3 Available',
      color: 'Black, Blue, Camouflage (1 each)',
      specs: {
        playtime: '24 Hours Playtime',
        waterproof: 'IP67 Waterproof & Weatherproof',
        features: 'Power Bank Function',
        connectivity: 'Multi-Speaker Connection'
      }
    },
    // POWER BANKS
    { 
      id: 'pocketjuice-10000', 
      name: 'Pocket Juice Power Bank',
      image: '/images/Products/more/pocketjuice-10000.png',
      price: 99.00,
      availability: 'In Stock',
      specs: {
        capacity: '10,000mAh',
        charging: 'Wireless Charging',
        features: 'Built-in Stand',
        output: 'Up to 6X Charge',
        ports: '1 USB Port'
      }
    },
    { 
      id: 'anker-10000', 
      name: 'Anker Power Bank',
      image: '/images/Products/more/anker-10000.png',
      price: 120.00,
      availability: '4 Remaining',
      specs: {
        capacity: '10,000mAh',
        charging: 'High Speed 12W Charging',
        ports: '2 USB Ports',
        compatibility: 'Universal'
      }
    },
    { 
      id: 'bossbar-wireless', 
      name: 'Boss Bar Wireless Power Bank',
      image: '/images/Products/more/bossbar-wireless.png',
      price: 180.00,
      availability: 'In Stock',
      specs: {
        capacity: '10,000mAh',
        compatibility: 'Samsung & iPhone Compatible',
        charging: '15W Fast Wireless Charging',
        display: 'Digital Display',
        ports: '1 USB + 1 Type-C Port'
      }
    },
    // EARBUDS & HEADPHONES
    { 
      id: 'yesido-tws32', 
      name: 'Yesido TWS32',
      image: '/images/Products/more/yesido-tws32.png',
      price: 140.00,
      availability: 'Limited Stock',
      specs: {
        anc: 'ANC Noise Cancelling',
        charging: 'Wireless Charging Case',
        battery: '5H-20H Long Duration',
        features: 'Premium Sound Quality'
      }
    },
    { 
      id: 'hypergear-aeroflex', 
      name: 'HyperGear Aeroflex 360',
      image: '/images/Products/more/hypergear-aeroflex.png',
      price: 160.00,
      availability: '1 Left',
      specs: {
        design: 'Open Ear Design',
        controls: 'Easy Touch Control',
        waterproof: 'Sweat-Proof',
        battery: '7 Hours Playtime per Charge'
      }
    },
    { 
      id: 'jbl-vibebuds', 
      name: 'JBL Vibe Buds',
      image: '/images/Products/more/jbl-vibebuds.png',
      price: 220.00,
      availability: 'Limited Stock',
      color: 'Black, White',
      specs: {
        calls: 'Hands-Free Calls with Voice Aware',
        waterproof: 'Water & Dust Resistant',
        battery: 'Up to 32 Hours Total',
        features: 'Premium JBL Sound'
      }
    },
    // GAMING ACCESSORIES
    { 
      id: 'ps5-controller', 
      name: 'PS5 DualSense Controller',
      image: '/images/Products/more/ps5-controller.png',
      price: 349.00,
      availability: 'In Stock',
      color: 'White, Black',
      specs: {
        compatibility: 'PlayStation 5',
        connectivity: 'Wireless Bluetooth',
        battery: 'Built-in rechargeable',
        features: 'Haptic feedback, Adaptive triggers'
      }
    },
    { 
      id: 'xbox-controller', 
      name: 'Xbox Wireless Controller',
      image: '/images/Products/more/xbox-controller.png',
      price: 299.00,
      availability: 'In Stock',
      color: 'Carbon Black',
      specs: {
        compatibility: 'Xbox Series X/S, PC',
        connectivity: 'Wireless/USB-C',
        battery: 'AA batteries',
        features: 'Textured grip, Button mapping'
      }
    }
  ];

  const translations = {
    en: {
      title: "More Products",
      subtitle: "Speakers • Power Banks • Audio • Gaming",
      backToHome: "Back to Home",
      viewDetails: "View",
      specifications: "Specifications",
      availability: "Availability",
      callToOrder: "Call to Order",
      whatsappOrder: "WhatsApp Order",
      closeModal: "Close",
      inStock: "In Stock",
      available: "Available in"
    },
    fr: {
      title: "Plus de Produits",
      subtitle: "Haut-parleurs • Batteries • Audio • Jeux",
      backToHome: "Retour à l'Accueil",
      viewDetails: "Voir",
      specifications: "Spécifications",
      availability: "Disponibilité",
      callToOrder: "Appeler pour Commander",
      whatsappOrder: "Commander via WhatsApp",
      closeModal: "Fermer",
      inStock: "En Stock",
      available: "Disponible en"
    },
    es: {
      title: "Más Productos",
      subtitle: "Altavoces • Baterías • Audio • Juegos",
      backToHome: "Volver al Inicio",
      viewDetails: "Ver",
      specifications: "Especificaciones",
      availability: "Disponibilidad",
      callToOrder: "Llamar para Ordenar",
      whatsappOrder: "Ordenar por WhatsApp",
      closeModal: "Cerrar",
      inStock: "En Stock",
      available: "Disponible en"
    }
  };

  const t = translations[language as keyof typeof translations];

  // Handle product selection
  const handleProductClick = (product: any) => {
    console.log('Product clicked:', product.name);
    setSelectedProduct(product);
  };

  // Close modal
  const handleCloseModal = () => {
    console.log('Closing modal');
    setSelectedProduct(null);
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background with gradient - SAME AS PHONES */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20" />
      </div>

      {/* Navigation - SAME AS PHONES */}
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
            src="/images/cell-world-logo.png"
            alt="Cell World"
            style={{ 
              height: '80px',
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))'
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

      {/* Header - SAME STYLE AS PHONES */}
      <div className="relative z-10 text-center py-6 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-center"
            style={{ 
              color: '#FFD700',
              textShadow: '0 4px 20px rgba(255, 215, 0, 0.4), 0 2px 8px rgba(0,0,0,0.9)',
              textAlign: 'center' 
            }}>
          {t.title}
        </h1>
        <p className="text-sm md:text-base text-yellow-400/80 text-center" 
           style={{ 
             textShadow: '0 2px 8px rgba(0,0,0,0.8)',
             textAlign: 'center'
           }}>
          {t.subtitle}
        </p>
      </div>

      {/* Products Grid - EXACT SAME STRUCTURE AS PHONES */}
      <div className="relative z-10 container mx-auto px-3 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
              style={{ height: '350px', zIndex: 1 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.zIndex = '10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.zIndex = '1';
              }}
            >
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-3" style={{ height: '260px' }}>
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* Price Badge - Centered */}
              {product.price && (
                <div 
                  className="absolute top-2 bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-lg shadow-lg z-20"
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  ${product.price}
                </div>
              )}

              {/* Info Bar with Button */}
              <div className="p-3 bg-black/50" style={{ height: '90px' }}>
                <h3 className="text-base font-bold text-white truncate mb-2 text-center" 
                    style={{ textAlign: 'center' }}>
                  {product.name}
                </h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold py-2 rounded transition-colors duration-200"
                  type="button"
                >
                  {t.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - EXACT SAME AS PHONES */}
      {selectedProduct && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={handleCloseModal}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)'
            }}
          />
          
          {/* Modal Content */}
          <div 
            className="fixed z-50 overflow-y-auto"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '90vw',
              width: '900px',
              maxHeight: '90vh',
              padding: '24px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '3px solid #FFD700',
              boxShadow: '0 0 50px rgba(0,0,0,0.9)'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition-colors p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
              style={{ zIndex: 60 }}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left side - Image */}
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
                  {selectedProduct.availability || t.inStock}
                </div>
              </div>

              {/* Right side - Details */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                
                <div className="text-4xl font-bold text-yellow-600 mb-6">
                  ${selectedProduct.price.toFixed(2)}
                </div>

                {selectedProduct.color && (
                  <div className="mb-6 p-3 bg-gray-100 rounded-lg border border-gray-300">
                    <p className="text-sm text-gray-600">{t.available}:</p>
                    <p className="text-gray-900 font-semibold">{selectedProduct.color}</p>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-400 pb-2">
                    {t.specifications}
                  </h3>
                  <div className="space-y-3">
                    {selectedProduct.specs && Object.entries(selectedProduct.specs).map(([key, value]) => (
                      <div key={key} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
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

      {/* Celly Assistant */}
      <CellyAssistant />
    </div>
  );
}