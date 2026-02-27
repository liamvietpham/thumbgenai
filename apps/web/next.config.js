//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config) {
    const fileLoaderRule = /** @type {import('webpack').RuleSetRule | undefined} */ (
      config.module.rules.find(
        /** @param {import('webpack').RuleSetRule} rule */
        (rule) => rule?.test instanceof RegExp && rule.test.test('.svg')
      )
    );
    /** @type {import('webpack').RuleSetCondition[]} */
    let resourceQueryNot = [];
    const resourceQuery = fileLoaderRule?.resourceQuery;
    if (
      resourceQuery &&
      typeof resourceQuery === 'object' &&
      !Array.isArray(resourceQuery) &&
      'not' in resourceQuery &&
      Array.isArray(resourceQuery.not)
    ) {
      resourceQueryNot = resourceQuery.not;
    }

    config.module.rules.push({
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/,
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: fileLoaderRule?.issuer,
      resourceQuery: { not: [...resourceQueryNot, /url/] },
      use: ['@svgr/webpack'],
    });

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
