const reporter = require('cucumber-html-reporter');
const path = require('path');

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, '../reports/cucumber_report.json'),
  output: path.join(__dirname, '../reports/cucumber_report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    "Test Environment": "DemoWebshop",
    "Browser": "Chrome",
    "Platform": "Windows 10",
    "Executed": new Date().toISOString()
  }
};

reporter.generate(options);
