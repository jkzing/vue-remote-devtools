const path = require('path')
const createConfig = require('vue-devtools/shells/createConfig')

module.exports = createConfig({
  entry: {
    app: './app.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  devtool: '#cheap-module-source-map',
  devServer: {
    port: 3001,
    quiet: true
  }
})
