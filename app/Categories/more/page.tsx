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

// PHONE CASES
{
  id: 'magsafe-deep-blue',
  name: 'Premium MagSafe Case - Deep Blue',
  price: 40,
  image: '/images/Products/more/magsafe-deep-blue.png',
  category: 'cases',  // <- TO THIS
  description: '...',
  inStock: true
},
{
  id: 'jeweled-butterfly',
  name: 'Jeweled Butterfly Case',
  price: 40,
  image: '/images/Products/more/jeweled-red-butterfly.png',
  category: 'cases',
  description: 'iPhone 16 Pro • Jeweled Red Butterfly • Ornate Jeweled Design • High-Gloss Finish • Scratch-Resistant',
  inStock: true
},
{
  id: 'transparent-magsafe',
  name: 'Transparent MagSafe Case',
  price: 40,
  image: '/images/Products/more/transparent-magsafe-case.png',
  category: 'cases',
  description: 'iPhone 16 Pro Max • Frosted Clear • MagSafe Compatible • Anti-Yellowing • Shock Absorption • Slim Design',
  inStock: true
},
{
  id: 'carbon-fiber-kickstand',
  name: 'Carbon Fiber MagSafe Case with Kickstand',
  price: 40,
  image: '/images/Products/more/carbon-fiber-magsafe-case.png',
  category: 'cases',
  description: 'iPhone 16 Pro • Dark Grey Carbon Fiber • MagSafe Compatible • Integrated Kickstand • Durable • Scratch-Resistant • Slim Design',
  inStock: true
},
{
  id: 'rugged-camera-slide',
  name: 'Rugged Camera Slide Case',
  price: 40,
  image: '/images/Products/more/rugged-camera-slide.png',  // Note: You'll need to add this image
  category: 'cases',
  description: 'iPhone 16 Pro • Matte Black • Sliding Camera Cover for Privacy • Military-Grade Drop Protection • Anti-Slip Grip • Raised Edges',
  inStock: true
},
{
  id: 'i-like-cases-samsung',
  name: 'Cases for Samsung and iPhone',
  image: '/images/Products/more/i-like-phone-cases.png',
  price: 40,
  category: 'cases',
  availability: 'In Stock',
  specs: {
    type: 'MagSafe Compatible',
    models: 'Samsung Galaxy S25 Ultra, S24 Ultra',
    feature: 'Magnetic attachment',
    protection: 'Drop protection'
  }
},
{
  id: 'i-like-cases-iphone',
  name: 'i-Like MagSafe Cases for iPhone and Samsung',
  image: '/images/Products/more/i-like-for-iphones.png',
  price: 50,
  category: 'cases',
  availability: 'In Stock',
  specs: {
    type: 'MagSafe Compatible',
    models: 'iPhone 11, 12/12 Pro, 12 Pro Max, 13/14, 13 Pro Max, 14 Pro Max, 15, 15 Pro Max, 16/16+/16 Pro Max',
    feature: 'Magnetic attachment',
    protection: 'Drop protection'
  }
},

// POWER STRIPS & SURGE PROTECTORS
{
  id: 'nipponamerica-power-strip',
  name: 'Nipponamerica 6-Outlet AC Power Strip',
  image: '/images/Products/more/nipponamerica-6outlet-power-strip.png',
  price: 35.00,
  category: 'power-strips',
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
  image: '/images/Products/more/ldnio-power-socket-usb.png',
  price: 70.00,
  category: 'power-strips',
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
  image: '/images/Products/more/ldnio-4u-power-strip.png',
  price: 70.00,
  category: 'power-strips',
  availability: 'In Stock',
  specs: {
    outlets: '4 universal outlets + 4 USB ports',
    output: '2.4A per USB port',
    power: '220v',
    feature: 'Smart IC chip technology'
  }
},

    // APPLE PRODUCTS
{
  id: 'apple-type-c-brick',
  name: 'Apple 20W USB-C Power Adapter',
  image: '/images/Products/more/apple-type-c-brick.png',
  price: 85.00,
  category: 'apple',
  availability: 'In Stock',
  specs: {
    power: '20W Fast Charging',
    compatibility: 'iPhone 8 and later',
    type: 'USB-C Power Adapter'
  }
},

