/** @type {import('next').NextConfig} */
const nextConfig = {
    // Static export for S3 deployment
    output: 'export',

    // Environment-specific configurations
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },

    // Image optimization settings
    images: {
        unoptimized: true, // Required for static export
        domains: [], // Add any external image domains here
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Production optimizations
    poweredByHeader: false, // Remove X-Powered-By header
    compress: true, // Enable gzip compression
    reactStrictMode: true, // Enable React strict mode
    swcMinify: true, // Use SWC for minification

    // Security headers
    async headers() {
        return [{
            source: '/:path*',
            headers: [{
                    key: 'X-DNS-Prefetch-Control',
                    value: 'on',
                },
                {
                    key: 'Strict-Transport-Security',
                    value: 'max-age=63072000; includeSubDomains; preload',
                },
                {
                    key: 'X-XSS-Protection',
                    value: '1; mode=block',
                },
                {
                    key: 'X-Frame-Options',
                    value: 'SAMEORIGIN',
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                },
                {
                    key: 'Referrer-Policy',
                    value: 'strict-origin-when-cross-origin',
                },
            ],
        }, ]
    },

    // Webpack configuration
    webpack: (config, { dev }) => {
        // Production optimizations
        if (!dev) {
            // Enable tree shaking
            config.optimization = {
                ...config.optimization,
                usedExports: true,
            }

            // Split chunks optimization
            config.optimization.splitChunks = {
                chunks: 'all',
                minSize: 20000,
                maxSize: 244000,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            }
        }

        // Handle SVG files
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })

        return config
    },

    // Experimental features
    experimental: {
        appDir: true,
        // Disable CSS optimization since we're using static export
        optimizeCss: false,
        scrollRestoration: true,
        // Enable modern JavaScript features
        modern: true,
    },

    // Development server configuration
    onDemandEntries: {
        // Period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 25 * 1000,
        // Number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 2,
    },

    // Production build optimization
    productionBrowserSourceMaps: false, // Disable source maps in production
}

module.exports = nextConfig