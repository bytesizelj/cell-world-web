'use client';
import { useEffect } from 'react';

export default function ImageDebugger() {
  useEffect(() => {
    // Debug: Log all broken images (TEMPORARY - REMOVE AFTER DEBUGGING)
    const checkImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.onerror = () => {
          console.error('Broken image detected:', {
            src: img.src,
            alt: img.alt || 'no alt text',
            parent: img.parentElement?.className || 'no parent class'
          });
        };
      });
    };
    
    // Check on initial load
    checkImages();
    
    // Also check after dynamic content loads
    const timer = setTimeout(checkImages, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
}