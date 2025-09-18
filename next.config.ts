import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig