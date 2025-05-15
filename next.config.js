/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Disable server-side features since we're using static export
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig