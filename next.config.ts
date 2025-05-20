import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '192.168.29.97', '127.0.0.1', '2bb8-2405-201-100e-a06c-5512-1fec-5978-1586.ngrok-free.app'],
};

export default nextConfig;
