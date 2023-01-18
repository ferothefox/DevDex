/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  redirects: async () => [
    {
      source: '/discord',
      destination: 'https://discord.gg/PhvrRrsPfk',
      permanent: true,
    },
    {
      source: '/twitter',
      destination: 'https://twitter.com/DevDexApp',
      permanent: true,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.discordapp.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/devdex/**',
      },
      {
        protocol: 'https',
        hostname: 'mk.pupbrained.xyz',
        pathname: '/files/**',
      },
    ],
  },
}

export default nextConfig
