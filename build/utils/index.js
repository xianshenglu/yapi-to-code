const path = require('path')

module.exports = {
  getAssetRelativePath(from, to) {
    return path
      .relative(path.resolve(from, '../'), to)
      .split(path.sep)
      .join('/')
  },
}
