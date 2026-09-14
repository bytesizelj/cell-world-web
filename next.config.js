/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        // Repairs are retired; the old page was live and indexed, so send
        // anyone arriving from a search result to the category that took
        // its place.
        source: '/Categories/repair-service',
        destination: '/Categories/power-and-light',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
