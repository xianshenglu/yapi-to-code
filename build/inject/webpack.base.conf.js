const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Manifest = require('../plugins/manifest')

module.exports = {
  entry: {
    inject: './src/inject/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../../dist/'),
  },
  resolve: {
    alias: {},
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Manifest({
      templatePath: path.resolve(__dirname, '../../public/manifest.json'),
      targetFilepath: path.resolve(__dirname, '../../dist/manifest.json'),
    }),
  ],
}
