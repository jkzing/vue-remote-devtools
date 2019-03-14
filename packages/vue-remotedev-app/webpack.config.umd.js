const path = require('path')
const createConfig = require('vue-devtools/shells/createConfig')

module.exports = createConfig({
  entry: {
    app: './src/app.js',
  },
  output: {
    path: path.join(__dirname, 'umd'),
    publicPath: '/umd/',
    library: 'VueRemotedevApp',
    libraryTarget: 'umd',
    filename: process.env.NODE_ENV === 'production'
      ? 'vue-remotedev-app.min.js'
      : 'vue-remotedev-app.js'
  }
})
