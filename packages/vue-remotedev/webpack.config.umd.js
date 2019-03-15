const path = require('path')
const createConfig = require('vue-devtools/shells/createConfig')

module.exports = createConfig({
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'umd'),
    publicPath: '/umd/',
    library: 'VueRemotedev',
    libraryTarget: 'umd',
    filename: process.env.NODE_ENV === 'production'
      ? 'vue-remotedev.min.js'
      : 'vue-remotedev.js'
  }
})
