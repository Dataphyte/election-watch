/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = {
  experimental: {
    appDir: true,
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.geojson$/i,
      loader: 'json-loader',
    });
    return config;
  },
};
