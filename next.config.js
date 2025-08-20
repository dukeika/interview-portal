/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ["aws-amplify"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};
