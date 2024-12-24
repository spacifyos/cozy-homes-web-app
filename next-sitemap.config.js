/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.spacify.asia",
  generateRobotsTxt: false, // (optional)
  exclude: [
    "/agency/*",
    "/booking/*/payment-failed",
    "/booking/*/payment-successful",
    "/loading",
    "/payment-failed",
    "/payment-successful",
    "/sign-in",
    "/sign-in/*",
    "/sign-up/*",
    "/user/*",
    "/reset-password",
    "/401",
    "/403",
  ],
  // ...other options
};