{
  id: 'apple-usb-c-cable',
  name: 'Apple USB-C Cable',
  image: '/images/Products/more/apple-usb-c-cable.png',
  price: 75.00,
  category: 'apple',
  availability: 'In Stock',
  specs: {
    length: '1 meter',
    type: 'USB-C Charge Cable',
    compatibility: 'USB-C devices'
  }
},
{
  id: 'apple-lightning-usb',
  name: 'Apple Lightning to USB Cable',
  image: '/images/Products/more/apple-lightning-to-usb.png',
  price: 80.00,
  category: 'apple',
  availability: 'In Stock',
  specs: {
    length: '2 meters',
    type: 'Lightning Cable',
    compatibility: 'iPhone, iPad, iPod'
  }
},
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
  availability: 'Limited Stock',
  color: '3 left',
  specs: {
    generation: '3rd Gen',
    battery: '6 hours listening time',
    charging: 'MagSafe & Lightning',
    features: 'Spatial audio, Adaptive EQ'
  }
},
{
  id: 'apple-watch-magnetic',
  name: 'Apple Watch Magnetic Charger to USB',
  image: '/images/Products/more/apple-watch-magnetic-charger.png',
  price: 130.00,
  category: 'apple',
  availability: 'Limited Stock',
  specs: {
    length: '1 meter',
    type: 'Magnetic Charging Cable',
    compatibility: 'All Apple Watch models'
  }
},
{
  id: 'air-tag',
  name: 'Apple AirTag',
  image: '/images/Products/more/air-tag-personal-belonging-tracker.png',
  price: 220.00,
  category: 'apple',
  availability: 'Limited Stock',
  color: '2 left',
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
  availability: 'More Coming Soon',
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
  availability: 'Limited Stock',
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
  availability: 'More Coming Soon',
  specs: {
    type: 'Sport Earbuds',
    waterproof: 'IPX7 Waterproof',
    battery: '30 hours total',
    design: 'Secure wing fit'
  }
},

// MOUSE - New category
{
  id: 'nippon-usb-mouse',
  name: 'Nipponamerica USB Mouse',
  image: '/images/Products/more/nipponamerica-usb-mouse.png',
  price: 40.00,
  category: 'mouse',
  availability: 'In Stock',
  color: '5 left',
  specs: {
    compatibility: 'Windows 95/98/ME/NT/XP/WIN7, MAC OS',
    connection: 'USB Wired'
  }
},
{
  id: 'nippon-wireless-mouse',
  name: 'Nipponamerica Wireless Mouse',
  image: '/images/Products/more/nipponamerica-wireless-mouse.png',
  price: 60.00,
  category: 'mouse',
  availability: 'In Stock',
  color: '9 left',
  specs: {
    frequency: '2.40GHz ~ 2.483GHz',
    range: '12 meters',
    battery: 'AAA x2 batteries (not included)'
  }
},
{
  id: 'philips-m344-mouse',
  name: 'Philips M344 Wireless Mouse',
  image: '/images/Products/more/philips-m344-wireless-mouse.png',
  price: 75.00,
  category: 'mouse',
  availability: 'Low Stock',
  color: '2 left',
  specs: {
    buttons: '3 buttons',
    frequency: '2.4GHz wireless',
    sensor: 'Optical sensor',
    battery: 'AA batteries (not included)'
  }
},
{
  id: 'philips-m413-mouse',
  name: 'Philips M413 Wireless Mouse',
  image: '/images/Products/more/philips-m413-wireless-mouse.png',
  price: 75.00,
  category: 'mouse',
  availability: 'Low Stock',
  color: '2 left',
  specs: {
    buttons: '4 buttons',
    battery: 'Rechargeable',
    surface: 'Alloy surface'
  }
},

// RCA SPEAKERS
{
  id: 'rca-tws-gamerbeat-speaker',
  name: 'RCA TWS GamerBeat Bluetooth Party Speaker',
  image: '/images/Products/more/rca-tws-gamerbeat-speaker.png',
  price: 220.00,
  category: 'speakers',
  availability: 'Limited Stock',
  color: '2 left',
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
  availability: 'Limited Stock',
  color: '2 left',
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
  price: 580.00,
  category: 'speakers',
  availability: 'Limited Stock',
  color: '2 left',
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
  availability: 'Limited Stock',
  color: '2 left',
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
  availability: 'Limited Stock',
  color: '2 left',
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
  availability: 'Limited Stock',
  color: '2 left',
  specs: {
    features: 'LED Color Flame Effect, High Fidelity',
    modes: 'Karaoke mode, FM Radio',
    inputs: 'Memory device, Mic port, Aux port'
  }
},

