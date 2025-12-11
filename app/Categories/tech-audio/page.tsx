'use client';

import { useState, useRef } from 'react';
import { ArrowLeft, Globe, Phone, MessageCircle, X, Check, ZoomIn, ZoomOut, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { trackEvent } from '@/lib/analytics';
import Image from 'next/image';
const Celly = dynamic(() => import('@/components/CellyAssistant'), { ssr: false });

export default function TechAudioCategory() {
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

  
  // Enhanced product data with categories
  const products = [
// RCA SPEAKERS
{
  id: 'rca-tws-gamerbeat-speaker',
  name: 'RCA TWS GamerBeat Bluetooth Party Speaker',
  image: '/images/Products/more/rca-tws-gamerbeat-speaker.png',
  price: 220.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    features: 'Disco lights, FM Radio',
    inputs: 'Aux input, Memory device',
    battery: 'Long battery life'
  }
},
{
  id: 'rca-beatbox-speaker',
  name: 'RCA BeatBox Bluetooth Speaker',
  image: '/images/Products/more/rca-beatbox-speaker.png',
  price: 200.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    features: 'Illuminated display, FM Radio, Disco lights',
    inputs: 'Memory device, Mic port, Aux port',
    extras: 'Remote control'
  }
},
{
  id: 'rca-holosound-speaker',
  name: 'RCA HoloSound Bluetooth Speaker',
  image: '/images/Products/more/rca-holosound-speaker.png',
  price: 599.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    features: 'LED Color Flame, Karaoke mode',
    display: 'Illuminated display',
    inputs: 'Memory device, Mic port, Aux port',
    extras: 'FM Radio, Remote control'
  }
},
{
  id: 'rca-beatwaves-speaker',
  name: 'RCA BeatWaves Bluetooth Speaker with Wireless Mic',
  image: '/images/Products/more/rca-beatwaves-speaker.png',
  price: 499.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    includes: 'Wireless microphone',
    features: 'Karaoke mode, FM Radio',
    display: 'Illuminated display',
    extras: 'Portable with back straps'
  }
},
{
  id: 'rca-levelup-speaker',
  name: 'RCA CrystalBeat Bluetooth Speaker',
  image: '/images/Products/more/rca-levelup-speaker.png',
  price: 450.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    features: 'Illuminated, Karaoke mode',
    inputs: 'Memory device, Mic port, Aux port',
    extras: 'FM Radio, Remote control'
  }
},
{
  id: 'rca-shock-wave-speaker',
  name: 'RCA Shock-Wave Bluetooth Speaker',
  image: '/images/Products/more/rca-shock-wave-speaker.png',
  price: 380.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    features: 'LED Color Flame Effect, High Fidelity',
    modes: 'Karaoke mode, FM Radio',
    inputs: 'Memory device, Mic port, Aux port'
  }
},
//SKULLCANDY SPEAKERS)
{
  id: 'skullcandy-barrel',
  name: 'Skull Candy Barrel Speaker',
  image: '/images/Products/more/skull-candy-barrel-speaker.png',
  price: 999.00,
  category: 'speakers',
  availability: 'In Stock',
  color: 'Blue & Black (1), Orange & Black (1)',
  specs: {
    battery: '12 hours battery life',
    waterproof: 'IPX5 water resistant',
    features: 'Skull Candy multi-link',
    lighting: 'LED light show'
  }
},
{
  id: 'skullcandy-stomp',
  name: 'Skull Candy STOMP',
  image: '/images/Products/more/skull-candy-stomp.png',
  price: 950.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    battery: '12 hours battery life',
    waterproof: 'IPX7 Waterproof',
    features: 'Skull Candy multi-link',
    lighting: 'LED light show'
  }
},
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
      name: "JBL CLIP 4 Portable Speaker - Color Options",
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
      price: 199.00,
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
      name: "JBL Pulse 4 Portable Speaker",
      price: 599.00,
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
      price: 499.00,
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
      price: 1800.00,
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
      price: 1800.00,
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
      price: 1250.00,
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
      price: 599.00,
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
    {
  id: 11,
  name: "JBL Charge 6 Portable Speaker",
  price: 720.00,
  image: "/images/Products/tech-audio/jbl-charge-6.png",
  description: "Portable Waterproof & Drop-Proof Bluetooth Speaker. Bold Pro Sound with AI Sound Boost, 28Hrs of Playtime, Built-in powerbank.",
  category: "speakers",
  specs: {
    bluetooth: "Bluetooth with USB Connectivity",
    battery: "28 hours battery life",
    waterproof: "Waterproof & Drop-Proof",
    power: "45W Maximum Output",
    frequency: "20 KHz Frequency Response",
    audio: "Stereo Audio Output Mode",
    feature: "Built-in powerbank with AI Sound Boost"
  }
 },
 // SPEAKERS - Additional Skull Candy
{
  id: 'skullcandy-ounce-red',
  name: 'Skull Candy Ounce',
  image: '/images/Products/more/skull-candy-ounce-red.png',
  price: 160.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    battery: '16 hours battery',
    waterproof: 'IPX7 waterproof'
  }
},
{
  id: 'skullcandy-kilo-black',
  name: 'Skull Candy Kilo',
  image: '/images/Products/more/skull-candy-kilo-black.png',
  price: 210.00,
  category: 'speakers',
  availability: 'In Stock',
  color: 'Black',
  specs: {
    battery: '24 hours battery',
    waterproof: 'IPX7 waterproof'
  }
},
{
  id: 'skullcandy-terrain-mini',
  name: 'Skull Candy Terrain Mini',
  image: '/images/Products/more/skull-candy-terrain-mini.png',
  price: 230.00,
  category: 'speakers',
  availability: 'In Stock',
  color: 'Red',
  specs: {
    battery: '14 hours battery',
    waterproof: 'IPX7 waterproof',
    feature: 'Skull Candy Multi-link'
  }
},
{
  id: 'skullcandy-terrain-blue',
  name: 'Skull Candy Terrain',
  image: '/images/Products/more/skull-candy-terrain-blue.png',
  price: 330.00,
  category: 'speakers',
  availability: 'Low Stock',
  color: 'Blue',
  specs: {
    battery: '14 hours battery',
    waterproof: 'IPX7 waterproof',
    feature: 'Skull Candy Multi-link'
  }
},
{
  id: 'skullcandy-terrain-xl',
  name: 'Skull Candy Terrain XL',
  image: '/images/Products/more/skull-candy-terrain-xl.png',
  price: 420.00,
  category: 'speakers',
  availability: 'In Stock',
  color: 'Blue (2), Red (1)',
  specs: {
    battery: '18 hours battery',
    waterproof: 'IPX7 waterproof',
    feature: 'Skull Candy Multi-link'
  }
},
{
  id: 'fugoo-tough-speaker',
  name: 'Fugoo Tough Bluetooth Speaker',
  image: '/images/Products/more/fugoo-tough-bluetooth-speaker.png',
  price: 200.00,
  category: 'speakers',
  availability: 'In Stock',
  specs: {
    waterproof: 'Waterproof design',
    battery: '12 hours battery life',
    sound: '360° sound'
  }
},
// PLAYSTATION
{
  id: 'ps5-digital-edition',
  name: 'PS5 Digital Edition',
  image: '/images/Products/tech-audio/ps5-digital.png',
  price: 2600.00,
  category: 'gaming',
  inStock: true,
  description: '1TB Disc-Free Console | Ultra-Fast SSD | Stunning Graphics | Immersive Gaming Experience',
  specs: {
    storage: '1TB',
    type: 'Disc-Free Console',
    features: 'Ultra-Fast SSD, 4K Gaming'
  }
},
{
  id: 'ps5-console-disc',
  name: 'PS5 Console Disc Drive',
  image: '/images/Products/tech-audio/ps5-disc.png',
  price: 2900.00,
  category: 'gaming',
  inStock: true,
  description: 'Disc Drive Attaches to Console | DualSense Wireless Controller | 4K Gaming | Ultra HD Blu-ray',
  specs: {
    disc: 'Disc Drive',
    controller: 'DualSense Wireless',
    features: '4K Gaming, Ultra HD Blu-ray'
  }
},
{
  id: 'kotion-each-pro-headphones',
  name: 'Kotion Each Pro Gaming Headphones',
  image: '/images/Products/tech-audio/kotion-headset.png',
  price: 175.00,
  category: 'headphones',
  inStock: true,
  description: '2.4GHz Wireless Mode | Bluetooth Mode | Wired Mode | Pro Gaming Audio | Comfortable Design',
  specs: {
    connectivity: '2.4GHz Wireless, BT, Wired',
    features: 'Pro Gaming Audio'
  }
},
{
  id: 'bl500-gaming-headphones',
  name: 'BL500 Gaming Headphones',
  image: '/images/Products/tech-audio/bl500-headset.png',
  price: 150.00,
  category: 'headphones',
  inStock: true,
  description: '2.4GHz Wireless Mode | Up to 30 Hours Battery | Noise Reduction Mic | For PC, MAC, PS4 & PS5',
  specs: {
    connectivity: '2.4GHz Wireless',
    battery: 'Up to 30 Hours',
    mic: 'Noise Reduction',
    compatible: 'PC, MAC, PS4, PS5'
  }
},
// Gaming)
{
  id: 'ps5-controller-camo',
  name: 'PlayStation 5 DualSense Controller',
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
{
  id: 'xbox-controller-pulse',
  name: 'Xbox Controller - Pulse Red',
  image: '/images/Products/more/xbox-series-pulsered.png',
  price: 350.00,
  category: 'gaming',
  availability: 'In Stock',
  color: 'Pulse Red',
  specs: {
    compatibility: 'Xbox Series X|S, Xbox One, Windows, Android & iOS',
    type: 'Wireless Controller',
    includes: 'AA Batteries'
  }
},
{
  id: 'xbox-controller-black',
  name: 'Xbox Controller for Xbox Series X|S',
  image: '/images/Products/more/xbox-seriesxs.png',
  price: 350.00,
  category: 'gaming',
  availability: 'In Stock',
  color: 'Black',
  specs: {
    compatibility: 'Xbox Series X|S, Xbox One, Windows, Android & iOS',
    type: 'Wireless Controller'
  }
},
{
  id: 'steel-series-stratus',
  name: 'SteelSeries Stratus+ Wireless Mobile Gaming Controller',
  image: '/images/Products/more/steel-series-stratus-controller.png',
  price: 160.00,
  category: 'gaming',
  availability: 'In Stock',
  color: 'Black',
  specs: {
    compatibility: 'Android 4+ (wireless), Windows PC (wired)',
    battery: '90 hours per charge',
    includes: 'USB-C to USB-A cable & phone holder',
    type: 'Wireless Mobile Gaming Controller'
  }
},
{
  id: 'ps4-dualshock',
  name: 'PlayStation 4 DualShock Wireless Controller',
  image: '/images/Products/more/sony-play-station-4-dual-shock.png',
  price: 280.00,
  category: 'gaming',
  availability: 'In Stock',
  color: 'Black',
  specs: {
    type: 'Wireless Controller',
    compatibility: 'PlayStation 4'
  }
},
{
  id: 'razer-charging-stand',
  name: 'Razer Legendary Duo Bundle - PS5 Charging Stand',
  image: '/images/Products/more/razer-quick-charging-stand.png',
  price: 399.00,
  category: 'gaming',
  availability: 'In Stock',
    specs: {
    type: 'Quick Charging Stand',
    compatibility: 'PS5 DualSense Wireless Controller'
  }
},
// SMART WATCHES
{
  id: 'peje-smartwatch-rose-gold',
  name: 'PEJE Smartwatch',
  image: '/images/Products/tech-audio/smartwatch1.png',
  price: 175.00,
  category: 'smartwatch',
  inStock: true,
  specs: {
    display: '1.43" AMOLED',
    waterproof: 'IP68',
    battery: '7-Day Battery',
    colors: '4 Color Options',
    features: 'Heart Rate, Bluetooth Calling'
  }
},
{
  id: 'peje-classic-round-collection',
  name: 'PEJE Classic Round Collection',
  image: '/images/Products/tech-audio/smartwatch2.png',
  price: 175.00,
  category: 'smartwatch',
  inStock: true,
  specs: {
    display: 'AMOLED',
    features: 'Fitness Tracking, Customizable'
  }
},
{
  id: 'peje-sport-smartwatch-black-red',
  name: 'PEJE Sport Smartwatch',
  image: '/images/Products/tech-audio/smartwatch3.png',
  price: 175.00,
  category: 'smartwatch',
  inStock: true,
  specs: {
    display: '1.43" AMOLED',
    waterproof: 'IP68',
    battery: '7-Day Battery',
    features: 'Multi-Sport Modes, Advanced Fitness Tracking',
    extras: 'Dual Straps Included'
  }
},
{
  id: 'm900-watch-pro',
  name: 'M900 Watch Pro',
  image: '/images/Products/tech-audio/smartwatch4.png',
  price: 175.00,
  category: 'smartwatch',
  inStock: true,
  specs: {
    display: '2.21" AMOLED Infinite',
    features: 'Bluetooth Calling, Water Resistant',
    charging: 'Magnetic',
    extras: 'Multiple Bands'
  }
},
{
  id: 'peje-zw-series-10',
  name: 'PEJE ZW Series 10',
  image: '/images/Products/tech-audio/smartwatch5.png',
  price: 175.00,
  category: 'smartwatch',
  inStock: true,
  specs: {
    waterproof: '1ATM',
    nfc: 'NFC Support',
    ai: 'ChatGPT Integration',
    extras: 'Multiple Bands Included'
  }
},
{
  id: 'peje-zw-ultra-x',
  name: 'PEJE ZW Ultra X',
  image: '/images/Products/tech-audio/smartwatch6.png',
  price: 175.00,
  category: 'smartwatch',
  inStock: true,
  specs: {
    display: '2.01" Sport Display',
    waterproof: 'IP68',
    nfc: 'NFC',
    ai: 'ChatGPT',
    features: 'Advanced Health Monitoring',
    extras: '3 Premium Bands'
  }
},
{
  id: 'peje-t800-ultra-2-max',
  name: 'PEJE T800 Ultra 2 Max',
  image: '/images/Products/tech-audio/smartwatch7.png',
  price: 175.00,
  category: 'smartwatch',
  inStock: true,
  specs: {
    display: '2.01 sport Display',
    charging: 'Wireless'
    }
  },
  
  // EARPODS 
  {
  id: 'apple-usb-c-earphone',
  name: 'Apple USB-C EarPods',
  image: '/images/Products/more/apple-usb-c-earphone.png',
  price: 120.00,
  category: 'apple',
  availability: 'In Stock',
  specs: {
    connection: 'USB-C',
    features: 'Built-in remote',
    compatibility: 'USB-C devices'
  }
},
{
  id: 'apple-airpod-3rd',
  name: 'Apple AirPods 3rd Generation',
  image: '/images/Products/more/apple-airpod-3rd-gen.png',
  price: 650.00,
  category: 'apple',
  availability: 'In Stock',
  specs: {
    generation: '3rd Gen',
    battery: '6 hours listening time',
    charging: 'MagSafe & Lightning',
    features: 'Spatial audio, Adaptive EQ'
  }
},
{
  id: 'air-tag',
  name: 'Apple AirTag',
  image: '/images/Products/more/air-tag-personal-belonging-tracker.png',
  price: 220.00,
  category: 'apple',
  availability: 'In Stock',
  specs: {
    feature: 'Precision Finding',
    battery: 'User-replaceable CR2032',
    water: 'IP67 water resistant',
    description: 'Keep track of personal belongings'
  }
},

// EARBUDS
{
  id: '2nd-gen-earpod',
  name: '2nd Generation EarPods with ANC',
  image: '/images/Products/more/2nd-gen-earpod.png',
  price: 140.00,
  category: 'earbuds',
  availability: 'Back Soon',
  color: 'White only',
  specs: {
    feature: 'ANC Noise Cancelling',
    generation: '2nd Generation',
    color: 'White',
    type: 'Wireless EarPods'
  }
},
{
  id: 'jbl-vibe-buds',
  name: 'JBL Vibe Buds',
  image: '/images/Products/more/jbl-vibe-bud.png',
  price: 220.00,
  category: 'earbuds',
  availability: 'In Stock',
  color: 'Black & White',
  specs: {
    battery: 'Up to 32 hours',
    features: 'Hands-free calls with Voice Aware',
    waterproof: 'Water and dust resistant',
    colors: 'Black, White'
  }
},
{
  id: 'jbl-endurance-race',
  name: 'JBL Endurance Race',
  image: '/images/Products/more/jbl-endurance-race.png',
  price: 280.00,
  category: 'earbuds',
  availability: 'Back Soon',
  specs: {
    type: 'Sport Earbuds',
    waterproof: 'IPX7 Waterproof',
    battery: '30 hours total',
    design: 'Secure wing fit'
  }
},

// MICROPHONES
{
  id: 'hypergear-stream-record-mic',
  name: 'HyperGear Sound Advantage Pro Condenser Microphone',
  image: '/images/Products/more/hypergear-stream-record-mic.png',
  price: 180.00,
  category: 'microphones',
  availability: 'In Stock',
  specs: {
    type: 'Pro-Audio Condenser Microphone',
    use: 'Podcasting, Gaming, Streaming, Music Recording',
    features: 'Noise reduction, Omnidirectional pickup'
  }
},
{
  id: 'yesido-lavalier-mic',
  name: 'Yesido Lavalier Mic - 3-in-1 Wireless',
  image: '/images/Products/more/yesido-lavalier-mic.png',
  price: 170.00,
  category: 'microphones',
  availability: 'In Stock',
  specs: {
    compatibility: '3-in-1 compatible with multiple devices',
    transmission: '50M transmission range',
    battery: '7hrs working time, 80min charging',
    features: 'Noise reduction, automatic pairing'
  }
},
{
  id: 'vivitar-mini-lavalier-streaming-microphone',
  name: 'Vivitar Mini Lavalier Streaming Microphone',
  image: '/images/Products/more/vivitar-mini-lavalier-streaming-microphone.png',
  price: 140.00,
  category: 'microphones',
  availability: 'In Stock',
  specs: {
    compatibility: 'Smartphones, DSLR, Camcorders, PCs',
    includes: 'Windproof sponge, cable clip, mic clip, pouch, USB adapter'
  }
},
{
  id: 'studioz-pro-dynamic-microphone',
  name: 'StudioZ Microphone - 2M 1/4" Mono to XLR',
  image: '/images/Products/more/studioz-pro-dynamic-microphone.png',
  price: 80.00,
  category: 'microphones',
  availability: 'In Stock',
  specs: {
    cable: '2M 1/4" Mono to XLR',
    type: 'Professional dynamic microphone'
  }
},
{
  id: 'dolphin-mcx11-rechargeable-mic',
  name: 'Dolphin MCX11 50-Channel UHF Wireless Microphone',
  image: '/images/Products/more/dolphin-mcx11-rechargeable-mic.png',
  price: 200.00,
  category: 'microphones',
  availability: 'In Stock',
  color: 'Black (2), Blue (2), Red (2)',
  specs: {
    channels: '50 Channel UHF',
    features: 'Long range, penetrates walls',
    extra: 'Anti-interference, multiple simultaneous use'
  }
},
{
  id: 'studioz-wired-wireless-microphone',
  name: 'StudioZ Wired & Wireless Microphone',
  image: '/images/Products/more/studioz-wired-wireless-microphone.png',
  price: 80.00,
  category: 'microphones',
  availability: 'In Stock',
  specs: {
    type: 'Dual mode - wired & wireless'
  }
},
{
  id: 'sunflash-pro-microphone',
  name: 'Digital Sunflash Microphone',
  image: '/images/Products/more/sunflash-pro-microphone.png',
  price: 80.00,
  category: 'microphones',
  availability: 'Low Stock',
  specs: {
    feature: 'Reduces background noise and feedback',
    type: 'Digital microphone'
  }
},

// AUDIO INTERFACES
{
  id: 'audiopipe-2channel-transmission',
  name: 'Audiopipe 2 Channel Audio Interface',
  image: '/images/Products/more/audiopipe-2channel-transmission.png',
  price: 450.00,
  category: 'audio-interfaces',
  availability: 'In Stock',
  specs: {
    channels: '2 Channel interface',
    power: '+48V Phantom Power',
    inputs: '2 Combo XLR',
    features: 'Data transmission, Monitor level'
  }
},
{
  id: 'audiopipe-2channel-guitar-singer-mixing-console',
  name: 'Audiopipe 2 Channel Guitar-Singer Mixing Console',
  image: '/images/Products/more/audiopipe-2channel-guitar-singer-mixing-console.png',
  price: 350.00,
  category: 'audio-interfaces',
  availability: 'In Stock',
  specs: {
    input: 'XLR input',
    converter: '16 bit delta sigma',
    eq: '2 band EQ',
    features: 'Data transmission'
  }
},
{
  id: 'wave-mixer-multi-channel-interface-audioeq-soundeffects',
  name: 'WaveMixer Bluetooth Multi-Channel Interface',
  image: '/images/Products/more/wave-mixer-multi-channel-interface-audioeq-soundeffects.png',
  price: 75.00,
  category: 'audio-interfaces',
  availability: 'In Stock',
  specs: {
    compatibility: 'Mobile devices, microphones, instruments',
    inputs: 'Micro USB, Aux 3.5mm',
    features: 'Audio EQ, Sound effects'
  }
},

// CAR AUDIO SPEAKERS & ACCESSORIES
{
  id: 'pioneer-ts-s20',
  name: 'Pioneer Dome Tweeter TS-S20',
  image: '/images/Products/more/pioneer-ts-s20.png',
  price: 300.00,
  category: 'car-audio',
  availability: 'Low Stock',
  specs: {
    size: '3/4" dome tweeter',
    power: '200W Max, 50W Nominal',
    impedance: '8 OHMS'
  }
},
{
  id: 'pioneer-speaker-ts-f1034r',
  name: 'Pioneer 4" Speaker TS-F1034R',
  image: '/images/Products/more/pioneer-speaker-ts-f1034r.png',
  price: 155.00,
  category: 'car-audio',
  availability: 'In Stock',
  specs: {
    size: '4 inch',
    power: '150W MAX',
    type: '2-way voices'
  }
},
{
  id: 'pioneer-speaker-2-wayspeaker',
  name: 'Pioneer 5 1/4" 2-Way Speaker',
  image: '/images/Products/more/pioneer-speaker-2-wayspeaker.png',
  price: 160.00,
  category: 'car-audio',
  availability: 'Low Stock',
  specs: {
    size: '5 1/4 inch',
    power: '35W Nominal',
    impedance: '4 OHMS'
  }
},
{
  id: 'xxx-3-way-impp-cone-triaxial-car-speaker',
  name: 'XXX 3-Way IMPP Cone Triaxial Car Speaker',
  image: '/images/Products/more/xxx-3-way-impp-cone-triaxial-car-speaker.png',
  price: 160.00,
  category: 'car-audio',
  availability: 'In Stock',
  specs: {
    power: '350W P.M.P.O, 175W R.M.S',
    impedance: '4 OHM',
    type: '3-way IMPP Cone'
  }
},
{
  id: 'blaupunkt-4-way-coaxial-speaker',
  name: 'BLAUPUNKT 4-Way 6"×9" Coaxial Speakers',
  image: '/images/Products/more/blaupunkt-4-way-coaxial-speaker.png',
  price: 320.00,
  category: 'car-audio',
  availability: 'In Stock',
  specs: {
    size: '6×9 inch',
    power: '450W MAX',
    impedance: '4 OHM',
    type: '4-Way Coaxial'
  }
},
{
  id: 'pipeman-car-audio-accessories',
  name: 'Pipeman Speaker Grills - Multiple Sizes',
  image: '/images/Products/more/pipeman-car-audio-accessories.png',
  price: 25.00,
  category: 'car-audio',
  availability: 'In Stock',
  specs: {
    '8inch':  - '$25',
    '10inch': - '$35',
    '12inch': - '$40',
    '15inch': - '$45'
  }
},
{
  id: 'audiopipe-pvc-speaker-ring',
  name: 'Audiopipe 8" PVC Speaker Ring',
  image: '/images/Products/more/audiopipe-pvc-speaker-ring.png',
  price: 55.00,
  category: 'car-audio',
  availability: 'Low Stock',
  specs: {
    size: '8 inch',
    material: 'PVC'
  }
},
{
  id: 'pipeman-speaker-kit',
  name: "Pipeman's Speaker Kit Bulk Package",
  image: '/images/Products/more/pipeman-speaker-kit.png',
  price: 50.00,
  category: 'car-audio',
  availability: 'In Stock',
  specs: {
    includes: '10×12 inch sheets',
    type: 'Bulk package'
  }
},
{
  id: 'pipeman-trunk-kit',
  name: "Pipeman's Trunk Kit Bulk Package",
  image: '/images/Products/more/pipeman-trunk-kit.png',
  price: 200.00,
  category: 'car-audio',
  availability: 'In Stock',
  specs: {
    includes: 'Ten 12×24 inch sheets',
    feature: 'Eliminates road noise'
  }
},

// TV Antennas)
{
  id: 'na-indoor-tv-antenna',
  name: 'Indoor TV Antenna (Push On)',
  image: '/images/Products/more/na-indoor-tv-antenna.png',
  price: 20.00,
  category: 'tv-accessories',
  availability: 'Low Stock',
  specs: {
    type: 'UHF/VHF Antenna',
    includes: 'Coaxial cable & quick connect plug'
  }
},

// TV Remotes)
{
  id: 'universal-smart-remote',
  name: 'Universal Smart TV Remote',
  image: '/images/Products/more/universal-remote.png',
  price: 65.00,
  category: 'tv-accessories',
  availability: 'In Stock',
  specs: {
    function: '4 in 1 (TV, DVD, Blu-Ray & Satellite)',
    compatibility: 'Universal'
  }
},
{
  id: 'lg-smart-remote',
  name: 'LG Smart TV Remote',
  image: '/images/Products/more/lg-smart-tv-remote.png',
  price: 40.00,
  category: 'tv-accessories',
  availability: 'In Stock',
  },
{
  id: 'vizio-smart-remote',
  name: 'Vizio Smart TV Remote',
  image: '/images/Products/more/vizio-smart-tv-remote.png',
  price: 40.00,
  category: 'tv-accessories',
  availability: 'In Stock',
  },
{
  id: 'hisense-smart-remote',
  name: 'Hisense Smart TV Remote',
  image: '/images/Products/more/high-sense-smart-tv-remote.png',
  price: 40.00,
  category: 'tv-accessories',
  availability: 'In Stock',
  },
{
  id: 'samsung-smart-remote',
  name: 'Samsung Smart TV Remote',
  image: '/images/Products/more/samsung-smarttvremote.png',
  price: 40.00,
  category: 'tv-accessories',
  availability: 'In Stock',
  },
{
  id: 'roku-tv-remote',
  name: 'Roku TV Remote',
  image: '/images/Products/more/roku-tv-remote.png',
  price: 40.00,
  category: 'tv-accessories',
  availability: 'Back Soon',
  },
{
  id: 'firestick-remotes',
  name: 'Fire Stick Remotes',
  image: '/images/Products/more/fire-stick-remotes.png',
  price: 40.00,
  category: 'tv-accessories',
  availability: 'In Stock',
  },
{
  id: 'fire-tv-stick-4k',
  name: 'Fire TV Stick 4K Ultra HD',
  image: '/images/Products/more/fire-tv-stick-4K-ultra-HD.png',
  price: 199.00,
  category: 'tv-accessories',
  availability: 'Back Soon',
  specs: {
    feature: 'Wi-Fi 6',
    resolution: '4K Ultra HD'
  }
},
{
  id: 'samsung-galaxy-watch-7',
  name: 'Samsung Galaxy Watch 7',
  image: '/images/Products/more/samsung-galaxy-watch.png',
  price: 1100.00,
  category: 'samsung',
  availability: 'In Stock',
  specs: {
    connectivity: 'Bluetooth, Wi-Fi & GPS',
    compatibility: 'Android 11.0+ with 1.5GB+ memory'
  }
},

   // EARBUDS
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
      availability: 'Back Soon',
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
      category: "earbuds",
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
    },
    // HEADPHONES - New additions
  {
  id: 'motorola-kids-headphones',
  name: 'Motorola Kids Wireless Headphones',
  image: '/images/Products/more/motorola-kids-wireless-headphones.png',
  price: 150.00,
  category: 'headphones',
  availability: 'Back Soon',
  color: 'Blue',
  specs: {
    feature: "Kids\' safe volume limit",
    battery: '24 hours playtime',
    comfort: 'Soft cushion headband',
    mic: 'In-line microphone',
    extra: 'Audio splitter for easy sharing'
  }
},
{
  id: 'jbl-tune-525',
  name: 'JBL TUNE 525 Wireless Headphones',
  image: '/images/Products/more/jbl-tune-525.png',
  price: 225.00,
  category: 'headphones',
  availability: 'Back Soon',
  color: 'Navy Blue',
  specs: {
    calls: 'Hands-free calls',
    connection: 'Multi-point connection',
    battery: '57 hours battery life',
    modes: 'Audio video modes',
    feature: 'Voice aware'
  }
},
{
  id: 'jbl-tune-520',
  name: 'JBL TUNE 520 Wireless Headphones',
  image: '/images/Products/more/jbl-tune-520.png',
  price: 199.00,
  category: 'headphones',
  availability: 'Back Soon',
  color: 'White',
  specs: {
    calls: 'Hands-free calls',
    connection: 'Multi-point connection',
    feature: 'Voice aware',
    battery: '57 hours battery life'
  }
},
{
  id: 'hypergear-vibe-headphones',
  name: 'HyperGear VIBE Wireless Headphones',
  image: '/images/Products/more/hypergear-vibe-wireless-headphone.png',
  price: 90.00,
  category: 'headphones',
  availability: 'Back Soon',
  color: 'White',
  specs: {
    battery: '10 hours total battery life',
    fit: 'Noise isolating fit',
    comfort: 'Adjustable padded headband',
    cushions: 'Memory foam ear cups',
    mic: 'Built-in microphone',
    input: 'Aux input'
  }
},
{
  id: 'hypergear-2in1-headphones',
  name: 'HyperGear 2-in-1 Wireless Headphones',
  image: '/images/Products/more/hypergear-2in1-wireless-headphones.png',
  price: 110.00,
  category: 'headphones',
  availability: 'Back Soon',
  color: 'White',
  specs: {
    modes: 'Flip in: Headphone mode | Flip out: Speaker mode',
    eq: '3 EQ Settings: Classic, Voice Boost, Bass Boost',
    audio: '4 modes: Bluetooth, 3.5mm aux, Micro SD, FM Radio',
    features: 'Adjustable headband, rotating ear cups'
  }
},

];

