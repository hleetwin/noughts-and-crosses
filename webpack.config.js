var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');


var config = {
  context: __dirname + '/client/app',
  entry: './app.js',
  output: {
    path: __dirname + '/client/app',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, 
        loader: 'babel',
        exclude: /node_modules/
      },
      {test: /\.css$/, loader: 'style!css', exclude: /node_modules/}
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

if(process.env.NODE_ENV === 'production') {
  config.output.path = __dirname + '/dist';
}

module.exports = config;
