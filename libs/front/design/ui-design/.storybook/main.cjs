const path = require('path');

const config = {
  core: {
    disableTelemetry: true,
    builder: {
      name: 'webpack5',
      options: { lazyCompilation: true, fsCache: true },
    },
  },
  features: { storyStoreV7: true, buildStoriesJson: true }, // load stories on demand, rather than during boot up.

  staticDirs: ['../../../../../apps/front/public/'],

  framework: '@storybook/react',

  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@nrwl/react/plugins/storybook',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    'storybook-addon-paddings',
    'storybook-addon-swc',
    path.resolve(__dirname, './presets/css-modules.cjs'),
    path.resolve(__dirname, './presets/i18next.cjs'),
    // Add project plugins here
  ],
  webpackFinal: async (config, options) => {
    // add webpack config here

    return config;
  },
};

module.exports = config;
