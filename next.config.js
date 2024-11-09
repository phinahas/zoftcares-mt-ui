/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { appDir: true },
    output: 'standalone', // Keeps server-rendered behavior
    exportTrailingSlash: false, // Ensures no static export for dynamic pages
    // Optional: you can disable static export for other dynamic routes if necessary
  };
  
  module.exports = nextConfig;
  