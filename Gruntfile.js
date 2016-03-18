module.exports = function(grunt) {
  var webpack = require('webpack');
  var WebpackDevServer = require("webpack-dev-server");
  var webpackConfig = require('./webpack.config.js');
  // load up all of the necessary grunt plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-webpack');


  // in what order should the files be concatenated
  var clientIncludeOrder = require('./include.conf.js');

  // grunt setup
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webpack: {
      options: webpackConfig
      // app: {
      //   entry: "./client/app/app.js",
      //   output: {
      //     path: __dirname + '/client/app',
      //     filename: "bundle.js"
      //   }
      // }
    },

    "webpack-dev-server": {
      app: {
        stats: {
          colors: false,
          modules: true,
          reasons: true
        }
      },

      // options: {
      //   webpack: {
      //     app: {
      //       entry: "./client/app/app.js",
      //       output: {
      //         path: __dirname + '/client/app',
      //         filename: "bundle.js"
      //       }
      //     }
      //   }
      // },
      options: {
        webpack: webpackConfig
      },

      start: {
        keepAlive: true,
        webpack: {
          devtool: "eval",
          debug: true
        }
      }
    },

    // create a task called clean, which
    // deletes all files in the listed folders
    clean: {
      dist: 'dist/*',
      results: 'results/*'
    },

    // copy: {
    //   all: {
    //     //This copies all the html and css into dist /folder
    //     expand: true,
    //     cwd: 'client/',
    //     src: ['**/*.html', '**/*.css'],
    //     dest: 'dist/'
    //   },
    // },
    // what files should be linted
    jshint: {
      gruntfile: 'Gruntfile.js',
      client: clientIncludeOrder,
      options: {
        globals: {
          eqeqeq: true
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: process.env.PORT || 8080,
          base: 'dist/',
          livereload: 35729,
          keepalive: true
        }
      }
    },

    // uglify the files
    uglify: {
      app: {
        files: {
          'dist/client/app/app.js': clientIncludeOrder
        }
      }
    },

    // copy necessary files to our dist folder
    copy: {
      // create a task for client files
      client: {
        // Copy everything but the to-be-concatenated todo JS files
        src: [ 'client/**', '!client/app/**' ],
        dest: 'dist/'
      }
    },

    // concat all the js files
    concat: {
      app: {
        files: {
          'dist/client/app/app.js': clientIncludeOrder
        }
      }
    },

    // configure karma
    karma: {
      options: {
        configFile: 'karma.conf.js',
        reporters: ['progress', 'coverage']
      },
      // Watch configuration
      watch: {
        background: true,
        reporters: ['progress']
      },
      // Single-run configuration for development
      single: {
        singleRun: true
      },
      // Single-run configuration for CI
      ci: {
        singleRun: true,
        coverageReporter: {
          type: 'lcov',
          dir: 'results/coverage/'
        }
      }
    },

    // create a watch task for tracking
    // any changes to the following files
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      client: {
        files: [ 'client/**' ],
        tasks: [ 'build', 'karma:watch:run']
      },
      unitTests: {
        files: [ 'test/unit/**/*.js' ],
        tasks: [ 'karma:watch:run' ]
      },
      integrationTests: {
        files: [ 'test/integration/**/*.js' ],
        tasks: [ 'karma:watch:run' ]
      }
    }
  });




  // Perform a build
  grunt.registerTask('build', [ 'jshint', 'clean', 'copy', 'concat', 'uglify' ]);

  // Run client tests once
  grunt.registerTask('testClient', [ 'karma:single' ]);

  // Run all tests once
  grunt.registerTask('test', [ 'testClient']);

  // Run all tests once
  grunt.registerTask('ci', [ 'karma:ci']);

  // Start watching and run tests when files change
  grunt.registerTask('default', [ 'build', 'webpack', 'webpack-dev-server:start', 'copy', 'karma:watch:start', 'watch' ]);
};
