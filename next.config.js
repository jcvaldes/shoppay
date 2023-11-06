/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: false,
  },
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "./base.scss";`, // puede usar este scss en todos los archivos
  },
}

module.exports = nextConfig
