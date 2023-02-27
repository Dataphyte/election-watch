/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/results',
        permanent: true,
      },
    ];
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
