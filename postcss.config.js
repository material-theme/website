/* eslint-disable global-require */

module.exports = {
  plugins: [
    require('postcss-easy-import')({}),
    require('postcss-import-url')({}),
    require('postcss-preset-env')({
      stage: 0,
    }),
    require('cssnano')({
      preset: [
        'advanced',
        {
          discardComments: {
            removeAll: true,
          },
          reduceIdents: false,
        },
      ],
    }),
  ],
};