// CAR AUDIO & ACCESSORIES
{
  id: 'yesido-usb-transmitter',
  name: 'YESIDO USB Transmitter - Wireless Audio Adapter',
  image: '/images/Products/more/yesido-usb-transmitter.png',
  price: 60.00,
  category: 'car-accessories',
  availability: 'In Stock',
  color: '8 left',
  specs: {
    type: 'Wireless Aux adapter audio transmitter receiver',
    range: '10m range with BT 5.0',
    feature: 'Efficient signal reception'
  }
},
{
  id: 'yesido-audio-adapter',
  name: 'Yesido Audio Adapter - Transmitter & Receiver',
  image: '/images/Products/more/yesido-audio-adapter.png',
  price: 60.00,
  category: 'car-accessories',
  availability: 'Low Stock',
  color: '6 left',
  specs: {
    type: 'Rechargeable audio transmitter & receiver',
    features: 'Hands-free calls, 10hrs music time',
    extra: 'Supports TF Card'
  }
},
{
  id: 'yesido-wireless-carplay',
  name: 'Yesido Wireless CarPlay Adapter',
  image: '/images/Products/more/yesido-wireless-carplay.png',
  price: 120.00,
  category: 'car-accessories',
  availability: 'Limited Stock',
  color: '2 left',
  specs: {
    compatibility: 'iOS 10+',
    memory: '1GB RAM',
    wifi: '5G/2.4G Dual-Band',
    feature: 'Converts wired to wireless CarPlay, OTA updates'
  }
},
{
  id: 'car-mp3-player-c15',
  name: 'C15 Car MP3 Player with RGB Lighting',
  image: '/images/Products/more/car-mp3-player-c15.png',
  price: 100.00,
  category: 'car-accessories',
  availability: 'Limited Stock',
  color: '1 left',
  specs: {
    compatibility: 'iPad, iPhone, MP3, MP4, PSP & camera',
    bluetooth: 'BT 5.0 with noise reduction',
    features: 'RGB ambient lighting, 3.1A + Type-C'
  }
},
{
  id: 'car-f2-transmitter',
  name: 'Car F2 FM Transmitter with Digital Display',
  image: '/images/Products/more/car-f2-transmitter.png',
  price: 100.00,
  category: 'car-accessories',
  availability: 'Low Stock',
  color: '5 left',
  specs: {
    frequency: '87.5-108.0 MHz',
    supports: 'U Disk, TF Card, MP3 format',
    features: 'Digital display, hands-free calls'
  }
},
{
  id: 'audiobox-fm-transmitter',
  name: 'AudioBox FM Transmitter',
  image: '/images/Products/more/audiobox-fm-transmitter.png',
  price: 100.00,
  category: 'car-accessories',
  availability: 'Low Stock',
  color: '3 left',
  specs: {
    charging: 'USB Fast charge, 3.1A output',
    features: 'Hands-free calls, TF card support',
    extra: 'Bluetooth music, MP3 support'
  }
},

// MICROPHONES
{
  id: 'hypergear-stream-record-mic',
  name: 'HyperGear Sound Advantage Pro Condenser Microphone',
  image: '/images/Products/more/hypergear-stream-record-mic.png',
  price: 180.00,
  category: 'microphones',
  availability: 'Limited Stock',
  color: '2 left',
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
  color: '8 left',
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
  availability: 'Limited Stock',
  color: '1 left',
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
  color: '8 left',
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
  availability: 'Limited Stock',
  color: '2 left',
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
  color: '3 left',
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
  availability: 'Limited Stock',
  color: '2 left',
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
  availability: 'Limited Stock',
  color: '1 left',
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
  availability: 'Limited Stock',
  color: '1 left',
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
  color: '5 left',
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
  availability: 'Limited Stock',
  color: '2 left',
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
  color: '4 left',
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
  availability: 'Limited Stock',
  color: '2 left',
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
  availability: 'Limited Stock',
  color: '2 left',
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
    '8inch': '9 left - $25',
    '10inch': '3 left - $35',
    '12inch': '5 left - $40',
    '15inch': '6 left - $45'
  }
},
{
  id: 'audiopipe-pvc-speaker-ring',
  name: 'Audiopipe 8" PVC Speaker Ring',
  image: '/images/Products/more/audiopipe-pvc-speaker-ring.png',
  price: 55.00,
  category: 'car-audio',
  availability: 'Low Stock',
  color: '5 left',
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
  availability: 'Limited Stock',
  color: '2 left',
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
  availability: 'Limited Stock',
  color: '2 left',
  specs: {
    includes: 'Ten 12×24 inch sheets',
    feature: 'Eliminates road noise'
  }
},

