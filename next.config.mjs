/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'img.clerk.com' },
      { hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
