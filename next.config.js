/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: `/api/:path*`,
        destination: `/api/:path*`,
      },
      {
        source: `/:path*`,
        destination: `${PLATFORM_URL}/:path*`,
      },
    ]
  },
  env: {
    NEXTAUTH_URL: 'https://devkingos-shopay-dev.vercel.app/',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "./base.scss";`, // puede usar este scss en todos los archivos
  },
}

module.exports = nextConfig
