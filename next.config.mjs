/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // Static export has no image optimization server; we pre-optimize to WebP at build time.
    unoptimized: true,
  },
  // The site lives behind locale prefixes; keep clean static folders.
  reactStrictMode: true,
};

export default nextConfig;
