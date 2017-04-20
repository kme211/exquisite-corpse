require('dotenv').config()
const webpack = require('webpack')
const path = require('path')

const GLOBALS = {
  '__AUTH0_CLIENT_ID__': JSON.stringify(process.env.__AUTH0_CLIENT_ID__),
  '__AUTH0_DOMAIN__': JSON.stringify(process.env.__AUTH0_DOMAIN__),
  '__API_URL__': JSON.stringify(process.env.__API_URL__)
}


module.exports = {
  debug: true,
  devtool: '#inline-source-map',
  entry: './src/index.js',
  target: 'web',
  plugins: [
    new webpack.DefinePlugin(GLOBALS)
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src'
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      loaders: ['babel']
    }]
  }
}
