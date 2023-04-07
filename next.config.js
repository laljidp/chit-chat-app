const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
})

module.exports = withPWA({
  reactStrictMode: true,
})
