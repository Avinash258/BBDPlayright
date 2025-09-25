import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { logger } from './logger';

// Test result interface
export interface TestResult {
  testName: string;
  status: 'PASSED' | 'FAILED' | 'SKIPPED';
  duration: number;
  error?: string;
  steps: StepResult[];
  screenshots?: string[];
  video?: string;
  trace?: string;
}

// Step result interface
export interface StepResult {
  stepName: string;
  status: 'PASSED' | 'FAILED';
  duration: number;
  error?: string;
}

// Test suite result interface
export interface TestSuiteResult {
  suiteName: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  results: TestResult[];
}

// Reporter class for DemoWebshop testing
export class Reporter {
  private static instance: Reporter;
  private testSuites: TestSuiteResult[] = [];
  private currentSuite: TestSuiteResult | null = null;
  private currentTest: TestResult | null = null;
  private reportDir: string;

  private constructor() {
    this.reportDir = process.env.REPORT_DIR || 'reports';
    this.ensureReportDirectory();
  }

  public static getInstance(): Reporter {
    if (!Reporter.instance) {
      Reporter.instance = new Reporter();
    }
    return Reporter.instance;
  }

  private ensureReportDirectory(): void {
    if (!existsSync(this.reportDir)) {
      mkdirSync(this.reportDir, { recursive: true });
    }
  }

  public startTestSuite(suiteName: string): void {
    this.currentSuite = {
      suiteName,
      startTime: new Date(),
      endTime: new Date(),
      duration: 0,
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      skippedTests: 0,
      results: []
    };
    logger.info(`Test suite started: ${suiteName}`);
  }

  public endTestSuite(): void {
    if (this.currentSuite) {
      this.currentSuite.endTime = new Date();
      this.currentSuite.duration = this.currentSuite.endTime.getTime() - this.currentSuite.startTime.getTime();
      this.testSuites.push(this.currentSuite);
      logger.info(`Test suite ended: ${this.currentSuite.suiteName}`);
      this.currentSuite = null;
    }
  }

  public startTest(testName: string): void {
    this.currentTest = {
      testName,
      status: 'PASSED',
      duration: 0,
      steps: []
    };
    logger.testStart(testName);
  }

  public endTest(status: 'PASSED' | 'FAILED' | 'SKIPPED', error?: string): void {
    if (this.currentTest && this.currentSuite) {
      this.currentTest.status = status;
      this.currentTest.error = error;
      this.currentSuite.results.push(this.currentTest);
      this.currentSuite.totalTests++;
      
      switch (status) {
        case 'PASSED':
          this.currentSuite.passedTests++;
          break;
        case 'FAILED':
          this.currentSuite.failedTests++;
          break;
        case 'SKIPPED':
          this.currentSuite.skippedTests++;
          break;
      }

      logger.testEnd(this.currentTest.testName, status);
      this.currentTest = null;
    }
  }

  public addStep(stepName: string, status: 'PASSED' | 'FAILED', error?: string): void {
    if (this.currentTest) {
      const step: StepResult = {
        stepName,
        status,
        duration: 0,
        error
      };
      this.currentTest.steps.push(step);
      logger.stepEnd(stepName, status);
    }
  }

  public addScreenshot(path: string): void {
    if (this.currentTest) {
      if (!this.currentTest.screenshots) {
        this.currentTest.screenshots = [];
      }
      this.currentTest.screenshots.push(path);
      logger.screenshot(path);
    }
  }

  public addVideo(path: string): void {
    if (this.currentTest) {
      this.currentTest.video = path;
      logger.video(path);
    }
  }

  public addTrace(path: string): void {
    if (this.currentTest) {
      this.currentTest.trace = path;
      logger.trace(path);
    }
  }

  public generateHTMLReport(): string {
    const reportPath = join(this.reportDir, 'test-report.html');
    const html = this.generateHTML();
    
    try {
      writeFileSync(reportPath, html);
      logger.report(reportPath);
      return reportPath;
    } catch (error) {
      logger.error('Failed to generate HTML report:', error);
      throw error;
    }
  }

  public generateJSONReport(): string {
    const reportPath = join(this.reportDir, 'test-report.json');
    const reportData = {
      timestamp: new Date().toISOString(),
      testSuites: this.testSuites,
      summary: this.getSummary()
    };

    try {
      writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
      logger.report(reportPath);
      return reportPath;
    } catch (error) {
      logger.error('Failed to generate JSON report:', error);
      throw error;
    }
  }

  public generateCSVReport(): string {
    const reportPath = join(this.reportDir, 'test-report.csv');
    const csv = this.generateCSV();
    
    try {
      writeFileSync(reportPath, csv);
      logger.report(reportPath);
      return reportPath;
    } catch (error) {
      logger.error('Failed to generate CSV report:', error);
      throw error;
    }
  }

