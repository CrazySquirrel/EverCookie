"use strict";

var webpackConfig = require('./webpack.karma.config');
webpackConfig.entry = {};

var _package = require('./package.json');
var devices = require('./vendors/BrowserStackLocal/Devices/Devices.json');

/**
 * Tested devices
 */
let arrDevices = {};
/**
 * Filling the set of test devices from the configuration file
 */
for (let x in devices) {
    if (devices.hasOwnProperty(x)) {
        let device = {
            base: 'BrowserStack'
        };
        if (x == "OS X" || x == "Windows") {
            device.resolution = '1280x1024';
            device.os = x;
            for (let y in devices[x]) {
                if (devices[x].hasOwnProperty(y)) {
                    device.os_version = y;
                    for (let z in devices[x][y]) {
                        if (devices[x][y].hasOwnProperty(z)) {
                            device.browser = z;
                            for (let i of devices[x][y][z]) {
                                device.browser_version = i;
                                arrDevices[
                                device.os + " " +
                                device.os_version + " " +
                                device.browser + " " +
                                device.browser_version
                                    ] = Object.assign({}, device);
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'jasmine-matchers', 'source-map-support'],
        files: [
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
            'Chrome',
            'ChromeCanary',
            'Chromium',
            'Firefox',
            'FirefoxDeveloper',
            'Safari',
            'PhantomJS',
            'OperaClassic',
            'Opera'
        ]
    })
};


