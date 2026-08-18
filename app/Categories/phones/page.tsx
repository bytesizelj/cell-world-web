'use client';

import dynamic from 'next/dynamic';
const CellyAssistant = dynamic(() => import('../../../components/CellyAssistant'), { 
  ssr: false 
});

import { useState, useRef } from 'react';
import { ArrowLeft, Globe, Phone, MessageCircle, X, Check, ZoomIn, ZoomOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PhonesCategory() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [language, setLanguage] = useState('en');
  const [imageZoom, setImageZoom] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const [filterCategory, setFilterCategory] = useState('all');
const [selectedImages, setSelectedImages] = useState<{[key: string]: number}>({});

  // Zoom handler functions
  const handleZoomIn = () => {
    setImageZoom(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setImageZoom(prev => Math.max(prev - 0.5, 1));
    if (imageZoom <= 1.5) {
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (imageZoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && imageZoom > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setImageZoom(1);
    setImagePosition({ x: 0, y: 0 });
  };

  // Enhanced product data with categories
  const products = [
    { 
      id: 'itel-a100c', 
      name: 'itel A100C', 
      image: '/images/Products/phones/new/itel-a100c-64gb.jpg',
      price: 440.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'Green',
      specs: {
        display: '6.6" 90Hz Super Clear Display',
        ram: '8GB RAM (3GB + 5GB Extended)',
        storage: '64GB ROM',
        audio: 'DTS Audio',
        durability: 'MIL-STD 810H Certified'
      }
    },
    { 
      id: 'samsung-a07', 
      name: 'Samsung A07', 
      image: '/images/Products/phones/samsung-a07.png',
      price: 499.00,
      category: 'budget',
      availability: 'In Stock',
      specs: {
        display: '6.7" HD+ 90Hz Display',
        mainCamera: '50MP Main Camera',
        selfieCamera: '8MP Front Camera',
        battery: '5000mAh Battery',
        charging: '25W Fast Charging',
        storage: '64GB ROM'
      }
    },
    { 
      id: 'samsung-a42', 
      name: 'Samsung A42 5G', 
      image: '/images/Products/phones/new/samsung-galaxy-a42-5g.jpg',
      price: 550.00,
      priceDropped: true,
      category: 'midrange',
      availability: 'In Stock',
      color: 'Black',
      specs: {
        display: '6.6" HD+ Super AMOLED',
        network: '5G',
        mainCamera: '48MP Quad Camera',
        selfieCamera: '20MP Front Camera',
        battery: '5000mAh Battery',
        charging: '15W Fast Charging',
        storage: '128GB ROM'
      }
    },
  {
  id: 'samsung-galaxy-a05',
  name: 'Samsung A05',
  image: '/images/Products/phones/samsung1-galaxy-a05.png',
  price: 450.00,
  priceDropped: true,
  category: 'samsung',
  availability: 'Back Soon',
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
  id: 'samsung-galaxy-a11',
  name: 'Samsung A11',
  image: '/images/Products/phones/samsung-galaxy-a11.png',
  price: 420.00,
  category: 'samsung',
  availability: 'Back Soon',
  isBestSeller: true,
  description: 'Budget-friendly smartphone featuring 6.74" display, triple cameras, and massive 5000mAh battery. Great value with essential features for daily communication.',
  specs: {
    display: '6.74" HD+ LCD',
    camera: 'main, rear and front',
    battery: '5000mAh with 25W charging',
    storage: '64GB expandable',
    ram: '8GB RAM'
  }
    },
    { 
      id: 'blu-a140', 
      name: 'BLU A140', 
      image: '/images/Products/phones/cropped/blu-a140.png',
      price: 120.00,
      category: 'basic',
      availability: 'Back Soon',
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
      availability: 'Back Soon',
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
      availability: 'Back Soon',
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
  id: 'iphone-12',
  name: "iPhone 12",
  category: 'midrange',
  price: 1100,
  image: "/images/Products/phones/iphone-12.png",
  availability: 'Back Soon',
  isDeal: true,
  color: 'Black',
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
  price: 2250,
  image: "/images/Products/phones/new/iphone-13-pro-max-128gb.jpg",
  availability: 'In Stock',
  isDeal: true,
  color: 'Green',
  specs: {
    storage: '128GB'
}
},
  {
  id: 'iphone-14',
  name: "iPhone 14",
  category: 'flagship',
  price: 2100,
  image: "/images/Products/phones/iphone-14.png",
  availability: 'Back Soon',
  isDeal: true,
  color: 'Black',
  specs: {
    display: '6.1\" Super Retina XDR',
    chipset: 'A15 Bionic Chip',
    camera: 'Advanced Dual Camera', 
    other: 'Photonic Engine | Action Mode Video | 5G | Premium Design'  
}
},
  {
  id: 'samsung-galaxy-a17',
  name: "Samsung A17",
  price: 749,
  priceDropped: true,
  category: 'midrange',
  image: "/images/Products/phones/samsung-galaxy-a17.png",
  inStock: 'true',
  color: 'Blue',
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
  name: "Samsung A36",
  category: 'midrange',
  price: 1500,
  image: "/images/Products/phones/samsung-a36.png",
  availability: 'Back Soon',
  color: 'Black',
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
  name: "Samsung A56",
  category: 'midrange',
  price: 1800,
  image: "/images/Products/phones/samsung-a56.png",
  availability: 'Back Soon',
  color: 'Light Grey',
  specs: {
    display: '6.7\ Super AMOLED 120Hz',
    camera: '50MP OIS Camera',
    battery: '5000mAh Super Fast Charging', 
    other: 'IP67 Water Resistant | Premium Glass & Metal Design | Flagship Features'  
}
},
  { 
      id: 'zteblade-a72s', 
      name: 'ZTE Blade A72s', 
      image: '/images/Products/phones/cropped/zteblade-a72s.png',
      price: 499.00,
      category: 'budget',
      availability: 'Back Soon',
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
      name: 'Samsung A25', 
      image: '/images/Products/phones/cropped/samsung-a25.png',
      additionalImages: [
    '/images/Products/phones/cropped/samsung-a25-angle2.png',
    '/images/Products/phones/cropped/samsung-a25-angle3.png'
  ],
      price: 1199.00,
      category: 'midrange',
      availability: 'Back Soon',
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
      name: 'Samsung A16', 
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
      name: 'Samsung A05s', 
      image: '/images/Products/phones/cropped/samsung-a05s.png',
      price: 549.00,
      category: 'budget',
      availability: 'Back Soon',
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
      name: 'Samsung A26 5G', 
      image: '/images/Products/phones/cropped/samsung-a26.png',
      price: 1250.00,
      category: 'midrange',
      availability: 'Back Soon',
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
      name: 'Samsung F05', 
      image: '/images/Products/phones/cropped/samsung-f05.png',
      price: 420.00,
      category: 'budget',
      availability: 'Back Soon',
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
      availability: 'Back Soon',
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
      name: 'Samsung A05', 
      image: '/images/Products/phones/cropped/samsung-a05-4g.png',
      price: 499.00,
      category: 'budget',
      availability: 'Back Soon',
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
      name: 'Samsung A26 5G', 
      image: '/images/Products/phones/cropped/samsung-a26-1.png',
      price: 1200.00,
      category: 'midrange',
      availability: 'Back Soon',
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
      name: 'Samsung A26 5G', 
      image: '/images/Products/phones/cropped/samsung-a26-2.png',
      price: 1200.00,
      category: 'midrange',
      availability: 'Back Soon',
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
      name: 'Samsung A15', 
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
      availability: 'Back Soon',
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
    },
    {
      id: 'iphone-15-pro-max',
      name: 'iPhone 15 Pro Max',
      image: '/images/Products/phones/new/iphone-15-pro-max-256gb.jpg',
      price: 2800.00,
      category: 'flagship',
      availability: 'In Stock',
      specs: {
        storage: '256GB'
      }
    },
    {
      id: 'iphone-15-pro',
      name: 'iPhone 15 Pro',
      image: '/images/Products/phones/new/iphone-15-pro-128gb.jpg',
      price: 2500.00,
      category: 'flagship',
      availability: 'In Stock',
      specs: {
        storage: '128GB'
      }
    },
    {
      id: 'iphone-13',
      name: 'iPhone 13',
      image: '/images/Products/phones/new/iphone-13-256gb.jpg',
      price: 1900.00,
      category: 'flagship',
      availability: 'In Stock',
      specs: {
        storage: '256GB'
      }
    },
    {
      id: 'samsung-m07',
      name: 'Samsung Galaxy M07',
      image: '/images/Products/phones/new/samsung-galaxy-m07-64gb.jpg',
      price: 540.00,
      category: 'budget',
      availability: 'In Stock',
      specs: {
        storage: '64GB'
      }
    },
    {
      id: 'samsung-f07-new',
      name: 'Samsung Galaxy F07',
      image: '/images/Products/phones/new/samsung-galaxy-f07-64gb.jpg',
      price: 540.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'Green only',
      specs: {
        storage: '64GB'
      }
    },
    {
      id: 'alcatel-1041',
      name: 'Alcatel 1041',
      image: '/images/Products/phones/new/alcatel-1041.jpg',
      price: 160.00,
      category: 'basic',
      availability: 'In Stock'
    },
    {
      id: 'techview-s15-pro',
      name: 'TechView S15 Pro',
      image: '/images/Products/phones/new/techview-s15-pro-64gb.jpg',
      price: 430.00,
      category: 'budget',
      availability: 'In Stock',
      specs: {
        storage: '64GB'
      }
    },
    {
      id: 'techview-s16-pro',
      name: 'TechView S16 Pro',
      image: '/images/Products/phones/new/techview-s16-pro-128gb.jpg',
      price: 499.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'White, Navy Blue, Green',
      specs: {
        storage: '128GB'
      }
    },
    {
      id: 'techview-s17-pro-white',
      name: 'TechView S17 Pro',
      image: '/images/Products/phones/new/techview-s17-pro-white.jpg',
      price: 499.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'White',
      specs: {
        storage: '128GB'
      }
    },
    {
      id: 'techview-s17-pro-orange',
      name: 'TechView S17 Pro',
      image: '/images/Products/phones/new/techview-s17-pro-orange.jpg',
      price: 499.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'Orange',
      specs: {
        storage: '128GB'
      }
    },
    {
      id: 'samsung-a06-black',
      name: 'Samsung Galaxy A06',
      image: '/images/Products/phones/new/samsung-galaxy-a06-64gb.jpg',
      price: 530.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'Black',
      specs: {
        storage: '64GB'
      }
    },
    {
      id: 'samsung-a06-light-blue',
      name: 'Samsung Galaxy A06',
      image: '/images/Products/phones/new/samsung-galaxy-a06-light-blue.jpg',
      price: 530.00,
      category: 'budget',
      availability: 'In Stock',
      color: 'Light Blue',
      specs: {
        storage: '64GB'
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
  const visibleProducts = products.filter(p => p.availability !== 'Back Soon');
  const filteredProducts = filterCategory === 'all'
    ? visibleProducts
    : visibleProducts.filter(p => p.category === filterCategory);

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
  <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 overflow-hidden">
    {/* Animated Particles Background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed"></div>
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
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
              style={{ zIndex: 1 }}
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
              {/* Deal Badge */}
{product.isDeal && product.availability !== 'Back Soon' && (
  <div className="absolute top-2 left-2 z-30 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
    💥 HOT DEAL
  </div>
)}
              
              {/* Product Image with HOVER ZOOM */}
              <div className="relative bg-white p-2 overflow-hidden aspect-square" style={{ position: 'relative' }}>
                {/* Back Soon Overlay */}
                {product.availability === 'Back Soon' && (
                  <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center pointer-events-none">
                    <span className="text-black font-bold text-xl rotate-[-15deg] bg-yellow-400 px-4 py-2 rounded shadow-lg pointer-events-none">
                      BACK SOON
                    </span>
                  </div>
                )}
                <Image 
  src={
    product.additionalImages && selectedImages[product.id as string] !== undefined
      ? product.additionalImages[selectedImages[product.id as string]]
      : product.image
  }
  alt={product.name}
  fill
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
  className="object-contain p-2 transition-transform duration-700 hover:scale-125 cursor-zoom-in"
  loading="lazy"
/>
                
{/* Image selector dots - IMPROVED VISIBILITY */}
{product.additionalImages && (
  <div className="absolute bottom-2 left-0 right-0 flex justify-center z-20">
    <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 px-3 py-2 rounded-full flex gap-2 shadow-lg">
      <button
        onClick={(e) => {
          e.stopPropagation();
          const newSelectedImages = {...selectedImages};
          delete newSelectedImages[product.id as string];
          setSelectedImages(newSelectedImages);
        }}
        className={`w-4 h-4 rounded-full transition-all duration-200 border-2 ${
          selectedImages[product.id as string] === undefined 
            ? 'bg-white border-white scale-110 shadow-md' 
            : 'bg-black/30 border-black/50 hover:bg-black/50'
        }`}
      />
      {product.additionalImages.map((_, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedImages({...selectedImages, [product.id as string]: index});
          }}
          className={`w-4 h-4 rounded-full transition-all duration-200 border-2 ${
            selectedImages[product.id as string] === index 
              ? 'bg-white border-white scale-110 shadow-md' 
              : 'bg-black/30 border-black/50 hover:bg-black/50'
          }`}
        />
      ))}
    </div>
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
              <div className="p-3 bg-white border-t border-gray-100">
                <h3 className="text-base font-bold text-gray-900 truncate mb-2 text-center" 
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
  <div 
    ref={imageRef}
    className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 mb-4 relative overflow-hidden cursor-move"
    style={{ height: '280px', position: 'relative' }}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}
  >
    <Image 
  src={selectedProduct.image}
  alt={selectedProduct.name}
  fill
  sizes="(max-width: 768px) 80vw, 400px"
  className="object-contain transition-transform duration-200"
  style={{
    transform: `scale(${imageZoom}) translate(${imagePosition.x / imageZoom}px, ${imagePosition.y / imageZoom}px)`,
    cursor: imageZoom > 1 ? 'move' : 'zoom-in'
  }}
  onClick={() => imageZoom === 1 && handleZoomIn()}
  priority
/>
    
    {/* Zoom controls */}
    <div className="absolute top-2 right-2 flex gap-2">
      <button
        onClick={handleZoomIn}
        className="bg-white/90 p-2 rounded-lg shadow-lg hover:bg-white transition-colors"
        disabled={imageZoom >= 3}
      >
        <ZoomIn className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={handleZoomOut}
        className="bg-white/90 p-2 rounded-lg shadow-lg hover:bg-white transition-colors"
        disabled={imageZoom <= 1}
      >
        <ZoomOut className="w-5 h-5 text-gray-700" />
      </button>
      {imageZoom > 1 && (
        <button
          onClick={resetZoom}
          className="bg-white/90 px-3 py-2 rounded-lg shadow-lg hover:bg-white transition-colors text-xs font-semibold"
        >
          Reset
        </button>
      )}
    </div>
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
                    
                    <Link
                      href={`/order?product=${encodeURIComponent(selectedProduct.name)}&category=Phones`}
                      className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-lg text-center hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg"
                    >
                      <MessageCircle className="inline w-5 h-5 mr-2" />
                      {t.whatsappOrder}
                    </Link>
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
                  <Link
                    href={`/order?product=${encodeURIComponent(selectedProduct.name)}&category=Phones`}
                    className="block bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-lg text-center hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg"
                  >
                    <MessageCircle className="inline w-5 h-5 mr-2" />
                    {t.whatsappOrder}
                  </Link>
                </div>
              </>
            )}
          </div>
        </>
      )}
      
      {/* Celly Assistant */}
      <CellyAssistant />
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-40px) translateX(-20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}