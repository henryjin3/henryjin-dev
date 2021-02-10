import path from 'path';
import colors from 'vuetify/es5/util/colors';
import FMMode from 'frontmatter-markdown-loader/mode';

export default {
  target: 'static',
  server: {
    host: '0.0.0.0'
  },
  /*
   ** Headers of the page
   */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    icons: {
      iconfont: 'mdiSvg'
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          // primary: colors.blue.darken2,
          // accent: colors.orange.darken3,
          // secondary: colors.amber.darken3,
          // info: colors.teal.lighten1,
          // warning: colors.amber.base,
          // error: colors.deepOrange.accent4,
          // success: colors.green.accent3
          anchor: colors.orange.base
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      const markdownIt = require('markdown-it');
      const markdownItPrism = require('markdown-it-prism');

      config.module.rules.push({
        test: /\.md/,
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [FMMode.VUE_COMPONENT],
          vue: {
            root: 'markdown-body'
          },
          markdownIt: markdownIt({ html: true }).use(markdownItPrism)
        }
      });

      // add source maps for debugging
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    }
  },

  // create dynamic routes for static site
  generate: {
    routes() {
      const fs = require('fs');
      return fs.readdirSync('./assets/content/writing').map((file) => {
        return {
          route: `/writing/${path.parse(file).name}`
        };
      });
    }
  }
};