// NETWORK & CABLES
{
  id: 'na-indoor-tv-antenna',
  name: 'Indoor TV Antenna (Push On)',
  image: '/images/Products/more/na-indoor-tv-antenna.png',
  price: 20.00,
  category: 'tv-accessories',
  availability: 'Low Stock',
  color: '6 left',
  specs: {
    type: 'UHF/VHF Antenna',
    includes: 'Coaxial cable & quick connect plug'
  }
},
{
  id: 'cat5-patch-cord',
  name: 'Nippon America CAT5 Patch Cord - Multiple Lengths',
  image: '/images/Products/more/cat5-patch-cord.png',
  price: 10.00, // Starting price
  category: 'network',
  availability: 'In Stock',
  specs: {
    '3FT': '$10',
    '6FT': '$15',
    '10FT': '$20',
    '15FT': '$25',
    '25FT': '$35',
    '50FT': '$40',
    '75FT': '$50',
    '100FT': '$75'
  }
},

// POWER BANK (add this one too if you haven't already)
{
  id: 'pocket-juice-flashlight',
  name: 'Pocket Juice Power Bank with Flashlight',
  image: '/images/Products/more/pocket-juice-power-bank-with-flashlight.png', // You'll need to add this image
  price: 100.00,
  category: 'powerbanks',
  availability: 'Limited Stock',
  color: '1 remaining',
  specs: {
    capacity: '2600mAh',
    charging: 'Up to 1X charge',
    ports: '1 USB port',
    feature: 'Weather proof with flashlight'
  }
},

