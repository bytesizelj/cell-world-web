'use client';

import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Heart, Gift, ShoppingBag, Phone, Mail, User, MessageCircle, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';

export default function ValentineOrderPage() {
  const [orderCount, setOrderCount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    product: '',
    notes: ''
  });
  const [showWinner, setShowWinner] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [prizeWon, setPrizeWon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoEnded, setPromoEnded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submittedOrderNumber, setSubmittedOrderNumber] = useState(0);

  // Generate consistent random positions for hearts
  const heartPositions = useMemo(() => {
    return Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 30 + 20
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if promo is still active
  useEffect(() => {
    const promoEndDate = new Date('2026-02-14T23:59:59');
    const now = new Date();
    
    if (now > promoEndDate || orderCount >= 100) {
      setPromoEnded(true);
    }
  }, [orderCount]);

  // Load order count from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('valentineOrderCount');
    if (stored) {
      setOrderCount(parseInt(stored));
    }
  }, []);

  // UPDATED Product options - matching your actual categories
  const productsByCategory = {
    'Tech & Audio': [
      'Speakers',
      'Earbuds',
      'Headphones',
      'Watches',
      'Gaming',
      'Microphones',
      'TV Accessories',
      'Car Audio',
      'Audio Interfaces',
      'Other Tech & Audio Product'
    ],
    'Accessories & Power': [
      'Phone Cases',
      'Screen Protectors',
      'Charging Cables',
      'Power Banks',
      'Car Chargers',
      'Wall Chargers',
      'Phone Holders',
      'Pop Sockets',
      'Camera Accessories',
      'Other Accessories'
    ],
    'Phones': [
      'Samsung A11 - $420',
      'Samsung A06 - $460',
      'Samsung A05 - $450',
      'Samsung A25 - $1199',
      'Samsung A26 5G - $1250',
      'Samsung A16 - $649',
      'iPhone 12 - $1100',
      'iPhone 13 Pro Max - $2300',
      'iPhone 14 - $2100',
      'ZTE Blade A72s - $499',
      'Tablets',
      'Other Phone Model'
    ]
  };

  const getMilestoneInfo = (count: number) => {
    if (count === 25) return { prize: 'Selfie Stick', milestone: '#25' };
    if (count === 50) return { prize: 'Wireless Earbuds (ANC)', milestone: '#50' };
    if (count === 100) return { prize: 'Power Pack Mini 5000mAh + Samsung Galaxy A11', milestone: '#100' };
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (promoEnded) {
      alert('Valentine\'s Promo has ended. Thank you for your interest!');
      return;
    }

    setIsSubmitting(true);

    // Increment counter
    const newCount = orderCount + 1;
    setOrderCount(newCount);
    setSubmittedOrderNumber(newCount);
    localStorage.setItem('valentineOrderCount', newCount.toString());
    localStorage.setItem(`order_${newCount}`, JSON.stringify({
      ...formData,
      orderNumber: newCount,
      timestamp: new Date().toISOString()
    }));

    // Check if winner
    const milestone = getMilestoneInfo(newCount);
    if (milestone) {
      setPrizeWon(milestone.prize);
      setShowWinner(true);
      
      // Store winner info
      localStorage.setItem(`winner_${milestone.milestone}`, JSON.stringify({
        ...formData,
        orderNumber: newCount,
        prize: milestone.prize,
        timestamp: new Date().toISOString()
      }));
    } else {
      // Show confirmation for non-winners
      setShowConfirmation(true);
    }

    // Generate WhatsApp message
    const message = `🎉 VALENTINE'S ORDER #${newCount}
    
📱 Cell World App Order
${milestone ? `🏆 WINNER - ${milestone.milestone} Customer!
🎁 Prize: ${milestone.prize}` : ''}

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email}
🛍️ Category: ${formData.category}
📦 Product: ${formData.product}
${formData.notes ? `📝 Notes: ${formData.notes}` : ''}

⏰ Order Time: ${new Date().toLocaleString()}
🏪 Pickup: In-store only

${milestone ? '⚠️ SHOW THIS MESSAGE TO CLAIM PRIZE!' : 'Thank you for ordering via our app! ❤️'}`;

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/17844310777?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const getNextMilestone = () => {
    if (orderCount < 25) return { count: 25, remaining: 25 - orderCount };
    if (orderCount < 50) return { count: 50, remaining: 50 - orderCount };
    if (orderCount < 100) return { count: 100, remaining: 100 - orderCount };
    return null;
  };

  const nextMilestone = getNextMilestone();

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 relative overflow-hidden">
      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {heartPositions.map((pos, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300/30 animate-float"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${pos.delay}s`,
              fontSize: `${pos.size}px`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-20 p-6 bg-white/80 backdrop-blur-sm shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          
          <img 
            src="/images/cell-world-logo.png"
            alt="Cell World"
            className="h-16 object-contain"
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-full mb-4 animate-pulse">
            <span className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Valentine's Day Special
              <Gift className="w-5 h-5" />
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{
            background: 'linear-gradient(135deg, #ec4899, #ef4444, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Place Your Order & WIN!
          </h1>
          
          <p className="text-lg text-gray-700 mb-6">
            25th • 50th • 100th customers win amazing prizes! ❤️
          </p>

          {/* Order Counter - HIDDEN FROM CUSTOMERS */}
          <div className="hidden bg-white rounded-2xl shadow-xl p-6 mb-6 border-4 border-pink-300">
            <div className="flex items-center justify-center gap-4 mb-4">
              <ShoppingBag className="w-8 h-8 text-pink-500" />
              <div>
                <p className="text-sm text-gray-600">Current Order Count</p>
                <p className="text-5xl font-black text-pink-600">#{orderCount}</p>
              </div>
              <Sparkles className="w-8 h-8 text-yellow-500" />
            </div>
            
            {nextMilestone && !promoEnded && (
              <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700">
                  🎯 Only <span className="text-2xl text-pink-600 font-black">{nextMilestone.remaining}</span> orders until the next prize winner!
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Next milestone: #{nextMilestone.count}
                </p>
              </div>
            )}

            {promoEnded && (
              <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4">
                <p className="text-red-700 font-bold">
                  🎉 Valentine's Promo Has Ended! Thank you to all participants!
                </p>
              </div>
            )}
          </div>

          {/* Prizes Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className={`bg-white rounded-xl p-4 shadow-lg border-2 ${orderCount >= 25 ? 'border-gray-300 opacity-50' : 'border-yellow-400'}`}>
              <div className="text-4xl font-black text-yellow-600">#25</div>
              <div className="text-sm font-semibold text-gray-700">Selfie Stick</div>
              {orderCount >= 25 && <p className="text-xs text-gray-500 mt-1">✓ Claimed</p>}
            </div>
            <div className={`bg-white rounded-xl p-4 shadow-lg border-2 ${orderCount >= 50 ? 'border-gray-300 opacity-50' : 'border-pink-400'}`}>
              <div className="text-4xl font-black text-pink-600">#50</div>
              <div className="text-sm font-semibold text-gray-700">Wireless Earbuds</div>
              {orderCount >= 50 && <p className="text-xs text-gray-500 mt-1">✓ Claimed</p>}
            </div>
            <div className={`bg-white rounded-xl p-4 shadow-lg border-2 ${orderCount >= 100 ? 'border-gray-300 opacity-50' : 'border-red-400'}`}>
              <div className="text-4xl font-black text-red-600">#100</div>
              <div className="text-sm font-semibold text-gray-700">Power Pack Mini + Samsung A11</div>
              {orderCount >= 100 && <p className="text-xs text-gray-500 mt-1">✓ Claimed</p>}
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-pink-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📝 Place Your Order
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2 text-pink-500" />
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2 text-pink-500" />
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
                placeholder="784-XXX-XXXX"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2 text-pink-500" />
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <ShoppingBag className="w-4 h-4 mr-2 text-pink-500" />
                Product Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value, product: ''})}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
              >
                <option value="">Select a category</option>
                <option value="Tech & Audio">Tech & Audio</option>
                <option value="Accessories & Power">Accessories & Power</option>
                <option value="Phones">Phones</option>
              </select>
            </div>

            {/* Product */}
            {formData.category && (
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Gift className="w-4 h-4 mr-2 text-pink-500" />
                  Select Product *
                </label>
                <select
                  required
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
                >
                  <option value="">Select a product</option>
                  {productsByCategory[formData.category as keyof typeof productsByCategory].map((product) => (
                    <option key={product} value={product}>{product}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Product Name - REQUIRED */}
    <div>
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
     <Gift className="w-4 h-4 mr-2 text-pink-500" />
        Product Name / Details *
  </label>
    <textarea
        required
        value={formData.notes}
        onChange={(e) => setFormData({...formData, notes: e.target.value})}
        className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
        rows={3}
        placeholder="Enter the specific product name, model, brand, or color (e.g., 'JBL Flip 6 Black', 'Samsung Galaxy Buds Pro', 'Blue Yeti Microphone')"
  />
  <p className="text-xs text-gray-500 mt-1">
    💡 Be specific! Include brand, model, color, or any details that help us identify the exact product.
  </p>
</div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || promoEnded}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-4 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Heart className="w-5 h-5" />
                  Place Order via WhatsApp
                  <Heart className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            🏪 All orders are for in-store pickup only • Valid until Feb 14, 2026
          </p>
        </div>
      </div>

      {/* Winner Modal */}
      {showWinner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-yellow-100 to-pink-100 rounded-3xl p-8 max-w-md mx-4 border-4 border-yellow-400 shadow-2xl animate-bounce">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-black text-pink-600 mb-2">
                CONGRATULATIONS!
              </h2>
              <p className="text-xl font-bold text-gray-800 mb-4">
                You are customer #{submittedOrderNumber}!
              </p>
              <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
                <p className="text-sm text-gray-600 mb-2">You won:</p>
                <p className="text-2xl font-black text-pink-600">{prizeWon}</p>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                ⚠️ Screenshot this message and show it when you pick up your order to claim your prize!
              </p>
              <button
                onClick={() => {
                  setShowWinner(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    category: '',
                    product: '',
                    notes: ''
                  });
                }}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-8 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all"
              >
                Got it! ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal (Non-Winners) */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 max-w-md mx-4 border-4 border-green-400 shadow-2xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-black text-gray-800 mb-2">
                Order Placed!
              </h2>
              <p className="text-xl font-bold text-gray-700 mb-4">
                You are customer #{submittedOrderNumber}
              </p>
              <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border-2 border-green-200">
                <p className="text-sm text-gray-600 mb-2">Your order has been sent to Cell World via WhatsApp</p>
                <p className="text-lg font-semibold text-green-600">We'll confirm availability shortly!</p>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                📍 Pickup Location: Cell World St. Vincent<br />
                📞 Questions? Call 1-784-451-2261
              </p>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    category: '',
                    product: '',
                    notes: ''
                  });
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-8 rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
              >
                Place Another Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100px) rotate(180deg);
            opacity: 0.6;
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}