const translations = {
  en: {
    title: "Tech & Audio",
    subtitle: "Speakers, Gaming, Audio Equipment & More",
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
    earbuds: "Earbuds",
    headphones: "Headphones",
    filterBy: "Filter by:",
    gaming: "Gaming",
    samsung: "Samsung",
    "tv-accessories": "TV & Streaming",
    apple: "Apple",
    microphones: "Microphones",
    "audio-interfaces": "Audio Interfaces", 
    "car-audio": "Car Audio",
    
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
    earbuds: "Écouteurs",
    headphones: "Casques",
    filterBy: "Filtrer par:",
    gaming: "Jeux",
    samsung: "Samsung",
    power: "Alimentation",
    "tv-accessories": "TV et Streaming",
    apple: "Apple",
    
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
    earbuds: "Auriculares",
    headphones: "Audífonos",
    filterBy: "Filtrar por:",
    gaming: "Juegos",
    samsung: "Samsung",
    "tv-accessories": "TV y Streaming",
    apple: "Apple",
  }
};

  const t = translations[language as keyof typeof translations];

  // Filter products based on selected category
  const filteredProducts = filterCategory === 'all' 
  ? products 
  : products.filter(p => p.category === filterCategory);

  return (
  <div className="relative min-h-screen bg-gradient-to-br from-cyan-900 via-teal-900 to-slate-900 overflow-hidden">
    {/* Animated Particles Background - BOLD VERSION */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {/* BOLD floating orbs with stronger colors */}
  <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-cyan-400/50 rounded-full blur-3xl animate-float"></div>
  <div className="absolute top-40 right-20 w-[600px] h-[600px] bg-teal-400/45 rounded-full blur-3xl animate-float-delayed"></div>
  <div className="absolute bottom-20 left-1/4 w-[550px] h-[550px] bg-blue-400/50 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
  <div className="absolute bottom-40 right-1/3 w-96 h-96 bg-cyan-300/45 rounded-full blur-3xl animate-float-delayed"></div>
  <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-teal-300/40 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      
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
          {['all', 'apple', 'speakers', 'earbuds', 'headphones', 'gaming', 'tv-accessories', 'samsung', 'microphones', 'audio-interfaces'].map((cat) => (
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
    <p className="text-yellow-700 font-semibold">
      📦 This item is sold out, but will be coming back soon! Check back later or contact us for updates.
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
                  
                  <a 
  href={`https://wa.me/17844310777?text=Hello!%20I%20placed%20my%20order%20using%20the%20Cell%20World%20app.%20Please%20confirm%20availability%20and%20pricing%20for%20the%20following%20item(s):%0A%0A${encodeURIComponent(selectedProduct.name)}`}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackEvent('whatsapp_click', { 
    product: selectedProduct.name, 
    price: selectedProduct.price,
    category: selectedProduct.category 
  })}
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