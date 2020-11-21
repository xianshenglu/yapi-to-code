const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    options: './src/options/main.js',
    background: './src/background/index.js',
    inject: './src/inject/index.js',
  },
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'options'
        ? 'static/[name].[contenthash].js'
        : '[name].js'
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: 'options/index.html',
      template: path.resolve(__dirname, '../public/options/index.html'),
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // determine the output path
      filename() {
        return 'static/[name].[contenthash].css'
      },
    }),
    new CopyPlugin({
      patterns: [{ from: './public/manifest.json', to: 'manifest.json' }],
    }),
  ],
}
