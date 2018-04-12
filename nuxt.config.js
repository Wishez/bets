const nodeExternals = require("webpack-node-externals");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  css: [
    // Load a Node.js module directly (here it's a Sass file)
    // 'swiper/dist/css/swiper.css',
    // 'bulma',
    // CSS file in the project
    // '@/assets/css/main.css',
    // SCSS file in the project
    "@/assets/sass/fonts.sass",
    "@/assets/sass/main.sass"
  ],
  // mode: "spa",
  /*
     ** Headers of the page
     */
  head: {
    title: "Bets 24cyber",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Портал с кибер-спортивными ставками."
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/static/bets24cyber/favicon.ico"
      }
    ]
  },
  /*
     ** Customize the progress bar color
     */
  loading: {
    color: "#3B8070"
  },
  /*
     ** Build configuration
     */
  build: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true,
        openAnalyzer: false,
        logLevel: 'info'
      })
],
    vendor: [
      "@nuxtjs/axios"
    ],
    axios: {
      // proxyHeaders: false
    },

    postcss: {
      plugins: {
        // Disable `postcss-url`
        "postcss-url": true,
        // Customize `postcss-cssnext` default options
        "postcss-cssnext": {
          features: {
            customProperties: false
          }
        },
        "postcss-import": {},
        "css-declaration-sorter": { order: "smacss" },
        // Add some plugins
        // 'postcss-nested': {},
        "postcss-responsive-type": {},
        "postcss-hexrgba": {}
      }
    },
    /*
         ** Run ESLint on save
         */
    extend(config, { isDev, isServer }) {
      if (isDev) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            formatter: require("eslint-friendly-formatter"),
            fix : true
          }
        });
      }

      if (isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [
              /^vue-twitch-player/, 
              // /^vue-plugin-load-script/, 
              /^vue-awesome/, 
              // /^vue-progressive-image/,
              // /^vue-lazyload-img/,s
               // /^vue-awesome-swiper/,
              /^vue-lazyload/,
              /^vue-tiny-slider/
            ] 
          })
        ];
      }
    }
  },
  plugins: [
    // "~plugins/vue-plugin-load-script.js",
    "~plugins/vue-awesome.js",
    "~plugins/global.js",
    "~plugins/vue-lazyload.js",
    {ssr: false,  src: "~plugins/vue-tiny-slider.js"}, 
    // {ssr: false,  src: "~plugins/vue-awesome-swiper.js"}, 
    // {ssr: false,  src: "~plugins/vue-progressive-image.js"},
    // '~/plugins/vue-carousel.js'
    // "~plugins/vue-awesome-swiper.js",      
  ]
};