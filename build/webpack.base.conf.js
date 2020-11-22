const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks')

module.exports = {
  entry: {
    options: './src/options/main.js',
    background: './src/background/index.js',
    inject: './src/inject/index.js',
  },
  output: {
    filename: (pathData) => {
      // only options are inserted to the html by plugin, others are hardcoded in the manifest.json
      return pathData.chunk.name === 'options'
        ? 'static/[name].[contenthash].js'
        : 'static/[name].js'
    },
    path: path.resolve(__dirname, '../dist/'),
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // is relative with css assets path like font, images etc.
              publicPath: '../',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // how to pass entry to file loader?
        loader: 'file-loader',
        options: {
          outputPath: 'static',
          // path is relative to css which is controlled by css loader
          name: '[name].[contenthash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: 'options.html',
      template: path.resolve(__dirname, '../public/options.html'),
    }),
    new CleanObsoleteChunks(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // determine the output path
      filename() {
        return 'static/[name].[contenthash].css'
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: './public/manifest.json', to: 'manifest.json' },
        { from: './public/static', to: './static' },
      ],
    }),
  ],
}
