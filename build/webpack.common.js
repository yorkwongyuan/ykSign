const path = require('path');

const srcPath = path.resolve(__dirname, '../src');

module.exports = {
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': srcPath
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [srcPath, path.resolve(__dirname, '../example')],
      loader: 'babel-loader'
    }]
  }
}