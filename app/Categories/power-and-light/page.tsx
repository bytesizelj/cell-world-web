'use client';

import { useState, useRef } from 'react';
import { ArrowLeft, Globe, Phone, MessageCircle, X, Check, ZoomIn, ZoomOut, Package } from 'lucide-react';
import TickerStrip from '../../../components/TickerStrip';
import CategoryBanner from '../../../components/CategoryBanner';
import CategoryFilter from '../../../components/CategoryFilter';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { trackEvent } from '@/lib/analytics';
import Image from 'next/image';
const Celly = dynamic(() => import('@/components/CellyAssistant'), { ssr: false });

export default function PowerAndLightCategory() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [language, setLanguage] = useState('en');
  const [imageZoom, setImageZoom] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const [filterCategory, setFilterCategory] = useState('all');

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

  // Power & Light catalog - power banks, lights/lanterns/fans, power strips & chargers (moved from Accessories & Power)
  const products = [
{
  id: 'multi-function-violent-fan',
  name: 'Multi-Function Violent Fan',
  image: '/images/Products/accessories-power/violent-fan.png',
  price: 250.00,
  category: 'power',
  inStock: true,
  description: 'Super Strong Wind | Super High Speed | Magic Vacuum Cleaner Function | Over Temperature Protection',
  specs: {
    power: 'Super Strong Wind',
    speed: 'Super High Speed',
    features: 'Vacuum Cleaner, Temperature Protection'
  }
},
// POWER BANKS
{
      id: 8,
      name: "Mophie Juice Pack Connect 5000mAh",
      price: 125.00,
      image: "/images/Products/more/mophie-juicepack-5000.jpg",
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
      image: "/images/Products/more/pocketjuice-air-10000.jpg",
      description: "Magnetic wireless charger with built-in stand. 10000mAh capacity provides up to 6 full charges. Magnetically attaches to any phone.",
      category: "powerbanks",
      availability: 'Back Soon',
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
      image: "/images/Products/more/anker-powercore-10000.jpg",
      description: "High-speed portable charger with 10000mAh capacity. Provides 46+ hours of extra power with 12W high-speed charging.",
      category: "powerbanks",
      availability: 'Back Soon',
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
      image: "/images/Products/more/bossbar-wireless-10000.jpg",
      description: "Premium wireless power bank with digital display. Features 15W wireless fast charging, 22.5W super fast charge output.",
      category: "powerbanks",
      availability: 'Back Soon',
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
      image: "/images/Products/more/anker-pocket-10k.jpg",
      description: "Ultra-compact power bank with 22.5W max output. Perfect pocket size for Apple, Samsung, and more devices.",
      category: "powerbanks",
      availability: 'Back Soon',
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
      image: "/images/Products/more/yesido-wireless-10000.jpg",
      description: "All-in-one power bank with wireless charging pad and two built-in cables. Digital display shows battery level.",
      category: "powerbanks",
      availability: 'Back Soon',
      specs: {
        capacity: "10000mAh capacity",
        wireless: "Wireless charging pad",
        cables: "Two built-in cables",
        display: "Digital display"
      }
    },
{
  id: 'hypergear-powerpack-mini',
  name: 'HyperGear PowerPack Mini',
  image: '/images/Products/more/hyper-gear-power-pack-mini.jpg',
  price: 99.00,
  category: 'powerbanks',
  availability: "Back Soon",
  specs: {
    capacity: '5000mAh',
    output: '20W USB-C PD Fast Charge, 18W USB Fast Charge'
  }
},
{
  id: 'hypergear-clearcharge-xl',
  name: 'HyperGear ClearCharge XL Power Bank',
  image: '/images/Products/more/hyper-gear-clear-charge-power-bank.jpg',
  price: 180.00,
  category: 'powerbanks',
  availability: 'Back Soon',
  specs: {
    capacity: '20000mAh',
    battery: '48+ hours extra battery life',
    charging: 'Charges 3 devices simultaneously',
    ports: '2 USB Fast Charge, 1 USB-C 20W input/output'
  }
},
{
  id: 'pocket-juice-flashlight',
  name: 'Pocket Juice Power Bank with Flashlight',
  image: '/images/Products/more/pocket-juice-power-bank-with-flashlight.jpg', // You'll need to add this image
  price: 100.00,
  category: 'powerbanks',
  availability: 'Back Soon',
  specs: {
    capacity: '2600mAh',
    charging: 'Up to 1X charge',
    ports: '1 USB port',
    feature: 'Weather proof with flashlight'
  }
},
{
  id: 'airbro-portable-fan-2600',
  name: 'Airbro ONE Portable Fan with Powerbank',
  image: '/images/Products/more/airbro-one-portable-fan-powerbank.jpg',
  price: 140.00,
  category: 'powerbanks',
  availability: "In Stock",
  specs: {
    battery: '2600mAh lithium-ion',
    duration: '3hrs high speed, 9hrs low speed',
    features: 'Detachable powerbank, 6 blade design',
    settings: '5 speed settings, charging dock'
  }
},
{
  id: 'wireless-magnetic-power-bank-10000',
  name: 'Wireless Fast Charging Power Bank 10,000mAh',
  image: '/images/Products/accessories-power/wireless-power-bank.png',
  price: 130.00,
  category: 'powerbanks',
  availability: 'In Stock',
  specs: {
    capacity: '10,000mAh',
    charging: 'Magnetic wireless, 120W',
    cables: '2-in-1 built-in Lightning and Type-C'
  }
},
{
  id: 'samsung-galaxy-battery-pack',
  name: 'Samsung Galaxy Battery Pack',
  image: '/images/Products/accessories-power/samsung-galaxy-power-bank.png',
  price: 160.00,
  category: 'powerbanks',
  availability: 'In Stock',
  specs: {
    type: 'Battery Pack'
  }
},
{
  id: 'anker-power-bank-20000',
  name: 'Anker Power Bank 20,000mAh',
  image: '/images/Products/accessories-power/anker-power-bank.png',
  price: 200.00,
  category: 'powerbanks',
  availability: 'In Stock',
  specs: {
    capacity: '20,000mAh',
    compatibility: 'Apple, Samsung, Google and more'
  }
},
{
  id: 'jimzy-power-bank-10000',
  name: 'Jimzy Power Bank 10,000mAh',
  image: '/images/Products/accessories-power/jimzy-power-bank.png',
  price: 150.00,
  category: 'powerbanks',
  availability: 'In Stock',
  specs: {
    capacity: '10,000mAh',
    features: 'Solar charging, LED light',
    cables: '4 built-in cords'
  }
},
// POWER
{
  id: 'nipponamerica-power-strip',
  name: 'Nipponamerica 6-Outlet AC Power Strip',
  image: '/images/Products/more/nipponamerica-6outlet-power-strip.jpg',
  price: 35.00,
  category: 'power',
  availability: 'In Stock',
  specs: {
    outlets: '6 grounded outlets',
    power: '110v',
    surge: '90 Joules surge protection',
    cable: '6ft heavy-duty cord',
    safety: 'Fire-retardant housing, UL listed'
  }
},
{
  id: 'ldnio-power-socket',
  name: 'LDNIO Power Socket 3.1A with USB',
  image: '/images/Products/more/ldnio-power-socket-usb.jpg',
  price: 70.00,
  category: 'power',
  availability: 'In Stock',
  specs: {
    outlets: '3 universal outlets + 3 USB ports',
    output: '3.1A USB charging',
    power: '220v',
    safety: 'Child safety shutters',
    feature: 'Anti-static protection'
  }
},
{
  id: 'ldnio-4u-power-strip',
  name: 'LDNIO 4U Power Strip with 4 USB',
  image: '/images/Products/more/ldnio-4u-power-strip.jpg',
  price: 70.00,
  category: 'power',
  availability: 'In Stock',
  specs: {
    outlets: '4 universal outlets + 4 USB ports',
    output: '2.4A per USB port',
    power: '220v',
    feature: 'Smart IC chip technology'
  }
},
{
  id: 'ludger-battery-charger-6a',
  name: 'LUDGER Battery Charger LBCG-612-6',
  image: '/images/Products/more/ledger-power-light-battery-charger-LBCG-612-6.jpg',
  price: 375.00,
  category: 'power',
  availability: "In Stock",
  specs: {
    input: '120V AC / 60Hz',
    battery: '6/12V Lead-acid',
    power: '<130W',
    modes: '12V/2A, 12V/6A, 6V/2A',
    protection: 'Built-in circuit protection',
    weight: '2.7kg (5.9lbs)'
  }
},
{
  id: 'ludger-battery-charger-100a',
  name: 'LUDGER Battery Charger LBCG-12-100',
  image: '/images/Products/more/ledger-power-light-battery-charger.jpg',
  price: 600.00,
  category: 'power',
  availability: "In Stock",
  specs: {
    input: '120V AC / 60Hz',
    battery: '12V Lead-acid',
    power: '<330W',
    modes: '12V/2A, 12V/15A, 12V/100A engine start',
    features: 'LED display, Regular & AGM settings',
    weight: '7.3kg (16.1lbs)'
  }
},
// EMERGENCY
{
  id: 'ludger-rechargeable-fan',
  name: 'LUDGER Rechargeable Fan EL-8210F',
  image: '/images/Products/more/ludger-power-light-rechargeable-fan.jpg',
  price: 220.00,
  category: 'emergency',
  availability: "In Stock",
  specs: {
    power: '110-240V, 50/60Hz, 17W',
    battery: '6V 4.5Ah lead acid',
    features: '10" 2-speed fan, 4 LED lights, Radio',
    charging: '10-15 hours charge time',
    runtime: 'High: 3hrs, Low: 4.5hrs, LED: 90hrs, Radio: 15hrs',
    extras: 'DC Input & USB output'
  }
},
{
  id: 'ludger-rechargeable-handy-light-7005',
  name: 'LUDGER Rechargeable Handy Light EL-7005L',
  image: '/images/Products/accessories-power/ludger-power-handy-light.jpg',
  price: 50.00,
  category: 'emergency',
  availability: "In Stock",
  specs: {
    power: 'AC 110-220V',
    charging: '20-24 hours charge time',
    duration: 'Approx. 4 hours',
    battery: '4V 0.4AH Sealed Lead-Acid'
  }
},
{
  id: 'ludger-lantern-cream-1830',
  name: 'LUDGER Lantern EL-1830LED (Cream)',
  image: '/images/Products/accessories-power/ludger-power-light-lantern-yellow.jpg',
  price: 125.00,
  category: 'emergency',
  availability: "In Stock",
  specs: {
    power: 'AC 110-220V/60Hz',
    charging: '20-24 hours charge time',
    duration: '1 tube: 5hrs, 2 tubes: 2.5hrs, Radio: 18hrs',
    battery: '4V 4000mAh Lead Acid',
    features: '360° light, FM scan radio, Overcharge protection'
  }
},
{
  id: 'ludger-lantern-blue-536',
  name: 'LUDGER Emergency Lantern EL-536USV (Blue)',
  image: '/images/Products/accessories-power/ludger-power-light-lantern-blue.jpg',
  price: 120.00,
  category: 'emergency',
  availability: "In Stock",
  specs: {
    power: '110-220V/60Hz',
    battery: '4V 6Ah sealed lead-acid',
    charging: '20-24 hours',
    duration: '8-10hrs strong light, >25hrs weak light',
    features: '360° light, DC 12V input, USB 5V charger, Solar panel, 36x0.5W LED'
  }
},
{
  id: 'audio-box-emergency-flashlight',
  name: 'Audio Box Solar Emergency Flashlight',
  image: '/images/Products/accessories-power/audio-box-emergency-light.jpg',
  price: 75.00,
  category: 'emergency',
  availability: "In Stock",
  specs: {
    connectivity: 'Bluetooth',
    radio: 'FM Radio',
    charging: 'Solar Rechargeable'
  }
},
{
  id: 'ludger-handy-light-black',
  name: 'LUDGER Rechargeable Handy Light (Black)',
  image: '/images/Products/accessories-power/ludger-handy-light.jpg',
  price: 75.00,
  category: 'emergency',
  availability: "In Stock"
},
// BATTERY PACKS - New arrivals
{
  id: 'magsafe-battery-pack-5000mah',
  name: 'MagSafe Battery Pack 5000mAh',
  image: '/images/Products/accessories-power/magsafe-battery-pack-5000mah.jpg',
  price: 90.00,
  category: 'powerbanks',
  availability: 'In Stock',
  specs: {
    capacity: '5000mAh',
    charging: 'MagSafe Wireless'
  }
},
{
  id: 'magsafe-battery-pack-10000mah',
  name: 'MagSafe Battery Pack 10000mAh',
  image: '/images/Products/accessories-power/magsafe-battery-pack-10000mah.jpg',
  price: 130.00,
  category: 'powerbanks',
  availability: 'In Stock',
  specs: {
    capacity: '10000mAh',
    charging: 'MagSafe Wireless'
  }
},
{
  id: 'apple-iphone-air-battery-pack',
  name: 'Apple iPhone Air Battery Pack',
  image: '/images/Products/accessories-power/apple-iphone-air-battery-pack.png',
  price: 180.00,
  category: 'powerbanks',
  availability: 'In Stock',
  specs: {
    type: 'Original Apple Battery Pack',
    compatibility: 'iPhone Air'
  }
}
  ];

