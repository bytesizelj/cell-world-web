'use client';

// ============================================================
// PROMO CONFIG — flip PROMO_ACTIVE to true when running a promo
// Update PROMO_END_DATE, prizes, and milestones as needed
// ============================================================
const PROMO_ACTIVE = false;
const PROMO_LABEL = 'Limited Time Offer';
const PROMO_END_DATE = new Date('2026-12-31T23:59:59');

import { useState, useEffect, Suspense } from 'react';
import {
  ArrowLeft, ShoppingCart, ShoppingBag,
  Phone, Mail, User, MessageCircle, Package, Check, Zap
} from 'lucide-react';
import Link from 'next/link';

export default function OrderPage() {
  const [orderCount, setOrderCount] = useState(0);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', category: '', product: '', notes: ''
  });
  const [showWinner, setShowWinner] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [prizeWon, setPrizeWon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoEnded, setPromoEnded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submittedOrderNumber, setSubmittedOrderNumber] = useState(0);
  const [isPreFilled, setIsPreFilled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get('product');
    const categoryParam = params.get('category');
    if (productParam || categoryParam) {
      setIsPreFilled(true);
      setFormData(prev => ({
        ...prev,
        product: productParam || '',
        category: categoryParam || '',
        notes: productParam || ''
      }));
    }
  }, []);

  useEffect(() => {
    if (!PROMO_ACTIVE) return;
    const now = new Date();
    if (now > PROMO_END_DATE || orderCount >= 100) setPromoEnded(true);
  }, [orderCount]);

  useEffect(() => {
    const stored = localStorage.getItem('cellWorldOrderCount');
    if (stored) setOrderCount(parseInt(stored));
  }, []);

  const productsByCategory = {
    'Tech & Audio': ['Speakers','Earbuds','Headphones','Watches','Gaming','Microphones','TV Accessories','Car Audio','Audio Interfaces','Other Tech & Audio Product'],
    'Accessories & Power': ['Phone Cases','Screen Protectors','Charging Cables','Power Banks','Car Chargers','Wall Chargers','Phone Holders','Pop Sockets','Camera Accessories','Other Accessories'],
    'Phones': ['Samsung A11 - $420','Samsung A06 - $460','Samsung A05 - $450','Samsung A25 - $1199','Samsung A26 5G - $1250','Samsung A16 - $649','iPhone 12 - $1100','iPhone 13 Pro Max - $2300','iPhone 14 - $2100','ZTE Blade A72s - $499','Tablets','Other Phone Model']
  };

  const getMilestoneInfo = (count: number) => {
    if (count === 25) return { prize: 'Selfie Stick', milestone: '#25' };
    if (count === 50) return { prize: 'Wireless Earbuds (ANC)', milestone: '#50' };
    if (count === 100) return { prize: 'Power Pack Mini 5000mAh + Samsung Galaxy A11', milestone: '#100' };
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (PROMO_ACTIVE && promoEnded) { alert('This promotion has ended. Thank you!'); return; }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/valentine-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!data.success) throw new Error('Failed to save order');
      const newOrderNumber = data.orderNumber;
      setSubmittedOrderNumber(newOrderNumber);
      setOrderCount(newOrderNumber);
      localStorage.setItem('cellWorldOrderCount', newOrderNumber.toString());
      const milestone = PROMO_ACTIVE ? getMilestoneInfo(newOrderNumber) : null;
      if (milestone) { setPrizeWon(milestone.prize); setShowWinner(true); } 
      else { setShowConfirmation(true); }
      const message = `🛍️ CELL WORLD ORDER #${newOrderNumber}\n\n📱 Cell World App Order\n${PROMO_ACTIVE && milestone ? `🏆 WINNER - ${milestone.milestone} Customer!\n🎁 Prize: ${milestone.prize}\n` : ''}\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n${formData.email ? `📧 Email: ${formData.email}\n` : ''}🛍️ Category: ${formData.category}\n📦 Product: ${formData.product}\n${formData.notes ? `📝 Notes: ${formData.notes}\n` : ''}\n⏰ Order Time: ${new Date().toLocaleString()}\n🏪 Pickup: In-store only\n\n${PROMO_ACTIVE && milestone ? '⚠️ SHOW THIS MESSAGE TO CLAIM PRIZE!' : 'Thank you for ordering with Cell World!'}`;
      window.open(`https://wa.me/17844310777?text=${encodeURIComponent(message)}`, '_blank');
      setFormData({ name: '', phone: '', email: '', category: '', product: '', notes: '' });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#020b18' }}>

      {/* ── ANIMATED GEOMETRIC BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Deep base gradient */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,60,120,0.7) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0,180,160,0.25) 0%, transparent 60%), #020b18'
        }} />

        {/* Rotating large ring top-left */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full" style={{
          border: '1px solid rgba(59,130,246,0.2)',
          animation: 'spin-slow 25s linear infinite'
        }} />
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full" style={{
          border: '1px solid rgba(6,182,212,0.15)',
          animation: 'spin-slow 18s linear infinite reverse'
        }} />

        {/* Rotating rings bottom-right */}
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full" style={{
          border: '1px solid rgba(59,130,246,0.15)',
          animation: 'spin-slow 30s linear infinite'
        }} />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full" style={{
          border: '2px solid rgba(6,182,212,0.1)',
          animation: 'spin-slow 20s linear infinite reverse'
        }} />

        {/* Floating hexagon top-right */}
        <svg className="absolute top-10 right-10 opacity-10" width="180" height="180" style={{ animation: 'float-geo 8s ease-in-out infinite' }}>
          <polygon points="90,5 165,45 165,135 90,175 15,135 15,45" fill="none" stroke="#38bdf8" strokeWidth="1.5"/>
          <polygon points="90,25 148,57 148,123 90,155 32,123 32,57" fill="none" stroke="#38bdf8" strokeWidth="0.5"/>
        </svg>

        {/* Floating diamond mid-left */}
        <svg className="absolute top-1/3 -left-6 opacity-10" width="120" height="120" style={{ animation: 'float-geo 11s ease-in-out infinite 2s' }}>
          <polygon points="60,5 115,60 60,115 5,60" fill="none" stroke="#22d3ee" strokeWidth="1.5"/>
          <polygon points="60,20 100,60 60,100 20,60" fill="none" stroke="#22d3ee" strokeWidth="0.5"/>
        </svg>

        {/* Triangle bottom-left */}
        <svg className="absolute bottom-20 left-10 opacity-10" width="100" height="100" style={{ animation: 'float-geo 9s ease-in-out infinite 1s' }}>
          <polygon points="50,5 95,90 5,90" fill="none" stroke="#60a5fa" strokeWidth="1.5"/>
        </svg>

        {/* Small floating squares scattered */}
        <div className="absolute top-24 right-1/4 w-8 h-8 opacity-20" style={{
          border: '1px solid #38bdf8',
          animation: 'float-geo 7s ease-in-out infinite 0.5s',
          transform: 'rotate(45deg)'
        }} />
        <div className="absolute top-1/2 right-16 w-5 h-5 opacity-15" style={{
          border: '1px solid #22d3ee',
          animation: 'float-geo 10s ease-in-out infinite 3s',
          transform: 'rotate(20deg)'
        }} />
        <div className="absolute bottom-1/3 left-1/4 w-6 h-6 opacity-20" style={{
          border: '1px solid #60a5fa',
          animation: 'float-geo 8s ease-in-out infinite 1.5s',
          transform: 'rotate(35deg)'
        }} />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)',
          animation: 'pulse-orb 6s ease-in-out infinite'
        }} />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)',
          animation: 'pulse-orb 8s ease-in-out infinite 2s'
        }} />

        {/* Diagonal scan lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.5) 2px, rgba(59,130,246,0.5) 3px)',
          backgroundSize: '100% 4px'
        }} />

        {/* Moving beam */}
        <div className="absolute top-0 left-0 w-px h-full" style={{
          background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.4), transparent)',
          animation: 'beam-move 8s ease-in-out infinite',
          boxShadow: '0 0 20px rgba(59,130,246,0.3)'
        }} />

        {/* Corner accent top-left */}
        <div className="absolute top-0 left-0 w-32 h-32" style={{
          borderTop: '2px solid rgba(59,130,246,0.3)',
          borderLeft: '2px solid rgba(59,130,246,0.3)'
        }} />
        {/* Corner accent bottom-right */}
        <div className="absolute bottom-0 right-0 w-32 h-32" style={{
          borderBottom: '2px solid rgba(6,182,212,0.3)',
          borderRight: '2px solid rgba(6,182,212,0.3)'
        }} />
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="relative z-20 p-6" style={{
        background: 'rgba(2,11,24,0.7)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(59,130,246,0.15)'
      }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 transition-all duration-300 hover:gap-3" style={{ color: '#60a5fa' }}>
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold tracking-wide">Back to Home</span>
          </Link>
          <img src="/images/cell-world-logo.png" alt="Cell World" className="h-16 object-contain" style={{
            filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.4))'
          }} />
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-8">
          {PROMO_ACTIVE && (
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-4 font-bold text-sm animate-pulse" style={{
              background: 'linear-gradient(135deg, #2563eb, #0891b2)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(59,130,246,0.5)'
            }}>
              <Zap className="w-4 h-4" />{PROMO_LABEL}<Zap className="w-4 h-4" />
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 40%, #22d3ee 70%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 30px rgba(59,130,246,0.4))'
          }}>
            {PROMO_ACTIVE ? 'Place Your Order & WIN!' : 'Place Your Order'}
          </h1>

          <p className="text-lg font-medium" style={{ color: '#64748b' }}>
            {PROMO_ACTIVE ? 'You could be our next Prize Winner! 🎉' : 'Browse our products and order via WhatsApp'}
          </p>
        </div>

        {/* Prizes — only when PROMO_ACTIVE */}
        {PROMO_ACTIVE && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { img: '/images/Products/accessories-power/digipower-quikpod.png', name: 'Selfie Stick', label: '🎉 FIRST TO WIN!', color: '#facc15', threshold: 25 },
              { img: '/images/Products/tech-audio/earbuds2-anc-white.png', name: 'Wireless Earbuds ANC', label: '⭐ TOP PRIZE!', color: '#60a5fa', threshold: 50 },
            ].map((prize, i) => (
              <div key={i} className={`rounded-xl p-4 text-center ${orderCount >= prize.threshold ? 'opacity-50' : ''}`} style={{
                background: 'rgba(5,20,45,0.8)',
                border: `1px solid ${orderCount >= prize.threshold ? 'rgba(100,116,139,0.2)' : prize.color}`,
                boxShadow: orderCount >= prize.threshold ? 'none' : `0 0 20px ${prize.color}22`
              }}>
                <img src={prize.img} alt={prize.name} className="h-24 md:h-32 w-auto mx-auto mb-2 object-contain" />
                <div className="text-sm font-semibold text-white">{prize.name}</div>
                <div className="text-xs font-bold mt-1" style={{ color: prize.color }}>{prize.label}</div>
                {orderCount >= prize.threshold && <p className="text-xs mt-1" style={{ color: '#64748b' }}>✓ Claimed</p>}
              </div>
            ))}
            <div className={`rounded-xl p-4 text-center ${orderCount >= 100 ? 'opacity-50' : ''}`} style={{
              background: 'rgba(5,20,45,0.8)',
              border: `1px solid ${orderCount >= 100 ? 'rgba(100,116,139,0.2)' : '#22d3ee'}`,
              boxShadow: orderCount >= 100 ? 'none' : '0 0 20px rgba(34,211,238,0.13)'
            }}>
              <div className="flex justify-center items-center gap-2 mb-2">
                <img src="/images/Products/more/hyper-gear-power-pack-mini.png" alt="Power Pack" className="h-16 md:h-20 w-auto object-contain" />
                <div className="text-xl font-black text-white">+</div>
                <img src="/images/Products/phones/samsung-galaxy-a11.png" alt="Samsung A11" className="h-16 md:h-20 w-auto object-contain" />
              </div>
              <div className="text-sm font-semibold text-white">Power Pack + Samsung A11</div>
              <div className="text-xs font-bold mt-1" style={{ color: '#22d3ee' }}>💥 GRAND PRIZE!</div>
              {orderCount >= 100 && <p className="text-xs mt-1" style={{ color: '#64748b' }}>✓ Claimed</p>}
            </div>
          </div>
        )}

        {/* How It Works */}
