'use client';

import { ShoppingCart, Phone, Fish, Package, ArrowRight, Clock, Truck, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OrderPage() {
  const router = useRouter();

  const categories = [
  {
    title: "📱 Mobile Phones",
    description: "Latest smartphones & accessories",
    href: "/Categories/phones",
    bgColor: "from-yellow-500 to-yellow-600",
    icon: Phone
  },
  {
    title: "🐟 Marine World",
    description: "Boat parts, fishing gear & marine equipment",
    href: "/Categories/marine-world",
    bgColor: "from-blue-500 to-blue-600",
    icon: Fish
  },
  {
    title: "🎵 Tech & Audio",
    description: "Speakers, gaming, audio equipment & more",
    href: "/Categories/tech-audio",
    bgColor: "from-cyan-500 to-teal-600",
    icon: Package
  },
  {
    title: "🔌 Accessories & Power",
    description: "Cases, cables, power banks & car accessories",
    href: "/Categories/accessories-power",
    bgColor: "from-purple-500 to-fuchsia-600",
    icon: ShoppingCart
  }
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/order/order-bg.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5
        }}
      />
      
      {/* Background gradient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      
      {/* Content wrapper - wrap all existing content */}
      <div className="relative z-10">
      {/* Header */}
      <div className="relative z-20 p-6 bg-black/50 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/images/cell-world-logo.png"
              alt="Cell World"
              className="h-16 w-auto"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.5))' }}
            />
            <div>
              <h1 className="text-2xl font-bold text-yellow-400">Order Online</h1>
              <p className="text-sm text-gray-400">Pick-up or Delivery Available</p>
            </div>
          </Link>
          
          <div className="text-right">
            <p className="text-sm text-gray-400">Need Help?</p>
            <a href="tel:+17844512261" className="text-yellow-400 font-bold">
              📞 1-784-451-2261
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center py-12 px-4">
        <ShoppingCart className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Start Your Order
        </h2>
        <p className="text-xl text-gray-300 mb-2">
          Choose a category to browse products
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center text-green-400">
            <Clock className="w-5 h-5 mr-2" />
            <span>Quick Pick-up</span>
          </div>
          <div className="flex items-center text-blue-400">
            <Truck className="w-5 h-5 mr-2" />
            <span>Island-wide Delivery</span>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105"
            >
              <div className={`bg-gradient-to-br ${category.bgColor} p-8 h-64 flex flex-col justify-between`}>
                <div>
                  <category.icon className="w-12 h-12 text-white mb-4 opacity-90" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {category.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">Browse Products</span>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-white/30 transition-all">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-16 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
          <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
            How Online Ordering Works
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-yellow-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-400 font-bold">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Browse</h4>
              <p className="text-gray-400 text-sm">Select your category & explore products</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-400 font-bold">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Choose</h4>
              <p className="text-gray-400 text-sm">Pick products you want to order</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-400 font-bold">3</span>
              </div>
              <h4 className="text-white font-semibold mb-2">WhatsApp Us</h4>
              <p className="text-gray-400 text-sm">Click order button to send your request</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-400 font-bold">4</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Get It!</h4>
              <p className="text-gray-400 text-sm">Pick-up in store or get delivery</p>
            </div>
          </div>
        </div>

        {/* Quick Order Button */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Know what you want?</p>
          <a 
            href="https://wa.me/17844310777?text=Hi%20Cell%20World!%20I%20would%20like%20to%20place%20an%20order"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Quick Order via WhatsApp
          </a>
        </div>

        {/* Google Business Profile Integration - PICKUP & DELIVERY */}
        <div className="mt-16 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            🛍️ Pickup & Delivery Options
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="bg-green-500/20 rounded-xl p-6">
                <Truck className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h4 className="text-white font-bold text-lg mb-2">Islands Delivery</h4>
                <p className="text-gray-300 text-sm mb-4">Delivery cost $10</p>
                <p className="text-gray-400 text-xs">Same-day delivery available</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/20 rounded-xl p-6">
                <ShoppingCart className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-bold text-lg mb-2">In-Store Pickup</h4>
                <p className="text-gray-300 text-sm mb-4">Ready in 5 minutes</p>
                <p className="text-gray-400 text-xs">Mon-Sat: 8 AM - 5 PM</p>
              </div>
            </div>
          </div>
        </div>

      </div>    
    </div>      
  </div>        
  );
}