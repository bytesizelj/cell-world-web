'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    // Log what page caused the 404
    console.error('404 Error - Attempted URL:', window.location.href);
    
    // Track in Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: '404 Error',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-400 mb-4">404</h1>
        <p className="text-2xl text-white mb-8">Page Not Found</p>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="flex items-center justify-center bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          <Link 
            href="/Categories/phones"
            className="flex items-center justify-center bg-gray-700 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-600"
          >
            <Search className="w-5 h-5 mr-2" />
            Browse Products
          </Link>
        </div>
        
        <div className="mt-12 text-gray-500">
          <p>Need help? Call us:</p>
          <a href="tel:+17844512261" className="text-yellow-400 hover:underline">
            1-784-451-2261
          </a>
        </div>
      </div>
    </div>
  );
}