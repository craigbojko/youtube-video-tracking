var npmPackage = require('./package')
var path = require('path')
var webpack = require('webpack')
var LiveReloadPlugin = require('webpack-livereload-plugin')
var SmartBannerPlugin = require('smart-banner-webpack-plugin')
var precss = require('precss')
var autoprefixer = require('autoprefixer')

var __RFC_ID = npmPackage.rfc
var NODE_ENV = process.env.NODE_ENV
var isProd = (NODE_ENV === 'production')

var lessVars = {
  'modifyVars': {
    'ns': __RFC_ID
  }
}

function getBuildBanner () {
  var npmPackage = require('./package')
  var date = new Date()
  var copy = ''
  copy += 'Author: ' + npmPackage.author + ' - Experian Consumer Services'
  copy += '\nFilename: [filename]'
  copy += '\nVersion: ' + npmPackage.version
  copy += '\nDate: ' + date.toISOString()
  copy += '\nDescription: ' + npmPackage.description
  console.log(copy)
  return copy
}

/**
 * webpack config defaults and base configuration
 * @type {Object}
 */
var wbConfig = {
  cache: true,
  entry: {
    main: path.join(__dirname, '/index.js')
  },
  output: {
    path: path.join(__dirname, '/build/'),
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  // watch: true,
  keepalive: true,
  debug: true,
  plugins: [
    new webpack.OldWatchingPlugin(),
    new SmartBannerPlugin(getBuildBanner(), { raw: false, entryOnly: true }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      // { test: /\.html$/, loader: 'html' },
      { test: /\.html$/, loader: 'underscore-template-loader' },
      { test: /\.css|less$/, loader: 'style!css!postcss-loader!less?' + JSON.stringify(lessVars) }
      // { test: /\.css|less$/, loader: 'style-loader!css-loader!postcss-loader!less-loader' },
    ]
  },
  postcss: function () {
    return [precss, autoprefixer]
  },
  externals: {}
}

/**
 * Branches additional webpack options depending on Environmental build - see Makefile
 * @param  {boolean} !isProd - branch flag
 * @return {void}
 */
if (!isProd) { // DEVELOPMENT
  /**
   * Add source maps
   * Push live reload plugins
   * Push Uglify - keep debugger statements, do not mangle
   * Push Define - Common variables for build
   * Define Output as build/dev
   */
  wbConfig['devtool'] = 'source-map'
  // wbConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  wbConfig.plugins.push(new LiveReloadPlugin({
    appendScriptTag: true
  }))
  wbConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_debugger: false,
      warnings: false
    },
    mangle: false
  }))
  wbConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development'),
      'RFC_NAMESPACE': JSON.stringify(__RFC_ID)
    }
  }))

  wbConfig.output = {
    path: path.join(__dirname, '/build/dev/'),
    filename: '[name].dev.js',
    sourceMapFilename: '[name].dev.map'
  }
} else { // PRODUCTION
  /**
   * Push Uglify - drop debugger/console/comments statements, mangle code
   * Push Define - Common variables for build
   * Push Banner - defined in above function
   * Define Output as build/prod
   */
  wbConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_debugger: true,
      drop_console: true,
      warnings: false
    },
    output: {
      comments: false
    },
    mangle: true
  }))
  wbConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'RFC_NAMESPACE': JSON.stringify(__RFC_ID)
    }
  }))
  wbConfig.plugins.push(new SmartBannerPlugin(getBuildBanner(), { raw: false, entryOnly: true })) // put header back in after uglify strips out

  wbConfig.output = {
    path: path.join(__dirname, '/build/prod/'),
    filename: '[name].min.js'
  }
}

/**
 * Export config
 * @type {object}
 */
module.exports = wbConfig