{
  id: 'steel-series-stratus',
  name: 'SteelSeries Stratus+ Wireless Mobile Gaming Controller',
  image: '/images/Products/more/steel-series-stratus-controller.png',
  price: 160.00,
  category: 'gaming',
  availability: 'In Stock',
  color: 'Black - 5 available',
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
  availability: 'Limited Stock',
  color: 'Black - 2 left',
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
  availability: 'Limited Stock',
  color: '1 left',
  specs: {
    type: 'Quick Charging Stand',
    compatibility: 'PS5 DualSense Wireless Controller'
  }
},
{
  id: 'universal-smart-remote',
  name: 'Universal Smart TV Remote',
  image: '/images/Products/more/universal-remote.png',
  price: 65.00,
  category: 'tv-accessories',
  availability: 'Low Stock',
  color: '2 left',
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
  color: '7 left'
},
{
  id: 'vizio-smart-remote',
  name: 'Vizio Smart TV Remote',
  image: '/images/Products/more/vizio-smart-tv-remote.png',
  price: 40.00,
  category: 'tv-accessories',
  availability: 'In Stock',
  color: '12 left'
},
{
  id: 'hisense-smart-remote',
  name: 'Hisense Smart TV Remote',
  image: '/images/Products/more/high-sense-smart-tv-remote.png',
  price: 40.00,
  category: 'tv-accessories',
  availability: 'Low Stock',
  color: '5 left'
},
{
  id: 'samsung-smart-remote',
  name: 'Samsung Smart TV Remote',
  image: '/images/Products/more/samsung-smarttvremote.png',
  price: 40.00,
  category: 'tv-accessories',
  availability: 'In Stock',
  color: '11 left'
},
{
  id: 'roku-tv-remote',
  name: 'Roku TV Remote',
  image: '/images/Products/more/roku-tv-remote.png',
  price: 40.00,
  category: 'tv-accessories',
  availability: 'More Coming Soon',
  color: '2 left'
},
{
  id: 'firestick-remotes',
  name: 'Fire Stick Remotes',
  image: '/images/Products/more/fire-stick-remotes.png',
  price: 40.00,
  category: 'tv-accessories',
  availability: 'In Stock',
  color: '27 total (8, 8, 11)'
},
{
  id: 'fire-tv-stick-4k',
  name: 'Fire TV Stick 4K Ultra HD',
  image: '/images/Products/more/fire-tv-stick-4K-ultra-HD.png',
  price: 199.00,
  category: 'tv-accessories',
  availability: 'More Coming Soon',
  color: '3 left',
  specs: {
    feature: 'Wi-Fi 6',
    resolution: '4K Ultra HD'
  }
},
{
  id: 'nippon-wifi-repeater',
  name: 'Nippon America Wireless Repeater',
  image: '/images/Products/more/nippon-america-wireless-repeater.png',
  price: 135.00,
  category: 'network',
  availability: '3 left',
  specs: {
    model: 'IBM-WR400ANT',
    type: 'Wi-Fi Extender',
    frequency: '2.412 - 2.4835 GHz',
    speed: '300mbps'
  }
},
{
  id: 'ludger-rechargeable-fan',
  name: 'LUDGER Rechargeable Fan EL-8210F',
  image: '/images/Products/more/ludger-power-light-rechargeable-fan.png',
  price: 220.00,
  category: 'emergency',
  availability: 'Low Stock',
  color: '4 left',
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
  id: 'ludger-battery-charger-100a',
  name: 'LUDGER Battery Charger LBCG-12-100',
  image: '/images/Products/more/ledger-power-light-battery-charger.png',
  price: 600.00,
  category: 'power',
  availability: 'Low Stock',
  color: '2 left',
  specs: {
    input: '120V AC / 60Hz',
    battery: '12V Lead-acid',
    power: '<330W',
    modes: '12V/2A, 12V/15A, 12V/100A engine start',
    features: 'LED display, Regular & AGM settings',
    weight: '7.3kg (16.1lbs)'
  }
},
{
  id: 'ludger-battery-charger-6a',
  name: 'LUDGER Battery Charger LBCG-612-6',
  image: '/images/Products/more/ledger-power-light-battery-charger-LBCG-612-6.png',
  price: 375.00,
  category: 'power',
  availability: 'Low Stock',
  color: '2 left',
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
  id: 'ludger-rechargeable-handy-light-7005',
  name: 'LUDGER Rechargeable Handy Light EL-7005L',
  image: '/images/Products/more/ludger-rechargeable-handy-light.png',
  price: 50.00,
  category: 'emergency',
  availability: 'Low Stock',
  color: '4 left',
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
  image: '/images/Products/more/ludger-rechargeable-lantern-cream.png',
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
  id: 'ludger-lantern-blue-536',
  name: 'LUDGER Emergency Lantern EL-536USV (Blue)',
  image: '/images/Products/more/ludger-rechargeable-lantern-blue.png',
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
  id: 'airbro-portable-fan-2600',
  name: 'Airbro ONE Portable Fan with Powerbank',
  image: '/images/Products/more/airbro-one-portable-fan-powerbank.png',
  price: 140.00,
  category: 'powerbanks',
  availability: 'Low Stock',
  color: '3 left',
  specs: {
    battery: '2600mAh lithium-ion',
    duration: '3hrs high speed, 9hrs low speed',
    features: 'Detachable powerbank, 6 blade design',
    settings: '5 speed settings, charging dock'
  }
},
{
  id: 'samsung-type-cc-cable',
  name: 'Samsung Type C-C Cable',
  image: '/images/Products/more/samsung-type-c-c-cable.png',
  price: 75.00,
  category: 'samsung',
  availability: 'In Stock',
  specs: {
    length: '1m'
  }
},
{
  id: 'samsung-25w-adapter-cable-bundle',
  name: 'Samsung 25W Power Adapter and Charging Cable',
  image: '/images/Products/more/samsung-25w-power-adapter.png',
  price: 150.00,
  category: 'samsung',
  availability: 'In Stock'
},
{
  id: '65w-pd-power-trio',
  name: '65W PD Power Adapter Trio',
  image: '/images/Products/more/65w-pd-power-adapter.png',
  price: 200.00,
  category: 'samsung',
  availability: 'In Stock',
  specs: {
  ports: 'USB-C x2 (65W & 25W), USB-A (15W)'
  }
},
{
  id: 'samsung-25w-type-c-adapter',
  name: 'Samsung 25W Type-C Power Adapter',
  image: '/images/Products/more/samsung-25w-type-c-power-adapter.png',
  price: 75.00,
  category: 'samsung',
  availability: 'In Stock'
},
{
  id: 'samsung-galaxy-watch-7',
  name: 'Samsung Galaxy Watch 7',
  image: '/images/Products/more/samsung-galaxy-watch.png',
  price: 1100.00,
  category: 'samsung',
  availability: 'Limited Stock',
  color: '1 left',
  specs: {
    connectivity: 'Bluetooth, Wi-Fi & GPS',
    compatibility: 'Android 11.0+ with 1.5GB+ memory'
  }
},
{
  id: 'samsung-wireless-charger-15w',
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
  id: 'samsung-type-c-usb',
  name: 'Samsung Type-C to USB Cable',
  image: '/images/Products/more/samsung-type-c-usb-cable.png',
  price: 75.00,
  category: 'samsung',
  availability: 'In Stock'
},
{
  id: 'samsung-usb-brick',
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
  id: 'samsung-micro-cable',
  name: 'Samsung Micro-USB Charging Cable',
  image: '/images/Products/more/samsung-micro-usb.png',
  price: 75.00,
  category: 'samsung',
  availability: 'In Stock'
},
{
  id: 'generic-type-c-lightning',
  name: 'Generic Type-C to Lightning Cable',
  image: '/images/Products/more/generic-type-c-2-lightning.png',
  price: 40.00,
  category: 'cables',
  availability: 'In Stock'
},
{
  id: '3in1-hdtv-cable',
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
{
  id: '3in1-hdtv-streaming',
  name: '3-in-1 HDTV Streaming Cable',
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
  id: 'yesido-4in1-ca200',
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
  id: 'generic-micro-usb',
  name: 'Generic Micro to USB Cable',
  image: '/images/Products/more/generic-micro-usb.png',
  price: 40.00,
  category: 'cables',
  availability: 'In Stock',
  specs: {
    type: 'Fast Charge Cable'
  }
},
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
  availability: 'Limited Stock',
  color: 'Pulse Red - 1 left',
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
  availability: 'Limited Stock',
  color: 'Black - 1 left',
  specs: {
    compatibility: 'Xbox Series X|S, Xbox One, Windows, Android & iOS',
    type: 'Wireless Controller'
  }
},

