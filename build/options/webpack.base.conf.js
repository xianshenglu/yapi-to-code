const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    options: './src/options/main.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../../dist/options/'),
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
              publicPath: './dist/',
            },
          },
          {
            loader: 'css-loader',
            options: {
              // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
              // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
              importLoaders: 1,
              // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
              modules: { auto: true },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../public/options/index.html'),
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  ],
}