  private generateHTML(): string {
    const summary = this.getSummary();
    const timestamp = new Date().toISOString();
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DemoWebshop Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { padding: 20px; border-radius: 8px; text-align: center; color: white; }
        .summary-card.passed { background-color: #28a745; }
        .summary-card.failed { background-color: #dc3545; }
        .summary-card.skipped { background-color: #ffc107; color: #333; }
        .summary-card.total { background-color: #007bff; }
        .test-suite { margin-bottom: 30px; }
        .test-suite h3 { background-color: #6c757d; color: white; padding: 10px; margin: 0; border-radius: 4px 4px 0 0; }
        .test-suite-content { border: 1px solid #dee2e6; border-top: none; padding: 20px; }
        .test-result { margin-bottom: 15px; padding: 15px; border-radius: 4px; }
        .test-result.passed { background-color: #d4edda; border-left: 4px solid #28a745; }
        .test-result.failed { background-color: #f8d7da; border-left: 4px solid #dc3545; }
        .test-result.skipped { background-color: #fff3cd; border-left: 4px solid #ffc107; }
        .test-name { font-weight: bold; margin-bottom: 10px; }
        .test-error { color: #721c24; background-color: #f8d7da; padding: 10px; border-radius: 4px; margin-top: 10px; }
        .steps { margin-top: 10px; }
        .step { padding: 5px 0; border-bottom: 1px solid #eee; }
        .step:last-child { border-bottom: none; }
        .step.passed { color: #28a745; }
        .step.failed { color: #dc3545; }
        .timestamp { color: #6c757d; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>DemoWebshop Test Report</h1>
            <p class="timestamp">Generated on: ${timestamp}</p>
        </div>
        
        <div class="summary">
            <div class="summary-card total">
                <h3>Total Tests</h3>
                <div style="font-size: 2em; font-weight: bold;">${summary.totalTests}</div>
            </div>
            <div class="summary-card passed">
                <h3>Passed</h3>
                <div style="font-size: 2em; font-weight: bold;">${summary.passedTests}</div>
            </div>
            <div class="summary-card failed">
                <h3>Failed</h3>
                <div style="font-size: 2em; font-weight: bold;">${summary.failedTests}</div>
            </div>
            <div class="summary-card skipped">
                <h3>Skipped</h3>
                <div style="font-size: 2em; font-weight: bold;">${summary.skippedTests}</div>
            </div>
        </div>
        
        ${this.testSuites.map(suite => this.generateTestSuiteHTML(suite)).join('')}
    </div>
</body>
</html>`;
  }

  private generateTestSuiteHTML(suite: TestSuiteResult): string {
    return `
    <div class="test-suite">
        <h3>${suite.suiteName}</h3>
        <div class="test-suite-content">
            <p><strong>Duration:</strong> ${suite.duration}ms</p>
            <p><strong>Tests:</strong> ${suite.totalTests} | <strong>Passed:</strong> ${suite.passedTests} | <strong>Failed:</strong> ${suite.failedTests} | <strong>Skipped:</strong> ${suite.skippedTests}</p>
            
            ${suite.results.map(test => this.generateTestHTML(test)).join('')}
        </div>
    </div>`;
  }

  private generateTestHTML(test: TestResult): string {
    const errorHTML = test.error ? `<div class="test-error"><strong>Error:</strong> ${test.error}</div>` : '';
    const stepsHTML = test.steps.length > 0 ? `
        <div class="steps">
            <strong>Steps:</strong>
            ${test.steps.map(step => `<div class="step ${step.status.toLowerCase()}">${step.stepName}</div>`).join('')}
        </div>` : '';

    return `
    <div class="test-result ${test.status.toLowerCase()}">
        <div class="test-name">${test.testName}</div>
        <div><strong>Status:</strong> ${test.status} | <strong>Duration:</strong> ${test.duration}ms</div>
        ${errorHTML}
        ${stepsHTML}
    </div>`;
  }

  private generateCSV(): string {
    const headers = ['Test Suite', 'Test Name', 'Status', 'Duration (ms)', 'Error', 'Steps'];
    const rows = [headers.join(',')];

    this.testSuites.forEach(suite => {
      suite.results.forEach(test => {
        const row = [
          suite.suiteName,
          test.testName,
          test.status,
          test.duration.toString(),
          test.error || '',
          test.steps.map(step => step.stepName).join(';')
        ];
        rows.push(row.map(cell => `"${cell}"`).join(','));
      });
    });

    return rows.join('\n');
  }

  private getSummaryData() {
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

  public getTestSuites(): TestSuiteResult[] {
    return [...this.testSuites];
  }

  public getSummary(): any {
    return this.getSummaryData();
  }

  public clear(): void {
    this.testSuites = [];
    this.currentSuite = null;
    this.currentTest = null;
  }
}

// Export singleton instance
export const reporter = Reporter.getInstance();
