/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "colgateb2b.vtexassets.com",
        port: "",
        pathname: "/arquivos/ids/**",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
