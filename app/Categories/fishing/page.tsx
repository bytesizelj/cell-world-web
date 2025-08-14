'use client';

import { useState } from 'react';
import { ArrowLeft, Globe, Phone, MessageCircle, X, Check, Waves, Fish } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const Celly = dynamic(() => import('@/components/CellyAssistant'), { ssr: false });

export default function FishingCategory() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [language, setLanguage] = useState('en');
  const [filterCategory, setFilterCategory] = useState('all');

  // Complete fishing products array
  const products = [
    // EXISTING PRODUCTS - Using placeholder image until you add actual images
    {
      id: 1,
      name: "Professional Fishing Rod",
      price: 150.00,
      image: "/images/Products/fishing/rod-guides.png", // Temporary placeholder
      description: "7ft carbon fiber rod perfect for experienced anglers",
      category: "rods",
      specs: {
        length: "7 feet",
        material: "Carbon Fiber",
        action: "Fast Action",
        power: "Medium-Heavy"
      }
    },
    {
      id: 2,
      name: "Beginner Fishing Rod",
      price: 89.00,
      image: "/images/Products/fishing/rod-guides.png", // Temporary placeholder
      description: "Perfect starter rod for new anglers",
      category: "rods",
      specs: {
        length: "6 feet",
        material: "Fiberglass Composite",
        action: "Moderate Action",
        power: "Medium"
      }
    },
    {
      id: 3,
      name: "Fishing Reel Spinner",
      price: 120.00,
      image: "/images/Products/fishing/mustad-lures.png", // Temporary placeholder
      description: "High-quality spinning reel with smooth drag system",
      category: "reels",
      specs: {
        bearings: "7+1 Ball Bearings",
        ratio: "5.2:1 Gear Ratio",
        capacity: "270 yards",
        drag: "20 lbs Max Drag"
      }
    },
    {
      id: 4,
      name: "Tackle Box Pro",
      price: 45.00,
      image: "/images/Products/fishing/jig-assist-hooks.png", // Temporary placeholder
      description: "Complete tackle storage solution",
      category: "accessories",
      specs: {
        compartments: "24 Adjustable Compartments",
        material: "Heavy-Duty Plastic",
        size: "14\" x 8\" x 7\"",
        features: "Waterproof Design"
      }
    },
    
    // NEW PRODUCTS with correct file names
    {
      id: 5,
      name: "Jig Assist Hooks - 5X Strong",
      price: 25.00,
      image: "/images/Products/fishing/jig-assist-hooks.png",
      description: "Heavy-duty 5X strong assist hooks with durable braided cord. Perfect for jigging and big game fishing.",
      category: "accessories",
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
      price: 35.00,
      image: "/images/Products/fishing/mustad-big-gun-hooks.png",
      description: "Premium Mustad hooks with UltraPoint technology. Stay sharp 3x longer.",
      category: "accessories",
      specs: {
        size: "8/0",
        technology: "UltraPoint MicroSharp 4.3",
        quantity: "Pack of 3",
        type: "Circle Hooks"
      }
    },
    {
      id: 7,
      name: "Ceramic Fishing Rod Guides Set",
      price: 45.00,
      image: "/images/Products/fishing/rod-guides.png",
      description: "High-quality ceramic rod guides in assorted colors and sizes.",
      category: "accessories",
      specs: {
        material: "Ceramic Insert",
        frame: "Stainless Steel",
        sizes: "Assorted (5mm-20mm)",
        quantity: "Set of 10"
      }
    },
    {
      id: 8,
      name: "Mustad Saltwater Lure Collection",
      price: 55.00,
      image: "/images/Products/fishing/mustad-lures.png",
      description: "Premium Mustad fishing lures designed for saltwater fishing.",
      category: "accessories",
      specs: {
        type: "Jigs and Trolling Lures",
        weight: "1oz - 3oz Assorted",
        colors: "Vibrant Multicolor",
        quantity: "Set of 5"
      }
    }
  ];

  const translations = {
    en: {
      title: "Fishing Gear & Equipment",
      subtitle: "Professional Fishing Supplies for Every Angler",
      backToHome: "Back to Home",
      viewDetails: "View Details",
      specifications: "Specifications",
      availability: "Availability",
      callToOrder: "Call to Order",
      whatsappOrder: "WhatsApp Order",
      closeModal: "Close",
      inStock: "In Stock",
      all: "All Products",
      rods: "Fishing Rods",
      reels: "Reels",
      accessories: "Tackle & Accessories",
      filterBy: "Filter by:"
    },
    fr: {
      title: "Matériel de Pêche",
      subtitle: "Fournitures de Pêche Professionnelles",
      backToHome: "Retour à l'Accueil",
      viewDetails: "Voir Détails",
      specifications: "Spécifications",
      availability: "Disponibilité",
      callToOrder: "Appeler pour Commander",
      whatsappOrder: "Commander via WhatsApp",
      closeModal: "Fermer",
      inStock: "En Stock",
      all: "Tous les Produits",
      rods: "Cannes à Pêche",
      reels: "Moulinets",
      accessories: "Accessoires",
      filterBy: "Filtrer par:"
    },
    es: {
      title: "Equipo de Pesca",
      subtitle: "Suministros de Pesca Profesionales",
      backToHome: "Volver al Inicio",
      viewDetails: "Ver Detalles",
      specifications: "Especificaciones",
      availability: "Disponibilidad",
      callToOrder: "Llamar para Ordenar",
      whatsappOrder: "Ordenar por WhatsApp",
      closeModal: "Cerrar",
      inStock: "En Stock",
      all: "Todos los Productos",
      rods: "Cañas de Pescar",
      reels: "Carretes",
      accessories: "Accesorios",
      filterBy: "Filtrar por:"
    }
  };

  const t = translations[language as keyof typeof translations];

  // Filter products based on selected category
  const filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  return (
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

      {/* Header with fishing theme */}
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

      {/* Category Filter */}
      <div className="relative z-10 flex justify-center mb-8 px-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 flex gap-2">
          <span className="text-white px-3 py-2">{t.filterBy}</span>
          {['all', 'rods', 'reels', 'accessories'].map((cat) => (
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
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-4" style={{ height: '240px' }}>
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                
                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-teal-500/80 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.category.toUpperCase()}
                </div>
              </div>

              {/* Price Badge */}
              <div className="absolute top-2 right-2 bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-lg shadow-lg">
                ${product.price.toFixed(2)}
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
      
      {/* Celly Assistant */}
      <Celly />
    </div>
  );
}