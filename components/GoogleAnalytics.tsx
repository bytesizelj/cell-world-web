'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = 'G-E9RDJE166F';

  useEffect(() => {
    // Create or retrieve a persistent user ID
    if (typeof window !== 'undefined') {
      let userId = localStorage.getItem('cw_user_id');
      if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('cw_user_id', userId);
      }
      
      // Wait for gtag to be available then set user ID
      const setUserId = () => {
        if ((window as any).gtag) {
          (window as any).gtag('config', GA_MEASUREMENT_ID, {
            user_id: userId,
            cookie_flags: 'max-age=7200;secure;samesite=none'
          });
        }
      };
      
      // Try immediately and after a delay
      setUserId();
      setTimeout(setUserId, 2000);
    }
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}