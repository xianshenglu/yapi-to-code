const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  entry: {
    options: './src/options/main.ts',
    background: './src/background/index.ts',
    inject: './src/inject/index.ts',
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
    extensions: ['.wasm', '.ts', '.mjs', '.js', '.vue', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(m?js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
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
    new MonacoWebpackPlugin({
      languages: ['javascript', 'typescript'],
      features: [
        '!accessibilityHelp',
        '!anchorSelect',
        '!codeAction',
        '!fontZoom',
        '!gotoError',
        '!gotoLine',
        '!gotoSymbol',
        '!iPadShowKeyboard',
        '!quickCommand',
        '!quickHelp',
        '!quickOutline',
        '!referenceSearch',
        '!toggleTabFocusMode',
        '!transpose',
        '!unusualLineTerminators',
        '!viewportSemanticTokens',
      ],
    }),
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
