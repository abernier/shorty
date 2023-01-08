/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true, // see: https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental
  },
}

module.exports = nextConfig
