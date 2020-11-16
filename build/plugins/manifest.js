const fs = require('fs')
const utils = require('../utils')

const pluginName = 'Manifest'

class Manifest {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.assetEmitted.tap(
      pluginName,
      this.onAssetEmittedTap.bind(this)
    )
  }

  onAssetEmittedTap(file, arg) {
    const { targetPath } = arg
    const { templatePath, targetFilepath } = this.options

    // eslint-disable-next-line
    const manifest = require(templatePath)
    let { js, css } = manifest.content_scripts[0]

    if (!Array.isArray(js)) {
      js = []
    }
    if (!Array.isArray(css)) {
      css = []
    }

    const relativePath = utils.getAssetRelativePath(targetFilepath, targetPath)

    if (file.endsWith('.js')) {
      js.push(relativePath)
    }
    if (file.endsWith('.css')) {
      css.push(relativePath)
    }

    Object.assign(manifest.content_scripts[0], { js, css })

    fs.writeFile(targetFilepath, JSON.stringify(manifest, null, 2), (er) => {
      // eslint-disable-next-line no-console
      console.error('generate manifest.json failed because ', er)
    })
  }
}

module.exports = Manifest
