const ExtensionReloader = require('webpack-extension-reloader')
const base = require('./webpack.base.conf')

const { plugins, ...otherConfig } = base
const config = {
  mode: 'development',
  ...otherConfig,
  plugins: [new ExtensionReloader(), ...plugins],
  devtool: 'inline-source-map',
}
module.exports = config
