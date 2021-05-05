// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path');

try {
  const puppeteer = require('puppeteer');
  process.env.CHROME_BIN = puppeteer.executablePath();
  console.log('Using Puppeteer provided Headless Chrome');
} catch (e) {
  console.log('Puppeteer not installed, trying to use separately installed Chrome');
}

module.exports = function (config) {
  config.set({
    browserDisconnectTimeout: 20000,
    browserNoActivityTimeout: 60000,
    browserDisconnectTolerance: 5,
    retryLimit: 5,
    basePath: 'src',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-junit-reporter',
      'karma-coverage',
      '@angular-devkit/build-angular/plugins/karma'
    ],
    coverageReporter: {
      dir: path.join(__dirname, './reports/coverage'),
      reporters: [
        { type: 'html', subdir: 'lcov-report' },
        { type: 'lcovonly' },
        { type: 'text-summary' }
      ],
      fixWebpackSourcePaths: true
    },
    junitReporter: {
      outputFile: path.resolve(__dirname, './reports/junit.xml')
    },
    reporters: ['progress', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['CustomChrome'],
    customLaunchers: {
      CustomChrome: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-setuid-sandbox',
          '--remote-debugging-port=9222',
        ]
      }
    },
    singleRun: true
  });
};
