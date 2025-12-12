import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Turbopack is default in Next.js 16, no need to enable

  images: {
    // Allow Supabase storage images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Optimize for common caricature sizes
    deviceSizes: [320, 420, 640, 768],
    imageSizes: [64, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },

  // Strict mode for better React 19 compatibility
  reactStrictMode: true,

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
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
      },
    ]
  },
}

export default nextConfig
