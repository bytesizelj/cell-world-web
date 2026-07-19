'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Phone, Mail, Radio, Wrench, Cog, BatteryCharging, Anchor } from 'lucide-react';

// Flip to false to turn the Marine World announcement OFF (keep the file for next time)
const PROMO_ACTIVE = false;
// Show at most once per browser session. Set to false while testing so it shows on every refresh.
const ONCE_PER_SESSION = true;

const CATEGORIES = [
  { icon: Radio, label: 'Marine Electronics' },
  { icon: Wrench, label: 'Tools' },
  { icon: Cog, label: 'Propellers & Drive Parts' },
  { icon: BatteryCharging, label: 'Batteries & Electrical' },
  { icon: Anchor, label: 'Marine Accessories' },
];

export default function MarineWorldPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!PROMO_ACTIVE) return;
    if (ONCE_PER_SESSION && localStorage.getItem('mwPopupSeen')) return;    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setShow(false);
    if (ONCE_PER_SESSION) localStorage.setItem('mwPopupSeen', '1');  };

  if (!show) return null;

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4"
      style={{
        background: 'radial-gradient(circle at center, rgba(2,20,10,0.85), rgba(0,0,0,0.95))',
        backdropFilter: 'blur(10px)',
        animation: 'mwFadeIn 0.4s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md sm:max-w-lg rounded-3xl overflow-y-auto"
        style={{
          maxHeight: '90vh',
          background: 'linear-gradient(160deg, #03130a 0%, #071c0e 55%, #020806 100%)',
          border: '2px solid rgba(163,255,18,0.55)',
          boxShadow: '0 0 50px rgba(163,255,18,0.3), 0 0 100px rgba(163,255,18,0.12), inset 0 0 50px rgba(0,0,0,0.6)',
          animation: 'mwZoom 0.7s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
        }}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '3px', background: 'rgba(163,255,18,0.5)', transform: 'rotate(35deg)' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '70%', height: '3px', background: 'rgba(163,255,18,0.35)', transform: 'rotate(35deg)' }} />
        </div>

        <div className="relative px-5 py-6 sm:px-8 sm:py-7 text-center">
          <h2 className="text-2xl sm:text-4xl font-black italic tracking-tight leading-none mb-1.5">
            <span style={{ color: '#A3FF12', textShadow: '0 0 20px rgba(163,255,18,0.8), 0 0 35px rgba(163,255,18,0.4)' }}>MARINE</span>{' '}
            <span style={{ color: '#FFFFFF', textShadow: '0 0 14px rgba(255,255,255,0.6), 0 2px 8px rgba(0,0,0,0.8)' }}>WORLD</span>
          </h2>
          <p className="text-[10px] sm:text-xs tracking-[0.22em] font-semibold mb-4" style={{ color: '#cfe9b8' }}>
            YOUR ONE-STOP SHOP FOR EVERYTHING MARINE
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mb-5 text-xs sm:text-sm font-bold">
            <a href="tel:+17845265355" className="inline-flex items-center gap-1.5 text-white hover:text-[#A3FF12] transition-colors">
              <Phone className="w-4 h-4" style={{ color: '#A3FF12' }} /> 784 526 5355
            </a>
            <a href="mailto:marineworldsvg@gmail.com" className="inline-flex items-center gap-1.5 text-white hover:text-[#A3FF12] transition-colors">
              <Mail className="w-4 h-4" style={{ color: '#A3FF12' }} /> marineworldsvg@gmail.com
            </a>
          </div>

          <p className="text-base sm:text-lg font-bold text-white mb-0.5" style={{ animation: 'mwUp 0.6s ease-out 0.2s both' }}>
            WE ARE
          </p>
          <p
            className="text-4xl sm:text-5xl font-black leading-none mb-1.5"
            style={{ color: '#A3FF12', animation: 'mwPunch 0.7s cubic-bezier(0.18,0.89,0.32,1.28) 0.3s both, mwGlow 2.2s ease-in-out 1s infinite' }}
          >
            NOW OPEN
          </p>
          <p className="text-sm sm:text-base font-bold text-white mb-0.5" style={{ animation: 'mwUp 0.6s ease-out 0.45s both' }}>
            AT OUR <span style={{ color: '#A3FF12' }}>NEW LOCATION</span> IN
          </p>
          <p
            className="text-4xl sm:text-5xl font-black italic leading-none mb-5"
            style={{ color: '#FFFFFF', textShadow: '0 0 16px rgba(163,255,18,0.5)', animation: 'mwUp 0.6s ease-out 0.6s both' }}
          >
            VILLA!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            {CATEGORIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(163,255,18,0.08)',
                    border: '1px solid rgba(163,255,18,0.35)',
                    animation: `mwUp 0.5s ease-out ${0.7 + i * 0.1}s both`,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: '#A3FF12' }} />
                  <span className="text-[11px] sm:text-xs font-semibold text-white">{c.label}</span>
                </div>
              );
            })}
          </div>

          <p className="text-xs sm:text-sm font-bold mb-5" style={{ color: '#cfe9b8' }}>
            BETTER GEAR. BETTER BOATING. <span style={{ color: '#A3FF12' }}>WE'VE GOT YOU COVERED!</span>
          </p>

          <Link
            href="/Categories/marine-world/boat-parts"
            onClick={close}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-base font-black transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #A3FF12, #5fae00)',
              color: '#06210a',
              boxShadow: '0 0 24px rgba(163,255,18,0.6)',
              animation: 'mwPulse 2s ease-in-out infinite',
            }}
          >
            Shop Marine World →
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes mwFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mwZoom {
          0% { opacity: 0; transform: scale(0.3) rotate(-6deg); }
          60% { opacity: 1; transform: scale(1.05) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes mwPunch {
          0% { opacity: 0; transform: scale(0.4); }
          70% { opacity: 1; transform: scale(1.12); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes mwGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(163,255,18,0.7), 0 0 38px rgba(163,255,18,0.3); }
          50% { text-shadow: 0 0 30px rgba(163,255,18,1), 0 0 60px rgba(163,255,18,0.6); }
        }
        @keyframes mwUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mwPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 24px rgba(163,255,18,0.6); }
          50% { transform: scale(1.04); box-shadow: 0 0 38px rgba(163,255,18,0.9); }
        }
      `}</style>
    </div>
  );
}