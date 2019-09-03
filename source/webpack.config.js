const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin('styles.css')]
}
