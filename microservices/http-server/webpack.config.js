const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: [path.resolve(__dirname,'public','app.jsx')]
  },
  output: {
    path: path.resolve(__dirname,'public','static'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['babel']
    }]
  },
  resolve: {
    extensions: ['','.js','.jsx','/index.js','/index.jsx']
  },
  node:
{
    "child_process": "empty",
    "fs" : "empty"
}
}
