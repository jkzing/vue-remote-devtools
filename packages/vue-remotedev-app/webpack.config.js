const path = require('path')
const createConfig = require('vue-devtools/shells/createConfig')

module.exports = createConfig({
  entry: {
    app: './index.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  devtool: '#cheap-module-source-map',
  devServer: {
    port: 3000,
    quiet: true
  }
})