{
  id: 'hypergear-powerpack-mini',
  name: 'HyperGear PowerPack Mini',
  image: '/images/Products/more/hyper-gear-power-pack-mini.png',
  price: 99.00,
  category: 'powerbanks',
  availability: 'Low Stock',
  color: '3 left',
  specs: {
    capacity: '5000mAh',
    output: '20W USB-C PD Fast Charge, 18W USB Fast Charge'
  }
},
{
  id: 'hypergear-clearcharge-xl',
  name: 'HyperGear ClearCharge XL Power Bank',
  image: '/images/Products/more/hyper-gear-clear-charge-power-bank.png',
  price: 180.00,
  category: 'powerbanks',
  availability: 'Limited Stock',
  color: '1 left',
  specs: {
    capacity: '20000mAh',
    battery: '48+ hours extra battery life',
    charging: 'Charges 3 devices simultaneously',
    ports: '2 USB Fast Charge, 1 USB-C 20W input/output'
  }
},
{
  id: 'rca-car-holder',
  name: 'RCA Car Holder',
  image: '/images/Products/more/rca-car-holder.png',
  price: 60.00,
  category: 'car-accessories',
  availability: 'Low Stock',
  color: '2 left',
  specs: {
    mount: 'Suction Dashboard & Windshield',
    features: 'Adjust to any angle, 360° rotation',
    adjustment: 'Telescopic adjustment'
  }
},
{
  id: 'hypergear-universal-holder',
  name: 'HyperGear Universal Phone Holder',
  image: '/images/Products/more/hypergear-universal-phone-holder.png',
  price: 80.00,
  category: 'car-accessories',
  availability: 'Low Stock',
  color: '2 left',
  specs: {
    mount: 'Suction Dashboard, Vent & Windshield',
    attachment: 'Easy magnetic attachment',
    compatibility: 'MagSafe compatible',
    includes: 'Adapter for non-MagSafe devices'
  }
},
{
  id: 'yesido-c267',
  name: 'Yesido Car Holder C267',
  image: '/images/Products/more/yesido-car-holder-c267.png',
  price: 50.00,
  category: 'car-accessories',
  availability: 'In Stock',
  color: '8 left',
  specs: {
    mount: 'Suction cup & windshield',
    features: 'Press to unlock, Horizontal & vertical',
    arm: 'Adjustable telescopic arm',
    suction: 'Vacuum suction cup'
  }
},
{
  id: 'yesido-c173',
  name: 'Yesido Car Holder C173',
  image: '/images/Products/more/yesido-car-holder-c173.png',
  price: 60.00,
  category: 'car-accessories',
  availability: 'In Stock',
  color: '9 left',
  specs: {
    mount: 'Suction cup & windshield',
    features: 'Horizontal & vertical',
    arm: 'Adjustable telescopic arm',
    rotation: '360° rotation suction cup'
  }
},
{
  id: 'yesido-c261',
  name: 'Yesido Car Holder C261',
  image: '/images/Products/more/yesido-car-holder-c261.png',
  price: 60.00,
  category: 'car-accessories',
  availability: 'In Stock',
  color: '6 left',
  specs: {
    features: 'One hand operation',
    mount: 'Suction cup & windshield',
    orientation: 'Horizontal & vertical',
    arm: 'Adjustable telescopic arm',
    rotation: '360° rotation'
  }
},
{
  id: 'skullcandy-barrel',
  name: 'Skull Candy Barrel Speaker',
  image: '/images/Products/more/skull-candy-barrel-speaker.png',
  price: 999.00,
  category: 'speakers',
  availability: 'Limited Stock',
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
  availability: 'Limited Stock',
  color: '1 left',
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
      availability: 'More Coming Soon',
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
      availability: 'More Coming Soon',
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
  availability: 'More Coming Soon',
  color: 'Blue - 1 left',
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
  availability: 'More Coming Soon',
  color: 'Navy Blue - 2 left',
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
  availability: 'More Coming Soon',
  color: 'White - 3 left',
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
  availability: 'More Coming Soon',
  color: 'White - 2 left',
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
  availability: 'More Coming Soon',
  color: 'White - 2 left',
  specs: {
    modes: 'Flip in: Headphone mode | Flip out: Speaker mode',
    eq: '3 EQ Settings: Classic, Voice Boost, Bass Boost',
    audio: '4 modes: Bluetooth, 3.5mm aux, Micro SD, FM Radio',
    features: 'Adjustable headband, rotating ear cups'
  }
},

