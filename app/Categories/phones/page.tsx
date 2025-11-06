'use client';

import dynamic from 'next/dynamic';
const CellyAssistant = dynamic(() => import('../../../components/CellyAssistant'), { 
  ssr: false 
});

import { useState } from 'react';
import { ArrowLeft, Globe, Phone, MessageCircle, X, Check } from 'lucide-react';
import Link from 'next/link';

export default function PhonesCategory() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [language, setLanguage] = useState('en');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedImages, setSelectedImages] = useState<{[key: string]: number}>({});

  // Enhanced product data with categories
  const products = [
  {
  id: 'samsung-galaxy-a05',
  name: 'Samsung Galaxy A05',
  image: '/images/Products/phones/samsung1-galaxy-a05.png',
  price: 450.00,
  category: 'samsung',
  availability: 'In Stock',
  isBestSeller: true,
  description: 'Entry-level smartphone with 6.7" HD+ display, dual camera system, and long-lasting 5000mAh battery. Perfect for everyday use with reliable performance.',
  specs: {
    display: '6.7" HD+ PLS LCD',
    processor: 'MediaTek Helio G85',
    camera: '50MP main + 2MP depth',
    battery: '5000mAh',
    storage: '64GB/128GB options',
    ram: '4GB/6GB RAM'
}
  },
  {
  id: 'samsung-galaxy-f05',
  name: 'Samsung Galaxy F05',
  image: '/images/Products/phones/samsung2-galaxy-f05.png',
  price: 420.00,
  category: 'samsung',
  availability: 'In Stock',
  isBestSeller: true,
  description: 'Budget-friendly smartphone featuring 6.74" display, dual cameras, and massive 5000mAh battery. Great value with essential features for daily communication.',
  specs: {
    display: '6.74" HD+ LCD',
    processor: 'MediaTek Helio P35',
    camera: '50MP main + depth sensor',
    battery: '5000mAh with 25W charging',
    storage: '64GB expandable',
    ram: '4GB RAM'
  }
    },
    { 
      id: 'samsung-a06', 
      name: 'Samsung Galaxy A06', 
      image: '/images/Products/phones/cropped/samsung-a06.png',
      price: 460.00,
      priceDropped: true,
      category: 'budget',
      availability: 'In Stock',
      color: 'Silver and Black',
      specs: {
        ram: '4GB RAM',
        storage: '64GB ROM',
        camera: 'Dual Camera',
        mainCamera: '50MP Main Camera',
        selfieCamera: '8MP Front Camera',
        charging: '25W Fast Charging',
        sim: 'Dual SIM'
      }
    },  
    { 
      id: 'blu-a140', 
      name: 'BLU A140', 
      image: '/images/Products/phones/cropped/blu-a140.png',
      price: 120.00,
      category: 'basic',
      inStock: 'true',
      specs: {
        sim: 'Dual SIM',
        storage: 'MicroSD Support up to 64GB',
        features: 'Torch'
      }
    },
    { 
      id: 'logic-z1l', 
      name: 'Logic Z1L Flip Phone', 
      image: '/images/Products/phones/cropped/logic-z1l.png',
      price: 199.00,
      category: 'basic',
      availability: 'In Stock',
      color: 'White Only',
      specs: {
        type: 'Flip Phone',
        sim: 'Dual SIM',
        storage: 'MicroSD Card Support'
      }
    },
    { 
      id: 'nokia-110', 
      name: 'Nokia 110 4G', 
      image: '/images/Products/phones/cropped/nokia-110.png',
      price: 199.00,
      category: 'basic',
      availability: 'In Stock',
      color: 'Black',
      specs: {
        network: '4G',
        charging: 'Micro USB Charging',
        storage: 'MicroSD Support up to 32GB',
        features: 'Torch',
        sim: 'Dual SIM'
      }
    },
  {
  id: 'samsung-galaxy-a17',
  name: "Samsung Galaxy A17",
  price: 900,
  category: 'midrange',
  image: "/images/Products/phones/samsung-galaxy-a17.png",
  inStock: 'true',
  colors: 'Blue',
  specs: {
     display: '6.7\ HD+ Display', 
     camera: '50MP Camera', 
     battery: '5000mAh Battery', 
     storage: '128GB Storage', 
     performance: 'Fast Performance | All-Day Battery Life' 
 }
  },
  {
  id: 'samsung-galaxy-a36',
  name: "Samsung Galaxy A36",
  category: 'midrange',
  price: 1500,
  image: "/images/Products/phones/samsung-a36.png",
  inStock: 'true',
  colors: 'Black',
  specs: {
    display: '6.6\ Super AMOLED Display', 
    camera: '50MP Triple Camera', 
    battery: '5000mAh Fast Charging', 
    performance: 'Premium Performance', 
    other: 'IP67 Water Resistant | Gorilla Glass Victus+'  
}
},
 {
  id: 'samsung-galaxy-a56',
  name: "Samsung Galaxy A56",
  category: 'midrange',
  price: 1800,
  image: "/images/Products/phones/samsung-a56.png",
  inStock: true,
  colors: 'Light Grey',
  specs: {
    display: '6.7\ Super AMOLED 120Hz',
    camera: '50MP OIS Camera',
    battery: '5000mAh Super Fast Charging', 
    other: 'IP67 Water Resistant | Premium Glass & Metal Design | Flagship Features'  
}
},
 {
  id: 'iphone-12',
  name: "iPhone 12",
  category: 'midrange',
  price: 1100,
  image: "/images/Products/phones/iphone-12.png",
  inStock: true,
  colors: 'Black',
  specs: {
    display: '6.1\ Super Retina XDR Display',
    chipset: 'A14 Bionic Chip | 5G Enabled', 
    camera: 'Dual 12MP Camera System', 
    other: 'MagSafe Compatible | Premium Build Quality'  
}
},
  {
  id: 'iphone-13-pro-max',
  name: "iPhone 13 Pro Max",
  category: 'flagship',
  price: 2300,
  image: "/images/Products/phones/iphone-13-pro-max.png",
  inStock: true,
  colors: 'Green',
  specs: {
    display: '6.7\ ProMotion 120Hz Display',
    chipset: 'A15 Bionic',
    camera: 'Pro Camera System',
    storage: 'TB Storage',
    other: 'Cinematic Mode | All-Day Battery | 5G Ultra Fast'  
}
},
  {
  id: 'iphone-14',
  name: "iPhone 14",
  category: 'flagship',
  price: 2100,
  image: "/images/Products/phones/iphone-14.png",
  inStock: true,
  colors: 'Black',
  specs: {
    display: '6.1\" Super Retina XDR',
    chipset: 'A15 Bionic Chip',
    camera: 'Advanced Dual Camera', 
    other: 'Photonic Engine | Action Mode Video | 5G | Premium Design'  
}
},
    { 
      id: 'zteblade-a72s', 
      name: 'ZTE Blade A72s', 
      image: '/images/Products/phones/cropped/zteblade-a72s.png',
      price: 499.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'Sky Blue - 1 left',
      specs: {
        ram: '4GB RAM',
        storage: '64GB ROM',
        camera: 'Triple Camera',
        mainCamera: '50MP Main Camera',
        selfieCamera: '5MP Front Camera',
        charging: '22.5W Fast Charging'
      }
    },
    { 
      id: 'samsung-a25', 
      name: 'Samsung Galaxy A25', 
      image: '/images/Products/phones/cropped/samsung-a25.png',
      additionalImages: [
    '/images/Products/phones/cropped/samsung-a25-angle2.png',
    '/images/Products/phones/cropped/samsung-a25-angle3.png'
  ],
      price: 1199.00,
      category: 'midrange',
      availability: 'In Stock',
      color: 'Blue Black',
      specs: {
        ram: '6GB RAM',
        storage: '128GB ROM',
        camera: 'Triple Camera',
        mainCamera: '50MP Main Camera',
        selfieCamera: '13MP Selfie Camera',
        charging: '25W Fast Charging',
        sim: 'Dual SIM'
      }
    },
    { 
      id: 'samsung-a16', 
      name: 'Samsung Galaxy A16', 
      image: '/images/Products/phones/cropped/samsung-a16.png',
      price: 649.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'Black and Mint Green',
      specs: {
        ram: '4GB RAM',
        storage: '128GB ROM',
        camera: 'Triple Camera',
        mainCamera: '50MP Main Camera',
        selfieCamera: '13MP Selfie Camera',
        charging: '25W Fast Charging',
        sim: 'Dual SIM'
      }
    },
    { 
      id: 'samsung-a05s', 
      name: 'Samsung Galaxy A05s', 
      image: '/images/Products/phones/cropped/samsung-a05s.png',
      price: 549.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'Black',
      specs: {
        ram: '4GB RAM',
        storage: '128GB ROM',
        camera: 'Triple Camera',
        charging: '25W Fast Charging',
        sim: 'Dual SIM'
      }
    },
    { 
      id: 'samsung-a26', 
      name: 'Samsung Galaxy A26 5G', 
      image: '/images/Products/phones/cropped/samsung-a26.png',
      price: 1250.00,
      category: 'midrange',
      availability: 'In Stock',
      color: 'Black',
      specs: {
        ram: '6GB RAM',
        storage: '128GB ROM',
        network: '5G',
        camera: 'Triple Camera',
        mainCamera: '50MP Main Camera',
        selfieCamera: '13MP Selfie Camera',
        charging: '25W Fast Charging',
        sim: 'Dual SIM'
      }
    },
    { 
      id: 'samsung-f05', 
      name: 'Samsung Galaxy F05', 
      image: '/images/Products/phones/cropped/samsung-f05.png',
      price: 420.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'Twilight Blue',
      specs: {
        ram: '4GB RAM',
        storage: '64GB ROM',
        camera: 'Dual Camera',
        mainCamera: '50MP Main Camera',
        selfieCamera: '8MP Front Camera',
        charging: '25W Fast Charging',
        sim: 'Dual SIM'
      }
    },
    { 
      id: 'ipad-9th-gen', 
      name: 'iPad 9th Generation', 
      image: '/images/Products/phones/cropped/ipad-9th-gen.png',
      price: 1500.00,
      category: 'tablet',
      availability: 'In Stock',
      color: 'Space Grey',
      specs: {
        display: '10.2 inch Display',
        ram: '3GB RAM',
        storage: '64GB ROM',
        mainCamera: '8MP Main Camera',
        selfieCamera: '12MP Front Camera',
        security: 'Fingerprint Sensor'
      }
    },
    { 
      id: 'fangor-tablet', 
      name: 'FANGOR Tablet 8"', 
      image: '/images/Products/phones/cropped/fangor-tablet.png',
      price: 250.00,
      category: 'tablet',
      availability: 'In Stock',
      color: 'Black',
      specs: {
        display: '8 inch Display',
        os: 'Android 11.0',
        battery: '5000 mAh Battery',
        ram: '2GB RAM',
        storage: '32GB ROM',
        camera: 'Dual Camera'
      }
    },
    { 
      id: 'lenovo-laptop', 
      name: 'Lenovo IdeaPad Slim 3', 
      image: '/images/Products/phones/cropped/lenovo-laptop.png',
      price: 1800.00,
      category: 'laptop',
      availability: 'Back Soon',
      color: 'Silver',
      specs: {
        display: '15.8 inch Display',
        ram: '8GB RAM',
        storage: '128GB SSD',
        type: 'Laptop Computer'
      }
    },
    { 
      id: 'samsung-a05', 
      name: 'Samsung Galaxy A05', 
      image: '/images/Products/phones/cropped/samsung-a05-4g.png',
      price: 499.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'Black',
      specs: {
        ram: '4GB RAM',
        storage: '64GB ROM',
        camera: 'Dual Camera',
        mainCamera: '50MP Main Camera',
        selfieCamera: '8MP Front Camera',
        charging: '25W Fast Charging',
        sim: 'Dual SIM'
      }
    },
    { 
      id: 'samsung-a26-mint', 
      name: 'Samsung Galaxy A26 5G', 
      image: '/images/Products/phones/cropped/samsung-a26-1.png',
      price: 1200.00,
      category: 'midrange',
      availability: 'In Stock',
      color: 'Mint',
      specs: {
        ram: '6GB RAM',
        storage: '128GB ROM',
        network: '5G',
        mainCamera: '50MP Main Camera',
        selfieCamera: '13MP Selfie Camera',
        charging: '25W Fast Charging'
      }
    },
    { 
      id: 'samsung-a26-white', 
      name: 'Samsung Galaxy A26 5G', 
      image: '/images/Products/phones/cropped/samsung-a26-2.png',
      price: 1200.00,
      category: 'midrange',
      availability: 'In Stock',
      color: 'White',
      specs: {
        ram: '6GB RAM',
        storage: '128GB ROM',
        network: '5G',
        mainCamera: '50MP Main Camera',
        selfieCamera: '13MP Selfie Camera',
        charging: '25W Fast Charging'
      }
    },
    { 
      id: 'samsung-a15', 
      name: 'Samsung Galaxy A15', 
      image: '/images/Products/phones/cropped/samsung-a15.png',
      price: 649.00,
      category: 'budget',
      availability: 'Back Soon',
      color: 'Blue Black',
      specs: {
        ram: '6GB RAM',
        storage: '128GB ROM',
        mainCamera: '50MP Main Camera',
        selfieCamera: '13MP Selfie Camera',
        sim: 'Dual SIM',
        charging: '25W Fast Charging'
      }
    },
    { 
      id: 'itel-a90', 
      name: 'Itel A90', 
      image: '/images/Products/phones/cropped/itel-a90.png',
      price: 475.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'Starlit Black',
      specs: {
        ram: '12GB RAM',
        storage: '256GB ROM',
        sim: 'Dual SIM',
        mainCamera: '13MP Main Camera',
        selfieCamera: '5MP Selfie Camera',
        charging: '15W Fast Charging',
        protection: 'IP54 Dust and Water Resistance'
      }
    }
  ];

  const translations = {
    en: {
      title: "Mobile Phones",
      subtitle: "Latest Smartphones & Tablets",
      backToHome: "Back to Home",
      viewDetails: "View",
      specifications: "Specifications",
      availability: "Availability",
      callToOrder: "Call to Order",
      whatsappOrder: "WhatsApp Order",
      closeModal: "Close",
      inStock: "In Stock",
      available: "Available in",
      filterBy: "Filter by:",
      all: "All Phones",
      flagship: "Flagship",
      midrange: "Mid-Range",
      budget: "Budget",
      tablet: "Tablets",
      basic: "Basic Phones"
    },
    fr: {
      title: "Téléphones Mobiles",
      subtitle: "Derniers Smartphones et Tablettes",
      backToHome: "Retour à l'Accueil",
      viewDetails: "Voir",
      specifications: "Spécifications",
      availability: "Disponibilité",
      callToOrder: "Appeler pour Commander",
      whatsappOrder: "Commander via WhatsApp",
      closeModal: "Fermer",
      inStock: "En Stock",
      available: "Disponible en",
      filterBy: "Filtrer par:",
      all: "Tous les Téléphones",
      flagship: "Haut de Gamme",
      midrange: "Milieu de Gamme",
      budget: "Budget",
      tablet: "Tablettes",
      basic: "Téléphones Basiques"
    },
    es: {
      title: "Teléfonos Móviles",
      subtitle: "Últimos Smartphones y Tablets",
      backToHome: "Volver al Inicio",
      viewDetails: "Ver",
      specifications: "Especificaciones",
      availability: "Disponibilidad",
      callToOrder: "Llamar para Ordenar",
      whatsappOrder: "Ordenar por WhatsApp",
      closeModal: "Cerrar",
      inStock: "En Stock",
      available: "Disponible en",
      filterBy: "Filtrar por:",
      all: "Todos los Teléfonos",
      flagship: "Gama Alta",
      midrange: "Gama Media",
      budget: "Económicos",
      tablet: "Tabletas",
      basic: "Teléfonos Básicos"
    }
  };

  const t = translations[language as keyof typeof translations];

  // Filter products based on selected category
  const filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  // Simple function to handle product selection
  const handleProductClick = (product: any) => {
    console.log('Product clicked:', product.name);
    setSelectedProduct(product);
  };

  // Function to close modal
  const handleCloseModal = () => {
    console.log('Closing modal');
    setSelectedProduct(null);
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background with gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20" />
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

      {/* Category Filter */}
      <div className="relative z-10 flex justify-center mb-8 px-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 flex gap-2 flex-wrap justify-center">
          <span className="text-white px-3 py-2">{t.filterBy}</span>
          {['all', 'flagship', 'midrange', 'budget', 'tablet', 'basic'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filterCategory === cat 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {t[cat as keyof typeof t]}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="relative z-10 container mx-auto px-3 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
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
              {/* Best Seller Badge */}
              {product.isBestSeller && product.availability !== 'Back Soon' && (
                <div className="absolute top-2 left-2 z-30 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  🔥 BEST SELLER
                </div>
              )}
              
              {/* Product Image with HOVER ZOOM */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-3 overflow-hidden" style={{ height: '260px' }}>
                {/* Back Soon Overlay */}
                {product.availability === 'Back Soon' && (
                  <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center pointer-events-none">
                    <span className="text-black font-bold text-xl rotate-[-15deg] bg-yellow-400 px-4 py-2 rounded shadow-lg pointer-events-none">
                      BACK SOON
                    </span>
                  </div>
                )}
                <img 
                  src={
                    product.additionalImages && selectedImages[product.id as string] !== undefined
                      ? product.additionalImages[selectedImages[product.id as string]]
                      : product.image
                  }
                  alt={product.name}
                  className="w-full h-full object-contain p-2 transition-transform duration-700 hover:scale-125 cursor-zoom-in"
                />
                
                {/* Image selector dots if there are additional images - TYPESCRIPT FIX */}
                {product.additionalImages && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const newSelectedImages = {...selectedImages};
                        delete newSelectedImages[product.id as string];
                        setSelectedImages(newSelectedImages);
                      }}
                      className={`w-2 h-2 rounded-full ${
                        selectedImages[product.id as string] === undefined ? 'bg-yellow-400' : 'bg-gray-400'
                      }`}
                    />
                    {product.additionalImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImages({...selectedImages, [product.id as string]: index});
                        }}
                        className={`w-2 h-2 rounded-full ${
                          selectedImages[product.id as string] === index ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Price Badge - Always show */}
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

            {product.priceDropped && (
  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
    <span 
      className="text-white font-bold text-xl rotate-[-15deg] bg-red-500 px-4 py-2 rounded shadow-lg"
      style={{
        animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        animationDuration: '0.5s'
      }}
    >
      PRICE DROP!
    </span>
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

      {/* Modal */}
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

            {/* Check if this is an enhanced product */}
            {selectedProduct.price ? (
              // Enhanced layout
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
                  
                  {/* Status Badge - Conditional */}
                  {selectedProduct.availability === 'Back Soon' ? (
                    <div className="bg-red-500/90 text-white text-center py-3 rounded-lg font-bold">
                      <X className="inline w-5 h-5 mr-2" />
                      SOLD OUT
                    </div>
                  ) : (
                    <div className="bg-green-50 border-2 border-green-500 text-green-700 text-center py-3 rounded-lg font-bold">
                      <Check className="inline w-5 h-5 mr-2" />
                      {t.inStock}
                    </div>
                  )}
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

                  {/* Back Soon Message */}
                  {selectedProduct.availability === 'Back Soon' && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                      <p className="text-yellow-700 font-semibold">
                        📦 This item is coming back soon! Check back later or contact us for updates.
                      </p>
                    </div>
                  )}

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
            ) : (
              // Simple layout for original images
              <>
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h2>
                </div>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 mb-6">
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '60vh' }}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <a 
                    href="tel:+17844512261"
                    className="block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-lg text-center hover:from-blue-400 hover:to-blue-500 transition-all duration-300 shadow-lg"
                  >
                    <Phone className="inline w-5 h-5 mr-2" />
                    {t.callToOrder}
                  </a>
                  <a 
                    href={`https://wa.me/17844310777?text=Hi, I'm interested in ${selectedProduct.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-lg text-center hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg"
                  >
                    <MessageCircle className="inline w-5 h-5 mr-2" />
                    {t.whatsappOrder}
                  </a>
                </div>
              </>
            )}
          </div>
        </>
      )}
      
      {/* Celly Assistant */}
      <CellyAssistant />
    </div>
  );
}