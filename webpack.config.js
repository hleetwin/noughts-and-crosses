var path = require('path');
var webpack = require('webpack');
var console = require('console');

module.exports = {
  context: __dirname + '/client/app',
  entry: './app.js',
  output: {
    path: __dirname + '/client/app',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, 
        loader: 'babel', 
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ON_TEST: process.env.NODE_ENV === 'test'
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules']
  }
};

