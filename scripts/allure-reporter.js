const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Enhanced Allure Reporter for BDD Playwright Framework
 * Generates comprehensive HTML reports with screenshots, videos, and detailed analytics
 */

class AllureReporter {
  constructor() {
    this.resultsDir = 'reports/allure-results';
    this.reportDir = 'reports/allure-report';
    this.screenshotsDir = 'reports/screenshots';
  }

  /**
   * Generate Allure report
   */
  async generateReport() {
    try {
      console.log('🎨 Generating Allure report...');
      
      // Ensure directories exist
      this.ensureDirectories();
      
      // Generate the report
      const command = `allure generate ${this.resultsDir} --clean -o ${this.reportDir}`;
      console.log(`Executing: ${command}`);
      
      execSync(command, { stdio: 'inherit' });
      
      // Copy additional files
      this.copyAdditionalFiles();
      
      // Generate summary
      this.generateSummary();
      
      console.log('✅ Allure report generated successfully!');
      console.log(`📊 Report location: ${path.resolve(this.reportDir)}`);
      
    } catch (error) {
      console.error('❌ Error generating Allure report:', error.message);
      throw error;
    }
  }

  /**
   * Ensure required directories exist
   */
  ensureDirectories() {
    const dirs = [this.resultsDir, this.reportDir, this.screenshotsDir];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
      }
    });
  }

  /**
   * Copy additional files to report directory
   */
  copyAdditionalFiles() {
    try {
      // Copy screenshots if they exist
      if (fs.existsSync(this.screenshotsDir)) {
        const screenshots = fs.readdirSync(this.screenshotsDir);
        if (screenshots.length > 0) {
          const reportScreenshotsDir = path.join(this.reportDir, 'screenshots');
          if (!fs.existsSync(reportScreenshotsDir)) {
            fs.mkdirSync(reportScreenshotsDir, { recursive: true });
          }
          
          screenshots.forEach(file => {
            const src = path.join(this.screenshotsDir, file);
            const dest = path.join(reportScreenshotsDir, file);
            fs.copyFileSync(src, dest);
          });
          
          console.log(`📸 Copied ${screenshots.length} screenshots to report`);
        }
      }
    } catch (error) {
      console.warn('⚠️ Warning: Could not copy additional files:', error.message);
    }
  }

  /**
   * Generate summary information
   */
  generateSummary() {
    try {
      const summary = {
        generatedAt: new Date().toISOString(),
        framework: 'BDD Playwright + Cucumber',
        browser: process.env.BROWSER || 'chromium',
        headless: process.env.HEADLESS || 'true',
        nodeVersion: process.version,
        platform: process.platform,
        reportPath: path.resolve(this.reportDir),
        resultsPath: path.resolve(this.resultsDir)
      };

      const summaryPath = path.join(this.reportDir, 'summary.json');
      fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
      
      console.log('📋 Generated summary.json');
    } catch (error) {
      console.warn('⚠️ Warning: Could not generate summary:', error.message);
    }
  }

  /**
   * Open Allure report in browser
   */
  openReport() {
    try {
      console.log('🌐 Opening Allure report in browser...');
      const command = `allure open ${this.reportDir}`;
      execSync(command, { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Error opening report:', error.message);
    }
  }

  /**
   * Serve Allure report (for development)
   */
  serveReport() {
    try {
      console.log('🚀 Serving Allure report...');
      const command = `allure serve ${this.resultsDir}`;
      execSync(command, { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Error serving report:', error.message);
    }
  }
}

// CLI interface
if (require.main === module) {
  const reporter = new AllureReporter();
  const command = process.argv[2];

  switch (command) {
    case 'generate':
      reporter.generateReport();
      break;
    case 'open':
      reporter.openReport();
      break;
    case 'serve':
      reporter.serveReport();
      break;
    default:
      console.log('Usage: node allure-reporter.js [generate|open|serve]');
      process.exit(1);
  }
}

module.exports = AllureReporter;
