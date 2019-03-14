const path = require('path')
const createConfig = require('vue-devtools/shells/createConfig')

module.exports = createConfig({
  entry: {
    app: './app/index.js',
    client: './client/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  devtool: '#cheap-module-source-map',
  devServer: {
    port: 3000,
    quiet: true
  }
})
