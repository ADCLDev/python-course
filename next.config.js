/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for Vercel deployment
  output: 'standalone',
  // Add domain for Pyodide CDN
  domains: ['cdn.jsdelivr.net'],
}

module.exports = nextConfig 