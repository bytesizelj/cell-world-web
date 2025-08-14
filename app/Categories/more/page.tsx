'use client';

import { useState } from 'react';
import { ArrowLeft, Globe, Phone, MessageCircle, X, Check, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const Celly = dynamic(() => import('@/components/CellyAssistant'), { ssr: false });

export default function MoreCategory() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [language, setLanguage] = useState('en');
  const [filterCategory, setFilterCategory] = useState('all');

  // Complete product catalog - 20 items
  const products = [
    // JBL SPEAKERS (1-10)
    {
      id: 1,
      name: "JBL GO 4 Portable Speaker - Navy Blue",
      price: 220.00,
      image: "/images/Products/more/jbl-go4-navy.png",
      description: "Ultra-portable waterproof Bluetooth speaker with bold JBL Pro Sound. Features 7 hours playtime, IP67 waterproof and dustproof rating.",
      category: "speakers",
      specs: {
        bluetooth: "Bluetooth 5.3",
        battery: "7 hours battery life",
        waterproof: "IP67 Waterproof",
        design: "Compact with loop"
      }
    },
    {
      id: 2,
      name: "JBL GO 4 Portable Speaker - Color Options",
      price: 220.00,
      image: "/images/Products/more/jbl-go4-colors.png",
      description: "Choose your style! Ultra-portable waterproof speaker available in multiple vibrant colors including Camo, White, Red, and Blue.",
      category: "speakers",
      specs: {
        bluetooth: "Bluetooth 5.3",
        battery: "7 hours battery life",
        waterproof: "IP67 Waterproof",
        colors: "Multiple options"
      }
    },
    {
      id: 3,
      name: "JBL GO 3 Portable Speaker Collection",
      price: 180.00,
      image: "/images/Products/more/jbl-go3-collection.png",
      description: "Portable waterproof speaker with powerful audio and bold design. Available in Gray/Blue, Blue, Black, Teal/Green colors.",
      category: "speakers",
      specs: {
        bluetooth: "Bluetooth 5.1",
        battery: "5 hours playtime",
        waterproof: "IP67 Waterproof",
        colors: "Vibrant options"
      }
    },
    {
      id: 4,
      name: "JBL Pulse 5 Portable Speaker",
      price: 350.00,
      image: "/images/Products/more/jbl-pulse5.png",
      description: "360-degree sound with customizable lightshow. Features ambient light effects that sync with your music for an immersive audiovisual experience.",
      category: "speakers",
      specs: {
        feature: "360° LED Lightshow",
        battery: "12 hours playtime",
        waterproof: "IP67 Waterproof",
        connectivity: "PartyBoost compatible"
      }
    },
    {
      id: 5,
      name: "JBL Flip 6 Waterproof Speaker - Multiple Colors",
      price: 299.00,
      image: "/images/Products/more/jbl-flip6-colors.png",
      description: "Powerful portable Bluetooth speaker with 12 hours of playtime. IP67 waterproof and dustproof. Available in Red, Black, Teal, and Black/Red.",
      category: "speakers",
      specs: {
        bluetooth: "Bluetooth 5.1",
        battery: "12 hours battery life",
        waterproof: "IP67 Waterproof & Dustproof",
        feature: "PartyBoost & 2-way speakers"
      }
    },
    {
      id: 6,
      name: "JBL Boombox 3 Portable Speaker - Black",
      price: 599.00,
      image: "/images/Products/more/jbl-boombox3-black.png",
      description: "Massive JBL Original Pro Sound with the deepest bass. 24 hours of playtime, IP67 waterproof, and built-in powerbank.",
      category: "speakers",
      specs: {
        battery: "24 hours battery life",
        waterproof: "IP67 Waterproof & Dustproof",
        feature: "Built-in powerbank",
        speakers: "3-way speakers"
      }
    },
    {
      id: 7,
      name: "JBL Boombox 3 Portable Speaker - Squad Camo",
      price: 629.00,
      image: "/images/Products/more/jbl-boombox3-camo.png",
      description: "Limited edition Squad camouflage design. Massive sound, deepest bass, 24-hour battery life with military-inspired aesthetics.",
      category: "speakers",
      specs: {
        battery: "24 hours battery life",
        waterproof: "IP67 Waterproof & Dustproof",
        design: "Squad Camo edition",
        feature: "PartyBoost compatible"
      }
    },
    {
      id: 9,
      name: "JBL Xtreme 4 Portable Speaker - Multiple Colors",
      price: 450.00,
      image: "/images/Products/more/jbl-xtreme4-colors.png",
      description: "Powerful portable speaker with shoulder strap. 24 hours playtime, IP67 waterproof. Available in Black, Blue, and Camo editions.",
      category: "speakers",
      specs: {
        bluetooth: "Bluetooth 5.3",
        battery: "24 hours battery life",
        waterproof: "IP67 Waterproof & Dustproof",
        feature: "Dual JBL Bass Radiators"
      }
    },
    {
      id: 10,
      name: "JBL Charge 5 Portable Speaker Collection",
      price: 320.00,
      image: "/images/Products/more/jbl-charge5-colors.png",
      description: "Bold JBL Original Pro Sound with IP67 waterproof rating. 20 hours playtime. Available in Gray, Black, Red, and Teal colors.",
      category: "speakers",
      specs: {
        bluetooth: "Bluetooth 5.1",
        battery: "20 hours battery life",
        waterproof: "IP67 Waterproof & Dustproof",
        feature: "Built-in powerbank"
      }
    },

    // POWER BANKS (8, 11-15)
    {
      id: 8,
      name: "Mophie Juice Pack Connect 5000mAh",
      price: 125.00,
      image: "/images/Products/more/mophie-juicepack-5000.png",
      description: "Compact wireless charging battery pack with 5000mAh capacity. Detachable design works with wireless phones. Includes stand.",
      category: "powerbanks",
      specs: {
        capacity: "5000mAh capacity",
        charging: "Wireless charging",
        battery: "70% extra battery",
        design: "Detachable with stand"
      }
    },
    {
      id: 11,
      name: "Pocket Juice Air Plus Wireless Power Bank 10000mAh",
      price: 99.00,
      image: "/images/Products/more/pocketjuice-air-10000.png",
      description: "Magnetic wireless charger with built-in stand. 10000mAh capacity provides up to 6 full charges. Magnetically attaches to any phone.",
      category: "powerbanks",
      specs: {
        capacity: "10000mAh capacity",
        charging: "Wireless charging",
        attachment: "Magnetic attachment",
        feature: "6X charges"
      }
    },
    {
      id: 12,
      name: "Anker PowerCore Select 10000mAh Power Bank",
      price: 85.00,
      image: "/images/Products/more/anker-powercore-10000.png",
      description: "High-speed portable charger with 10000mAh capacity. Provides 46+ hours of extra power with 12W high-speed charging.",
      category: "powerbanks",
      specs: {
        capacity: "10000mAh capacity",
        charging: "12W high-speed charging",
        battery: "46+ hours extra power",
        ports: "Dual USB-A ports"
      }
    },
    {
      id: 13,
      name: "Boss Bar Wireless Power Bank 10000mAh",
      price: 110.00,
      image: "/images/Products/more/bossbar-wireless-10000.png",
      description: "Premium wireless power bank with digital display. Features 15W wireless fast charging, 22.5W super fast charge output.",
      category: "powerbanks",
      specs: {
        capacity: "10000mAh capacity",
        wireless: "15W Wireless charging",
        wired: "22.5W PD Fast Charge",
        display: "Digital LED display"
      }
    },
    {
      id: 14,
      name: "Anker Pocket-Sized Power Bank 10000mAh",
      price: 75.00,
      image: "/images/Products/more/anker-pocket-10k.png",
      description: "Ultra-compact power bank with 22.5W max output. Perfect pocket size for Apple, Samsung, and more devices.",
      category: "powerbanks",
      specs: {
        capacity: "10000mAh capacity",
        output: "22.5W MAX output",
        design: "Ultra-compact",
        compatibility: "Universal"
      }
    },
    {
      id: 15,
      name: "Yesido Wireless Power Bank with Built-in Cables",
      price: 95.00,
      image: "/images/Products/more/yesido-wireless-10000.png",
      description: "All-in-one power bank with wireless charging pad and two built-in cables. Digital display shows battery level.",
      category: "powerbanks",
      specs: {
        capacity: "10000mAh capacity",
        wireless: "Wireless charging pad",
        cables: "Two built-in cables",
        display: "Digital display"
      }
    },

    // EARBUDS & HEADPHONES (16-20)
    {
      id: 16,
      name: "Premium Wireless Earbuds Pro with ANC",
      price: 89.00,
      image: "/images/Products/more/airpods-pro-style.png",
      description: "High-quality wireless earbuds with active noise cancellation. Premium sound quality with charging case.",
      category: "earbuds",
      specs: {
        feature: "Active Noise Cancellation",
        mode: "Transparency mode",
        charging: "Wireless charging case",
        battery: "24+ hours battery life"
      }
    },
    {
      id: 17,
      name: "HyperGear AeroFlex 360 Open-Ear Wireless Earbuds",
      price: 160.00,
      image: "/images/Products/more/hypergear-aeroflex-360.png",
      description: "Revolutionary open-ear design for 360° situational awareness. Enjoy music while staying aware of surroundings. 25 hours extended playtime.",
      category: "earbuds",
      specs: {
        design: "Open-ear design",
        awareness: "360° awareness",
        battery: "25 hours playtime",
        comfort: "Rests on ears"
      }
    },
    {
      id: 18,
      name: "Yesido TWS32 Wireless Earbuds with ANC",
      price: 140.00,
      image: "/images/Products/more/yesido-tws32-anc.png",
      description: "Premium wireless earbuds with active noise cancellation. Heavy bass effect, Bluetooth 5.4, ergonomic design.",
      category: "earbuds",
      specs: {
        anc: "Active Noise Cancellation",
        sound: "Heavy Bass Effect",
        bluetooth: "Bluetooth 5.4",
        detection: "Human ear detection"
      }
    },
    {
      id: 19,
      name: "2000 Series Wireless Headphones - Pink",
      price: 150.00,
      image: "/images/Products/more/2000series-headphones-pink.png",
      description: "Stylish wireless headphones with IPX4 water resistance. Perfect for workouts with 18 hours playtime.",
      category: "headphones",
      specs: {
        waterproof: "IPX4 splash & sweat resistant",
        battery: "18 hours play time",
        connectivity: "Wireless",
        color: "Pink"
      }
    },
    {
      id: 20,
      name: "Buds2 Pro Premium Earbuds - Purple & White",
      price: 120.00,
      image: "/images/Products/more/buds2-pro-colors.png",
      description: "Premium wireless earbuds with studio-quality sound. Available in elegant Purple and classic White colors.",
      category: "earbuds",
      specs: {
        sound: "Premium sound quality",
        charging: "Wireless charging case",
        controls: "Touch controls",
        colors: "Purple & White options"
      }
    }
  ];

  const translations = {
    en: {
      title: "Electronics & Accessories",
      subtitle: "Premium Audio, Power Solutions & More",
      backToHome: "Back to Home",
      viewDetails: "View Details",
      specifications: "Specifications",
      availability: "Availability",
      callToOrder: "Call to Order",
      whatsappOrder: "WhatsApp Order",
      closeModal: "Close",
      inStock: "In Stock",
      all: "All Products",
      speakers: "Speakers",
      powerbanks: "Power Banks",
      earbuds: "Earbuds",
      headphones: "Headphones",
      filterBy: "Filter by:"
    },
    fr: {
      title: "Électronique et Accessoires",
      subtitle: "Audio Premium, Solutions d'Alimentation et Plus",
      backToHome: "Retour à l'Accueil",
      viewDetails: "Voir Détails",
      specifications: "Spécifications",
      availability: "Disponibilité",
      callToOrder: "Appeler pour Commander",
      whatsappOrder: "Commander via WhatsApp",
      closeModal: "Fermer",
      inStock: "En Stock",
      all: "Tous les Produits",
      speakers: "Haut-parleurs",
      powerbanks: "Batteries Externes",
      earbuds: "Écouteurs",
      headphones: "Casques",
      filterBy: "Filtrer par:"
    },
    es: {
      title: "Electrónica y Accesorios",
      subtitle: "Audio Premium, Soluciones de Energía y Más",
      backToHome: "Volver al Inicio",
      viewDetails: "Ver Detalles",
      specifications: "Especificaciones",
      availability: "Disponibilidad",
      callToOrder: "Llamar para Ordenar",
      whatsappOrder: "Ordenar por WhatsApp",
      closeModal: "Cerrar",
      inStock: "En Stock",
      all: "Todos los Productos",
      speakers: "Altavoces",
      powerbanks: "Bancos de Energía",
      earbuds: "Auriculares",
      headphones: "Audífonos",
      filterBy: "Filtrar por:"
    }
  };

  const t = translations[language as keyof typeof translations];

  // Filter products based on selected category
  const filteredProducts = filterCategory === 'all' 
    ? products 
    : filterCategory === 'headphones'
    ? products.filter(p => p.category === 'earbuds' || p.category === 'headphones')
    : products.filter(p => p.category === filterCategory);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Dynamic gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-orange-900/20" />
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

      {/* Header */}
      <div className="relative z-10 text-center py-8 px-4">
        <div className="flex justify-center items-center gap-3 mb-4">
          <ShoppingBag className="w-10 h-10 text-purple-400" />
          <h1 className="text-4xl md:text-5xl font-bold"
              style={{ 
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 20px rgba(255, 107, 107, 0.3)' 
              }}>
            {t.title}
          </h1>
          <Sparkles className="w-10 h-10 text-pink-400" />
        </div>
        <p className="text-lg text-gray-300" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
          {t.subtitle}
        </p>
      </div>

      {/* Category Filter */}
      <div className="relative z-10 flex justify-center mb-8 px-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 flex gap-2 flex-wrap justify-center">
          <span className="text-white px-3 py-2">{t.filterBy}</span>
          {['all', 'speakers', 'powerbanks', 'headphones'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filterCategory === cat 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
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
              className="group relative bg-gradient-to-br from-gray-900/60 via-purple-900/20 to-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-4" style={{ height: '240px' }}>
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                
                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-purple-500/80 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.category.toUpperCase()}
                </div>
              </div>

              {/* Price Badge */}
              <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-lg">
                ${product.price.toFixed(2)}
              </div>

              {/* Product Info */}
              <div className="p-4 bg-black/60">
                <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">{product.name}</h3>
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-2 rounded-lg transition-all duration-300"
                >
                  {t.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/95"
            onClick={() => setSelectedProduct(null)}
          />
          
          <div 
            className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 0 50px rgba(102, 126, 234, 0.5)'
            }}
          >
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Image */}
              <div>
                <div className="bg-white/90 rounded-xl p-6 mb-4">
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-contain"
                  />
                </div>
                
                <div className="bg-green-400/90 text-green-900 text-center py-3 rounded-lg font-bold">
                  <Check className="inline w-5 h-5 mr-2" />
                  {t.inStock}
                </div>
              </div>

              {/* Details */}
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
                
                <div className="text-4xl font-bold mb-4">
                  ${selectedProduct.price.toFixed(2)}
                </div>

                <p className="text-white/90 mb-6">{selectedProduct.description}</p>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4 border-b-2 border-white/30 pb-2">
                    {t.specifications}
                  </h3>
                  <div className="space-y-3">
                    {selectedProduct.specs && Object.entries(selectedProduct.specs).map(([key, value]) => (
                      <div key={key} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full mt-1.5"></div>
                        <span className="text-white/90">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <a 
                    href="tel:+17844512261"
                    className="block w-full bg-white text-purple-700 font-bold py-3 rounded-lg text-center hover:bg-gray-100 transition-all duration-300 shadow-lg"
                  >
                    <Phone className="inline w-5 h-5 mr-2" />
                    {t.callToOrder}: 1-784-451-2261
                  </a>
                  
                  <a 
                    href={`https://wa.me/17844310777?text=Hi, I'm interested in ${selectedProduct.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 text-white font-bold py-3 rounded-lg text-center hover:bg-green-400 transition-all duration-300 shadow-lg"
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
      <Celly />
    </div>
  );
}