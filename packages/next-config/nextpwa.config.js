const withPlugins = require("next-compose-plugins");
// const withBundleAnalyzer = require("@next/bundle-analyzer");
// ({
//   enabled: !!process.env.ANALYZE,
// });
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

const withPWA = require("next-pwa");
// ({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
// });

module.exports = ({ basePath }) => {
  /** @type {import('next').NextConfig} */
  const config = {
    basePath,
    // pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
    reactStrictMode: true,
    transpilePackages: ["ui", "utils", "database"],
    webpack: (config, { isServer }) => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      if (isServer) {
        config.plugins = [...config.plugins, new PrismaPlugin()];
      }
      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          port: "",
          pathname: "/beloved/**",
        },
      ],
    },
  };

  return withPlugins(
    [
      // [withBundleAnalyzer({ enabled: !!process.env.ANALYZE })],
      withPWA({
        dest: "public",
        disable: process.env.NODE_ENV === "development",
      }),
    ],
    config,
  );
  // return withPWA(config);
};
