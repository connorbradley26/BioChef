const { withSuperjson } = require('next-superjson')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'img.hellofresh.com', 'spoonacular.com'],
  }
}

module.exports = withSuperjson()(nextConfig)
