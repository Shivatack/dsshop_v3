/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    images: {
        domains: [
            "images.unsplash.com",
            "tailwindui.com",
            "lh3.googleusercontent.com"
        ],
    },
};

module.exports = nextConfig;
