'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, MessageCircle, MapPin, Package, Clock } from 'lucide-react';

const islands = {
  'bequia': { 
    name: 'Bequia', 
    delivery: 'Same day delivery available for orders before 12pm',
    schedule: 'Delivery Days: Monday, Wednesday, Friday',
    contact: 'Local Agent: Call for details'
  },
  'mustique': { 
    name: 'Mustique', 
    delivery: 'Weekly delivery service',
    schedule: 'Delivery Day: Thursdays',
    contact: 'Concierge service available'
  },
  'canouan': { 
    name: 'Canouan', 
    delivery: 'Twice weekly delivery',
    schedule: 'Delivery Days: Tuesday, Friday',
    contact: 'Resort delivery available'
  },
  'union-island': { 
    name: 'Union Island', 
    delivery: 'Regular ferry delivery',
    schedule: 'Delivery Days: Monday, Thursday',
    contact: 'Pickup at Clifton Harbor'
  },
  'mayreau': { 
    name: 'Mayreau', 
    delivery: 'Weekly service',
    schedule: 'Delivery Day: Wednesdays',
    contact: 'Special arrangements available'
  },
  'palm-island': { 
    name: 'Palm Island', 
    delivery: 'Resort coordination required',
    schedule: 'On-demand delivery',
    contact: 'Contact resort concierge'
  },
  'petit-st-vincent': { 
    name: 'Petit St Vincent', 
    delivery: 'Luxury delivery service',
    schedule: 'Arranged by request',
    contact: 'PSV Resort coordination'
  }
};

export default function IslandPage({ params }: { params: Promise<{ island: string }> }) {
  const resolvedParams = use(params);
  const island = islands[resolvedParams.island as keyof typeof islands] || islands['bequia'];
  
  return (
    <div 
    className="min-h-screen bg-cover bg-center bg-no-repeat relative"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('/images/islands/${resolvedParams.island}.jpg')`,
      backgroundColor: '#0a4f63'
    }}
  >
      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-sm p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-yellow-400">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <img 
            src="/images/cell-world-logo.png"
            alt="Cell World"
            className="h-16"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
  className="text-4xl md:text-5xl mb-4"
  style={{ 
    color: '#FFD700',
    fontFamily: '"Brush Script MT", "Lucida Handwriting", "Dancing Script", cursive',
    fontWeight: '400',
    textShadow: '0 2px 8px rgba(255, 255, 255, 0.4), 0 4px 16px rgba(255, 255, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.5)',
    letterSpacing: '1px'
  }}
>
  Cell World Delivery to {island.name}
</h1>
          <p className="text-xl text-teal-300 mb-8">
            Your favorite electronics delivered right to {island.name}!
          </p>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Delivery Schedule */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-teal-400">
            <div className="flex items-center mb-4">
              <Package className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Delivery Service</h2>
            </div>
            <p className="text-white mb-2">{island.delivery}</p>
            <p className="text-teal-300">{island.schedule}</p>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-yellow-400">
            <div className="flex items-center mb-4">
              <MapPin className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Local Service</h2>
            </div>
            <p className="text-white mb-2">{island.contact}</p>
            <p className="text-teal-300">Free delivery on orders over EC$200</p>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Popular in {island.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/Categories/phones" className="bg-blue-500/20 p-6 rounded-xl hover:bg-blue-500/30 transition">
              <h3 className="text-xl font-bold text-white mb-2">📱 Mobile Phones</h3>
              <p className="text-gray-300">Latest smartphones delivered to {island.name}</p>
            </Link>
            <Link href="/Categories/marine-world" className="bg-teal-500/20 p-6 rounded-xl hover:bg-teal-500/30 transition">
              <h3 className="text-xl font-bold text-white mb-2">🚤 Marine Equipment</h3>
              <p className="text-gray-300">Boat parts & fishing gear</p>
            </Link>
            <Link href="/Categories/more" className="bg-purple-500/20 p-6 rounded-xl hover:bg-purple-500/30 transition">
              <h3 className="text-xl font-bold text-white mb-2">🎮 Electronics</h3>
              <p className="text-gray-300">Gaming, audio & accessories</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-8 text-center border-2 border-yellow-400">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Order?
          </h2>
          <p className="text-gray-300 mb-8">
            Contact us today for delivery to {island.name}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="tel:+17844512261"
              className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-400 inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: 1-784-451-2261
            </a>
            <a 
              href={`https://wa.me/17844310777?text=Hi! I'm interested in delivery to ${island.name}`}
              className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-400 inline-flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Order
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}