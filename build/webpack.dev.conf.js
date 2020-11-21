const base = require('./webpack.base.conf')

const { plugins, ...otherConfig } = base
const config = {
  mode: 'development',
  ...otherConfig,
  plugins: [...plugins],
  devtool: 'inline-source-map',
}
module.exports = config
