'use client';
import { useState } from 'react';
import { ArrowLeft, Wrench, Shield, Clock, CheckCircle, Phone, MessageCircle, DollarSign, Smartphone, Battery, Monitor, Cpu, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function RepairServicePage() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [language, setLanguage] = useState('en');

  // Repair services data
  const repairServices = [
  {
  id: 'google-unlock',
  title: 'Google Account Unlock (FRP)',
  icon: <Smartphone className="w-8 h-8" />,
  description: 'Factory Reset Protection removal - regain access to your locked device',
  basePrice: 'From $100 up',
  details: [
    'Google FRP bypass',
    'All Android models supported',
    'Samsung specialist unlocking',
    'Data preservation when possible',
    'Same-day service'
  ],
  turnaround: '1-3 hours',
  },
{
  id: 'network-unlock',
  title: 'Network/Carrier Unlock',
  icon: <Shield className="w-8 h-8" />,
  description: 'Unlock your phone to use with any carrier worldwide',
  basePrice: 'From $100 up',
  details: [
    'All major carriers supported',
    'iPhone carrier unlock',
    'Samsung network unlock',
    'International compatibility',
    'Permanent unlock solution'
  ],
  turnaround: '1-24 hours',
  },
    {
      id: 'screen-replacement',
      title: 'LCD Screen Replacement',
      icon: <Monitor className="w-8 h-8" />,
      description: 'Professional LCD screen replacement for Samsung and iPhone devices',
      basePrice: 'From $200 up',
      details: [
        'FREE Installation If You Buy From Us',
        'Samsung Galaxy S Series',
        'Samsung Galaxy A Series', 
        'iPhone 11 through iPhone 16 Pro Max',
        'Same-day service available',
        'Genuine and aftermarket options'
      ],
      turnaround: '1-2 hours',
  },
    {
      id: 'charging-port',
      title: 'Charging Port Repair',
      icon: <Battery className="w-8 h-8" />,
      description: 'Fix charging issues with professional port replacement',
      basePrice: 'From $120 up',
      details: [
        'All Samsung models',
        'All iPhone models',
        'USB-C and Lightning ports',
        'Cleaning and replacement service',
        'Moisture damage assessment'
      ],
      turnaround: '1-2 hours',
  },
    {
      id: 'battery-replacement',
      title: 'Battery Replacement',
      icon: <Zap className="w-8 h-8" />,
      description: 'Restore your phone\'s battery life with genuine replacement batteries',
      basePrice: 'From $120 up',
      details: [
        'iPhone and Samsung batteries in stock',
        'Battery health diagnostics',
        'Professional installation',
        'Safe disposal of old battery',
        'Performance optimization'
      ],
      turnaround: '30-45 minutes',
 },
    {
      id: 'water-damage',
      title: 'Water Damage Repair',
      icon: <Shield className="w-8 h-8" />,
      description: 'Emergency water damage assessment and repair services',
      basePrice: 'From $40 up',
      details: [
        'Immediate diagnostic assessment',
        'Component cleaning and drying',
        'Corrosion treatment',
        'Full functionality testing',
        'Data recovery attempts'
      ],
      turnaround: '24-48 hours',
 },
    {
  id: 'laptop-repair',
  title: 'Laptop Repair Services',
  icon: <Monitor className="w-8 h-8" />,
  description: 'Complete laptop repair and maintenance for all brands',
  basePrice: 'From $100 up',
  details: [
    'Windows & Mac laptops',
    'Screen replacement',
    'Keyboard repair/replacement',
    'Hard drive upgrades',
    'RAM upgrades',
    'Virus removal',
    'Operating system reinstall'
  ],
  turnaround: '1-3 days',
},
  {
  id: 'tablet-repair',
  title: 'Tablet Repair Services',
  icon: <Smartphone className="w-8 h-8" />,
  description: 'Professional tablet repair for iPad and Android tablets',
  basePrice: 'From $75 up',
  details: [
    'iPad all models',
    'Samsung Galaxy Tab series',
    'Android tablets',
    'Screen replacement',
    'Battery replacement',
    'Charging port repair',
    'Software issues'
  ],
  turnaround: '1-2 days',
},
    {
      id: 'software-repair',
      title: 'Software & System Repair',
      icon: <Cpu className="w-8 h-8" />,
      description: 'Fix software issues, crashes, and system errors',
      basePrice: 'From $100 up',
      details: [
        'Operating system restoration',
        'App crash fixes',
        'Performance optimization',
        'Virus and malware removal',
        'Data backup and recovery'
      ],
      turnaround: '1-3 hours',
},
    {
      id: 'diagnostic',
      title: 'Diagnostic Service',
      icon: <Wrench className="w-8 h-8" />,
      description: 'Complete phone diagnostic to identify all issues',
      basePrice: '$40 up',
      details: [
        'Full hardware testing',
        'Software analysis',
        'Battery health check',
        'Camera and sensor testing',
        'Free with any repair service'
      ],
      turnaround: '30 minutes',
 }
    
  ];

  // Pricing tiers for customer-supplied parts
  const installationPricing = {
    simple: {
    price: '$120+',
    description: 'Basic installations',
    examples: ['Battery replacement', 'RAM upgrade', 'External buttons']
  },
  moderate: {
    price: '$60-100',
    description: 'Intermediate repairs',
    examples: ['Charging port', 'Keyboard replacement', 'Camera lens']
  },
  complex: {
    price: '$150+',
    description: 'Advanced repairs',
    examples: ['Screen replacement', 'Motherboard repair', 'Laptop screen replacement']
  }
};

  const translations = {
    en: {
      title: 'Professional Phone, Tablet, Laptop Repairs & Unlocking Services',
      subtitle: 'Expert repairs & unlocking for all devices',
      hero: {
      badge: 'Certified Technicians',
      mainText: 'Get Your Device Fixed Today',
      subText: 'Professional repair service with quality parts'
      },
      ourServices: 'Our Services',
      bringYourParts: 'Bring Your Own Parts',
      bringYourPartsDesc: 'Have your own parts? We can install them for you!',
      installationFee: 'Installation Fee',
      whyChooseUs: 'Why Choose Cell World Repair?',
      bookRepair: 'Book Your Repair',
      viewDetails: 'View Details',
      startingFrom: 'Starting from',
      turnaround: 'Turnaround',
      included: 'What\'s Included',
      scheduleRepair: 'Schedule Repair',
      callNow: 'Call Now',
      whatsapp: 'WhatsApp',
      backToHome: 'Back to Home'
    },
    fr: {
      title: 'Réparations Professionnelles - Téléphones, Tablettes, Ordinateurs et Déverrouillage',
      subtitle: 'Réparations et déverrouillage experts pour tous les appareils',
      hero: {
      badge: 'Techniciens Certifiés',
      mainText: 'Faites Réparer Votre Appareil Aujourd\'hui',
      subText: 'Service de réparation professionnel avec pièces de qualité et garantie'
      },
      ourServices: 'Nos Services',
      bringYourParts: 'Apportez Vos Pièces',
      bringYourPartsDesc: 'Vous avez vos propres pièces? Nous pouvons les installer!',
      installationFee: 'Frais d\'installation',
      whyChooseUs: 'Pourquoi Choisir Cell World?',
      bookRepair: 'Réservez Votre Réparation',
      viewDetails: 'Voir Détails',
      startingFrom: 'À partir de',
      turnaround: 'Délai',
      included: 'Ce qui est Inclus',
      scheduleRepair: 'Planifier Réparation',
      callNow: 'Appelez',
      whatsapp: 'WhatsApp',
      backToHome: 'Retour à l\'Accueil'
    },
    es: {
      title: 'Reparaciones Profesionales - Teléfonos, Tabletas, Laptops y Desbloqueo',
      subtitle: 'Reparaciones y desbloqueo expertos para todos los dispositivos',
      hero: {
      badge: 'Técnicos Certificados',
      mainText: 'Repara Tu Dispositivo Hoy',
      subText: 'Servicio de reparación profesional con piezas de calidad y garantía'
      },
      ourServices: 'Nuestros Servicios',
      bringYourParts: 'Trae Tus Propias Piezas',
      bringYourPartsDesc: '¿Tienes tus propias piezas? ¡Podemos instalarlas!',
      installationFee: 'Tarifa de Instalación',
      whyChooseUs: '¿Por Qué Elegir Cell World?',
      bookRepair: 'Reserva Tu Reparación',
      viewDetails: 'Ver Detalles',
      startingFrom: 'Desde',
      turnaround: 'Tiempo',
      included: 'Qué Incluye',
      scheduleRepair: 'Programar Reparación',
      callNow: 'Llamar',
      whatsapp: 'WhatsApp',
      backToHome: 'Volver al Inicio'
    }
  };

  const t = translations[language as keyof typeof translations];

  const whyChooseUs = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Guranteed Protection',
      description: 'Reliable repairs, for your peace of mind'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fast Service',
      description: 'Most repairs completed same day or while you wait'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Quality Parts',
      description: 'We use only high-quality OEM and certified parts'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Fair Pricing',
      description: 'Transparent pricing with no hidden fees'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Video Background - Repair shop in action */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(1.2) contrast(1.1) saturate(1.2)'
          }}
        >
          <source src="/videos/repair-service-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient overlay for better text readability - lighter to show video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        
        {/* Additional vignette effect for edge darkening */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)'
          }}
        />
        
        {/* Fallback gradient if video doesn't load */}
        <div 
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6">
        <div className="flex items-center space-x-4">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.backToHome}</span>
          </Link>
          
          <img 
            src="/images/cell-world-logo.png"
            alt="Cell World"
            className="h-20 w-auto"
            style={{ 
              filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.5))'
            }}
          />
        </div>
        
        <button 
          className="flex items-center space-x-2 bg-yellow-500/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-yellow-500/30 border border-yellow-500/30 transition-all"
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

      {/* Hero Section */}
      <div className="relative z-10 text-center py-12 px-6">
        <div className="inline-block bg-yellow-500/30 backdrop-blur-md px-6 py-2 rounded-full mb-4 border border-yellow-400/50">
          <span className="text-yellow-400 text-sm font-bold uppercase tracking-wider drop-shadow-lg">{t.hero.badge}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl" 
            style={{
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(255, 215, 0, 0.5)',
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.8))'
            }}>
          {t.hero.mainText}
        </h1>
        
        <p className="text-2xl text-white mb-8 font-semibold drop-shadow-xl" 
           style={{
             textShadow: '2px 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)'
           }}>
          {t.hero.subText}
        </p>
        
        <div className="flex justify-center gap-4 flex-wrap">
          <a 
            href="tel:+17844512261"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-2xl text-lg"
            style={{
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.5), 0 8px 20px rgba(0,0,0,0.4)'
            }}
          >
            <Phone className="inline w-6 h-6 mr-2" />
            {t.callNow}
          </a>
          <a 
            href="https://wa.me/17844310777?text=Hi, I need phone repair service"
            className="bg-green-500 text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-2xl text-lg"
            style={{
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.5), 0 8px 20px rgba(0,0,0,0.4)'
            }}
          >
            <MessageCircle className="inline w-6 h-6 mr-2" />
            {t.whatsapp}
          </a>
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-2xl" 
            style={{
              textShadow: '2px 2px 10px rgba(0,0,0,0.9), 0 0 30px rgba(255,215,0,0.3)'
            }}>
          {t.ourServices}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repairServices.map((service) => (
            <div 
              key={service.id}
              className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-lg rounded-xl p-6 hover:scale-105 transition-all cursor-pointer border-2 border-yellow-500/30 hover:border-yellow-400 shadow-2xl"
              onClick={() => setSelectedService(service)}
              style={{
                boxShadow: '0 0 30px rgba(0,0,0,0.7), 0 0 60px rgba(255,215,0,0.1)'
              }}
            >
              <div className="text-yellow-400 mb-4 drop-shadow-lg">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">{service.title}</h3>
              <p className="text-gray-200 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-yellow-400 drop-shadow-lg">{service.basePrice}</span>
                <button className="text-yellow-400 hover:text-yellow-300 font-semibold">
                  {t.viewDetails} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bring Your Own Parts Section */}
      <div className="relative z-10 bg-gradient-to-r from-purple-900/70 to-blue-900/70 backdrop-blur-lg py-12 px-6 border-y-2 border-yellow-500/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-2xl"
              style={{
                textShadow: '2px 2px 10px rgba(0,0,0,0.9), 0 0 30px rgba(255,215,0,0.3)'
              }}>
            {t.bringYourParts}
          </h2>
          <p className="text-center text-white text-xl mb-8 font-semibold drop-shadow-lg">{t.bringYourPartsDesc}</p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {Object.entries(installationPricing).map(([key, tier]) => (
              <div key={key} className="bg-black/80 backdrop-blur-lg rounded-xl p-6 border-2 border-gray-600 hover:border-yellow-500 transition-all shadow-2xl">
                <h3 className="text-xl font-bold mb-2 capitalize text-white drop-shadow-lg">{key} Repair</h3>
                <div className="text-3xl font-bold text-yellow-400 mb-2 drop-shadow-lg">{tier.price}</div>
                <p className="text-gray-200 mb-4 font-semibold">{tier.description}</p>
                <div className="space-y-2">
                  {tier.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-100">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 drop-shadow" />
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-2xl"
            style={{
              textShadow: '2px 2px 10px rgba(0,0,0,0.9), 0 0 30px rgba(255,215,0,0.3)'
            }}>
          {t.whyChooseUs}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, idx) => (
            <div key={idx} className="text-center bg-black/60 backdrop-blur-lg rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-500/50 transition-all">
              <div className="inline-block p-4 bg-yellow-500/30 rounded-full mb-4 text-yellow-400 shadow-lg">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-white drop-shadow-lg">{item.title}</h3>
              <p className="text-gray-200">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 backdrop-blur-lg py-12 px-6 border-t-2 border-yellow-500/20">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-2xl"
              style={{
                textShadow: '2px 2px 10px rgba(0,0,0,0.9), 0 0 30px rgba(255,215,0,0.3)'
              }}>
            {t.bookRepair}
          </h2>
          <p className="text-white text-xl mb-8 font-semibold drop-shadow-lg">Walk-ins welcome • Phone unlocking available</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a 
              href="tel:+17844512261"
              className="bg-white text-black font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-2xl text-lg"
              style={{
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 8px 20px rgba(0,0,0,0.4)'
              }}
            >
              <Phone className="inline w-6 h-6 mr-2" />
              Call: 784-451-2261
            </a>
            <a 
              href="https://wa.me/17844310777"
              className="bg-green-500 text-white font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-2xl text-lg"
              style={{
                boxShadow: '0 0 30px rgba(34, 197, 94, 0.5), 0 8px 20px rgba(0,0,0,0.4)'
              }}
            >
              <MessageCircle className="inline w-6 h-6 mr-2" />
              WhatsApp: 784-431-0777
            </a>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          />
          
          <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-yellow-500/30">
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            
            <div className="text-yellow-400 mb-4">{selectedService.icon}</div>
            <h2 className="text-3xl font-bold mb-4">{selectedService.title}</h2>
            <p className="text-gray-300 mb-6">{selectedService.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-yellow-400 mb-2">{t.included}:</h3>
                <ul className="space-y-2">
                  {selectedService.details.map((detail: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                      <span className="text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400">{t.startingFrom}</p>
                  <p className="text-2xl font-bold text-yellow-400">{selectedService.basePrice}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400">{t.turnaround}</p>
                  <p className="text-lg font-semibold">{selectedService.turnaround}</p>
                </div>
                 </div>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="tel:+17844512261"
                className="flex-1 bg-yellow-500 text-black font-bold py-3 rounded-lg text-center hover:bg-yellow-400 transition-colors"
              >
                {t.scheduleRepair}
              </a>
              <a 
                href="https://wa.me/17844310777"
                className="flex-1 bg-green-500 text-white font-bold py-3 rounded-lg text-center hover:bg-green-400 transition-colors"
              >
                {t.whatsapp}
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}