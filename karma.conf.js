"use strict";

let webpackConfig = require('./webpack.karma.config');
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'jasmine-matchers', 'source-map-support'],
    files: [
      "./spec/Cookie.spec.ts",
      "./spec/DOMStorage.spec.ts",
      "./spec/GlobalStorage.spec.ts",
      "./spec/LocalStorage.spec.ts",
      "./spec/SessionStorage.spec.ts",
      "./spec/EverCookie.spec.ts"
    ],
    exclude: [],
    preprocessors: {
      'lib/**/*.ts': ['webpack'],
      'spec/**/*.ts': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: './doc/coverage',
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'lcov', subdir: 'report-lcov'},
        {type: 'cobertura', subdir: '.', file: 'cobertura.txt'},
        {type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt'},
        {type: 'teamcity', subdir: '.', file: 'teamcity.txt'},
        {type: 'text', subdir: '.', file: 'text.txt'},
        {type: 'text-summary', subdir: '.', file: 'text-summary.txt'},
        {type: 'json', subdir: '.', file: 'coverage-final.json'}
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    browserDisconnectTimeout: 60000,
    browserNoActivityTimeout: 60000,
    webpackServer: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },
    browsers: [
      'PhantomJS'
    ]
  })
};


