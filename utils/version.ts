 
// Generate a version string based on build time
export const APP_VERSION = Date.now().toString();

// Helper function to add version to URLs
export function withVersion(url: string): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${APP_VERSION}`;
}