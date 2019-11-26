module.exports = {
  pluginOptions: {
    quasar: {
      treeShake: true
    }
  },
  transpileDependencies: [
    // eslint-disable-next-line no-useless-escape
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
}
