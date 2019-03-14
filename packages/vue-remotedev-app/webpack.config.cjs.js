const path = require('path')
const createConfig = require('vue-devtools/shells/createConfig')

module.exports = createConfig({
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'lib'),
    publicPath: '/lib/',
    libraryTarget: 'commonjs2',
    filename: 'vue-remotedev-app.cjs.js'
  }
})
