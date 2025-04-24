/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const withPWA = require("next-pwa")({
  dest: "public/spacify",
  disable: process.env.PRODUCTION === "DEVELOPMENT",
});

const routeList = [
  "/agency/:path",
  // "/agency/sign-up",
  // "/sign-in",
  // "/sign-up",
  "/user/owner/chat",
  "/user/owner/my-wallet",
  "/user/owner/chat",
  "/user/reno-expert",
  "/user/chat",
  "/user/help-center",
  "/user/coins-transaction",
  "/user/latest-update",
  "/user/my-appointment",
  "/user/owner/my-bank",
  "/user/owner/my-wallet",
  "/user/forgot-password/owner",
  "/user/forgot-password/tenant",
  "/user/forgot-password/tenant",
  "/property-overview/:slug",
  "/booking/:slug",
  "/search",
  "/search/:slug",
];

const nextConfig = {
  reactStrictMode: false,
  // i18n,
  env: {
    DOMAIN: process.env.DOMAIN,
    API_DOMAIN: process.env.API_DOMAIN,
    CLOUDFLARE_RECAPTCHA_SITE: process.env.CLOUDFLARE_RECAPTCHA_SITE,
    SENTRY_DSN: process.env.SENTRY_DSN,
    PRODUCTION: process.env.PRODUCTION,
    PROJECT_NAME: process.env.PROJECT_NAME,
    TERMS_OF_USE: process.env.TERMS_OF_USE,
    PRIVACY_OF_POLICY: process.env.PRIVACY_OF_POLICY,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["staging-tms.spacify.asia", "tms.spacify.asia"],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-in",
        permanent: true,
      },
      ...routeList.map((list) => ({
        source: list,
        destination: "/404",
        permanent: true,
      })),
    ];
  },
};

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");
const { map } = require("lodash");

module.exports = withPWA({
  ...nextConfig,
});

// module.exports = withSentryConfig(
//   // withPWA(
//   {
//     ...nextConfig,
//     // For all available options, see:
//     // https://github.com/getsentry/sentry-webpack-plugin#options
//
//     org: "optimum-technology",
//     project: "spacify-web-app",
//
//     // Only print logs for uploading source maps in CI
//     silent: !process.env.CI,
//
//     // For all available options, see:
//     // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
//
//     // Upload a larger set of source maps for prettier stack traces (increases build time)
//     widenClientFileUpload: true,
//
//     // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
//     // This can increase your server load as well as your hosting bill.
//     // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
//     // side errors will fail.
//     // tunnelRoute: "/monitoring",
//
//     // Hides source maps from generated client bundles
//     hideSourceMaps: false,
//
//     // Automatically tree-shake Sentry logger statements to reduce bundle size
//     disableLogger: false,
//
//     // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
//     // See the following for more information:
//     // https://docs.sentry.io/product/crons/
//     // https://vercel.com/docs/cron-jobs
//     automaticVercelMonitors: true,
//   },
//   // ),
// );
