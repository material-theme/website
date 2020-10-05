const syntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const pwaPlugin = require('eleventy-plugin-pwa');
const fs = require('fs');
const htmlMinTransform = require('./utils/transforms/htmlmin.js');
const contentParser = require('./utils/transforms/contentParser.js');
const htmlDate = require('./utils/filters/htmlDate.js');
const date = require('./utils/filters/date.js');

/**
 * Import site configuration
 */
const siteConfig = require('./src/_data/config.json');

module.exports = (eleventyConfig) => {
  /**
   * Add custom watch targets
   *
   * @link https://www.11ty.dev/docs/config/#add-your-own-watch-targets
   */
  // eleventyConfig.addWatchTarget('./bundle/')

  /**
   * Passthrough file copy
   *
   * @link https://www.11ty.io/docs/copy/
   */
  eleventyConfig.addPassthroughCopy({
    './static': '.',
  });
  eleventyConfig.addPassthroughCopy(
    `./src/assets/css/${siteConfig.syntaxTheme}`,
  );
  // eleventyConfig.addPassthroughCopy({
  //   bundle: 'assets',
  // })

  /**
   * Add filters
   *
   * @link https://www.11ty.io/docs/filters/
   */
  // human friendly date format
  eleventyConfig.addFilter('dateFilter', date);
  // robot friendly date format for crawlers
  eleventyConfig.addFilter('htmlDate', htmlDate);

  /**
   * Add Transforms
   *
   * @link https://www.11ty.io/docs/config/#transforms
   */
  if (process.env.ELEVENTY_ENV === 'production') {
    // Minify HTML when building for production
    eleventyConfig.addTransform('htmlmin', htmlMinTransform);
  }
  // Parse the page HTML content and perform some manipulation
  eleventyConfig.addTransform('contentParser', contentParser);

  /**
   * Add Plugins
   * @link https://github.com/11ty/eleventy-plugin-rss
   * @link https://github.com/11ty/eleventy-plugin-syntaxhighlight
   * @link https://github.com/okitavera/eleventy-plugin-pwa
   */
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPlugin(pwaPlugin, {
    globPatterns: ['**/*.{png,ico,json,woff,woff2,jpg,jpeg,webp,html,js,css}'],
  });

  /**
   * Override BrowserSync Server options
   *
   * @link https://www.11ty.dev/docs/config/#override-browsersync-server-options
   */
  eleventyConfig.setBrowserSyncConfig({
    notify: false,
    open: true,
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn(snippet, match) {
          return `${snippet}${match}`;
        },
      },
    },
    // Set local server 404 fallback
    callbacks: {
      ready(err, browserSync) {
        const content404 = fs.readFileSync('dist/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, {
            'Content-Type': 'text/html',
          });
          res.write(content404);
          res.end();
        });
      },
    },
  });

  /*
   * Disable use gitignore for avoiding ignoring of /bundle folder during watch
   * https://www.11ty.dev/docs/ignores/#opt-out-of-using-.gitignore
   */
  eleventyConfig.setUseGitIgnore(false);

  /**
   * Eleventy configuration object
   */
  return {
    dir: {
      input: siteConfig.paths.src,
      includes: siteConfig.paths.includes,
      layouts: `${siteConfig.paths.includes}/layouts`,
      output: siteConfig.paths.output,
    },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
