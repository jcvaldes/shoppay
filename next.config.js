/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: false,
  },
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: `/api/:path*`,
        destination: `/api/:path*`,
      },
      {
        source: `/:path*`,
        destination: `${process.env.NEXTAUTH_URL}/:path*`,
      },
    ]
  },
  env: {
    NEXTAUTH_URL: 'https://devkingos-shopay-dev.vercel.app',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "./base.scss";`, // puede usar este scss en todos los archivos
  },
}

module.exports = nextConfig
