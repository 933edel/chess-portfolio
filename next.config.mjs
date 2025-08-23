/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      root: new URL(".", import.meta.url).pathname,
    },
  },
};

export default nextConfig;
