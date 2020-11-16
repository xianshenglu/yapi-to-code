const base = require('./webpack.base.conf')

const config = {
  mode: 'development',
  ...base,
  devtool: 'inline-source-map',
}

module.exports = config
