const HtmlWebpackPlugin = require('html-webpack-plugin')
const elementId = require('./src/element-id').elementId

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    externals: {
      vue: 'Vue'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        elementId
      })
    ]
  }
}