// SPEAKERS - Additional Skull Candy
{
  id: 'skullcandy-ounce-red',
  name: 'Skull Candy Ounce',
  image: '/images/Products/more/skull-candy-ounce-red.png',
  price: 160.00,
  category: 'speakers',
  availability: 'Limited Stock',
  color: 'Red - 1 left',
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
  availability: 'Limited Stock',
  color: 'Black - 1 left',
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
  availability: 'Limited Stock',
  color: 'Red - 1 left',
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
  color: 'Blue - 2 left',
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
  availability: 'Low Stock',
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
  availability: 'Limited Stock',
  color: '1 left',
  specs: {
    waterproof: 'Waterproof design',
    battery: '12 hours battery life',
    sound: '360° sound'
  }
},

// STORAGE - New category
{
  id: 'sandisk-16gb',
  name: 'SanDisk Cruzer Blade USB 2.0 - 16GB',
  image: '/images/Products/more/sandisk-cruzer-blade-usb-2.0-16gb.png',
  price: 50.00,
  category: 'storage',
  availability: 'In Stock',
  color: '12 left',
  specs: {
    capacity: '16GB',
    interface: 'USB 2.0',
    type: 'Flash Drive'
  }
},
{
  id: 'adata-32gb',
  name: 'ADATA USB 3.2 Flash Drive - 32GB',
  image: '/images/Products/more/adata-usb-3.2-flash-drive-32gb.png',
  price: 80.00,
  category: 'storage',
  availability: 'In Stock',
  color: '13 left',
  specs: {
    capacity: '32GB',
    interface: 'USB 3.2',
    type: 'Flash Drive'
  }
},
{
  id: 'sandisk-64gb',
  name: 'SanDisk Cruzer Blade USB 2.0 - 64GB',
  image: '/images/Products/more/sandisk-cruzer-blade-usb-2.0-64gb.png',
  price: 100.00,
  category: 'storage',
  availability: 'In Stock',
  color: '16 left',
  specs: {
    capacity: '64GB',
    interface: 'USB 2.0',
    type: 'Flash Drive'
  }
},
{
  id: 'sandisk-dual-64gb',
  name: 'SanDisk Ultra Dual Drive Go USB 3.1 - 64GB',
  image: '/images/Products/more/sandisk-ultra-dual-drive-go-usb-3.1-4gb.png',
  price: 100.00,
  category: 'storage',
  availability: 'Low Stock',
  color: '4 left',
  specs: {
    capacity: '64GB',
    interface: 'USB 3.1',
    type: 'Dual Drive Flash Drive'
  }
},
{
  id: 'sandisk-128gb',
  name: 'SanDisk Cruzer Blade USB 2.0 - 128GB',
  image: '/images/Products/more/sandisk-cruzer-blade-usb-2.0-128gb.png',
  price: 120.00,
  category: 'storage',
  availability: 'In Stock',
  color: '15 left',
  specs: {
    capacity: '128GB',
    interface: 'USB 2.0',
    type: 'Flash Drive'
  }
},
{
  id: 'memory-card-16gb',
  name: 'SanDisk Ultra Memory Card - 16GB',
  image: '/images/Products/more/sandisk-ultra-memory-card-16gb.png',
  price: 50.00,
  category: 'storage',
  availability: 'In Stock',
  specs: {
    capacity: '16GB',
    speed: 'Up to 80 MB/s',
    type: 'Memory Card'
  }
},
{
  id: 'memory-card-32gb',
  name: 'ADATA Memory Card - 32GB',
  image: '/images/Products/more/adata-memory-card-32gb.png',
  price: 80.00,
  category: 'storage',
  availability: 'In Stock',
  specs: {
    capacity: '32GB',
    speed: 'Up to 100 MB/s',
    type: 'Memory Card'
  }
},
{
  id: 'memory-card-64gb',
  name: 'SanDisk Ultra Memory Card - 64GB',
  image: '/images/Products/more/sandisk-ultra memory-card-64gb.png',
  price: 100.00,
  category: 'storage',
  availability: 'In Stock',
  specs: {
    capacity: '64GB',
    speed: 'Up to 100 MB/s',
    type: 'Memory Card'
  }
},
{
  id: 'memory-card-128gb',
  name: 'SanDisk Ultra Memory Card - 128GB',
  image: '/images/Products/more/sandisk-ultra-memory-card-128gb.png',
  price: 120.00,
  category: 'storage',
  availability: 'In Stock',
  specs: {
    capacity: '128GB',
    speed: 'Up to 100 MB/s',
    type: 'Memory Card'
  }
},
{
  id: 'memory-card-256gb',
  name: 'SanDisk Ultra Memory Card - 256GB',
  image: '/images/Products/more/sandisk-ultra-memory-card-256gb.png',
  price: 160.00,
  category: 'storage',
  availability: 'In Stock',
  specs: {
    capacity: '256GB',
    speed: 'Up to 100 MB/s',
    type: 'Memory Card'
  }
},
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
    power: "Power",
    "tv-accessories": "TV & Streaming",
    "network": "Network",
    "car-accessories": "Car Accessories",
    "mouse": "Mouse",
    "storage": "Storage",
    apple: "Apple",
    cases: "Phone Cases",
    microphones: "Microphones",
    "audio-interfaces": "Audio Interfaces", 
    "car-audio": "Car Audio",
    "power-strips": "Power Strips",
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
    powerbanks: "Batteries Portables",
    earbuds: "Écouteurs",
    headphones: "Casques",
    filterBy: "Filtrer par:",
    gaming: "Jeux",
    emergency: "Urgence",
    cables: "Câbles",
    samsung: "Samsung",
    power: "Alimentation",
    "tv-accessories": "TV et Streaming",
    "network": "Réseau",
    "car-accessories": "Accessoires Auto",
    "mouse": "Souris",
    "storage": "Stocrage",
    apple: "Apple",
    cases: "Étuis de Téléphone",
    "power-strips": "Multiprises",
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
    powerbanks: "Baterías Portátiles",
    earbuds: "Auriculares",
    headphones: "Audífonos",
    filterBy: "Filtrar por:",
    gaming: "Juegos",
    emergency: "Emergencia",
    cables: "Cables",
    samsung: "Samsung",
    power: "Energía",
    "tv-accessories": "TV y Streaming",
    "network": "Red",
    "car-accessories": "Accesorios para Auto",
    "mouse": "Ratón",
    "storage": "Almacenamiento",
    apple: "Apple",
    cases: "Fundas de Teléfono",
    "power-strips": "Regletas",
  }
};

  const t = translations[language as keyof typeof translations];

  // Filter products based on selected category
  const filteredProducts = filterCategory === 'all' 
  ? products 
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
          {['all', 'speakers', 'powerbanks', 'earbuds', 'headphones', 'gaming', 'emergency', 'cables', 'samsung', 'apple', 'cases', 'power', 'tv-accessories', 'network', 'car-accessories', 'mouse', 'storage', 'microphones', 'audio-interfaces', 'car-audio', 'power-strips'].map((cat) => (
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
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-4 overflow-hidden" style={{ height: '240px' }}>
      {/* More Coming Soon Overlay */}
      {product.availability === 'More Coming Soon' && (
        <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center pointer-events-none">
          <span className="text-black font-bold text-xl rotate-[-15deg] bg-yellow-400 px-4 py-2 rounded shadow-lg pointer-events-none">
            MORE COMING SOON
          </span>
        </div>
      )}
      
      <img 
  src={product.image}
  alt={product.name}
  className="w-full h-full object-contain transition-transform duration-700 hover:scale-125"
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
  
  {/* Status Badge - Conditional */}
  {selectedProduct.availability === 'More Coming Soon' ? (
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
                {/* More Coming Soon Message */}
{selectedProduct.availability === 'More Coming Soon' && (
  <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
    <p className="text-yellow-700 font-semibold">
      📦 This item is sold out, but will be coming back soon! Check back later or contact us for updates.
    </p>
  </div>
)}
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