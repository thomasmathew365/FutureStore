/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn11.bigcommerce.com']
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
