const webpack = require('webpack')
const path = require('path')

module.exports = {
  debug: true,
  devtool: '#inline-source-map',
  entry: ['webpack-hot-middleware/client?reload=true', './src/frontend/index.js'],
  target: 'web',
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src/frontend'
  },
  resolve: {
    modulesDirectories: ['src/frontend', 'node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      loaders: ['babel']
    }]
  }
}