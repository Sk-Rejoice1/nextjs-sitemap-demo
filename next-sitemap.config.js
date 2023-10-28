module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  alternateRefs: [
    {
      href: 'https://example.jp',
      hreflang: 'ja',
    },
  ],
  generateRobotsTxt: true, // (optional)
  // generateIndexSitemap: false, // (optional)
  // ...other options
}
