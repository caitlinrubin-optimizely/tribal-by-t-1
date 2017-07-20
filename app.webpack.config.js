const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const constants = require('./constants');

module.exports = {
  entry: {
    main: ['./client/src/bundles/main.js'],
  },
  output: {
    path: path.resolve('./build/static'),
    filename: '[name].optimizely.t1.js',
    chunkFilename: '[id].optimizely.t1.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  autoprefixer(),
                ]
              }
            },
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(jpg|png)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve('./client/src'),
      'node_modules',
    ],
    alias: {
      components: path.resolve(__dirname, 'client/src/components'),
      steps: path.resolve(__dirname, 'client/src/steps'),
      theme: path.resolve(__dirname, 'client/src/theme'),
      actions: path.resolve(__dirname, 'client/src/actions'),
      reducers: path.resolve(__dirname, 'client/src/reducers'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./build/vendor.json'),
    }),
    new ExtractTextPlugin({
      filename: '[name].optimizely.t1.css',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      mangle: true,
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve('./build/index.html'),
      template: path.resolve('./client/src/templates/main.ejs'),
      title: constants.PAGE_TITLE,

    }),
  ],
  watch: true,
  watchOptions: {
    ignored: /build/,
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  }
};
