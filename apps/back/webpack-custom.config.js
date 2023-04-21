const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const path = require('path');
const glob = require('glob');

module.exports = (config, context) => {
  return merge(config, {
    entry: {
      ...glob
        .sync(path.resolve(__dirname, 'src/app/typeorm/migrations/*.ts'))
        .reduce((entries, filename) => {
          const migrationName = path.basename(filename, '.ts');
          return Object.assign({}, entries, {
            [`migrations/${migrationName}`]: filename,
          });
        }, {}),
      ...glob
        .sync(
          path.resolve(
            __dirname,
            `../../libs/${context.context.projectName}/**/*.entity.ts`
          )
        )
        .reduce((entries, filename) => {
          const entityName = path.basename(filename, '.ts');
          return Object.assign({}, entries, {
            [`entities/${entityName}`]: filename,
          });
        }, {}),
      ...glob
        .sync(path.resolve(__dirname, 'src/app/typeorm/typeorm.ts'))
        .reduce((entries, filename) => {
          const confName = path.basename(filename, '.ts');
          return Object.assign({}, entries, {
            [`typeorm-config/${confName}`]: filename,
          });
        }, {}),
    },
    externals: nodeExternals({
      modulesDir: path.resolve(__dirname, './node_modules'),
      additionalModuleDirs: [path.resolve(__dirname, '../../node_modules')],
    }),
    plugins: [
      new webpack.IgnorePlugin({
        checkResource(resource) {
          const lazyImports = [
            '@nestjs/microservices',
            'cache-manager',
            'class-validator',
            'class-transformer',
            'class-transformer/storage',
            'class-transformer/cjs/storage',
          ];
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource, {
              paths: [process.cwd()],
            });
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
    ],
  });
};
