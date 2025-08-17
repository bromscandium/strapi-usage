/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['uk', 'en'],
        defaultLocale: 'uk',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**',
            },
        ],
    },
};

export default nextConfig;
