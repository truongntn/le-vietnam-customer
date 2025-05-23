/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    BACKEND_URL: "https://le-vietnam-checkin-backend.onrender.com/",
    PUBLIC_ANZ_API_KEY: "557D3FD67D9BA8F871783395940C1B380C532D18E1776629B3A7D15512AA23FB39281CB691E5330655AA76FBAC05C3EF1B8805211DBEC8C190B7D20B3FA51F07",
    PUBLIC_ANZ_MERCHANT_ID: "",
    PUBLIC_ANZ_API_URL: "https://api.anzworldline-solutions.com.au",
  },
};

export default nextConfig;