const translations = {
  en: {
    title: "Power & Light",
    subtitle: "Power Banks, Lanterns, Lights & Surge Protection",
    backToHome: "Back to Home",
    viewDetails: "View Details",
    specifications: "Specifications",
    availability: "Availability",
    callToOrder: "Call to Order",
    whatsappOrder: "WhatsApp Order",
    closeModal: "Close",
    inStock: "In Stock",
    all: "All Products",
    filterBy: "Filter by:",
    powerbanks: "Power Banks",
    emergency: "Lights & Lanterns",
    power: "Power & Surge",
  },
  fr: {
    title: "Énergie et Éclairage",
    subtitle: "Batteries Externes, Lanternes, Lampes et Parasurtenseurs",
    backToHome: "Retour à l'Accueil",
    viewDetails: "Voir Détails",
    specifications: "Spécifications",
    availability: "Disponibilité",
    callToOrder: "Appeler pour Commander",
    whatsappOrder: "Commander via WhatsApp",
    closeModal: "Fermer",
    inStock: "En Stock",
    all: "Tous les Produits",
    filterBy: "Filtrer par:",
    powerbanks: "Batteries Portables",
    emergency: "Lampes et Lanternes",
    power: "Alimentation et Parasurtenseurs",
  },
  es: {
    title: "Energía e Iluminación",
    subtitle: "Baterías Externas, Linternas, Luces y Protección contra Sobretensiones",
    backToHome: "Volver al Inicio",
    viewDetails: "Ver Detalles",
    specifications: "Especificaciones",
    availability: "Disponibilidad",
    callToOrder: "Llamar para Ordenar",
    whatsappOrder: "Ordenar por WhatsApp",
    closeModal: "Cerrar",
    inStock: "En Stock",
    all: "Todos los Productos",
    filterBy: "Filtrar por:",
    powerbanks: "Baterías Portátiles",
    emergency: "Luces y Linternas",
    power: "Energía y Sobretensiones",
  }
};

  const t = translations[language as keyof typeof translations];

  // Filter products based on selected category
  const filteredProducts = filterCategory === 'all' 
  ? products 
  : products.filter(p => p.category === filterCategory);

  return (
  <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-900 to-slate-900 overflow-hidden">
    {/* Animated Particles Background - VIVID VERSION */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {/* BOLD floating orbs with stronger colors */}
  <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-fuchsia-400/50 rounded-full blur-3xl animate-float"></div>
  <div className="absolute top-40 right-20 w-[600px] h-[600px] bg-pink-400/45 rounded-full blur-3xl animate-float-delayed"></div>
  <div className="absolute bottom-20 left-1/4 w-[550px] h-[550px] bg-purple-400/50 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
  <div className="absolute bottom-40 right-1/3 w-96 h-96 bg-rose-400/45 rounded-full blur-3xl animate-float-delayed"></div>
  <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-fuchsia-300/40 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      
      {/* Animated grid pattern overlay */}
      <div className="absolute inset-0 opacity-20 animate-pulse-slow" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* Diagonal moving lines */}
      <div className="absolute inset-0 opacity-10 animate-slide-diagonal" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)'
      }}></div>
    </div>

      {/* Navigation */}
      <nav
        className="relative z-20"
        style={{
          /* the tint dissolves too, so nothing paints a hard bottom edge;
             what shows through at the bottom is the page background itself */
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.54) 42%, rgba(0,0,0,0.34) 68%, rgba(0,0,0,0.12) 87%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div className="absolute top-3 left-4 z-30 flex items-center gap-3 pointer-events-none">
          <img
            src="/images/cell-world-logo.png"
            alt="Cell World"
            className="pointer-events-auto"
            style={{
              height: '40px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.9))'
            }}
          />
          <Link
            href="/"
            className="pointer-events-auto flex items-center space-x-2 text-white hover:text-[#FFD700] transition-colors duration-300 bg-black/45 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToHome}</span>
          </Link>
        </div>

        {/* Banner spans the full width of the bar */}
        <div className="w-full">
          <CategoryBanner
            products={products}
            categoryName={t.title}
            onSelect={(cat) => {
              setFilterCategory(cat);
              document.getElementById('category-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            slides={[
              { headline: 'Power banks', categories: ['powerbanks'], hero: '/images/Products/accessories-power/samsung-galaxy-power-bank.png' },
              { headline: 'Lights & lanterns', categories: ['emergency'], hero: '/images/Products/accessories-power/ludger-power-light-lantern-blue.jpg' },
              { headline: 'Power & surge', categories: ['power'], hero: '/images/Products/more/ldnio-4u-power-strip.jpg' },
            ]}
          />
        </div>

        <button
          className="group absolute top-3 right-4 z-30 flex items-center space-x-2 text-white bg-black/55 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/75 border border-[#FFD700]/50 transition-all duration-300"
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
      <div className="relative z-10 text-center py-4 px-4">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center"
              style={{
                color: '#FFD700',
                textShadow: '0 4px 20px rgba(255, 215, 0, 0.45), 0 2px 8px rgba(0,0,0,0.9)'
              }}>
            {t.title}
          </h1>
        </div>
        <TickerStrip
          text={t.subtitle}
          className="text-lg font-semibold text-[#FFD700]/85"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
        />
      </div>

      {/* Category Filter */}
      <div className="relative z-30 flex justify-center mb-3 px-4">
        <CategoryFilter
          options={['all', 'powerbanks', 'emergency', 'power']}
          value={filterCategory}
          onChange={setFilterCategory}
          labels={t}
          filterByLabel={t.filterBy}
        />
      </div>

      {/* Products Grid */}
      <div id="category-grid" className="relative z-10 container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
  <div 
    key={product.id}
    className="group relative bg-gradient-to-br from-gray-900/60 via-purple-900/20 to-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
  >
    {/* Product Image */}
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-4 overflow-hidden" style={{ height: '240px', position: 'relative' }}>
      {/* Back Soon Overlay */}
      {product.availability === 'Back Soon' && (
        <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center pointer-events-none">
          <span className="text-black font-bold text-xl rotate-[-15deg] bg-yellow-400 px-4 py-2 rounded shadow-lg pointer-events-none">
            BACK SOON
          </span>
        </div>
      )}
      
      <Image 
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  className="object-contain transition-transform duration-700 hover:scale-125"
  loading="lazy"
/>
      
      {/* Category Badge */}
      <div className="absolute top-2 left-2 bg-purple-500/80 text-white text-xs font-bold px-2 py-1 rounded-full">
        {product.category.toUpperCase()}
      </div>
    </div>

    {/* Price Badge - Always show for all products */}
    <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-lg">
      ${product.price}
    </div>

    {/* Product Info */}
    <div className="p-4 bg-black/60">
      <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">{product.name}</h3>
      <button 
  onClick={() => {
    trackEvent('view_product_details', { 
      product: product.name, 
      price: product.price,
      category: product.category 
    });
    setSelectedProduct(product);
  }}
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
  <div 
  ref={imageRef}
  className="bg-white/90 rounded-xl p-6 mb-4 relative overflow-hidden cursor-move"
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
    <div className="bg-green-400/90 text-green-900 text-center py-3 rounded-lg font-bold">
      <Check className="inline w-5 h-5 mr-2" />
      {t.inStock}
    </div>
  )}
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
                {/* Back Soon Message */}
{selectedProduct.availability === 'Back Soon' && (
  <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
    <p className="text-yellow-700 font-semibold flex items-start gap-2">
      <Package className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
      <span>This item is sold out, but will be coming back soon! Check back later or contact us for updates.</span>
    </p>
  </div>
)}
                <div className="space-y-3">
                  <a 
  href="tel:+17844512261"
  onClick={() => trackEvent('phone_click', { 
    product: selectedProduct.name, 
    price: selectedProduct.price,
    category: selectedProduct.category 
  })}
  className="block w-full bg-white text-purple-700 font-bold py-3 rounded-lg text-center hover:bg-gray-100 transition-all duration-300 shadow-lg"
>
  <Phone className="inline w-5 h-5 mr-2" />
  {t.callToOrder}: 1-784-451-2261
</a>
                  
                  <Link
  href={`/order?product=${encodeURIComponent(selectedProduct.name)}&category=Accessories%20%26%20Power`}
  onClick={() => trackEvent('whatsapp_click', { 
    product: selectedProduct.name, 
    price: selectedProduct.price,
    category: selectedProduct.category 
  })}
  className="block w-full bg-green-500 text-white font-bold py-3 rounded-lg text-center hover:bg-green-400 transition-all duration-300 shadow-lg"
>
  <MessageCircle className="inline w-5 h-5 mr-2" />
  {t.whatsappOrder}
</Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Celly Assistant */}
      <Celly />
      
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
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        @keyframes slide-diagonal {
          0% { transform: translateX(-50px) translateY(-50px); }
          100% { transform: translateX(50px) translateY(50px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-slide-diagonal {
          animation: slide-diagonal 20s linear infinite;
        }
      `}</style>
    </div>
  );
}