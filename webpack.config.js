var path = require('path');
var WebpackDevServer = require("webpack-dev-server");
var webpack = require('webpack');
var console = require('console');

module.exports = {
  context: __dirname + '/client/app',
  entry: './app.js',
  output: {
    path: __dirname + '/client/app',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules']
  }
};

