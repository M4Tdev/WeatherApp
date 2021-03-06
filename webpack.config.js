const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const OfflinePlugin = require('offline-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/js/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    contentBase: './dist',
    // port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MomentLocalesPlugin(),
    new OfflinePlugin({
      responseStrategy: 'network-first',
      externals: [
        '/manifest.json',
        '/images/compass.svg',
        '/images/close.svg',
        '/images/location.svg',
        '/images/plus.svg',
        '/images/search.svg',
        '/favicon.ico',
        '/images/icons/icon-192x192.png',
        '/images/icons/icon-512x512.png',
      ],
      ServiceWorker: {
        events: true,
      },
    }),
  ],
};
