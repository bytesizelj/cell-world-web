export const trackEvent = (eventName: string, properties?: any) => {
  // Google Analytics 4 tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
};