<div className="rounded-2xl p-6 mb-6" style={{
  background: 'rgba(5, 18, 40, 0.75)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(59,130,246,0.2)'
}}>
  <h2 className="text-xl font-black text-center mb-6" style={{ color: '#facc15' }}>
    How Online Ordering Works
  </h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[
      { num: '1', title: 'Browse', desc: 'Select your category & explore products' },
      { num: '2', title: 'Choose', desc: 'Pick products you want to order' },
      { num: '3', title: 'WhatsApp Us', desc: 'Click order button to send your request' },
      { num: '4', title: 'Get It!', desc: 'Pick-up in store or get delivery' },
    ].map((step) => (
      <div key={step.num} className="text-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-black text-lg" style={{
          background: 'rgba(202,162,30,0.25)',
          color: '#facc15',
          border: '1px solid rgba(202,162,30,0.4)'
        }}>
          {step.num}
        </div>
        <div className="font-bold text-white text-sm mb-1">{step.title}</div>
        <div className="text-xs" style={{ color: '#94a3b8' }}>{step.desc}</div>
      </div>
    ))}
  </div>
</div>


        {/* Order Form */}
        <div className="rounded-2xl shadow-2xl p-8" style={{
          background: 'rgba(5, 18, 40, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(59,130,246,0.2)',
          boxShadow: '0 0 60px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>
          <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
            <ShoppingCart className="w-6 h-6" style={{ color: '#60a5fa' }} />
            Place Your Order
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {[
              { icon: <User className="w-4 h-4" style={{ color: '#60a5fa' }} />, label: 'Full Name *', type: 'text', key: 'name', placeholder: 'Enter your name', required: true },
              { icon: <Phone className="w-4 h-4" style={{ color: '#60a5fa' }} />, label: 'Phone Number *', type: 'tel', key: 'phone', placeholder: '784-XXX-XXXX', required: true },
              { icon: <Mail className="w-4 h-4" style={{ color: '#60a5fa' }} />, label: 'Email Address (optional)', type: 'email', key: 'email', placeholder: 'your@email.com (optional)', required: false },
            ].map((field) => (
              <div key={field.key}>
                <label className="flex items-center text-sm font-semibold mb-2 gap-2" style={{ color: '#94a3b8' }}>
                  {field.icon}{field.label}
                </label>
                <input
                  type={field.type}
                  required={field.required}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(59,130,246,0.25)', color: '#e2e8f0' }}
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            {/* Category */}
            <div>
              <label className="flex items-center text-sm font-semibold mb-2 gap-2" style={{ color: '#94a3b8' }}>
                <ShoppingBag className="w-4 h-4" style={{ color: '#60a5fa' }} />Product Category *
              </label>
              {isPreFilled ? (
                <div className="w-full px-4 py-3 rounded-lg flex items-center justify-between" style={{
                  background: 'rgba(59,130,246,0.08)',
                  border: '1px solid rgba(59,130,246,0.4)',
                  color: '#e2e8f0'
                }}>
                  <span>{formData.category}</span>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa' }}>Auto-filled</span>
                </div>
              ) : (
                <select required value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value, product: '' })}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none"
                  style={{ background: 'rgba(2,11,24,0.95)', border: '1px solid rgba(59,130,246,0.25)', color: '#e2e8f0' }}>
                  <option value="">Select a category</option>
                  <option value="Tech & Audio">Tech & Audio</option>
                  <option value="Accessories & Power">Accessories & Power</option>
                  <option value="Phones">Phones</option>
                </select>
              )}
            </div>

            {/* Product */}
            {(formData.category || isPreFilled) && (
              <div>
                <label className="flex items-center text-sm font-semibold mb-2 gap-2" style={{ color: '#94a3b8' }}>
                  <Package className="w-4 h-4" style={{ color: '#60a5fa' }} />Selected Product *
                </label>
                {isPreFilled ? (
                  <div className="w-full px-4 py-3 rounded-lg flex items-center justify-between" style={{
                    background: 'rgba(59,130,246,0.08)',
                    border: '1px solid rgba(59,130,246,0.4)',
                    color: '#e2e8f0'
                  }}>
                    <span>{formData.product}</span>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa' }}>Auto-filled</span>
                  </div>
                ) : (
                  <select required value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                    style={{ background: 'rgba(2,11,24,0.95)', border: '1px solid rgba(59,130,246,0.25)', color: '#e2e8f0' }}>
                    <option value="">Select a product</option>
                    {productsByCategory[formData.category as keyof typeof productsByCategory].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                )}
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="flex items-center text-sm font-semibold mb-2 gap-2" style={{ color: '#94a3b8' }}>
                <MessageCircle className="w-4 h-4" style={{ color: '#60a5fa' }} />Product Name / Details *
              </label>
              <textarea required value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(59,130,246,0.25)', color: '#e2e8f0' }}
                rows={3}
                placeholder="Enter brand, model, color (e.g., 'JBL Flip 6 Black', 'Samsung Galaxy Buds Pro')" />
              <p className="text-xs mt-1" style={{ color: '#475569' }}>
                💡 Be specific — brand, model, color helps us find the exact product.
              </p>
            </div>

            {/* Submit */}
            <button type="submit"
              disabled={isSubmitting || (PROMO_ACTIVE && promoEnded)}
              className="w-full font-bold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #1d4ed8, #0e7490)',
                color: '#fff',
                boxShadow: '0 0 30px rgba(59,130,246,0.3), 0 4px 20px rgba(0,0,0,0.4)',
                border: '1px solid rgba(96,165,250,0.3)'
              }}>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'linear-gradient(135deg, #2563eb, #0891b2)'
              }} />
              <span className="relative flex items-center gap-2">
                {isSubmitting ? 'Processing...' : <><ShoppingCart className="w-5 h-5" />Submit Order</>}
              </span>
            </button>
          </form>

          <p className="text-xs text-center mt-4" style={{ color: '#334155' }}>
            🏪 In-store pickup only • Payments in-store • Cell World St. Vincent
          </p>
        </div>

        {/* Pickup & Delivery */}
        <div className="mt-6 mb-6">
          <h2 className="text-xl font-black text-center mb-4 text-white">
            🛍️ Pickup & Delivery Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl p-6 text-center" style={{
              background: 'rgba(22,101,52,0.4)',
              border: '1px solid rgba(34,197,94,0.3)'
            }}>
              <div className="text-4xl mb-3">🚚</div>
              <div className="font-black text-white text-lg mb-1">Islands Delivery</div>
              <div className="text-white font-semibold mb-1">Delivery cost $10</div>
              <div className="text-sm" style={{ color: '#86efac' }}>Same-day delivery available</div>
            </div>
            <div className="rounded-xl p-6 text-center" style={{
              background: 'rgba(5, 18, 40, 0.75)',
              border: '1px solid rgba(59,130,246,0.3)'
            }}>
              <div className="text-4xl mb-3">🛒</div>
              <div className="font-black text-white text-lg mb-1">In-Store Pickup</div>
              <div className="text-white font-semibold mb-1">Ready in 5 minutes</div>
              <div className="text-sm" style={{ color: '#93c5fd' }}>Mon-Sat: 8 AM - 5 PM</div>
            </div>
          </div>
        </div>

      </div>

      {/* Winner Modal */}
      {showWinner && PROMO_ACTIVE && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="rounded-3xl p-8 max-w-md mx-4 border-2 shadow-2xl animate-bounce" style={{
            background: 'linear-gradient(135deg, #0d2240, #020b18)', borderColor: '#facc15',
            boxShadow: '0 0 60px rgba(250,204,21,0.3)'
          }}>
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-black mb-2" style={{ color: '#facc15' }}>CONGRATULATIONS!</h2>
              <p className="text-xl font-bold text-white mb-4">You are customer #{submittedOrderNumber}!</p>
              <div className="rounded-xl p-6 mb-6" style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.3)' }}>
                <p className="text-sm mb-2" style={{ color: '#94a3b8' }}>You won:</p>
                <p className="text-2xl font-black" style={{ color: '#facc15' }}>{prizeWon}</p>
              </div>
              <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>⚠️ Screenshot this and show it when you pick up your order!</p>
              <button onClick={() => { setShowWinner(false); setFormData({ name: '', phone: '', email: '', category: '', product: '', notes: '' }); }}
                className="font-bold py-3 px-8 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)', color: '#fff' }}>
                Got it! ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="rounded-3xl p-8 max-w-md mx-4 shadow-2xl" style={{
            background: 'linear-gradient(135deg, #0d2240, #020b18)',
            border: '1px solid rgba(34,197,94,0.3)',
            boxShadow: '0 0 60px rgba(34,197,94,0.15)'
          }}>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', boxShadow: '0 0 30px rgba(34,197,94,0.4)' }}>
                <Check className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">Order Placed!</h2>
              <div className="rounded-xl p-6 mb-6" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <p className="text-sm mb-2" style={{ color: '#94a3b8' }}>Your order has been sent to Cell World</p>
                <p className="text-lg font-semibold" style={{ color: '#4ade80' }}>We'll confirm availability shortly!</p>
              </div>
              <p className="text-sm mb-6" style={{ color: '#64748b' }}>
                📍 Pickup: Cell World St. Vincent<br />📞 Questions? Call 1-784-451-2261
              </p>
              <button onClick={() => { setShowConfirmation(false); setFormData({ name: '', phone: '', email: '', category: '', product: '', notes: '' }); }}
                className="font-bold py-3 px-8 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff' }}>
                Place Another Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ANIMATION STYLES ── */}
      <style jsx>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float-geo {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(3deg); }
          66% { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes pulse-orb {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes beam-move {
          0% { left: -2px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}