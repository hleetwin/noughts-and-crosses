var path = require('path');
var webpackConfig = require('./webpack.config');
var entry = path.resolve(webpackConfig.context, webpackConfig.entry);
var preprocessors = {};
preprocessors[entry] = ['webpack'];

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files 
    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [entry],
    webpack: webpackConfig,

    // list of files to exclude
    exclude: [
    ],

    // progress reporter: lists each test run and whether they pass/fail
    // coverage reporter: creates coverage reports for every tested browser
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // the browsers that should be tested
    browsers: ['Chrome'],

    preprocessors: preprocessors,

    // Configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'results/coverage/'
    },

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 20000,

    // Auto run tests on start (when browsers are captured) and exit
    singleRun: false,

    // report which specs run too slow
    reportSlowerThan: 500,

    // any additional plugins needed for testing
    plugins: [
      require('karma-webpack'),
      'karma-coverage',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-chrome-launcher'
    ]
  });
};
