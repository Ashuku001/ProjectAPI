/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*", // any urls sent to /api
                destination: `${process.env.API_URL}/:path*` // proxy of to actual backend
            }
        ]
           
    }
}

module.exports = nextConfig
