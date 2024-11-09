/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { appDir: true },
    output: 'standalone', // Enables server-rendering mode
};

module.exports = nextConfig;
