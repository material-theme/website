const IS_PROD = process.env.NODE_ENV === 'production';

const pluginsBase = [
  '@snowpack/plugin-postcss',
  [
    '@snowpack/plugin-run-script',
    {
      cmd: 'eleventy',
      watch: '$1 --watch',
    },
  ],
];

const pluginsPROD = [
  ['@snowpack/plugin-babel'],
  ['@snowpack/plugin-webpack'],
  [
    '@snowpack/plugin-optimize',
    {
      minify: true,
    },
  ],
];

const plugins = IS_PROD ? [
  ...pluginsBase,
  ...pluginsPROD,
] : [
  ...pluginsBase,
];

module.exports = {
  mount: {
    '.11ty': '/',
    'src/assets/js': '/assets/js',
    'src/assets/css': '/assets/css',
  },
  plugins,
  buildOptions: {
    clean: true,
  },
  devOptions: {
    out: 'dist',
    port: 3000,
    bundle: false,
    open: 'none',
    hmr: true,
  },
};
