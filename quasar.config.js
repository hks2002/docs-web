/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-08-17 09:53:17                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2026-01-07 23:12:50                               *
 * @FilePath              : docs-web/quasar.config.js                         *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/
import { readFileSync } from 'fs'
import { ZstdCodec } from 'zstd-codec'

import { defineConfig } from '#q-app/wrappers'

let pkgText = readFileSync('package.json')
let pkg = JSON.parse(pkgText)
let pkgVersion = pkg.version
let pkgName = pkg.name

/**
 * Quasar App (v2) Configuration
 * @see https://v2.quasar.dev/quasar-cli-webpack/quasar-config-file
 */
export default defineConfig(() => {
  return {
    eslint: {
      fix: true,
      // include: [],
      // exclude: [],
      // cache: false,
      // rawEsbuildEslintOptions: {},
      // rawWebpackEslintPluginOptions: {},
      warnings: true,
      errors: true,
    },

    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: ['quasar', 'i18n', 'router', 'axios'],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-file#css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v7',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      // 'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-file#build
    build: {
      publicPath: '/' + pkgName + '/',
      vueRouterMode: 'hash', // available values: 'hash', 'history'

      // webpackTranspile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "webpackTranspile" is set to true.
      // webpackTranspileDependencies: [],

      esbuildTarget: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      // rtl: true, // https://quasar.dev/options/rtl-support
      preloadChunks: true,
      showProgress: true,
      gzip: {
        test: /\.(js|css|html|json|ttf|svg|png|woff)$/,
        filename: '[path][base].zst',
        algorithm: function (input, options, callback) {
          ZstdCodec.run((zstd) => {
            try {
              const simple = new zstd.Simple()
              const level = options.level ?? 3
              const result = simple.compress(input, level)
              callback(null, result)
            } catch (err) {
              callback(err)
            }
          })
        },
        // change the default compression options
        compressionOptions: {
          level: 4,
        },
        threshold: 1024,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      },
      minify: true, // minify for production
      treeshake: true, //  remove unnecessary import
      analyze: {
        analyzerMode: 'static',
        reportFilename: 'report.html',
        openAnalyzer: true,
        generateStatsFile: true,
      },

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
      // "chain" is a webpack-chain object https://github.com/sorrycc/webpack-chain
      chainWebpack(chain) {
        chain.optimization.splitChunks({
          chunks: 'all', // initial, async, all
          minSize: 20480, // low for bad network
          maxSize: 512000, // high for bad network
          minRemainingSize: 5120,
          maxAsyncRequests: 30,
          cacheGroups: {
            vue: {
              test: /[\\/]node_modules[\\/](vue|vue-router|pinia)[\\/]/,
              name: 'vue',
              chunks: 'all',
              priority: 30,
              reuseExistingChunk: true,
            },
            quasar: {
              test: /[\\/]node_modules[\\/](quasar)[\\/]/,
              name: 'quasar',
              chunks: 'all',
              priority: 20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'common',
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -0,
              reuseExistingChunk: true,
            },
          },
        })
      },

      afterBuild() {
        console.log('\u001b[35m Update package to ' + pkgVersion + '\u001b[0m')
      },
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true,
        },
      },

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack(cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias
        }
        // console.debug(' webpack-aliases:', cfg.resolve.alias)
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-file#devserver
    devServer: {
      hot: true,
      open: true, // opens browser window automatically
      proxy: [
        {
          context: ['/docs-api'],
          target: 'http://127.0.0.1:8090',
        },
        {
          context: ['/audros/custom/thumbnails/dmsDS'],
          target: 'http://192.168.0.247:4000',
        },
      ],
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-file#framework
    framework: {
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['Cookies', 'Dialog', 'Loading', 'Notify', 'LoadingBar', 'Meta', 'SessionStorage'],
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-file#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   indexHtmlTemplate: 'index.html',
    //   pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
    //   pwaServiceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    //   bexManifestFile: 'src-bex/manifest.json
    // },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
    ssr: {
      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render', // keep this as last one
      ],

      // extendPackageJson (json) {},
      // extendSSRWebserverConf (esbuildConf) {},

      // manualStoreSerialization: true,
      // manualStoreSsrContextInjection: true,
      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      pwa: false,
      // pwaOfflineHtmlFilename: 'offline.html', // do NOT use index.html as name!

      // pwaExtendGenerateSWOptions (cfg) {},
      // pwaExtendInjectManifestOptions (cfg) {}
    },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      // swFilename: 'sw.js',
      // manifestFilename: 'manifest.json',
      // extendManifestJson (json) {},
      // useCredentialsForManifestTag: true,
      // injectPwaMetaTags: false,
      // extendPWACustomSWConf (esbuildConf) {},
      // extendGenerateSWOptions (cfg) {},
      // extendInjectManifestOptions (cfg) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf) {},
      // extendElectronPreloadConf (esbuildConf) {},

      // extendPackageJson (json) {},

      // Electron preload scripts (if any) from /src-electron, WITHOUT file extension
      preloadScripts: ['electron-preload'],

      // specify the debugging port to use for the Electron app when running in development mode
      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'docs-web',
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-browser-extensions/configuring-bex
    bex: {
      // extendBexScriptsConf (esbuildConf) {},
      // extendBexManifestJson (json) {},

      /**
       * The list of extra scripts (js/ts) not in your bex manifest that you want to
       * compile and use in your browser extension. Maybe dynamic use them?
       *
       * Each entry in the list should be a relative filename to /src-bex/
       *
       * @example [ 'my-script.ts', 'sub-folder/my-other-script.js' ]
       */
      extraScripts: [],
    },
  }
})
