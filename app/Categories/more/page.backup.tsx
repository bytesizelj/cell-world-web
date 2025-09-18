'use client';

import { useState } from 'react';
import { ArrowLeft, Globe, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function MoreCategory() {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: { title: "Electronics & Accessories", subtitle: "Premium Audio, Power Solutions & More", back: "Back to Home" },
    fr: { title: "Électronique et Accessoires", subtitle: "Audio Premium, Solutions d'Alimentation et Plus", back: "Retour" },
    es: { title: "Electrónica y Accesorios", subtitle: "Audio Premium, Soluciones de Energía y Más", back: "Volver" }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-black">
      <nav className="flex justify-between items-center p-6 bg-black/50">
        <Link href="/" className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>{t.back}</span>
        </Link>
        
        <button 
          className="flex items-center space-x-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 px-4 py-2.5 rounded-full border border-yellow-500/30"
          onClick={() => {
            const langs = ['en', 'fr', 'es'];
            setLanguage(langs[(langs.indexOf(language) + 1) % langs.length]);
          }}
        >
          <Globe className="w-4 h-4 text-yellow-400" />
          <span className="text-sm uppercase font-bold text-yellow-400">{language}</span>
        </button>
      </nav>

      <div className="text-center py-12 px-4">
        <div className="flex justify-center items-center gap-3 mb-4">
          <ShoppingBag className="w-10 h-10 text-purple-400" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t.title}</h1>
        </div>
        <p className="text-lg text-gray-300">{t.subtitle}</p>
        
        <div className="mt-20">
          <p className="text-2xl text-yellow-400">Page Under Maintenance</p>
          <p className="text-gray-400 mt-4">Products will be displayed here soon</p>
        </div>
      </div>
    </div>
  );
}