// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['images.unsplash.com'],
      formats: ['image/avif', 'image/webp'],
    },
    i18n: {
      locales: ['en'],
      defaultLocale: 'en',
    },
    experimental: {
      scrollRestoration: true,
    },
  }
  
  module.exports = nextConfig