/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["m.media-amazon.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cksixzbxduvtickepkgb.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
