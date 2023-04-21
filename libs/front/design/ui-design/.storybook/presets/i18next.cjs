const { logger } = require('@storybook/node-logger');

async function webpackFinal(webpackConfig) {
  logger.info('=> Using i18next preset');
  return {
    ...webpackConfig,
    resolve: {
      ...webpackConfig.resolve,
      alias: {
        /* next-i18next is built to work server-side as well as client-side and storybook does not
         *  support server side so we use react-i18next only for storybook
         */
        ...webpackConfig.resolve.alias,
        'next-i18next': 'react-i18next',
      },
    },
  };
}

module.exports = {
  webpackFinal,
};
