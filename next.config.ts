import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const NextConfig = {
  images: {
    domains: ["cdn.sanity.io", "via.placeholder.com"],
    remotePatterns: [
      {
        protocol: "https", // or "http"
        hostname: "cdn.sanity.io", // Replace with the domain of the image source
        port: "", // Leave empty unless a specific port is required
        pathname: "/**", // Use ** for wildcard matching
      },
      {
        protocol: "https", // or "http"
        hostname: "via.placeholder.com", // Replace with the domain of the image source
        port: "", // Leave empty unless a specific port is required
        pathname: "/550x310", // Use ** for wildcard matching
      },
    ],
  },

};

export default NextConfig;
