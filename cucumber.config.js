module.exports = {
  default: {
    require: [
      'dist/steps/common.steps.js',
      'dist/steps/registration.steps.js',
      'dist/steps/login.steps.js',
      'dist/steps/shopping.steps.js',
      'dist/support/hooks.js'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber_report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    timeout: 60000
  }
};
