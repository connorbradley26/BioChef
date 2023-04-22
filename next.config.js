/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'img.hellofresh.com'],
  }
}

module.exports = nextConfig
