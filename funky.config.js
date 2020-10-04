const {breakpoints, utilities} = require('@native-elements/funky/config.js');

module.exports = {
  minify: true,
  outputPath: 'src/assets/css/utilities.css',
  breakpoints: {
    ...breakpoints,
  },
  utilities: {
    ...utilities,
  },
};
