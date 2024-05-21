module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  alternateRefs: [
    {
      href: 'https://example.jp',
      hreflang: 'ja',
    },
  ],
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false, // (optional)
  transform: async (config, path) => {
    // Use default transformation for all other cases
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: 'yearly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => {
    const result = [];
    // const products = await getProducts();
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    const products = data?.products;

    // static additional page
    result.push({ loc: '/additional-page-1' });

    // dynamic additional page
    if (products?.length > 0) {
      await products.forEach(async (product) => {
        const productTitleModified = product.title.replace(/ /g, '-');
        // using transformation from the current configuration
        result.push(await config.transform(config, `/products/${productTitleModified}`));
      });
    }

    return result;
  },
};
