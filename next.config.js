/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
  },
};

module.exports = {
  ...nextConfig,

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.geojson$/i,
      loader: 'json-loader',
    });
    return config;
  },
};
