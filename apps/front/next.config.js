import { withCSSModulesTypings } from '@fabernovel/pes-nx-plugin-next/plugins/with-css-modules-typings.js';
import { withNx } from '@fabernovel/pes-nx-plugin-next/plugins/with-nx.js';

import { readFile } from 'fs/promises';

import { i18n } from './next-i18next.config.js';

const packageJson = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
);

// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /**
   * @see https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
   */
  reactStrictMode: true,
  /**
   * @see https://nextjs.org/docs/advanced-features/i18n-routing
   */
  i18n,
  /**
   * @see https://nextjs.org/docs/basic-features/image-optimization#configuration
   */
  images: {
    domains: [],
  },
  /**
   * @see https://vercel.com/docs/v2/build-step/#providing-environment-variables
   */
  env: {
    NEXT_PUBLIC_APP_NAME: packageJson.name,
    //TODO: use git tags to determine version
    NEXT_PUBLIC_APP_VERSION: '0.0.1',
  },
  /**
   * @see https://nextjs.org/docs/api-reference/next.config.js/rewrites
   */
  async rewrites() {
    const rewrites = [];

    console.info('Using rewrites:', JSON.stringify(rewrites, null, 2));
    return rewrites;
  },

  /**
   * @see https://nextjs.org/docs/api-reference/next.config.js/redirects
   */
  async redirects() {
    const redirects = [];

    console.info('Using redirects:', JSON.stringify(redirects, null, 2));
    return redirects;
  },
  /**
   * @see https://nextjs.org/docs/api-reference/next.config.js/headers
   */
  async headers() {
    /**
     * @see https://nextjs.org/docs/advanced-features/security-headers
     * @see https://blog.vnaik.com/posts/web-attacks.html
     */
    const securityHeaders = [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Content-Security-Policy',
        /** upgrade-insecure-requests: if the website is running on https, force every http
         * request to use https instead (do not used mixed content).
         */
        /** base-uri 'self': every relative link in the webpage is using the same scheme and
         * port as the document it is served from
         */
        value: "upgrade-insecure-requests; base-uri 'self'",
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
    ];

    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  /**
   * @see https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
   */
  poweredByHeader: false,
  /**
   * @see https://nextjs.org/docs/advanced-features/compiler#minification
   */
  swcMinify: true,

  /**
   * @see https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files
   */
  eslint: {
    dirs: ['src'],
  },
  /**
   * @see https://nextjs.org/docs/basic-features/typescript#existing-projects
   */
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  webpack: (config, options) => {
    return withCSSModulesTypings(config, options);
  },
};

export default withNx(nextConfig);
