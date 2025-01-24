import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // or "http"
        hostname: "cdn.sanity.io", // Replace with the domain of the image source
      },
      {
        protocol: "https", // or "http"
        hostname: "via.placeholder.com", // Replace with the domain of the image source
      },
    ],
  },

};

export default NextConfig;
