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

  // Complete product catalog - 69 items
  const products = [
  
  // Gaming Controllers
{
  id: 'xbox-series-black',
  name: 'Xbox Controller for Xbox Series X|S',
  image: '/images/Products/more/xbox-seriesxs.png',
  price: 350.00,
  category: 'gaming',
  availability: 'Limited Stock',
  color: 'Black - 1 left',
  specs: {
    compatibility: 'Xbox Series X|S, Xbox One, Windows, Android & iOS',
    type: 'Wireless Controller'
  }
},
{
  id: 'xbox-series-pulsered',
  name: 'Xbox Controller - Pulse Red',
  image: '/images/Products/more/xbox-series-pulsered.png',
  price: 350.00,
  category: 'gaming',
  availability: 'Limited Stock',
  color: 'Pulse Red - 1 left',
  specs: {
    compatibility: 'Xbox Series X|S, Xbox One, Windows, Android & iOS',
    type: 'Wireless Controller',
    includes: 'AA Batteries'
  }
},
{
  id: 'ps5-dualsense',
  name: 'PlayStation 5 DualSense Wireless Controller',
  image: '/images/Products/more/playstation5-dualsense-controller.png',
  price: 350.00,
  category: 'gaming',
  availability: 'In Stock',
  color: 'Camouflage (1), Black (2)',
  specs: {
    type: 'Wireless Controller',
    compatibility: 'PlayStation 5'
  }
},

// Emergency Lights & Radios
{
  id: 'ludger-lantern',
  name: 'LUDGER Power & Light Lantern EL-1830LED',
  image: '/images/Products/more/ludger-powerlight-lantern.png',
  price: 125.00,
  category: 'emergency',
  availability: 'Low Stock',
  color: '3 left',
  specs: {
    power: 'AC 110-220V/60Hz',
    charging: '20-24 hours charge time',
    duration: '1 tube: 5hrs, 2 tubes: 2.5hrs, Radio: 18hrs',
    battery: '4V 4000mAh Lead Acid',
    features: '360° light, FM scan radio, Overcharge protection'
  }
},
{
  id: 'ludger-handy-light',
  name: 'LUDGER Rechargeable Handy Light EL-8003L',
  image: '/images/Products/more/ludger-rechargeable-light.png',
  price: 75.00,
  category: 'emergency',
  availability: 'Low Stock',
  color: '5 left',
  specs: {
    power: 'AC 110-220V',
    charging: '20-24 hours charge time',
    duration: 'Approx. 14 hours',
    battery: '4V 3.0AH Sealed Lead-Acid'
  }
},
{
  id: 'ludger-emergency-lantern',
  name: 'LUDGER Emergency Lantern EL-536USV',
  image: '/images/Products/more/ludger-power-light-rechargeable-emergency-lantern.png',
  price: 120.00,
  category: 'emergency',
  availability: 'Low Stock',
  color: '2 left',
  specs: {
    power: '110-220V/60Hz',
    battery: '4V 6Ah sealed lead-acid',
    charging: '20-24 hours',
    duration: '8-10hrs strong light, >25hrs weak light',
    features: '360° light, DC 12V input, USB 5V charger, Solar panel, 36x0.5W LED'
  }
},
{
  id: 'studioz-pkt421',
  name: 'StudioZ Radio PKT-421-AFB',
  image: '/images/Products/more/studio-z-radio-pkt-421.png',
  price: 40.00,
  category: 'emergency',
  availability: 'Low Stock',
  color: '6 left',
  specs: {
    type: 'AM/FM 2 Bands World Receiver'
  }
},
{
  id: 'studioz-pkt523',
  name: 'StudioZ Radio PKT-523WB',
  image: '/images/Products/more/studio-z-radio-pkt-523.png',
  price: 45.00,
  category: 'emergency',
  availability: 'In Stock',
  color: '8 left',
  specs: {
    type: 'AM/FM/WB 3 Bands Receiver'
  }
},
{
  id: 'studioz-prt742',
  name: 'StudioZ Radio PRT-742-WB',
  image: '/images/Products/more/studio-z-radio-prt-742.png',
  price: 0.00, // Price not specified
  category: 'emergency',
  availability: 'In Stock',
  specs: {
    type: 'AM/FM/WB 3 Bands',
    features: 'High sensitivity receiver',
    power: 'DC 3V (D Size x2) or AC 110V/60Hz',
    frequency: 'AM 520-1710 KHz, FM 87-108MHz',
    output: '300mw'
  }
},
{
  id: 'audiobox-solar-fan',
  name: 'AudioBox Solar Rechargeable Emergency Fan + Radio',
  image: '/images/Products/more/audiobox-solar-rechargeable-emergency-fan-radio.png',
  price: 75.00,
  category: 'emergency',
  availability: 'Low Stock',
  color: '2 left',
  specs: {
    features: 'FM Radio, MP3 Player, Solar Panel, Fan',
    extras: 'TWS, Rechargeable battery, USB port, TF card slot'
  }
},

// Cables & Adapters
{
  id: 'generic-micro-usb',
  name: 'Generic Micro to USB Cable',
  image: '/images/Products/more/generic-micro-usb-cable .png',
  price: 40.00,
  category: 'cables',
  availability: 'In Stock',
  specs: {
    type: 'Fast Charge Cable'
  }
},
{
  id: 'generic-type-c',
  name: 'Generic Type-C to Type-C Cable',
  image: '/images/Products/more/generic-type-c-cable.png',
  price: 40.00,
  category: 'cables',
  availability: 'In Stock',
  specs: {
    type: 'Fast Charge Cable'
  }
},
{
  id: 'generic-type-c-lightning',
  name: 'Generic Type-C to Lightning Cable',
  image: '/images/Products/more/generic-type-c-2-lightning.png',
  price: 40.00,
  category: 'cables',
  availability: 'In Stock',
  specs: {
    type: 'Charging Cable'
  }
},
{
  id: 'generic-3in1',
  name: 'Generic Universal 3-in-1 Braided USB Cable',
  image: '/images/Products/more/generic-universal-charge.png',
  price: 40.00,
  category: 'cables',
  availability: 'In Stock',
  specs: {
    type: 'USB-C, Lightning, Micro USB',
    length: '6ft'
  }
},
{
  id: 'yesido-4in1',
  name: 'YESIDO 4-in-1 Cable CA200',
  image: '/images/Products/more/yesido-4in1-cable.png',
  price: 50.00,
  category: 'cables',
  availability: 'In Stock',
  color: '20 available',
  specs: {
    type: 'USB-A/Type-C to USB-C/Lightning',
    charging: '3A Fast Charge'
  }
},
{
  id: '3in1-hdtv',
  name: '3-in-1 HDTV Cable',
  image: '/images/Products/more/3-in-1-hdtv-cable.png',
  price: 95.00,
  category: 'cables',
  availability: 'Low Stock',
  color: '10 left',
  specs: {
    type: 'Lightning, Micro USB & USB Connector',
    compatibility: 'iOS and Android',
    features: 'Stream to TV, Monitor, Projector'
  }
},
{
  id: '3in1-cable',
  name: '3-in-1 Phone to HDTV Cable',
  image: '/images/Products/more/3-in-1-cable.png',
  price: 100.00,
  category: 'cables',
  availability: 'Low Stock',
  color: '3 left',
  specs: {
    type: 'Lightning, Micro & Type-C'
  }
},

// Samsung Accessories
{
  id: 'samsung-micro-usb',
  name: 'Samsung Micro-USB Charging Cable',
  image: '/images/Products/more/samsung-micro-usb.png',
  price: 75.00,
  category: 'samsung',
  availability: 'In Stock',
  specs: {
    type: 'Original Samsung Cable'
  }
},
{
  id: 'samsung-galaxy-watch-charger',
  name: 'Samsung Galaxy Watch Fast Wireless Charger',
  image: '/images/Products/more/samsung-galaxy-watch.png',
  price: 120.00,
  category: 'samsung',
  availability: 'In Stock',
  specs: {
    compatibility: 'Galaxy Watch Active, Active 2, Watch 3-5 series & later'
  }
},
{
  id: 'samsung-usb-a-charger',
  name: 'Samsung USB-A Brick',
  image: '/images/Products/more/samsung-usb-a-charger.png',
  price: 60.00,
  category: 'samsung',
  availability: 'In Stock',
  specs: {
    type: 'Fast Charge Adapter'
  }
},
{
  id: 'samsung-type-c-usb',
  name: 'Samsung Type-C to USB Cable',
  image: '/images/Products/more/samsung-type-c-usb-cable.png',
  price: 75.00,
  category: 'samsung',
  availability: 'In Stock'
},
{
  id: 'samsung-wireless-charger',
  name: 'Samsung Super Fast Wireless Charger',
  image: '/images/Products/more/samsung-super-fast-wireless-charger.png',
  price: 220.00,
  category: 'samsung',
  availability: 'Low Stock',
  color: '2 left',
  specs: {
    power: '15W',
    includes: 'Power Adapter',
    features: 'Also charges Galaxy Buds'
  }
},
{
  id: 'samsung-25w-type-c',
  name: 'Samsung 25W Type-C Power Adapter',
  image: '/images/Products/more/samsung-25w-type-c-power-adapter.png',
  price: 75.00,
  category: 'samsung',
  availability: 'In Stock'
},
{
  id: 'samsung-type-c-akg',
  name: 'Samsung Type-C AKG Earphone',
  image: '/images/Products/more/samsung-type-c-akg-earphone.png',
  price: 80.00,
  category: 'samsung',
  availability: 'In Stock'
},
{
  id: 'samsung-25w-adapter-cable',
  name: 'Samsung 25W Power Adapter and Charging Cable',
  image: '/images/Products/more/samsung-25w-power-adapter.png',
  price: 150.00,
  category: 'samsung',
  availability: 'In Stock'
},
{
  id: 'samsung-type-c-c',
  name: 'Samsung Type C-C Cable',
  image: '/images/Products/more/samsung-type-c-c-cable.png',
  price: 75.00,
  category: 'samsung',
  availability: 'In Stock',
  specs: {
    length: '1m'
  }
},

// Power & Accessories
{
  id: '65w-pd-adapter',
  name: '65W PD Power Adapter Trio',
  image: '/images/Products/more/65w-pd-power-adapter.png',
  price: 200.00,
  category: 'power',
  availability: 'In Stock',
  specs: {
    ports: 'USB-C x2 (65W & 25W), USB-A (15W)'
  }
},
{
  id: 'airbro-fan-powerbank',
  name: 'Airbro ONE Portable Fan with Powerbank',
  image: '/images/Products/more/airbro-one-portable-fan-powerbank.png',
  price: 140.00,
  category: 'power',
  availability: 'Low Stock',
  color: '3 left',
  specs: {
    battery: '2600mAh lithium-ion',
    duration: '3hrs high speed, 9hrs low speed',
    features: 'Detachable powerbank, 6 blade design, 5 speed settings'
  }
},
{
  id: 'fanttik-x8-apex',
  name: 'Fanttik X8 Apex Air Inflator',
  image: '/images/Products/more/fanttik-x8-apex-air-inflator.png',
  price: 450.00,
  category: 'power',
  availability: 'Low Stock',
  color: '2 left',
  specs: {
    battery: '11.1V/28.86Wh',
    pressure: '3-150 PSI',
    noise: '<80db',
    ports: 'USB-C Input (5V/3A), USB-A Output (5V/2A)',
    weight: '1028g'
  }
}

 // JBL SPEAKERS (1-10)
    ,{
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
      filterBy: "Filter by:",
      gaming: "Gaming",
      emergency: "Emergency",
      cables: "Cables",
      samsung: "Samsung",
      power: "Power"
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
      filterBy: "Filtrer par:",
      gaming: "Jeux",
      emergency: "Urgence",
      cables: "Câbles",
      samsung: "Samsung",
      power: "Alimentation"
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
      filterBy: "Filtrar por:",
      gaming: "Juegos",
      emergency: "Emergencia",
      cables: "Cables",
      samsung: "Samsung",
      power: "Energía"
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
          {['all', 'gaming', 'emergency', 'cables', 'samsung', 'power'].map((cat) => (
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