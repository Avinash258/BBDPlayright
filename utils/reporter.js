const { writeFileSync, mkdirSync, existsSync } = require('fs');
const { join } = require('path');
const { Logger } = require('./logger');

// Test result class
class TestResult {
  constructor(testName, status, duration, error = null, steps = [], screenshots = [], video = null, trace = null) {
    this.testName = testName;
    this.status = status;
    this.duration = duration;
    this.error = error;
    this.steps = steps;
    this.screenshots = screenshots;
    this.video = video;
    this.trace = trace;
  }
}

// Step result class
class StepResult {
  constructor(stepName, status, duration, error = null) {
    this.stepName = stepName;
    this.status = status;
    this.duration = duration;
    this.error = error;
  }
}

// Test suite result class
class TestSuiteResult {
  constructor(suiteName, startTime, endTime, duration, totalTests, passedTests, failedTests, skippedTests, tests = []) {
    this.suiteName = suiteName;
    this.startTime = startTime;
    this.endTime = endTime;
    this.duration = duration;
    this.totalTests = totalTests;
    this.passedTests = passedTests;
    this.failedTests = failedTests;
    this.skippedTests = skippedTests;
    this.tests = tests;
  }
}

// Reporter class for DemoWebshop testing
class Reporter {
  constructor() {
    this.testSuites = [];
    this.currentSuite = null;
    this.currentTest = null;
    this.logger = Logger.getInstance();
    this.ensureReportDirectory();
  }

  ensureReportDirectory() {
    const reportDir = join('reports');
    if (!existsSync(reportDir)) {
      mkdirSync(reportDir, { recursive: true });
    }
  }

  startTestSuite(suiteName) {
    this.currentSuite = new TestSuiteResult(suiteName, new Date(), null, 0, 0, 0, 0, 0, []);
    this.testSuites.push(this.currentSuite);
    this.logger.info(`Test suite started: ${suiteName}`);
  }

  endTestSuite() {
    if (this.currentSuite) {
      this.currentSuite.endTime = new Date();
      this.currentSuite.duration = this.currentSuite.endTime - this.currentSuite.startTime;
      this.logger.info(`Test suite ended: ${this.currentSuite.suiteName} - Duration: ${this.currentSuite.duration}ms`);
      this.currentSuite = null;
    }
  }

  startTest(testName) {
    this.currentTest = new TestResult(testName, 'PASSED', 0, null, [], [], null, null);
    if (this.currentSuite) {
      this.currentSuite.tests.push(this.currentTest);
      this.currentSuite.totalTests++;
    }
    this.logger.logTestStart(testName);
  }

  endTest(status, duration, error = null) {
    if (this.currentTest) {
      this.currentTest.status = status;
      this.currentTest.duration = duration;
      this.currentTest.error = error;

      if (this.currentSuite) {
        if (status === 'PASSED') {
          this.currentSuite.passedTests++;
        } else if (status === 'FAILED') {
          this.currentSuite.failedTests++;
        } else if (status === 'SKIPPED') {
          this.currentSuite.skippedTests++;
        }
      }

      this.logger.logTestEnd(this.currentTest.testName, status);
      this.currentTest = null;
    }
  }

  addStep(stepName, status, duration, error = null) {
    if (this.currentTest) {
      const step = new StepResult(stepName, status, duration, error);
      this.currentTest.steps.push(step);
      this.logger.logStep(stepName);
    }
  }

  addScreenshot(screenshotPath) {
    if (this.currentTest) {
      this.currentTest.screenshots.push(screenshotPath);
    }
  }

  addVideo(videoPath) {
    if (this.currentTest) {
      this.currentTest.video = videoPath;
    }
  }

  addTrace(tracePath) {
    if (this.currentTest) {
      this.currentTest.trace = tracePath;
    }
  }

  getTestSuites() {
    return [...this.testSuites];
  }

  getSummary() {
    const summary = {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      skippedTests: 0,
      totalDuration: 0
    };

    this.testSuites.forEach(suite => {
      summary.totalTests += suite.totalTests;
      summary.passedTests += suite.passedTests;
      summary.failedTests += suite.failedTests;
      summary.skippedTests += suite.skippedTests;
      summary.totalDuration += suite.duration;
    });

    return summary;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.getSummary(),
      testSuites: this.testSuites
    };

    const reportPath = join('reports', 'test-report.json');
    try {
      writeFileSync(reportPath, JSON.stringify(report, null, 2));
      this.logger.info(`Test report generated: ${reportPath}`);
      return reportPath;
    } catch (error) {
      this.logger.logError('Failed to generate test report', error);
      throw error;
    }
  }

  generateHTMLReport() {
    const summary = this.getSummary();
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .summary { background: #f5f5f5; padding: 20px; border-radius: 5px; }
        .passed { color: green; }
        .failed { color: red; }
        .skipped { color: orange; }
        .suite { margin: 20px 0; border: 1px solid #ddd; padding: 15px; }
        .test { margin: 10px 0; padding: 10px; background: #f9f9f9; }
    </style>
</head>
<body>
    <h1>Test Execution Report</h1>
    <div class="summary">
        <h2>Summary</h2>
        <p>Total Tests: ${summary.totalTests}</p>
        <p class="passed">Passed: ${summary.passedTests}</p>
        <p class="failed">Failed: ${summary.failedTests}</p>
        <p class="skipped">Skipped: ${summary.skippedTests}</p>
        <p>Total Duration: ${summary.totalDuration}ms</p>
    </div>
    <div class="test-suites">
        ${this.testSuites.map(suite => `
            <div class="suite">
                <h3>${suite.suiteName}</h3>
                <p>Duration: ${suite.duration}ms</p>
                <p>Tests: ${suite.totalTests} (Passed: ${suite.passedTests}, Failed: ${suite.failedTests}, Skipped: ${suite.skippedTests})</p>
                ${suite.tests.map(test => `
                    <div class="test">
                        <h4>${test.testName}</h4>
                        <p>Status: <span class="${test.status.toLowerCase()}">${test.status}</span></p>
                        <p>Duration: ${test.duration}ms</p>
                        ${test.error ? `<p>Error: ${test.error}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        `).join('')}
    </div>
</body>
</html>`;

    const htmlPath = join('reports', 'test-report.html');
    try {
      writeFileSync(htmlPath, html);
      this.logger.info(`HTML report generated: ${htmlPath}`);
      return htmlPath;
    } catch (error) {
      this.logger.logError('Failed to generate HTML report', error);
      throw error;
    }
  }
}

module.exports = { Reporter, TestResult, StepResult, TestSuiteResult };
